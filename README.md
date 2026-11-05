# Kinh tế K28 · Bản đồ ký ức 2007–2011

Một trang **WebGIS kỷ niệm** cho lớp Kinh tế K28, gợi lại những miền quê, gương mặt và kỷ niệm thời sinh viên, trình bày bằng phong cách giấy cũ – nâu trầm – đỏ rượu – vàng đồng.

**Tên miền tùy chỉnh:** https://www.kt28.io.vn/  
**Repository hiện tại:** https://github.com/xulytiengviet/kinhteK38 (sau khi người quản trị đổi tên repository trong Settings → General, sẽ là `kinhteK28`).

## Tính năng

- 33 hồ sơ sinh viên K28 với họ tên, MSSV, năm sinh, nơi sinh cũ và địa danh tham chiếu sau sáp nhập năm 2025.
- 20 miền quê đặt điểm đại diện trên bản đồ (33 hồ sơ); ô tìm kiếm theo họ tên, MSSV hoặc địa danh; lọc theo tỉnh/thành hiện nay.
- Rê chuột lên điểm bản đồ để mở popup bạn học; nhấn hồ sơ để phóng đến điểm tương ứng. Mỗi popup hiển thị họ tên, MSSV, năm sinh, địa danh cũ và hiện nay.
- 3 nền địa lý: **Địa hình (Esri World Topographic)**, **Vệ tinh (Esri World Imagery)** và **Đường phố (OpenStreetMap)**. Nền vệ tinh và mô hình sử dụng Leaflet/Vietflexmap dựa vào cách tổ chức của [ClipMap](https://github.com/xulytiengviet/clipmap).
- Nút **Ranh giới hiện nay** tải theo nhu cầu chỉ mục `index.json` và GeoJSON chia theo tỉnh từ public Cloudflare R2 được giới thiệu ở ClipMap. Nút này có thể không hoạt động nếu dữ liệu, CORS hoặc endpoint chưa sẵn sàng; phần còn lại của website vẫn dùng được.
- Liên kết sang [ẢnhMap](https://vietflexmap.github.io/anhmap/) để tìm địa danh / xem nền và ranh giới mới; không khẳng định có API tự động đồng bộ với ẢnhMap.
- Xuất GeoJSON WGS84 các điểm **đại diện cấp tỉnh**, không phải tọa độ nơi sinh cá nhân; không xuất hồ sơ thiếu vị trí.
- Dòng thời gian 2007–2011, album ảnh chọn trên máy (không upload), và lưu bút `localStorage` chỉ trong trình duyệt của người xem.

## Nguồn dữ liệu và giới hạn địa lý

Nguồn hồ sơ: bảng "DANH SÁCH SINH VIÊN KT-K38" trong file Word `K38.docx`, 33 dòng. **Tên tài liệu gốc được giữ để truy xuất nguồn**; việc đổi tên giao diện sang K28 không thay đổi hoặc tự xác minh dữ liệu sinh viên.

- **33/33** hồ sơ được hiển thị tại **20 điểm tham khảo theo địa danh cũ**; tất cả các điểm đều gần một đô thị tiêu biểu trong địa phương tương ứng, *không phải tọa độ nơi sinh chính xác hoặc trọng tâm ranh giới*.
- Hồ sơ **0768080** có nơi sinh cũ **Sông Bé** và được lớp cung cấp địa danh hiện nay là **Thành phố Hồ Chí Minh**. Bản đồ dùng điểm minh họa tại Thủ Dầu Một (vùng Sông Bé cũ), **không khẳng định đó là nơi sinh chính xác**. Về lịch sử, tỉnh Sông Bé còn bao gồm khu vực Bình Phước, nay thuộc Đồng Nai; muốn xác định chuẩn cần thêm huyện/xã nơi sinh.
- Dòng MSSV **0768219 – Hoàng Thị Vân** được chuẩn hóa **STT 29** theo hiệu đính của lớp (bản Word ban đầu ghi STT 39).
- Dữ liệu tỉnh sau sáp nhập được **sao đúng nội dung Word**; website không phải công cụ xác minh pháp lý từng địa giới. Để dùng cho nghiên cứu, xác minh với hồ sơ hành chính chính thức.
- Kết quả xuất GeoJSON chỉ chứa điểm định vị tham khảo, không chứa polygon hành chính; tùy chọn polygon cần tải thêm dữ liệu R2 công khai.

## Ba ảnh kỷ niệm

Website dùng ba ảnh thật do người biên tập cung cấp: `images/k28-lop-hoc.webp`, `images/k28-tham-quan.webp`, `images/k28-da-ngoai.webp`. Đây là các bản WebP nhẹ để website tải nhanh. Có thể thay bằng bản WebP chất lượng cao với **cùng tên tệp** mà không phải sửa HTML.

Lời tặng hiển thị ở chân trang: **♡ Thầy Long Ngo gửi tặng Lớp Kinh tế K28.**

## Kết nối tên miền PA Việt Nam

Xem [`HUONG_DAN_TEN_MIEN_PA_VIET_NAM.md`](./HUONG_DAN_TEN_MIEN_PA_VIET_NAM.md) để cấu hình CNAME/A record, kích hoạt HTTPS và kiểm tra DNS trên Windows.


## Triển khai GitHub Pages

Repository dùng **một tệp `index.html` tĩnh**, không cần backend hoặc build. Để bật website lần đầu:

1. Mở **Settings → Pages** của repository.
2. Trong **Build and deployment**, chọn **Deploy from a branch**.
3. Chọn branch `main`, thư mục `/(root)`, nhấn **Save**.
4. Mở https://www.kt28.io.vn/ khi GitHub Pages đã triển khai và DNS/HTTPS xác thực thành công. Đường dẫn fallback của repository hiện tại là `https://xulytiengviet.github.io/kinhteK38/` (có thể tự chuyển hướng về tên miền tùy chỉnh).

## Quyền riêng tư và đồng thuận

Trang chứa **họ tên, MSSV, năm sinh, nơi sinh của các cá nhân có thật** từ hồ sơ K28. Người quản trị cần có căn cứ phù hợp để công bố; nên thông báo cho các cựu sinh viên, cung cấp kênh yêu cầu sửa/gỡ dữ liệu, cân nhắc chế độ chỉ xem trong nhóm nếu chưa có đồng thuận. Không nên bổ sung điện thoại, địa chỉ cư trú, ảnh cá nhân hoặc thông tin nhạy cảm mà không được phép. Album ảnh người dùng chọn chỉ xem tại phiên trình duyệt; lưu bút không truyền lên server, không thể hiển thị liên thiết bị.

## Nguồn công nghệ & bản đồ

- [ẢnhMap – Vietflexmap](https://github.com/Vietflexmap/anhmap) (MIT cho mã nguồn phần mềm; dữ liệu và nhà cung cấp tile có quy định riêng).
- [ClipMap – xulytiengviet](https://github.com/xulytiengviet/clipmap), Leaflet, Vietflexmap 1.0.2.
- © Esri, Maxar, Earthstar Geographics (theo attribution của ảnh nền tương ứng).
- © OpenStreetMap contributors (dữ liệu lớp đường phố).
- Dữ liệu bản đồ và ranh giới không có giá trị pháp lý. Cần Internet cho tile nền, thư viện và lớp ranh giới.

Trang thiết kế phục vụ mục đích giáo dục, lưu giữ ký ức, không nhằm thương mại hóa thông tin cá nhân.

## Đồng bộ tên repository GitHub

Nhãn hiển thị của website, tài liệu, ảnh và GeoJSON đã đổi sang **Kinh tế K28**. Để đổi **đường dẫn GitHub** cho trùng tên, người quản trị vào **Settings → General → Repository name**, đổi `kinhteK38` thành `kinhteK28`. Bước đổi tên repository không thể thực hiện qua công cụ chỉnh sửa tệp. Sau khi đổi, cập nhật những đường dẫn `/kinhteK38/` còn ở README/hướng dẫn sang `/kinhteK28/`; giữ nguyên tệp `CNAME` là `www.kt28.io.vn`.
