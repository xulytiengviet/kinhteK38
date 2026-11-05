# Cấu hình tên miền kt28.io.vn · Kinh tế K28

Trang kỷ niệm **Kinh tế K28** được cấu hình tên miền tùy chỉnh **`www.kt28.io.vn`** qua GitHub Pages.

- Repository hiện tại: https://github.com/xulytiengviet/kinhteK38
- GitHub Pages: https://github.com/xulytiengviet/kinhteK38/settings/pages
- Website dự kiến: https://www.kt28.io.vn/
- Tệp `CNAME` trong nhánh `main`: **`www.kt28.io.vn`** (không có `http://`, `https://`, `/`, hoặc dấu `\`).

> Nếu repository sau này đổi tên từ `kinhteK38` thành `kinhteK28`, hãy cập nhật các liên kết GitHub trong tài liệu. Tên miền tùy chỉnh không cần đổi.

## 1. GitHub Pages

1. Vào **Settings → Pages** của repository.
2. Chọn **Deploy from a branch** → nhánh `main` → thư mục `/(root)`.
3. **Custom domain:** nhập chính xác `www.kt28.io.vn` → **Save**.
4. Chọn **Check again** sau khi DNS phân giải đúng.
5. Khi chứng chỉ đã được cấp, bật **Enforce HTTPS**.

## 2. DNS tại PA Việt Nam (vùng `kt28.io.vn`)

**Chỉ sửa ở nhà cung cấp DNS thực sự được Nameserver công khai ủy quyền.** Nếu DNS của tên miền trỏ sang Cloudflare hay nhà cung cấp khác, việc sửa bản ghi ở PA Việt Nam có thể không có hiệu lực.

| Host | Loại | Giá trị | TTL |
|---|---|---|---|
| `@` | A | `185.199.108.153` | `3600` |
| `@` | A | `185.199.109.153` | `3600` |
| `@` | A | `185.199.110.153` | `3600` |
| `@` | A | `185.199.111.153` | `3600` |
| `www` | CNAME | `xulytiengviet.github.io` | `3600` |

Không tạo CNAME `www` chung với A/AAAA khác tại cùng host; không dùng `k38` hoặc `kt28` làm host CNAME nếu mục đích là `www.kt28.io.vn`. Không thay đổi MX/TXT phục vụ email nếu có.

## 3. Kiểm tra trực tiếp trên Windows PowerShell

```powershell
Resolve-DnsName kt28.io.vn -Type NS -Server 8.8.8.8
Resolve-DnsName www.kt28.io.vn -Type CNAME -Server 8.8.8.8
Resolve-DnsName kt28.io.vn -Type A -Server 8.8.8.8
```

Kết quả kỳ vọng:

- `www.kt28.io.vn` có CNAME trỏ `xulytiengviet.github.io`.
- `kt28.io.vn` có bốn IP GitHub Pages như trên.
- Nameserver phù hợp với hệ thống bạn vừa chỉnh bản ghi DNS.

Nếu báo **InvalidDNSError**, kiểm tra đúng vùng DNS, NS được ủy quyền, bản ghi CNAME/A xung đột và chờ DNS cập nhật. Sửa tên website hoặc tên repository không khắc phục lỗi DNS.

## 4. Lưu ý

- Quá trình lan truyền DNS có thể mất đến 24 giờ; việc cấp HTTPS cũng có thể cần thêm thời gian sau khi DNS hợp lệ.
- Album mới sử dụng ảnh trong `images/ky-niem-k28/` và `images/ky-niem-k28-goc/`; ba ảnh cũ đã được gỡ bỏ.
- Thao tác **đổi tên repository**: Settings → General → Repository name → `kinhteK28` (do người quản trị thực hiện).

## Tài liệu

- GitHub: https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site
- PA Việt Nam: https://access.pavietnam.vn/dns

*♡ Thầy Long Ngo gửi tặng Lớp Kinh tế K28.*
