#!/usr/bin/env python3
"""Import the 44 untouched K28 JPEGs from the owner-supplied K28(1).zip.

Run in a clone with: python scripts/import_anh_k28.py "K28(1).zip"
The image bytes are copied exactly. No PIL processing, conversion, or AI.
"""
from pathlib import Path
import hashlib
import json
import re
import shutil
import sys
import zipfile

ROOT = Path(__file__).resolve().parent.parent
SOURCE = Path(sys.argv[1]).expanduser().resolve() if len(sys.argv) > 1 else ROOT / "K28(1).zip"
DEST = ROOT / "images" / "anh-k28"

def main():
    if not SOURCE.is_file():
        raise SystemExit("Không tìm thấy ZIP: " + str(SOURCE))
    with zipfile.ZipFile(SOURCE) as archive:
        files = sorted(
            (n for n in archive.namelist() if n.lower().endswith((".jpg", ".jpeg")) and not n.startswith("__MACOSX/")),
            key=lambda name: name.lower()
        )
        if len(files) != 44:
            raise SystemExit("Yêu cầu đúng 44 ảnh JPG/JPEG từ ZIP; tìm thấy " + str(len(files)))
        if any(archive.getinfo(n).file_size > 10_000_000 for n in files):
            raise SystemExit("Ảnh quá lớn (giới hạn 10 MB/ảnh).")
        payload = [(name, archive.read(name)) for name in files]
    if len({hashlib.sha256(data).hexdigest() for _,data in payload}) != 44:
        raise SystemExit("Có ảnh trùng hệt trong ZIP; cần rà soát trước khi nhập.")
    DEST.mkdir(parents=True, exist_ok=True)
    manifest = []
    for i, (source_name, data) in enumerate(payload, 1):
        new_name = f"{i:02d}.jpg"
        target = DEST / new_name
        target.write_bytes(data)  # nguyên gốc byte-for-byte
        manifest.append({"index": i, "name": new_name, "source": source_name,
                         "sha256": hashlib.sha256(data).hexdigest(), "bytes": len(data)})
    (ROOT / "data").mkdir(exist_ok=True)
    (ROOT / "data" / "anh-k28-manifest.json").write_text(
        json.dumps(manifest, ensure_ascii=False, indent=2) + "\n", encoding="utf-8"
    )
    old_dirs = [ROOT/"images"/"ky-niem-k28", ROOT/"images"/"ky-niem-k28-goc"]
    for old in old_dirs:
        if old.is_dir():
            shutil.rmtree(old)
    for stem in ("k28-lop-hoc","k28-tham-quan","k28-da-ngoai",
                 "k38-lop-hoc","k38-tham-quan","k38-da-ngoai"):
        old = ROOT / "images" / (stem + ".webp")
        if old.is_file(): old.unlink()
    print("OK: 44/44 ảnh gốc được lưu tại", DEST)
    print("Không chỉnh sửa dữ liệu ảnh, không áp dụng AI.")
    print("Tiếp theo: git add -A && git commit -m 'assets(K28): replace old photos with original 44 JPGs' && git push origin main")
if __name__ == "__main__":
    main()
