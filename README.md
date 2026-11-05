# Kinh tế K38 · Bản đồ ký ức 2007–2011

Một trang **WebGIS kỷ niệm** cho lớp Kinh tế K38, gợi lại những miền quê, gương mặt và kỷ niệm thời sinh viên, trình bày bằng phong cách giấy cũ – nâu trầm – đỏ rượu – vàng đồng.

**Website (sau khi bật GitHub Pages):** https://xulytiengviet.github.io/kinhteK38/

## Tính năng

- 33 hồ sơ được chép từ file `K38.docx` do người biên tập cung cấp: họ tên, MSSV, năm sinh, nơi sinh cũ và địa danh được ghi sau sáp nhập năm 2025.
- 19 miền quê đặt điểm đại diện trên bản đồ (32 hồ sơ); ô tìm kiếm theo họ tên, MSSV hoặc địa danh; lọc theo tỉnh/thành hiện nay.
- Rê chuột lên điểm bản đồ để mở popup bạn học; nhấn hồ sơ để phóng đến điểm tương ứng. Mỗi popup hiển thị họ tên, MSSV, năm sinh, địa danh cũ và hiện nay.
- 3 nền địa lý: **Địa hình (Esri World Topographic)**, **Vệ tinh (Esri World Imagery)** và **Đường phố (OpenStreetMap)**. Nền vệ tinh và mô hình sử dụng Leaflet/Vietflexmap dựa vào cách tổ chức của [ClipMap](https://github.com/xulytiengviet/clipmap).
- Nút **Ranh giới hiện nay** tải theo nhu cầu chỉ mục `index.json` và GeoJSON chia theo tỉnh từ public Cloudflare R2 được giới thiệu ở ClipMap. Nút này có thể không hoạt động nếu dữ liệu, CORS hoặc endpoint chưa sẵn sàng; phần còn lại của website vẫn dùng được.
- Liên kết sang [ẢnhMap](https://vietflexmap.github.io/anhmap/) để tìm địa danh / xem nền và ranh giới mới; không khẳng định có API tự động đồng bộ với ẢnhMap.
- Xuất GeoJSON WGS84 các điểm **đại diện cấp tỉnh**, không phải tọa độ nơi sinh cá nhân; không xuất hồ sơ thiếu vị trí.
- Dòng thời gian 2007–2011, album ảnh chọn trên máy (không upload), và lưu bút `localStorage` chỉ trong trình duyệt của người xem.

## Nguồn dữ liệu và giới hạn địa lý

Nguồn hồ sơ: bảng "DANH SÁCH SINH VIÊN KT-K38" trong file Word `K38.docx`, 33 dòng.

- **32/33** hồ sơ được hiển thị tại **19 điểm tham khảo theo địa danh cũ**; tất cả các điểm đều gần một đô thị tiêu biểu trong địa phương tương ứng, *không phải tọa độ nơi sinh chính xác hoặc trọng tâm ranh giới*.
- Hồ sơ **0768080** có nơi sinh lịch sử **Sông Bé** và cột hiện nay **Chưa xác định**. Không tự suy luận vị trí hay tỉnh hiện nay; cần bổ sung huyện/xã lịch sử để đối chiếu.
- Dòng có MSSV **0768219** mang **STT 39** trong Word dù nằm ở vị trí thứ 29. Website giữ nguyên giá trị nguồn; nên xác minh với danh sách lớp trước khi sửa.
- Dữ liệu tỉnh sau sáp nhập được **sao đúng nội dung Word**; website không phải công cụ xác minh pháp lý từng địa giới. Để dùng cho nghiên cứu, xác minh với hồ sơ hành chính chính thức.
- Kết quả xuất GeoJSON chỉ chứa điểm định vị tham khảo, không chứa polygon hành chính; tùy chọn polygon cần tải thêm dữ liệu R2 công khai.

## Triển khai GitHub Pages

Repository dùng **một tệp `index.html` tĩnh**, không cần backend hoặc build. Để bật website lần đầu:

1. Mở **Settings → Pages** của repository.
2. Trong **Build and deployment**, chọn **Deploy from a branch**.
3. Chọn branch `main`, thư mục `/(root)`, nhấn **Save**.
4. Mở https://xulytiengviet.github.io/kinhteK38/ sau khi GitHub báo Pages đã triển khai.

## Quyền riêng tư và đồng thuận

Trang chứa **họ tên, MSSV, năm sinh, nơi sinh của các cá nhân có thật** từ hồ sơ K38. Người quản trị cần có căn cứ phù hợp để công bố; nên thông báo cho các cựu sinh viên, cung cấp kênh yêu cầu sửa/gỡ dữ liệu, cân nhắc chế độ chỉ xem trong nhóm nếu chưa có đồng thuận. Không nên bổ sung điện thoại, địa chỉ cư trú, ảnh cá nhân hoặc thông tin nhạy cảm mà không được phép. Album ảnh người dùng chọn chỉ xem tại phiên trình duyệt; lưu bút không truyền lên server, không thể hiển thị liên thiết bị.

## Nguồn công nghệ & bản đồ

- [ẢnhMap – Vietflexmap](https://github.com/Vietflexmap/anhmap) (MIT cho mã nguồn phần mềm; dữ liệu và nhà cung cấp tile có quy định riêng).
- [ClipMap – xulytiengviet](https://github.com/xulytiengviet/clipmap), Leaflet, Vietflexmap 1.0.2.
- © Esri, Maxar, Earthstar Geographics (theo attribution của ảnh nền tương ứng).
- © OpenStreetMap contributors (dữ liệu lớp đường phố).
- Dữ liệu bản đồ và ranh giới không có giá trị pháp lý. Cần Internet cho tile nền, thư viện và lớp ranh giới.

Trang thiết kế phục vụ mục đích giáo dục, lưu giữ ký ức, không nhằm thương mại hóa thông tin cá nhân.
