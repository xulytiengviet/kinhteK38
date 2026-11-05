# Kinh tế K28 · Bản đồ bạn bè hôm nay

**Website:** https://www.kt28.io.vn/  
**Repository:** https://github.com/xulytiengviet/kinhteK38/  
**Lời tặng:** ♡ Thầy Long Ngo gửi tặng Lớp Kinh tế K28.

## Danh sách cập nhật 05/11/2026

Đã thay thế toàn bộ dữ liệu của 33 sinh viên dựa trên bảng mới do người quản trị cung cấp: STT, MSSV, họ tên, năm sinh, **quê quán** và **nơi ở hiện tại**. Hồ sơ **0768219** có STT **29**. Dữ liệu gốc đồng bộ: [data/roster-k28.csv](data/roster-k28.csv).

## Tính năng WebGIS

- Mặc định xem **nơi ở hiện tại**, có bộ chọn chuyển sang **quê quán**.
- Điểm nhóm theo tỉnh/thành; bấm vào người bạn để xem hồ sơ và chuyển tới điểm đại diện vùng.
- Mặc định tải ranh giới hiện hành của các tỉnh/thành có người ở; nút **Nạp đủ 34 tỉnh/thành** tải toàn bộ ranh giới sau sắp xếp năm 2025.
- Nhấn người bạn sẽ làm nổi ranh giới nơi ở hiện tại nếu có dữ liệu địa lý.
- **Chưa xác định** vẫn nằm trong danh sách, không tự gắn vị trí.
- **Nhật Bản** chỉ đặt điểm quy ước cấp quốc gia, không suy đoán nơi sinh sống.
- Lưu bút nội bộ trình duyệt, album ba ảnh kỷ niệm, xuất điểm tham khảo GeoJSON.

## Ranh giới hành chính

Dữ liệu GeoJSON 34 tỉnh/thành tải trực tiếp từ dự án [ThangLeQuoc/vietnamese-provinces-database](https://github.com/ThangLeQuoc/vietnamese-provinces-database), thư mục `json/geojson` trên GitHub Raw; không yêu cầu API key hoặc backend. Nếu nguồn ngoài tạm thời không truy cập được, bản đồ nền và dữ liệu danh sách vẫn hoạt động. Ranh giới cộng đồng mang tính minh họa, cần kiểm tra tài liệu pháp lý nếu sử dụng cho mục đích hành chính.

Nguồn thông tin chính phủ về địa giới 2025: https://baochinhphu.vn/tra-cuu-dia-gioi-sau-sap-nhap-qua-ban-do-dien-tu-102250708175104468.htm.

Các điểm bản đồ là **điểm đại diện tỉnh/thành hoặc quốc gia**, không phải địa chỉ nhà riêng hay vị trí GPS được người học cung cấp.

## Triển khai

GitHub Pages: `main` + `/(root)`; tệp `CNAME` giữ `www.kt28.io.vn`. Xem [hướng dẫn PA Việt Nam](HUONG_DAN_TEN_MIEN_PA_VIET_NAM.md). Đổi tên repository GitHub `kinhteK38` → `kinhteK28` thủ công tại Settings → General nếu muốn nhất quán đường dẫn.

## Quyền công bố

Dữ liệu gồm MSSV, năm sinh, họ tên và nơi ở cấp tỉnh/thành hoặc quốc gia của người thật. Người quản trị cần bảo đảm căn cứ công bố và tiếp nhận yêu cầu sửa/gỡ nếu thành viên không muốn hiển thị.

© 2026 · Kinh tế K28 · ♡ Thầy Long Ngo gửi tặng Lớp.
