# Kinh tế K28 · Thanh xuân của chúng mình

- Website: https://www.kt28.io.vn/
- Mã nguồn: https://github.com/xulytiengviet/kinhteK38
- Niên khóa: 2007–2011
- Lời tặng: ♡ Thầy Long Ngo gửi tặng Lớp Kinh tế K28.
- Giấy phép: kiểm tra LICENSE trước khi tái sử dụng nội dung và hình ảnh; tác quyền ảnh, video của chủ sở hữu tương ứng.

## Trải nghiệm
Trang đầu cảm xúc → Chuyện chúng mình → Dòng thời gian 2007–2011 → Album ảnh → Bản đồ bạn bè → YouTube & nhạc → Lưu bút cá nhân → Lời gửi cuối.

Lưu ý: Không biến kỷ niệm gợi nhớ thành các sự kiện lịch sử được khẳng định khi chưa có xác nhận của lớp.

## Dữ liệu chuẩn
- Có 33 thành viên, lưu chính tại data/roster-k28.csv và một bảng nhúng trong index.html.
- Đúng 24/33 thành viên có nơi ở hiện tại đã xác định, 9 người chưa xác định.
- MSSV 0768219 mang STT 29.
- Trên bản đồ có thể chọn nơi ở hiện tại hoặc quê quán; lọc và thống kê phải đổi đồng bộ.
- Điểm trên bản đồ là tâm đại diện địa danh, không phải GPS nhà riêng.
- Xuất GeoJSON mặc định không chứa MSSV hoặc năm sinh. Hồ sơ gốc vẫn ở repository công khai; người quản trị chịu trách nhiệm xin phép và xử lý yêu cầu sửa/gỡ.
- Ranh giới 34 tỉnh/thành năm 2025 dùng dữ liệu cộng đồng từ https://github.com/ThangLeQuoc/vietnamese-provinces-database, chỉ để tham khảo.

## Album ảnh
Module: album-k28.js và album-k28.css. HTML phải có albumK28Groups, albumK28Message, các nút chuyển chế độ, dialog cùng các phần tử của nó.

Có hai bộ ảnh dự kiến:
- images/ky-niem-k28/01.webp đến 10.webp: ảnh xử lý làm rõ
- images/ky-niem-k28-goc/01.webp đến 10.webp: ảnh tư liệu gốc

Trình duyệt kiểm tra từng ảnh có thực trước khi hiển thị. Khi chưa có bộ chính, website chỉ hiển thị 3 hình hiện có trong thư mục images/ và ghi rõ là ảnh dự phòng. Không coi đó là album 10 ảnh đã hoàn thành.

Ảnh làm rõ bằng AI cần đối chiếu bản gốc trước khi khẳng định nhân vật, địa điểm và thời gian.

## Video và lưu bút
- Video được nhúng từ YouTube: https://www.youtube.com/watch?v=Q6IrWD7cFUI. Người xem chủ động phát; có liên kết mở YouTube khi không thể nhúng.
- Lưu bút hiện chỉ lưu ở trình duyệt người dùng (localStorage), có chức năng sao lưu JSON; **chưa chia sẻ chung giữa các thành viên**.
- Nút chia sẻ cho phép mở trình chia sẻ trên thiết bị hỗ trợ hoặc sao chép đường dẫn.

## Triển khai
GitHub Pages: nhánh main, thư mục gốc. Tệp CNAME giữ www.kt28.io.vn; hướng dẫn DNS PA Việt Nam tại HUONG_DAN_TEN_MIEN_PA_VIET_NAM.md.

## Kiểm định
- node scripts/audit-k28.mjs: kiểm tra Core.
- node scripts/audit-k28.mjs --strict: kiểm tra đầy đủ 20 ảnh.
- CI: .github/workflows/quality-gate.yml
- Điều kiện nghiệm thu và phân loại PASS: docs/QUALITY_GATE.md

**Chưa FULL PASS** cho đến khi cung cấp 20 tệp ảnh đúng, rà soát tư liệu, quyền công bố và kiểm thử thực tế trên thiết bị.
