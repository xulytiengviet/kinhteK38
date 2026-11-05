# Kinh tế K28 · Bản đồ bạn bè và Album thanh xuân

**Website:** https://www.kt28.io.vn/  
**Repository:** https://github.com/xulytiengviet/kinhteK38/  
**Lời tặng:** ♡ Thầy Long Ngo gửi tặng Lớp Kinh tế K28.

## Dữ liệu K28

Danh sách 33 sinh viên từ bảng cập nhật ngày 05/11/2026, gồm STT, MSSV, họ tên, năm sinh, quê quán và nơi ở hiện tại. STT 29 là **0768219 – Hoàng Thị Vân**. Xem [data/roster-k28.csv](data/roster-k28.csv).

WebGIS mặc định hiển thị nơi ở hiện tại, cho phép chuyển về quê quán, lọc và tìm kiếm, đặt điểm đại diện vùng và hiển thị ranh giới 34 tỉnh/thành sau sắp xếp 2025 (nguồn GeoJSON [ThangLeQuoc/vietnamese-provinces-database](https://github.com/ThangLeQuoc/vietnamese-provinces-database)). Trường hợp chưa xác định không bị gán điểm giả; Nhật Bản dùng điểm quy ước cấp quốc gia. Không công bố vị trí nhà riêng.

## Album ảnh K28 – không dùng ba ảnh cũ

Album `#anhxua` có **10 ảnh** được chia thành ba nhóm, với đủ các nhãn kỷ niệm:

- **Lớp học thân quen:** 01, 03, 04, 05, 06 – khoảnh khắc tốt nghiệp, lớp học và bạn bè.
- **Chuyến tham quan K28 – Chuyến đi cùng nhau:** 02, 08, 09, 10 – những chuyến tham quan.
- **Kỷ niệm dã ngoại K28 – Một ngày dã ngoại:** 07 – khoảnh khắc Lang Biang.

Ảnh được tải theo thứ tự, tối ưu di động (mỗi hàng một ảnh trên màn hình nhỏ), giữ đủ khung hình bằng `object-fit: contain`, phóng lớn trong lightbox, điều khiển bằng bàn phím hoặc vuốt. Có thể chọn **Ảnh phục dựng rõ nét** và **Ảnh gốc**. Bản AI có thể làm thay đổi một số chi tiết khuôn mặt/cảnh vật, không nên xem là tư liệu lịch sử nguyên trạng.

**Ba ảnh cũ và các bản sao K38 tương ứng đã được gỡ khỏi repository và không còn được dùng làm dự phòng.**

### Đưa ảnh mới vào GitHub

Gói **`K28_Album_GitHub.zip`** có 20 tệp WebP. Giải nén rồi tải nguyên cấu trúc hai thư mục sau vào nhánh `main`:

- `images/ky-niem-k28/01.webp` đến `10.webp` (phục dựng rõ nét);
- `images/ky-niem-k28-goc/01.webp` đến `10.webp` (ảnh gốc).

Có thể dùng `DONG_BO_ALBUM_K28.ps1` trong gói để sao chép ảnh vào clone Git, commit và push sau khi đăng nhập GitHub trên máy Windows. Khi các tệp chưa được tải lên, giao diện vẫn giữ đủ 10 vị trí ảnh với thông báo **Đang đồng bộ ảnh**, không quay lại ảnh cũ.

## YouTube và âm nhạc

Mục `#k28Cinema` nhúng video: https://www.youtube.com/watch?v=Q6IrWD7cFUI. Người dùng nhấn **Xem YouTube & bật nhạc** để tải trình phát YouTube, tương thích chính sách phát có âm thanh trên di động. Nếu YouTube chặn tự phát hoặc nhúng, người dùng nhấn Play trong video hay mở trực tiếp YouTube. Không sao chép nhạc thương mại lên repository.

## GitHub Pages

Dùng `main` và `/(root)`; `CNAME` là `www.kt28.io.vn`. Xem [hướng dẫn DNS PA Việt Nam](HUONG_DAN_TEN_MIEN_PA_VIET_NAM.md). Đổi tên repository `kinhteK38` sang `kinhteK28` thủ công tại Settings → General nếu muốn đồng bộ URL GitHub.

## Quyền riêng tư

Dữ liệu thành viên và ảnh lớp có người thật; cần bảo đảm quyền công bố và tiếp nhận yêu cầu chỉnh sửa/gỡ bỏ từ thành viên.

© 2026 · Kinh tế K28 · ♡ Thầy Long Ngo gửi tặng Lớp.
