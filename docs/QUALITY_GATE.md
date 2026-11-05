# K28 — Cổng chất lượng và điều kiện nghiệm thu

**Nguyên tắc:** mục tiêu UX 7–10/10 chỉ được coi là đạt khi kết quả kiểm thử phù hợp. Không tự gắn nhãn FULL PASS chỉ vì code đã được đẩy lên GitHub.

## QA Core (tự động)
- JavaScript hợp lệ và các phần tử HTML mà album cần đều có thật.
- Dữ liệu HTML và CSV thống nhất: 33 thành viên, 24 người có nơi ở hiện tại được xác định.
- Hồ sơ MSSV 0768219 ở STT 29, không thay đổi danh sách.
- Lọc theo đúng chế độ quê quán / nơi ở hiện tại.
- GeoJSON xuất mặc định không chứa MSSV, năm sinh hoặc tên riêng.
- Đường dẫn và cấu trúc điều hướng phù hợp; CSS có tệp tồn tại.

Chạy: node scripts/audit-k28.mjs

## Cổng lưu trữ ảnh (tự động, bắt buộc để FULL PASS)
Tải đầy đủ 20 ảnh hợp lệ:
- 10 ảnh xử lý: images/ky-niem-k28/01.webp ... 10.webp
- 10 ảnh gốc: images/ky-niem-k28-goc/01.webp ... 10.webp

Chạy: node scripts/audit-k28.mjs --strict

Nếu còn thiếu, kết quả strict **FAIL có chủ đích**. Album tự động ẩn ảnh không tồn tại và hiển thị 3 tấm dự phòng để không có ảnh hỏng, nhưng đó **không phải bộ ảnh đã nghiệm thu**.

## QA thủ công (bắt buộc để đạt 9–10/10)
1. Kiểm tra nội dung ảnh, nhân vật, bối cảnh với người biên tập; không dùng AI tạo sai khuôn mặt.
2. Dùng Chrome Android, Safari iPhone, Chrome/Firefox desktop: điều hướng, album, ảnh gốc/AI, modal, phím mũi tên, các chế độ bản đồ.
3. Kiểm tra tốc độ tải, tiêu chí Core Web Vitals, aria-label, màu sắc và tương phản.
4. Thử YouTube phát được hoặc mở qua liên kết trực tiếp.
5. Thử chia sẻ từ điện thoại và sao lưu lưu bút từ máy tính.
6. Cơ chế xin ý kiến, sửa/gỡ dữ liệu của các thành viên phải được thiết lập trước khi công bố dữ liệu cá nhân nhạy cảm.
7. Lưu bút chung **chưa có backend**: chức năng cục bộ không được mô tả như lời nhắn công khai.
8. Biên tập xác nhận các mốc 2007–2011 và sự kiện gắn với ảnh.
9. Khi có ảnh bìa thật đã được đồng ý công bố, bổ sung ảnh chia sẻ Open Graph.

## Phân loại
- CORE PASS: code/dữ liệu qua kiểm thử tự động, chưa đảm bảo ảnh hay trải nghiệm thực tế.
- CONTENT BLOCKED: thiếu ảnh chính hoặc nội dung chưa được xác nhận.
- FULL PASS: CORE PASS + đủ 20 ảnh hợp lệ + QA thủ công hoàn tất + quyền công bố rõ ràng.

**Ngày cập nhật:** 05/11/2026. Trạng thái ban đầu: CONTENT BLOCKED — chưa có bộ 20 ảnh chính thức và backend lưu bút chung.
