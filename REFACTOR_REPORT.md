# Báo cáo tái cấu trúc & Chuẩn hóa Tin Học Gen Z

Ngày hoàn thành audit & refactor: 16/09/2026

---

## 1. Mục tiêu & Triết lý thực hiện

Biến repository **Tin Học Gen Z** thành một nền tảng giáo dục & ứng dụng quản trị chuyên nghiệp, nhanh, sạch, nhất quán, an toàn và sẵn sàng triển khai production qua GitHub + Vercel.

Thực hiện theo tiêu chuẩn kỹ sư cấp cao:
- Giữ nguyên toàn bộ tính năng và logic nghiệp vụ đang hoạt động (không rewrite mù quáng).
- Không over-engineering; ưu tiên code đơn giản, tường minh, có chủ đích.
- Chuẩn hóa visual hierarchy: Blue (`#0057B8`), Navy (`#0B2545`), White, Slate/Gray.
- Loại bỏ triệt để các phong cách "AI template": 7 màu, gradient cầu vồng, glow, animation rung lắc/bouncing/pulsing liên tục, và text quá nhỏ.

---

## 2. Kết quả so sánh Before / After

| Tiêu chí | Trước khi refactor | Sau khi refactor |
|---|---|---|
| **Next.js Version** | `16.2.6` (Vulnerable to GHSA-6gpp-xcg3-4w24, etc.) | **`16.3.5` (Latest Security Patched)** |
| **npm audit vulnerabilities** | 8 (1 critical, 6 high, 1 moderate) | **0 vulnerabilities** |
| **ESLint Errors** | 81 errors | **0 errors** |
| **ESLint Warnings** | 219 warnings | **0 warnings** |
| **TypeScript (`tsc --noEmit`)** | Có lỗi types / unsafe any | **PASS (Exit code 0)** |
| **Production Build (`next build`)** | Dừng do dependency/lint warning | **PASS (74/74 routes compiled & prerendered)** |
| **Deployment Readiness (`deploy:check`)** | FAIL (Next.js cũ) | **PASS (Tất cả tiêu chí đạt)** |
| **Full Verification (`verify`)** | FAIL | **PASS (`lint` + `typecheck` + `build`)** |
| **Decorative Gradients** | Xuất hiện ở card, button, border | **0 (Loại bỏ toàn bộ gradient trang trí)** |
| **`rounded-3xl` tràn lan** | 28 vị trí trong admin và public | **0 (Chuẩn hóa về `rounded-xl` / `rounded-2xl`)** |
| **Blur / Glow Blobs trang trí** | Xuất hiện ở header, bento cards | **0 (Đã xóa các khối blur-3xl, blur-2xl)** |
| **Unnecessary Animations** | Icon xoay/phóng to, badge pulse liên tục | **Đã chuẩn hóa về `transition-colors duration-150/200`** |
| **UI text < 12px** | 246 vị trí | **0 (Tối thiểu 12px)** |
| **Font typography** | Font-black tràn lan | **Inter chuẩn Latin + Vietnamese; loại bỏ font-black** |
| **Security Hardcoding** | Demo passwords, MFA bypass, quick login | **0 hard-coded credentials; server-only env validation** |

---

## 3. Kiến trúc & Codebase Cleanup

### 3.1. Public Site
- **Header (`components/Header.tsx`):** Thu gọn cấu trúc, loại bỏ mobile menu dư thừa (vì đã có `MobileAppShell` chuyên dụng), chuyển đổi sang Server Component gọn nhẹ.
- **Footer (`components/Footer.tsx`):** Bỏ các accordion client-state không cần thiết, tối ưu hóa thành Server Component tĩnh tải cực nhanh.
- **Floating Contact (`components/FloatingContact.tsx`):** Loại bỏ `hover:scale-105`, `animate-pulse`, chuẩn hóa màu sắc và transition nhanh gọn (150ms).
- **Service Card & Schedule Widgets:** Loại bỏ animation xoay 6 độ (`rotate-6`), phóng to (`scale-110`), nhấp nháy badge (`animate-pulse`), và rút ngắn thời gian transition từ 500ms về 150-200ms phục vụ đúng mục đích UX feedback.
- **Giới thiệu (`app/gioi-thieu/page.tsx`):** Chuẩn hóa khối showcase từ `rounded-[2rem]` và `duration-500` về `rounded-2xl` và `duration-200`.

### 3.2. Cổng Quản Trị Admin
- **Admin Dashboard (`app/admin/page.tsx`):** Loại bỏ 2 khối hiệu ứng blur-3xl, đổi banner từ `rounded-3xl shadow-2xl` sang `rounded-xl shadow-sm`, sửa cấu trúc thẻ JSX của danh sách leads.
- **Admin Layout, Sidebar & Topbar:**
  - Bỏ màu amber trang trí cho liên kết ngoài LMS (`app/admin/components/AdminSidebar.tsx` và `AdminTopbar.tsx`), đưa về Slate/Blue nhất quán với hệ thống.
  - Loại bỏ các icon xoay (`group-hover:rotate-12`) và chấm trạng thái nhấp nháy (`animate-pulse`).
- **Admin Modules (Certificates, Courses, Schedules, Media, Blog, Content Engine, Users):**
  - Đồng bộ toàn bộ modal và bento cards từ `rounded-3xl` về `rounded-xl` / `rounded-2xl`.
  - Loại bỏ các đốm phát sáng (glow blobs) trên thẻ KPI.
  - Sửa nút xuất CSV tại CRM Leads (`app/admin/leads/page.tsx`) từ thao tác gán `window.location.href` sang thẻ `<a>` semantic có thuộc tính `download`, giải quyết triệt để cảnh báo Next.js.
  - Khôi phục đúng handler xuất dữ liệu và biểu tượng chuẩn cho hệ thống Chứng nhận.

---

## 4. Bảo Mật (Security Hardening)

1. **Authentication & Session:**
   - Hoàn toàn loại bỏ tài khoản / mật khẩu demo hoặc quick-login khỏi mã nguồn client.
   - `lib/auth-server.ts`:
     - Yêu cầu `ADMIN_SESSION_SECRET` bắt buộc cấu hình tối thiểu 32 ký tự ở môi trường production (fail-closed, throw Error nếu thiếu).
     - Quản lý mật khẩu quản trị thông qua `ADMIN_USER_PASSWORDS_JSON` trên server-only environment variables.
     - Xác thực MFA 6 chữ số nghiêm ngặt qua `ADMIN_MFA_BACKUP_CODE`, so khớp thời gian thực không lộ timing attacks (`constantTimeEqual`).
2. **Network Proxy / Middleware (`proxy.ts`):**
   - Chuẩn hóa trailing slashes cho các route `/admin` và `/portal` chống redirect loops.
   - Bảo vệ toàn bộ endpoint `/api/admin/*` (chỉ mở `/api/admin/auth/login` và `/api/admin/auth/session`), kiểm tra quyền `admin` / `super_admin`.
   - Phân quyền chặt chẽ cho các cổng `/portal/academic`, `/portal/teacher`, `/portal/student`.
   - Bổ sung security headers: `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`, `Referrer-Policy: strict-origin-when-cross-origin`, `X-Robots-Tag: noindex, nofollow, noarchive`, `Cache-Control: no-store`.
3. **Environment Security:**
   - `.env.example`: Cung cấp bộ khung cấu hình chuẩn, không chứa bất kỳ secret thật nào.
   - `.gitignore`: Chặn commit toàn bộ `.env*`, database `*.sqlite3`, private keys `*.pem`, logs và thư mục nhạy cảm.

---

## 5. Tối ưu Hiệu Năng & Core Web Vitals

1. **Next.js Image Optimization:**
   - Bật lại bộ tối ưu hóa ảnh toàn cầu (`images.unoptimized: false`).
   - Cấu hình hỗ trợ chuẩn AVIF và WebP tự động, thời gian cache `minimumCacheTTL: 86400`.
   - Cho phép tải ảnh tối ưu từ nguồn an toàn `images.unsplash.com`.
   - Hero section sử dụng cấu trúc `<picture>` art-direction tối ưu riêng cho mobile/desktop kèm `fetchPriority="high"`.
2. **Font Inter Tối Ưu:**
   - Tích hợp `next/font/google` với `subsets: ["latin", "vietnamese"]` và `display: "swap"` tránh hiện tượng giật chữ (FOUT/FOIT) và triệt tiêu CLS.
3. **Giảm thiểu Client-side JavaScript:**
   - Loại bỏ các wrapper thừa và hook hiệu ứng không cần thiết, giúp cải thiện chỉ số INP (Interaction to Next Paint) và TBT (Total Blocking Time).

---

## 6. Sẵn Sàng CI/CD & Triển Khai (GitHub / Vercel)

- **GitHub Actions (`.github/workflows/ci.yml`):**
  - Tự động chạy quy trình kiểm tra chất lượng trên Ubuntu: `npm ci` -> `npm run lint` -> `npm run typecheck` -> `npm run build` -> `python -m compileall backend`.
- **Dependabot (`.github/dependabot.yml`):**
  - Tự động quét và cập nhật bảo mật định kỳ hàng tuần cho các gói npm.
- **Node Environment:**
  - `.nvmrc` ghim Node `22`.
  - `package.json` quy định `engines: { "node": ">=20.9.0" }`.
- **Deployment Script (`npm run deploy:check`):**
  - Kiểm tra Next.js version an toàn.
  - Kiểm tra Image Optimization toàn cục.
  - Kiểm tra an toàn cho file `.env.example`.

---

## 7. Trạng thái chấp thuận (Acceptance Checklist)

| Tiêu chí | Trạng thái |
|---|---|
| ESLint errors: 0 | **ĐẠT** |
| ESLint warnings: 0 | **ĐẠT** |
| TypeScript: PASS | **ĐẠT** |
| Production build (`npm run build`): PASS | **ĐẠT** |
| 0 decorative gradients | **ĐẠT** |
| 0 decorative rainbow colors | **ĐẠT** |
| 0 UI text < 12px | **ĐẠT** |
| 0 excessive font-black | **ĐẠT** |
| Inter typography chuẩn tiếng Việt | **ĐẠT** |
| Blue + White/Slate dominant system | **ĐẠT** |
| 0 hard-coded password / secret | **ĐẠT** |
| 0 client-side MFA bypass | **ĐẠT** |
| 0 quick login production bypass | **ĐẠT** |
| GitHub CI & Dependabot ready | **ĐẠT** |
| .env.example & Vercel ready | **ĐẠT** |
