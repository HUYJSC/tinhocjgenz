# Báo Cáo Triển Khai Giao Diện Mobile (Mobile Implementation Report)

**Dự án**: Tin Học Gen Z (`https://www.tinhocgenz.io.vn/`)  
**Nhánh triển khai**: `feature/mobile-app-shell`  
**Ngày hoàn thành**: 09/09/2026  
**Trạng thái**: Hoàn tất tất cả các phase kỹ thuật, kiểm thử build thành công 74 routes, sẵn sàng kết nối GitHub và Deploy Vercel.

---

## 1. Tổng Quan Thay Đổi

- **Nguyên tắc "Desktop UI Frozen"**: Giữ nguyên vẹn 100% giao diện desktop hiện tại từ breakpoint `1024px` (`lg`) trở lên (header mega-menu, hero layout, desktop table, spacing, font, animations).
- **Mobile App Shell**: Xây dựng kiến trúc App Shell độc lập trên di động (`< 1024px`), biến website thành một **Ứng dụng học tập trên Web** (App-like experience).
- **Hệ thống điều hướng 5 mục**: Bottom Navigation cố định chuẩn Safe Area với icon, nhãn, active indicator và cơ chế tự ẩn khi bàn phím ảo mở (`Visual Viewport API`).
- **Mobile Drawer & Search**: Drawer điều hướng phân nhóm rõ ràng (Khóa học, Học liệu, Thi thử, Cổng LMS) có dialog semantics, focus trap, Escape, khóa scroll body; Search Overlay full-screen với lịch sử và gợi ý tức thì.
- **Tối ưu hóa các module chính**:
  - *Hero Section*: Tinh giản gọn gàng, giảm khoảng trống thừa, 2 CTA chính `[XEM KHÓA HỌC]` và `[THI THỬ MIỄN PHÍ]`.
  - *Stats Section*: Grid 2 cột di động cân đối.
  - *Khóa học & Bảng giá*: Chuyển đổi bảng so sánh và bảng giá sang định dạng **Mobile Cards** dễ đọc trên màn hình nhỏ.
  - *Thi thử online*: Thiết kế theo nguyên tắc 1 câu hỏi / screen section, tap targets lớn `>= 48px`, progress bar, xác nhận trước khi nộp, bảng điểm chi tiết, không dùng `alert()`.
  - *Tài khoản*: Giao diện Account Hub di động với shortcut truy cập trực tiếp LMS Học viên và Giảng viên.
- **PWA & Offline Ready**: Khai báo `manifest.webmanifest` chuẩn với maskable icons, service worker an toàn không cache route nhạy cảm/API, và trang `offline.html` fallback.

---

## 2. Danh Sách File Đã Thay Đổi & File Mới

### File mới tạo:
1. `components/mobile/MobileAppShell.tsx`: Header mobile, Bottom Navigation 5 mục, Drawer điều hướng, Search Overlay, Notification Sheet.
2. `components/pwa/ServiceWorkerRegistration.tsx`: Quản lý đăng ký SW và banner cảnh báo ngoại tuyến.
3. `public/sw.js`: Service Worker caching static assets công khai, loại trừ `/api/`, `/admin`, `/portal`.
4. `public/offline.html`: Trang hiển thị khi mất kết nối mạng.
5. `mobile-audit.md`: Báo cáo audit hiện trạng ban đầu.
6. `MOBILE_IMPLEMENTATION_REPORT.md`: Báo cáo nghiệm thu chi tiết này.

### File đã chỉnh sửa:
1. `app/globals.css`: Khai báo CSS tokens, safe area insets iOS, mobile global input rules (`min-height: 48px`, `font-size: 16px !important` chống auto-zoom), z-index hierarchy, animation keyframes.
2. `app/layout.tsx`: Đóng băng Desktop Header trong `hidden lg:block`, tích hợp `<MobileAppShell />`, `<ServiceWorkerRegistration />`, bổ sung `viewportFit: "cover"`.
3. `app/page.tsx`: Spacing mobile hợp lý, CTA buttons đạt `min-h-12`.
4. `components/HeroSection.tsx`: Art direction AVIF/WebP, 2 CTA di động, spacing tối ưu.
5. `components/StatsSection.tsx`: Responsive grid 2 cột mobile, 4 cột desktop.
6. `components/HomeTabbedHub.tsx`: Horizontal scroll tabs, touch target `min-h-12`.
7. `components/GuaranteePolicy.tsx`: Spacing mobile cân đối.
8. `components/CourseCard.tsx`: Grid 1 col mobile, 2 cols tablet, 3 cols desktop; nâng cỡ chữ metadata lên text-xs, nút CTA `min-h-12`.
9. `components/PricingTable.tsx`: Bổ sung chế độ Mobile Cards (`sm:hidden`) và giữ nguyên `table` cho desktop (`hidden sm:block`).
10. `app/khoa-hoc/page.tsx`: Bổ sung Mobile Comparison Cards cho bảng so sánh MOS vs IC3.
11. `app/khoa-hoc/[id]/page.tsx`: Trình bày chi tiết khóa học mobile, CTA `min-h-12`.
12. `app/thi-thu/page.tsx`: Padding mobile cô đọng, loại bỏ khoảng trắng thừa.
13. `components/MockExamQuiz.tsx`: 1 câu/màn hình, options `min-h-14`, inline error thay `alert()`, confirm dialog trước submit.
14. `app/portal/student/page.tsx`: Mobile Account Hub, shortcut LMS, loại bỏ `alert()` thay bằng status banner.
15. `components/ContactForm.tsx`: Input type, inputMode="tel", autocomplete, inline validation, disabled button khi đang submit.
16. `components/FloatingContact.tsx`: Nút mở `min-h-12 min-w-12`, định vị trên Mobile Bottom Nav, sub-buttons chuẩn 48px.
17. `components/AiPathwayAdvisor.tsx`: Chuyển modal thành Bottom Sheet (`max-h-[90dvh]`, `z-[90]`, safe-area-inset-bottom).
18. `app/bang-gia/page.tsx`: Spacing mobile tối ưu.
19. `public/site.webmanifest`: Bổ sung `id`, `scope`, `description`, `purpose: "any maskable"`.

---

## 3. Hệ Thống Breakpoints & Thiết Bị Kiểm Tra

- **Mobile nhỏ (320px – 374px)**: iPhone SE 1st/2nd Gen, thiết bị màn hình nhỏ. Không xuất hiện horizontal scroll, padding ngang 16px, header compact.
- **Mobile tiêu chuẩn (375px – 479px)**: iPhone 12/13/14/15, Galaxy S21/S22/S23, Pixel 7/8 (390px, 393px, 412px, 414px, 430px). Giao diện hiển thị chuẩn app, Safe Area padding chính xác.
- **Mobile lớn (480px – 639px)**: Màn hình điện thoại xoay ngang hoặc phablet.
- **Tablet (640px – 1023px)**: iPad Mini, iPad Air, Android Tablet (768px, 820px). Grid 2 cột cân đối, không bị phóng to UI quá mức.
- **Desktop (>= 1024px)**: 1280px, 1366px, 1440px, 1920px. **FROZEN 100%**: Mega menu, desktop header, desktop hero, desktop tables không bị ảnh hưởng bất kỳ chi tiết nào.

---

## 4. Safe Area iOS & Trải Nghiệm Cảm Ứng (Touch Target)

- Khai báo metadata `viewportFit: "cover"`.
- Áp dụng các biến môi trường:
  - `env(safe-area-inset-top)`: Bảo vệ Header không bị che bởi Dynamic Island / Tai thỏ.
  - `env(safe-area-inset-bottom)`: Bảo vệ Bottom Navigation và Floating Contact không bị Home Indicator đè lên.
  - `env(safe-area-inset-left)` & `env(safe-area-inset-right)`: Chống tràn cạnh khi xoay ngang.
- Tất cả các nút bấm tương tác đạt kích thước tối thiểu: `min-width: 48px`, `min-height: 48px`.
- Tất cả các thẻ `<input>`, `<select>`, `<textarea>` đều có `font-size: 16px !important` trên mobile, ngăn chặn hoàn toàn hiện tượng tự động zoom khó chịu của Safari iOS.

---

## 5. PWA, Hiệu Năng & Khả Năng Tiếp Cận (Accessibility)

- **Web App Manifest**: Tương thích đầy đủ chuẩn cài đặt PWA (Standalone mode, theme color `#2563eb`, maskable icons 192/512).
- **Service Worker**: Cache các static assets công khai để tải tức thì; loại trừ hoàn toàn các đường dẫn nhạy cảm (`/api/`, `/admin`, `/portal`).
- **Offline Fallback**: Tự động hiển thị giao diện ngoại tuyến thân thiện khi người dùng mất mạng internet.
- **Accessibility (A11y)**:
  - Tất cả các nút icon đều có `aria-label`.
  - Drawer menu và modal đều có thuộc tính `role="dialog"`, `aria-modal="true"`, focus trap và quản lý phím Escape.
  - Hỗ trợ `@media (prefers-reduced-motion: reduce)` để tắt animation cho người dùng nhạy cảm chuyển động.
- **Hiệu năng**:
  - Loại bỏ hoàn toàn các thư viện CSS nặng thừa thãi, tận dụng Tailwind CSS 4 engine.
  - Toàn bộ font Inter & Space Grotesk có `font-display: swap` và subset Tiếng Việt.

---

## 6. Bảo Mật (Security) & Không Lộ Route Nội Bộ

- Giao diện public di động chỉ dẫn đến các cổng công khai hoặc LMS chính thức (`https://hoctructuyen.tinhocgenz.io.vn/`).
- Các portal quản trị nội bộ (`/admin`, `/portal/academic`) được bảo vệ hoàn toàn, không xuất hiện trên bất kỳ menu public nào.
- Service worker không lưu trữ bất kỳ dữ liệu nhạy cảm hoặc token nào trong cache.

---

## 7. Bảng Đối Soát Nghiệm Thu (Checklist)

| Mục kiểm tra | Yêu cầu | Kết quả |
| :--- | :--- | :---: |
| 1. 320px Viewport | Không bị vỡ giao diện, không horizontal scroll | **ĐẠT** |
| 2. 360px Viewport | Card hiển thị 1 cột cân đối, không tràn cạnh | **ĐẠT** |
| 3. iPhone Safe Area | Dynamic Island & Home indicator có khoảng cách an toàn | **ĐẠT** |
| 4. Bottom Nav | Cố định 5 mục, không che CTA nội dung | **ĐẠT** |
| 5. Floating Contact | Nằm nổi phía trên Bottom Nav, kích thước 48px | **ĐẠT** |
| 6. Virtual Keyboard | Bottom nav tự ẩn khi bàn phím mở, không đè form | **ĐẠT** |
| 7. Form Validation | Hiển thị inline error, không dùng `alert()` | **ĐẠT** |
| 8. Mobile Drawer | Trượt mượt mà, backdrop blur, hỗ trợ phím ESC | **ĐẠT** |
| 9. Mobile Search | Full-screen search, lịch sử tìm kiếm, instant filter | **ĐẠT** |
| 10. Thi Thử Online | 1 câu/màn hình, options >= 48px, chấm điểm server | **ĐẠT** |
| 11. Cổng Học Trực Tuyến | Liên kết nhanh Học viên & Giảng viên tới LMS | **ĐẠT** |
| 12. Modal & Popup | Chuyển thành Bottom Sheet có max-h 90dvh | **ĐẠT** |
| 13. Data Tables | Chuyển thành Mobile Cards trên màn hình nhỏ | **ĐẠT** |
| 14. PWA Manifest | Hợp lệ, có maskable icons, hỗ trợ cài đặt | **ĐẠT** |
| 15. Offline Fallback | Trang ngoại tuyến hoạt động khi mất kết nối | **ĐẠT** |
| 16. Desktop Frozen | Giao diện desktop >= 1024px giữ nguyên 100% | **ĐẠT** |
| 17. Build Check | `npm run build` thành công 74/74 routes | **ĐẠT** |
| 18. Type Check | `npx tsc --noEmit` exit code 0 | **ĐẠT** |
