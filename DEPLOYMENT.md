# Tin Học Gen Z — GitHub & Vercel Deployment Guide

Cập nhật: 16/09/2026

## 1. Quality gate trước khi push

Chạy từ thư mục gốc:

```bash
npm ci
npm run lint
npm run typecheck
npm run build
```

Hoặc dùng:

```bash
npm run verify
```

Repo có GitHub Actions tại `.github/workflows/ci.yml`; mỗi Pull Request và mỗi push lên `main` sẽ chạy `npm ci`, ESLint, TypeScript và production build trên Linux.

## 2. Kiểm tra chuẩn bị triển khai (Deploy Readiness Check)

Dự án đã được nâng cấp lên `next@16.3.5` và `eslint-config-next@16.3.5` với 0 lỗ hổng bảo mật. Trước khi push mã nguồn hoặc triển khai production, chạy script kiểm tra:

```bash
npm run deploy:check
npm run verify
```

`npm run deploy:check` tự động kiểm duyệt:
- Phiên bản Next.js an toàn (>= 16.3.3).
- Tính năng Next Image Optimization bật toàn cục.
- Cấu hình `.env.example` hợp lệ và `.gitignore` chặn rò rỉ secret.
- Toàn bộ suite ESLint (0 errors, 0 warnings) và TypeScript (PASS).

## 3. Biến môi trường bắt buộc

Sao chép `.env.example` thành `.env.local` khi phát triển local. Không commit `.env.local`.

### Xác thực quản trị

- `ADMIN_SESSION_SECRET`: chuỗi ngẫu nhiên tối thiểu 32 ký tự.
- `ADMIN_USER_PASSWORDS_JSON`: JSON object ánh xạ username -> mật khẩu, mỗi mật khẩu tối thiểu 12 ký tự. Ví dụ cấu trúc:

```text
{"admin_super":"<unique-password>","academic_lan":"<unique-password>","teacher_huy":"<unique-password>"}
```

- `ADMIN_MFA_BACKUP_CODE`: mã dự phòng MFA gồm đúng 6 chữ số. Không dùng mã mẫu hoặc mã dễ đoán.

Không có mật khẩu mặc định/đăng nhập 1 chạm ở client. Production sẽ từ chối xác thực nếu chưa cấu hình password map.

### Cron

- `CRON_SECRET`: secret độc lập cho `/api/cron/content-fetch`.

Ở production, endpoint cron trả `503` nếu chưa cấu hình secret và trả `401` nếu request không có secret hợp lệ.

### Supabase

Khi dùng các tính năng Supabase:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_URL`
- `SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY` — server-only, tuyệt đối không dùng prefix `NEXT_PUBLIC_`.

### Analytics / Contact / AI

Tùy tính năng đang bật:

- `NEXT_PUBLIC_GA_ID`
- `NEXT_PUBLIC_GTM_ID`
- `GOOGLE_SCRIPT_URL`
- `GEMINI_API_KEY`
- `GEMINI_MODEL`
- `OPENAI_API_KEY`
- `OPENAI_MODEL`

## 4. Push GitHub

Khuyến nghị tạo repository mới sạch, không tái sử dụng lịch sử Git từng chứa secret/demo credential.

```bash
git init
git branch -M main
git add .
git status
git commit -m "chore: production-ready refactor"
git remote add origin <YOUR_GITHUB_REPOSITORY_URL>
git push -u origin main
```

Trước `git commit`, kiểm tra `git status` không có:

- `.env.local` hoặc `.env.production`
- `.vercel/`
- `node_modules/`
- `.next/`
- database `*.sqlite3`
- file khóa riêng `*.pem`

`.env.example` được phép commit và không chứa secret thật.

## 5. Deploy Vercel

Với repository này, để Vercel tự nhận Next.js và giữ các giá trị mặc định:

- Framework Preset: Next.js
- Root Directory: `./`
- Install Command: mặc định (`npm install`/lockfile detection)
- Build Command: mặc định từ `package.json` (`npm run build`)
- Output Directory: Next.js default

Không cần `vercel.json` chỉ để khai báo lại các mặc định trên.

Trong Vercel Project Settings -> Environment Variables, thêm đầy đủ secret ở mục 3 cho Production và Preview theo nhu cầu.

Sau deploy, kiểm tra tối thiểu:

1. `/` và các trang khóa học.
2. `/blog`, `/tin-cong-nghe` và trang chi tiết.
3. `/admin` đăng nhập bằng credential nằm trong Vercel Environment Variables.
4. `/api/admin/auth/session` không lộ cookie/token trong body.
5. Cron không thể gọi khi thiếu/sai secret.
6. Ảnh remote và ảnh local hiển thị đúng; không có layout shift rõ rệt.
7. Lighthouse mobile và desktop trên URL production.

## 6. Image / Core Web Vitals

`next.config.ts` đã bật lại Next Image Optimization và cho phép tối ưu ảnh từ `images.unsplash.com`. Các ảnh CMS có nguồn động chưa kiểm soát domain dùng `unoptimized` theo từng ảnh thay vì tắt optimizer cho toàn site.

Hero giữ `<picture>` có AVIF/WebP riêng cho mobile/desktop vì đây là art-direction có chủ đích, có `width`, `height`, `fetchPriority="high"` và file đã được nén sẵn.

## 7. CI / Dependency maintenance

- GitHub Actions: `.github/workflows/ci.yml`
- Dependabot: `.github/dependabot.yml`
- Node requirement: `>=20.9.0`; `.nvmrc` chọn Node 22.

Không merge PR nếu `lint`, `typecheck` hoặc `build` thất bại.
