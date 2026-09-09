# Mobile audit — Tin Học Gen Z

Ngày audit: 09/09/2026  
Nhánh triển khai: `feature/mobile-app-shell`

## 1. Nền tảng và cấu trúc

- Frontend: Next.js `16.2.6`, React `19.2.4`, TypeScript 5, App Router.
- CSS: Tailwind CSS 4 qua `@tailwindcss/postcss`, kết hợp design token trong `app/globals.css`.
- Icons: `lucide-react`.
- Fonts: Inter và Space Grotesk qua `next/font`, có `display: swap` và subset tiếng Việt.
- Backend/API: Next.js Route Handlers dưới `app/api`; Django REST nằm trong `backend`; Supabase được dùng ở lớp store/auth.
- State: state cục bộ bằng React hooks; không có global state framework ở public site.
- Authentication: admin dùng route handlers/session và `AdminAuthContext`; LMS học viên/giảng viên dùng liên kết chung tới `https://hoctructuyen.tinhocgenz.io.vn/`.
- SEO: metadata, canonical, Open Graph, Twitter, JSON-LD, robots và sitemap đã có trong App Router.

## 2. Router public đã xác minh

| Chức năng | Route hiện có |
| --- | --- |
| Trang chủ | `/` |
| Khóa học | `/khoa-hoc`, `/khoa-hoc/[id]` |
| Thi thử | `/thi-thu` |
| Học liệu | `/tai-lieu` |
| Tin tức/cẩm nang | `/blog`, `/tin-cong-nghe` |
| Bảng giá | `/bang-gia` |
| Giới thiệu | `/gioi-thieu` |
| Liên hệ/đăng ký | `/lien-he` |
| Portal nội bộ hiện có | `/portal/student`, `/portal/teacher`, `/portal/academic` |
| LMS chính thức | `https://hoctructuyen.tinhocgenz.io.vn/` |

Bottom navigation phải map theo các route thật: `/`, `/khoa-hoc`, `/thi-thu`, `/tai-lieu`, `/portal/student`. Các cổng quản trị `/admin` và `/portal/academic` không được đưa vào navigation public.

## 3. Layout và component hiện tại

- Root layout dùng chung `Header`, `Footer`, `FloatingContact` cho các trang.
- Header desktop có mega-menu dựa vào hover và đang hoạt động từ breakpoint `lg` (1024px).
- Mobile hiện tái sử dụng header desktop thu nhỏ; hamburger mở một panel dropdown toàn chiều ngang dưới header.
- Footer đã có accordion ở mobile, là nền tốt để giữ lại và tinh chỉnh.
- Homepage tái sử dụng `HeroSection`, `StatsSection`, `HomeTabbedHub` và các card bài viết.
- Course listing/detail dùng chung dữ liệu và `CourseCard`.
- Thi thử dùng `MockExamQuiz`; form liên hệ dùng `ContactForm`.

## 4. Breakpoint hiện tại

Tailwind đang dùng các breakpoint mặc định:

- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px

Mốc desktop hiện tại bắt đầu ở `lg`, phù hợp yêu cầu desktop `>=1024px`. Không phát hiện CSS theo tên thiết bị hoặc user-agent. Cần bổ sung kiểm tra/ràng buộc cho 320–639px và tablet 640–1023px mà không đổi layout từ 1024px trở lên.

## 5. Vấn đề mobile chính

### App shell và navigation

- Chưa có mobile app shell độc lập.
- Chưa có bottom navigation 5 mục và active route.
- Header mobile chưa có search và notification.
- Drawer hiện tại không có backdrop, focus trap, Escape, body scroll lock hoặc semantics dialog.
- Drawer cao `85vh`, chưa dùng dynamic viewport và safe area.
- Một số menu item chỉ cao khoảng 32–40px và dùng chữ 9–12px.
- Mega-menu desktop phụ thuộc hover; cần giữ nguyên trên desktop nhưng loại khỏi luồng mobile.

### Safe area và viewport

- Metadata chưa khai báo viewport `viewport-fit=cover` qua API `Viewport` của Next.js 16.
- Chưa sử dụng `env(safe-area-inset-*)` cho header, bottom nav, drawer, modal và floating contact.
- Body/main chưa chừa khoảng cho bottom navigation.

### Homepage/content

- Hero mobile có padding đầu lớn (`pt-28`), khiến nội dung đầu trang kéo dài; CTA thứ hai đang trỏ LMS thay vì thi thử.
- Ảnh hero đã có AVIF/WebP và art direction mobile/desktop, có kích thước chống CLS; đây là phần tốt cần giữ.
- Card bài viết dùng `<img>` thường, chưa được tối ưu tự động.
- Nhiều section có spacing gần desktop và nhiều chữ 9–11px.
- Course card dùng nhiều metadata nhỏ 9–11px; cần tăng cỡ chữ/tap target trên mobile mà giữ desktop.

### Form, modal, table và exam

- Form cần audit `type`, `inputMode`, `autoComplete`, cỡ chữ 16px và chiều cao 48px.
- Một số table public chỉ horizontal-scroll; bảng khóa học nên có presentation phù hợp mobile.
- Modal xác minh chứng chỉ cần bottom-sheet behavior và `max-height: 90dvh` trên mobile.
- Quiz cần đảm bảo answer/previous/next/submit là tap target >=48px, progress/timer không che câu hỏi và không dùng lỗi kỹ thuật trực tiếp.

### Floating UI

- Floating contact chưa phối hợp với bottom nav/safe area.
- Fixed element có nguy cơ che CTA, cookie/banner hoặc keyboard.

### PWA/offline

- Có `public/site.webmanifest` và icon 192/512, nhưng manifest thiếu description/scope/id/maskable metadata.
- Chưa có service worker, đăng ký service worker hoặc offline fallback.
- Cần chỉ cache static/public navigation an toàn; tuyệt đối không cache `/api`, `/admin`, dữ liệu auth hoặc portal nhạy cảm.

### Accessibility

- Drawer thiếu dialog semantics, focus management và khôi phục focus.
- Một số icon/menu label nhỏ; touch target chưa đồng nhất.
- Cần hỗ trợ `prefers-reduced-motion`, `:focus-visible`, live status cho offline/search/notification và label rõ nghĩa.

## 6. Baseline chất lượng trước khi sửa

- `npm run build`: **PASS** — 74 static/dynamic routes được build thành công.
- `tsc --noEmit`: **PASS**.
- `npm run lint`: **FAIL có sẵn** — 78 errors, 204 warnings. Lỗi trải rộng ở admin, hooks, `any`, unused import, ảnh `<img>` và một số component public. Đây là baseline trước mobile refactor; không được coi là regression mới.
- Không có test runner frontend hoặc Playwright trong `package.json`.
- Backend có pytest theo module, nhưng không bao phủ UI responsive.

## 7. Component bị ảnh hưởng dự kiến

- Giữ desktop, thêm/chuẩn hóa mobile: `Header`, `Footer`, `FloatingContact`, `HeroSection`, `CourseCard`, `ContactForm`, `MockExamQuiz`.
- Component mới có thể tách riêng vì UX khác thực sự: `MobileAppShell`, `MobileHeader`, `MobileDrawer`, `MobileSearch`, `MobileBottomNav`, `NotificationSheet`, `ServiceWorkerRegistration`.
- Root integration: `app/layout.tsx`, `app/globals.css`.
- PWA: manifest hiện tại, service worker và offline fallback.

## 8. Rủi ro regression

- Header là global client component; thay trực tiếp markup desktop có thể làm vỡ mega-menu. Cách giảm rủi ro: đóng băng header desktop ở `lg+`, thêm shell riêng chỉ dưới 1024px.
- CSS global có thể ảnh hưởng admin. Mobile overrides phải scope theo class app shell/public hoặc selector có chủ đích; app shell không render trên `/admin`.
- Bottom nav/floating contact có thể chồng modal/keyboard. Dùng z-index token, safe-area và Visual Viewport/keyboard-aware behavior.
- Service worker có thể cache nhầm dữ liệu nhạy cảm. Chỉ cache asset cùng origin và GET navigation public; loại `/api`, `/admin`, `/portal` khỏi runtime caching.
- Thay đổi metadata/manifest có thể ảnh hưởng SEO. Giữ nguyên title/canonical/JSON-LD và chỉ bổ sung viewport/PWA metadata.

## 9. Chiến lược triển khai

1. Chuẩn hóa token, safe area, focus, touch target và z-index trong CSS.
2. Đóng băng desktop header; thêm app shell mobile có drawer/search/notification/bottom nav dùng route thật.
3. Tối ưu homepage/course/form/exam bằng responsive overrides và component dùng chung, không duplicate business data.
4. Bổ sung PWA tối thiểu an toàn: manifest hoàn chỉnh, service worker static-only, offline fallback.
5. Chạy build, typecheck, lint theo phạm vi file thay đổi, sau đó regression toàn dự án và ghi rõ baseline lint còn tồn tại.

