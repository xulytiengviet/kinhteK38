# Kết nối tên miền PA Việt Nam → GitHub Pages · Kinh tế K38

> Dự án: https://github.com/xulytiengviet/kinhteK38 · mặc định: https://xulytiengviet.github.io/kinhteK38/

## 1. Bật GitHub Pages trước

- Mở: https://github.com/xulytiengviet/kinhteK38/settings/pages
- Mục **Build and deployment** → **Deploy from a branch** → chọn `main` và `/(root)` → **Save**.
- Kiểm tra trang gốc hoạt động. Nếu chưa hoạt động, xem phần báo lỗi tại **Actions** và trong Settings → Pages.

## 2. Chọn kiểu tên miền

**Khuyến nghị**: sử dụng subdomain riêng như `k38.example.vn`, không ảnh hưởng website đang chạy ở `example.vn`.

1. Vào **GitHub → Settings → Pages → Custom domain**.
2. Nhập tên miền đã sở hữu, ví dụ `k38.example.vn`, và chọn **Save**.
3. Chỉ sau đó tạo bản ghi DNS tại nơi đang quản lý DNS thực tế. GitHub khuyến nghị xác minh quyền sở hữu tên miền để giảm nguy cơ chiếm dụng.

**Lưu ý**: chưa có tên miền thực tế do người quản trị cung cấp; tài liệu này sử dụng `example.vn` làm ví dụ. Không tạo tệp CNAME trong repo cho một tên miền chưa xác định.

## 3. Thao tác tại PA Việt Nam

1. Đăng nhập https://access.pavietnam.vn/.
2. Vào **Tên miền** → chọn tên miền đang sở hữu → **Quản lý DNS**. Tên gọi menu có thể khác tùy giao diện.
3. Kiểm tra nameserver: nếu tên miền đang dùng DNS của Cloudflare, nhà cung cấp khác, v.v., **phải sửa record ở nhà cung cấp DNS đang hoạt động**, không phải mặc nhiên ở PA Việt Nam.
4. Chọn một trong các cấu hình dưới đây; **không trộn CNAME và A tại cùng một host**.

### Phương án A: subdomain `k38.example.vn` (khuyến nghị)

| Loại | Host/Tên | Value/Đích | TTL |
| --- | --- | --- | --- |
| CNAME | `k38` | `xulytiengviet.github.io` | `3600` hoặc mặc định |

Phần GitHub Custom domain: `k38.example.vn`.

**Không** nhập `https://`, `/kinhteK38/` hoặc `www` trong **Value**. GitHub Pages sẽ tự ánh xạ repo dựa trên cấu hình Custom domain.

### Phương án B: tên miền gốc `example.vn`

| Loại | Host | Giá trị |
| --- | --- | --- |
| A | `@` | `185.199.108.153` |
| A | `@` | `185.199.109.153` |
| A | `@` | `185.199.110.153` |
| A | `@` | `185.199.111.153` |
| CNAME | `www` | `xulytiengviet.github.io` |

Tùy chọn IPv6 cho host `@`: thêm AAAA `2606:50c0:8000::153`, `2606:50c0:8001::153`, `2606:50c0:8002::153`, `2606:50c0:8003::153`.

**Chú ý**: việc cấu hình tên miền gốc có thể thay đổi website hiện có; sao lưu và kiểm tra các bản ghi `A`/`AAAA` cũ trước khi sửa. Giữ nguyên các bản ghi email `MX`, `TXT` có liên quan; không dùng wildcard `*.` trỏ vào GitHub Pages.

## 4. Kiểm tra trên Windows 10/11

Mở PowerShell:

```powershell
Resolve-DnsName k38.example.vn -Type CNAME
Resolve-DnsName example.vn -Type A
nslookup -type=NS example.vn
```

Thay `example.vn` bằng tên miền thực tế. Với subdomain, kết quả CNAME cần trỏ tới `xulytiengviet.github.io`; với apex, A record cần trùng các IP chính thức ở trên.

Quay lại GitHub Pages, kiểm tra mục **DNS check**, chờ chứng chỉ cấp xong và bật **Enforce HTTPS**. DNS/chứng chỉ có thể mất đến 24 giờ.

## 5. Xử lý lỗi thường gặp

- **Không tìm được CNAME**: sai Host, thiếu record tại nơi đang làm DNS, hoặc DNS chưa đồng bộ.
- **404**: Pages chưa triển khai, Custom domain chưa được lưu, hoặc chưa có `index.html` ở thư mục xuất bản.
- **Certificate invalid / HTTPS unavailable**: loại bỏ record xung đột, đợi GitHub xác minh và cấp chứng chỉ.
- **Website hiện tại bị mất**: kiểm tra có sửa nhầm record apex `@` thay vì host `k38`.
- **Ảnh album không tải**: xác minh ba file ở `images/k38-lop-hoc.webp`, `images/k38-tham-quan.webp`, `images/k38-da-ngoai.webp`.

## Tài liệu chính thức

- GitHub Pages — Managing a custom domain: https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site
- GitHub Pages — Securing your site with HTTPS: https://docs.github.com/en/pages/getting-started-with-github-pages/securing-your-github-pages-site-with-https
- PA Việt Nam — https://www.pavietnam.vn/ · tài khoản quản trị: https://access.pavietnam.vn/

*Dành riêng cho Kinh tế K38 · ♡ Thầy Long Ngo gửi tặng Lớp.*
