# Kinh tế K28 · Thanh xuân của chúng mình

**Website:** https://www.kt28.io.vn/ · **Niên khóa:** 2007–2011  
**Lời tặng:** ♡ Thầy Long Ngo gửi tặng Lớp Kinh tế K28.

Đây là kỷ yếu WebGIS dành cho những người bạn Kinh tế K28. Website gồm trang đầu, dòng thời gian, **Ảnh K28**, bản đồ bạn bè, video YouTube, lưu bút và lời gửi cuối.

## Ảnh K28: 44 tấm nguyên bản · phong cách hoài cổ

Album dùng **44 ảnh JPG gốc**, giữ nguyên pixel, không xử lý AI. Các hiệu ứng ảnh rửa, khung giấy cũ, tông ấm/sepia nhẹ được áp dụng chỉ bằng **CSS** để có cảm giác cuối thập niên 1980 – đầu 1990.

Chức năng: một khung ảnh, nút Trước/Tiếp, vuốt ngang, phím mũi tên khi album được chọn, băng phim đánh số 01–44 và phóng lớn. Ảnh dùng `object-fit: contain`, không cắt khuôn mặt.

### Nhập ZIP chính thức vào repository

Lưu file đã cung cấp `K28(1).zip` vào thư mục gốc của bản clone repository, sau đó chạy:

```bash
python scripts/import_anh_k28.py "K28(1).zip"
node scripts/audit-k28.mjs --strict
git add -A
git commit -m "assets(K28): publish 44 original K28 photos"
git push origin main
```

Script kiểm tra đủ 44 tệp, bản sao nguyên byte và trùng lặp, tạo `data/anh-k28-manifest.json` (SHA-256 từng ảnh), đưa ảnh vào `images/anh-k28/01.jpg` đến `44.jpg`. Chỉ khi đó script mới dọn thư mục ảnh của các phiên bản trước. Ảnh nằm trong ZIP **chưa được coi là đã triển khai** nếu các tệp JPG chưa có trên GitHub.

**Lưu ý:** GitHub không tự đọc tệp ZIP đính kèm trong ChatGPT. Cần thực hiện bước import/push phía trên từ máy đã đăng nhập GitHub. Không đưa ZIP gốc vào Git commit nếu chỉ cần lưu các ảnh đã giải nén.

## WebGIS, dữ liệu và âm nhạc
- **Danh sách:** 33 bạn học; 24 bạn có nơi ở hiện tại đã xác định.
- **Hồ sơ:** STT 29 tương ứng MSSV 0768219; danh sách nguồn được lưu trong `data/roster-k28.csv`.
- **Bản đồ:** chuyển quê quán / nơi ở hiện tại; các điểm là tâm địa danh đại diện, không phải vị trí nhà riêng.
- **Ranh giới địa giới 2025:** dữ liệu cộng đồng, chỉ tham khảo.
- **Video:** https://www.youtube.com/watch?v=Q6IrWD7cFUI, chủ động chạm để phát.
- **Lưu bút:** lưu cục bộ ở trình duyệt, hỗ trợ xuất JSON, chưa có backend lưu bút chung.

## Kiểm định
- `node scripts/audit-k28.mjs`: CORE QA (HTML/JS, bản đồ, dữ liệu).
- `node scripts/audit-k28.mjs --strict`: FULL IMAGE QA (44 ảnh JPG phải tồn tại).
- `docs/QUALITY_GATE.md`: quy trình nghiệm thu.
- `.github/workflows/quality-gate.yml`: GitHub Actions.

Trạng thái FULL PASS chỉ đạt khi mã nguồn, 44 tệp ảnh gốc trên GitHub Pages và kiểm thử thực tế đều đã được xác nhận. Việc công bố dữ liệu cá nhân và ảnh lưu niệm cần có quyền phù hợp.
