# K28 — Cổng chất lượng và điều kiện nghiệm thu

Website: https://www.kt28.io.vn/ · Nguồn: xulytiengviet/kinhteK38

## CORE PASS
- HTML/JavaScript hợp lệ; `albumK28Viewer`, ảnh, khung lớn, điều hướng và trạng thái đều có DOM ID đúng.
- Danh sách 33 bạn học và bảng CSV khớp; hồ sơ STT 29/MSSV 0768219 được giữ nguyên.
- Đếm đúng 24/33 bạn có nơi ở xác định; WebGIS lọc theo nơi ở hiện tại hoặc quê quán.
- Xuất GeoJSON không kèm MSSV/năm sinh.
- Album hiển thị **một ảnh một lần**, có nút Trước/Tiếp, vuốt ngang, phím mũi tên khi đang xem và băng phim 44 ảnh.
- Chỉ dùng nhãn **Ảnh K28**; không dùng lại giao diện ảnh xử lý AI.

Chạy: `node scripts/audit-k28.mjs`.

## FULL CONTENT PASS (44 ảnh đã đồng bộ từ ZIP chính thức)
- Bộ `K28(1).zip` gồm **44 ảnh JPG gốc, không trùng byte**, do người biên tập cung cấp.
- Import đúng `images/anh-k28/01.jpg` ... `44.jpg` bằng `python scripts/import_anh_k28.py "K28(1).zip"`.
- Dữ liệu ảnh được sao chép nguyên byte; hiệu ứng màu giấy cũ/sepia/chụp ảnh polaroid **chỉ dùng CSS**, không AI.
- Hai thư mục ảnh WebP cũ được xóa trong cùng commit công bố 44 ảnh JPG mới.
- Chạy `node scripts/audit-k28.mjs --strict`; chỉ đạt khi 44/44 ảnh tồn tại trong repository và đã được push lên nhánh `main`.

## QA thủ công
- Xem đủ 44 ảnh trên trang live, không có ảnh hỏng và không cắt gương mặt.
- Thử Trước/Tiếp, băng phim, phím mũi tên, vuốt trên Android/iPhone và mở ảnh lớn.
- Kiểm tra kết nối WebGIS, video YouTube, danh sách bạn học, lưu bút cục bộ và xuất dữ liệu.
- Kiểm tra hiệu năng tải ảnh, Core Web Vitals và quyền công bố tư liệu ảnh/tên bạn học.
- Kiểm tra GitHub Pages deploy **SUCCESS** sau khi đã upload ảnh.

**Phân loại:** `CORE PASS` là kiểm thử code; `FULL PASS` yêu cầu đủ 44 ảnh trong GitHub và xác nhận các kiểm thử thiết bị thực tế. Không gắn nhãn FULL PASS nếu chỉ có HTML/JS.
