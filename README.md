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

Album công khai mang tên **Ảnh K28**, chỉ hiển thị **một khung ảnh**, điều hướng **Trước / Tiếp**, 10 nút chọn nhanh, vuốt ngang, phím mũi tên và mở ảnh lớn. Ảnh dùng `object-fit: contain` để không cắt khuôn mặt. Các ảnh nguồn gốc vẫn lưu trong repository phục vụ bảo quản tư liệu nhưng không còn nút chuyển chế độ hoặc các nhãn kỹ thuật hiển thị cho bạn học.

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


## Gói ảnh chính thức của người biên tập (05/11/2026)

**Đã đồng bộ lên GitHub đủ 20/20 WebP từ bộ ZIP** (10 ảnh chính trong `images/ky-niem-k28/` và 10 ảnh lưu trữ trong `images/ky-niem-k28-goc/`) tại commit `9d92eb371befd232c003327d0d0249584854acee`. Mã băm đối chiếu với nguồn gốc trùng khớp. Giao diện công khai chỉ hiển thị tên chung **Ảnh K28**; ảnh lưu trữ tiếp tục được giữ nguyên trong repository. Cổng kiểm tra `--strict` đã PASS ở commit đăng ảnh; rà soát nội dung và quyền công bố vẫn là công đoạn biên tập riêng.


## Album Ảnh K28 · Bộ 44 ảnh nguyên bản (06/11/2026)

Bộ album mới dùng **44 ảnh JPG gốc** từ `K28(1).zip`, hiển thị một khung ảnh, nút Trước/Tiếp, vuốt ngang, phím mũi tên, phóng lớn và băng phim chọn nhanh. Giao diện hoài cổ giấy ngà và sepia nhẹ **chỉ bằng CSS**, không sửa pixel hay dùng AI. Mọi dữ liệu ảnh gốc được giữ nguyên theo SHA-256.

Cần nhập 44 ảnh vào `images/anh-k28/` trên GitHub Pages bằng `python scripts/import_anh_k28.py "K28(1).zip"` ở bản clone repo, sau đó commit/push. Script xác thực số lượng và loại bỏ thư mục ảnh của bản cũ **sau khi nhập đủ 44 ảnh**. Nếu ảnh nhị phân chưa được đẩy lên GitHub, mã album hiển thị trạng thái đồng bộ và kiểm thử `--strict` chưa PASS; không giả định ảnh đã triển khai chỉ vì HTML/JS có mặt.
