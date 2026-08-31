# BÁO CÁO TOÀN DIỆN AUDIT SEO, DỮ LIỆU & HIỆU NĂNG — TIN HỌC GEN Z (PH DIGITAL EDUCATION)
**Ngày thực hiện:** 31/08/2026  
**Đội ngũ thực hiện:** 8 Senior EdTech Roles (BA, DA, Full-Stack Python Dev, Software Architect, AppSec, UX/UI, QA Automation, DevOps/SRE)  
**Môi trường kiểm tra:**  
- Production Domain: `https://tinhocgenz.io.vn`  
- Git Branch: `main` (`commit 3342f5e`)  
- Local Stack: Next.js 16.2.6 (Turbopack, App Router) + Python 3.11 / Django 5.2.17 + SQLite / PostgreSQL  

---

## 1. Baseline Kỹ Thuật & Môi Trường

### A. Git Status & Commit Baseline
```bash
$ git status
On branch main
Your branch is up to date with 'origin/main'.
nothing to commit, working tree clean

$ git log -n 5 --oneline
3342f5e feat(crm-core): unify live leads store and real-time CRM dashboard
dca38ed feat(portal-core): harden security, add student/teacher/academic portals and python backend core
9fb0fc6 feat(admin): modularize admin domain into dedicated task subroutes with master auth guard layout
624d111 feat(admin): add direct /admin portal navigation links to header and footer
5fa143f feat: update SEO clusters, branding favicons, manifest and content engine
```

### B. Stack & Rendering Strategy Matrix
| Nhóm Route | Đường dẫn URL | Chiến lược Render (Next.js 16) | Trạng thái Indexing | Mục tiêu SEO |
| :--- | :--- | :--- | :--- | :--- |
| **Trang chủ** | `/` | Static (SSG / ISR) | `index, follow` | Top 1 Thương hiệu & Hub điều hướng |
| **Silo Chứng chỉ MOS** | `/mos` | Static (SSG) | `index, follow` | Pillar Page từ khóa "khóa học MOS", "luyện thi MOS" |
| **Silo Chứng chỉ IC3** | `/ic3` | Static (SSG) | `index, follow` | Pillar Page "chứng chỉ IC3 GS6", "học IC3" |
| **Silo Excel Thực chiến**| `/excel` | Static (SSG) | `index, follow` | Pillar Page "học excel cho người đi làm", "dashboard excel" |
| **Silo Tin học VP** | `/tin-hoc-van-phong`| Static (SSG) | `index, follow` | Pillar Page "tin học văn phòng", "kỹ năng tin học" |
| **Danh mục Khóa học** | `/khoa-hoc` | Static (SSG) | `index, follow` | Hub so sánh khóa học |
| **Chi tiết Khóa học** | `/khoa-hoc/[id]` | SSG (`generateStaticParams`) | `index, follow` | Chuyển đổi đăng ký (BOFU) |
| **Blog & Kiến thức** | `/blog`, `/blog/[slug]`| SSG (`generateStaticParams`) | `index, follow` | Kéo traffic TOFU/MOFU, giải đáp vấn đề |
| **Tin Công Nghệ** | `/tin-cong-nghe/[slug]`| Dynamic SSR / ISR | `index, follow` | Đón đầu tin tức AI & công nghệ giáo dục |
| **Khảo Thí Trực Tuyến** | `/thi-thu` | Static (SSG) | `index, follow` | Khảo thí chìa khóa thu hút Lead |
| **Thư Viện Tài Liệu** | `/tai-lieu` | Static (SSG) | `index, follow` | Lead Magnet tải đề thi |
| **Bảng Giá & Dịch Vụ** | `/bang-gia`, `/dich-vu` | Static (SSG) | `index, follow` | Minh bạch học phí |
| **Cổng Học Viên** | `/portal/student` | Client Component (`use client`) | **BẮT BUỘC NOINDEX** | Dữ liệu học tập cá nhân |
| **Cổng Giảng Viên** | `/portal/teacher` | Client Component (`use client`) | **BẮT BUỘC NOINDEX** | Nghiệp vụ nội bộ |
| **Cổng Giáo Vụ** | `/portal/academic` | Client Component (`use client`) | **BẮT BUỘC NOINDEX** | Quản trị đào tạo |
| **Cổng Quản Trị** | `/admin/*` | Client Component + Edge Proxy | **BẮT BUỘC NOINDEX** | Quản trị hệ thống |
| **API Endpoints** | `/api/*` | Route Handlers (Edge / Node) | **BẮT BUỘC NOINDEX** | Trao đổi dữ liệu backend |

---

## 2. Bằng Chứng Kiểm Tra Thực Tế (Live Audit Evidence)

### Vấn đề 1: Thẻ `<title>` trang chủ quá dài (137 ký tự) & nhồi nhét từ khóa
- **Bằng chứng từ HTML live (`curl.exe -sL https://tinhocgenz.io.vn`)**:
  ```html
  <title>Tin Học Gen Z | Đào Tạo MOS, IC3 & Tin Học Văn Phòng Thực Chiến | Hệ Sinh Thái Đào Tạo Tin Học Thực Chiến & Luyện Thi MOS, IC3 Chuẩn Quốc Tế</title>
  ```
- **Phân tích**: 
  - Chiều dài: 137 ký tự (vượt xa giới hạn hiển thị tối đa ~60 ký tự / 600px của Google).
  - Lặp từ khóa: Cụm `"Tin Học Văn Phòng Thực Chiến"` lặp 2 lần; `"MOS, IC3"` lặp 2 lần; `"Đào Tạo"` lặp 2 lần.
  - Nguy cơ: Google tự động cắt ngắn (`...`) hoặc tự ý ghi đè tiêu đề bằng thẻ H1, làm suy giảm CTR tự nhiên.

### Vấn đề 2: Tuyên bố "Cam kết bao đỗ 100%" trong meta description & landing page
- **Bằng chứng**:
  ```html
  <meta name="description" content="Tin Học Gen Z - Đào tạo tin học văn phòng thực chiến, luyện thi chứng chỉ quốc tế MOS, IC3 GS6 chuẩn Certiport cho sinh viên và người đi làm. Cam kết bao đỗ 100%." />
  ```
- **Rủi ro**: Vi phạm chính sách quảng cáo nghiêm ngặt của Google Ads & Meta Ads (tuyên bố cam kết tuyệt đối không thể kiểm chứng); gây hoài nghi cho người học thực tế.
- **Giải pháp BA/Legal**: Chuyển thành: *"Đào tạo bám sát đề thi Certiport, tài trợ học lại 100% miễn phí cho đến khi thi đạt chứng chỉ."*

### Vấn đề 3: robots.txt chặn `/_next/` đối với crawler chung
- **Bằng chứng (`app/robots.ts`)**:
  ```typescript
  {
    userAgent: "*",
    allow: "/",
    disallow: ["/admin/", "/api/", "/_next/"],
  }
  ```
- **Hậu quả**: Các crawler ngoài Google (Bingbot, DuckDuckBot, Facebook External Hit, Zalo crawler, Twitterbot) bị chặn không thể tải CSS/JS trong `/_next/`, dẫn đến việc trang bị render trắng trơn hoặc bị lỗi layout khi crawl.
- **Thiếu sót**: Chưa chặn `/portal/` trong robots.txt!

### Vấnnet 4: sitemap.xml gán đồng loạt `new Date()` cho tất cả các trang
- **Bằng chứng (`app/sitemap.ts`)**:
  Mọi URL tĩnh và động đều gán `lastModified: new Date()`, đồng thời gán `changeFrequency: "daily"` hoặc `"hourly"` theo cảm tính.
- **Hậu quả**: Googlebot bỏ qua thẻ lastmod vì phát hiện toàn bộ site đều "cập nhật mỗi giây". Cần liên kết `lastModified` với thời gian chỉnh sửa thực tế của khóa học và bài viết.

### Vấn đề 5: Thiếu thẻ chia sẻ mạng xã hội `twitter:image` & `og:image` đồng bộ
- Trang chủ trả về `twitter:card: "summary"` thay vì `summary_large_image` kèm ảnh kích thước chuẩn 1200x630px.

### Vấn đề 6: Cạnh tranh từ khóa (Keyword Cannibalization)
- Trang `/mos` và trang `/khoa-hoc/mos-master-combo` đều cùng nhắm từ khóa "luyện thi MOS 2019".
- Cần phân định rõ Search Intent:
  - `/mos`: Phục vụ Intent **Informational / Commercial Investigation** (Tìm hiểu tổng quan về bài thi MOS, cấu trúc, lệ phí, chứng chỉ, so sánh phiên bản).
  - `/khoa-hoc/mos-master-combo`: Phục vụ Intent **Transactional** (Đăng ký học, chọn lịch, xem học phí, thanh toán).
  - Tương tự cho `/ic3` vs `/khoa-hoc/ic3-gs6`.

---

## 3. Inventory URL & Keyword — Intent Map

| URL | Primary Keyword | Search Intent | Target Audience | Canonical URL | Schema Type |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `/` | tin học gen z, đào tạo tin học văn phòng | Brand / Navigational | Toàn bộ học viên | `https://tinhocgenz.io.vn/` | EducationalOrganization, WebSite |
| `/mos` | chứng chỉ mos, luyện thi mos, thi mos certiport | Informational / Investigation | Sinh viên xét chuẩn đầu ra | `https://tinhocgenz.io.vn/mos` | Course, FAQPage, BreadcrumbList |
| `/ic3` | chứng chỉ ic3 gs6, luyện thi ic3 | Informational / Investigation | Học sinh, sinh viên năm 1-2 | `https://tinhocgenz.io.vn/ic3` | Course, FAQPage, BreadcrumbList |
| `/excel` | học excel văn phòng, excel thực chiến | Informational / Commercial | Người đi làm, kế toán | `https://tinhocgenz.io.vn/excel` | Course, FAQPage, BreadcrumbList |
| `/tin-hoc-van-phong`| tin học văn phòng thực chiến, word excel ppt | Commercial Investigation | Người đi làm mất gốc | `https://tinhocgenz.io.vn/tin-hoc-van-phong` | Course, FAQPage, BreadcrumbList |
| `/khoa-hoc` | các khóa học tin học, bảng giá khóa học mos | Commercial Hub | Học viên đang tìm lớp | `https://tinhocgenz.io.vn/khoa-hoc` | CollectionPage, BreadcrumbList |
| `/khoa-hoc/[id]` | [Tên khóa học cụ thể] | Transactional (Đăng ký) | Học viên sẵn sàng học | `https://tinhocgenz.io.vn/khoa-hoc/[id]` | Course, Offer, AggregateRating |
| `/thi-thu` | thi thử mos online, đề thi thử ic3 | Lead Generation / Utility | Thí sinh sắp thi | `https://tinhocgenz.io.vn/thi-thu` | Quiz, BreadcrumbList |
| `/tai-lieu` | tài liệu ôn thi mos, giáo trình excel | Lead Magnet / Free Resource | Tự học | `https://tinhocgenz.io.vn/tai-lieu` | DigitalDocument, BreadcrumbList |
| `/blog/[slug]` | [Vấn đề giải quyết cụ thể] | Informational (Hỏi đáp) | Người tìm thủ thuật | `https://tinhocgenz.io.vn/blog/[slug]` | Article, Person, BreadcrumbList |

---

## 4. Backlog Ưu Tiên Chuẩn Hóa (P0 • P1 • P2)

### P0 (Khẩn cấp — Ảnh hưởng trực tiếp index & uy tín thương hiệu):
1. **Fix Metadata Title & Meta Description**:
   - Rút ngắn title trang chủ về dưới 65 ký tự, loại bỏ từ khóa lặp lại.
   - Sửa tuyên bố "bao đỗ 100%" thành cam kết rõ ràng: "Đào tạo chuẩn Certiport, tài trợ học lại 100% miễn phí".
   - Tinh chỉnh `lib/seo.ts` để không tự động ghép chuỗi tên tổ chức làm tiêu đề bị phình to gấp đôi.
2. **Fix robots.ts & sitemap.ts**:
   - Gỡ bỏ `disallow: "/_next/"` ở userAgent `*`.
   - Bổ sung `disallow: ["/portal/", "/admin/", "/api/"]` cho mọi user agent.
   - Chuẩn hóa sitemap: Gán `lastModified` thực tế dựa theo mốc phát hành/cập nhật thật, loại bỏ `daily`/`hourly` cảm tính.
3. **Chống Keyword Cannibalization giữa Silo Pages và Detail Pages**:
   - Đặt canonical rõ ràng, phân định content intent giữa `/mos` và `/khoa-hoc/mos-master-combo`.

### P1 (Nâng cao trải nghiệm, Chuyển đổi & Structured Data):
1. **Bổ sung Structured Data chuẩn Google Rich Results**:
   - Schema `Course` hoàn chỉnh với `offers`, `provider`, `hasCourseInstance`.
   - Schema `BreadcrumbList` cho 100% trang con.
   - Schema `FAQPage` cho các trang có mục hỏi đáp.
2. **Đồng bộ Open Graph & Twitter Cards**:
   - Card type: `summary_large_image`.
   - Cung cấp ảnh banner `og:image` kích thước chuẩn 1200x630px.
3. **Tối ưu Cache-Control Header**:
   - Cấu hình header public caching (`s-maxage=3600, stale-while-revalidate=86400`) trong `next.config.ts`.

### P2 (Hiệu năng, Accessibility & Liên kết Web-to-App):
1. **Core Web Vitals**:
   - Đảm bảo LCP $\le$ 2.5s, CLS $\le$ 0.1, INP $\le$ 200ms.
2. **WCAG 2.2 AA Accessibility**:
   - Kiểm tra tương phản màu sắc chữ trên nền, kích thước phông chữ tối thiểu 15-16px trên mobile, touch target $\ge$ 44px.

---

## 5. Danh Mục Tệp Tin Dự Kiến Tác Động
- **Sửa**:
  - `data/siteConfig.ts`: Chuẩn hóa lại `name`, `tagline`, `description`.
  - `lib/seo.ts`: Tối ưu thuật toán ghép title thông minh, thêm `summary_large_image`.
  - `app/layout.tsx`: Rút gọn title root, thêm BreadcrumbList root, sửa schema.
  - `app/robots.ts`: Gỡ chặn `/_next/`, thêm `/portal/` vào disallow.
  - `app/sitemap.ts`: Dùng ngày cập nhật thực tế, bỏ changefreq rác.
  - `app/mos/page.tsx`, `app/ic3/page.tsx`, `app/excel/page.tsx`, `app/tin-hoc-van-phong/page.tsx`: Cập nhật title, schema.
  - `next.config.ts`: Bổ sung Cache-Control CDN headers.
- **Giữ nguyên**:
  - Toàn bộ cơ chế xác thực bảo mật (`proxy.ts`, `lib/auth-server.ts`, `backend/`).
  - Toàn bộ logic chấm thi server-side (`lib/exam-engine.ts`).
  - Dữ liệu khách hàng thực tế (`lib/leads-store.ts`).
