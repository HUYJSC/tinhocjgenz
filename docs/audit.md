# Báo Cáo Kiểm Toán Toàn Diện (Audit Report) - Tin Học Gen Z

**Dự án**: Tin Học Gen Z ([https://www.tinhocgenz.io.vn/](https://www.tinhocgenz.io.vn/))  
**Vai trò**: Technical Lead (BA, DA, BE, FE, SEC, UI/UX, QA)  
**Thời gian khảo sát**: 15/09/2026  
**Môi trường khảo sát**: Production Vercel (`dinhhuy05707/tinhocgenz`), GitHub (`HUYJSC/tinhocjgenz`), Local Node.js / Turbopack  

---

## 1. Mục lục & Bảng tổng hợp các phát hiện

| ID | Vấn đề / Khảo sát | Trạng thái | Mức ưu tiên | Tác động | Trạng thái xử lý |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **AUD-01** | URL Production chuyển hướng "Log in to Vercel" | **CONFIRMED** | **P0** | Khách không thể xem website công khai | **Đã sửa & Xác minh** |
| **AUD-02** | Apex domain `tinhocgenz.io.vn` bị vòng lặp 308 redirect | **CONFIRMED** | **P0** | Truy cập domain gốc không có `www` bị lỗi vòng lặp | **Đã xác minh nguyên nhân DNS** |
| **AUD-03** | Thiếu trọn vẹn luồng học tập tương tác (CodeLearn model) | **CONFIRMED** | **P1** | Học viên không xem được bài học mẫu, không làm được bài tập tương tác, không lưu tiến độ | **Đang triển khai** |
| **AUD-04** | Trang danh mục `/khoa-hoc` thiếu thanh tìm kiếm tiếng Việt và đồng bộ URL | **CONFIRMED** | **P1** | Khó khám phá nội dung khóa học theo từ khóa | **Đang triển khai** |
| **AUD-05** | Trang chủ chưa có trạng thái "Tiếp tục học" cho học viên có tiến độ | **CONFIRMED** | **P1** | Tỷ lệ quay lại (Retention) giảm do thiếu lối tắt | **Đang triển khai** |
| **AUD-06** | Thiếu abstraction theo dõi hành vi học tập (Learning Analytics Events) | **CONFIRMED** | **P1** | Không đo lường được Activation, Completion và D7 Retention | **Đang triển khai** |
| **AUD-07** | Phân quyền route riêng tư & bảo vệ dữ liệu nội bộ | **CONFIRMED** | **P0** | Cần đảm bảo khi mở public site, các route `/admin`, `/portal/*`, `/api/admin/*` vẫn được bảo vệ | **Đã kiểm chứng (Pass)** |

---

## 2. Chi tiết từng phát hiện

### AUD-01: Cổng Vercel Deployment Protection (SSO) chặn khách truy cập
- **Trạng thái**: `CONFIRMED`
- **Mức ưu tiên**: `P0`
- **Bằng chứng**:
  - Request trực tiếp: `curl -I https://www.tinhocgenz.io.vn/` trả về:
    `HTTP/2 302`  
    `Location: https://vercel.com/sso-api?url=https%3A%2F%2Fwww.tinhocgenz.io.vn%2F&nonce=...`  
    `Set-Cookie: _vercel_sso_nonce=...; Max-Age=3600; Path=/; Secure; HttpOnly; SameSite=Lax`
  - Kiểm tra cấu hình qua Vercel CLI:
    `vercel project protection tinhocgenz --json`
    ```json
    {
      "projectId": "prj_NnSR3lS6rguIJIgmFtt8RMSwCOrd",
      "name": "tinhocgenz",
      "ssoProtection": {
        "deploymentType": "all_except_custom_domains"
      },
      "gitForkProtection": true
    }
    ```
  - **Nguyên nhân gốc**: Dự án Vercel `tinhocgenz` được bật chế độ `ssoProtection` với thiết lập `all_except_custom_domains`. Tuy nhiên, trong danh sách Custom Domains của project chỉ có `tinhocgenz.io.vn`, còn `www.tinhocgenz.io.vn` thực chất là một alias trỏ đến preview deployment `tinhocgenz-3aciwb7xa-dinhhuy05707.vercel.app`. Do đó Vercel xử lý nó như một deployment chưa được miễn trừ SSO và yêu cầu đăng nhập tài khoản Vercel.
  - **Cách xử lý**:
    Chạy lệnh quản trị Vercel: `vercel project protection disable tinhocgenz --sso`.
  - **Tiêu chí nghiệm thu**:
    - Khách ẩn danh gửi HTTP request tới `https://www.tinhocgenz.io.vn/` nhận mã `200 OK`, hiển thị trọn vẹn HTML trang chủ mà không xuất hiện màn hình đăng nhập Vercel.
    - Đã kiểm chứng: `https://www.tinhocgenz.io.vn/` trả về `200 OK`.

---

### AUD-02: Apex Domain `tinhocgenz.io.vn` gặp vòng lặp 308
- **Trạng thái**: `CONFIRMED`
- **Mức ưu tiên**: `P0`
- **Bằng chứng**:
  - `curl -I https://tinhocgenz.io.vn/` trả về:
    `HTTP/2 308`  
    `Location: https://tinhocgenz.io.vn/`  
    `server: Vercel`  
    `x-osh-dp: hn01-dnsgr01-dataplan01`
  - DNS lookup:
    - `www.tinhocgenz.io.vn` -> CNAME `cname.vercel-dns.com` -> IP Vercel Anycast `76.76.21.98` (Hoạt động tốt).
    - `tinhocgenz.io.vn` -> A record `103.166.183.10`, `103.216.118.10` (Trỏ về máy chủ DNS proxy bên thứ 3 của nhà đăng ký tên miền, tự redirect vòng lặp tới chính nó).
  - **Khuyến nghị**: Trên trang quản lý DNS nhà cung cấp tên miền (hoalu.vclouddns.com), cập nhật bản ghi `@` trỏ trực tiếp về IP Anycast của Vercel: `76.76.21.21` hoặc thiết lập Redirect 301 sang `https://www.tinhocgenz.io.vn/`.

---

### AUD-03: Thiếu vòng học tương tác hoàn chỉnh (CodeLearn principles)
- **Trạng thái**: `CONFIRMED`
- **Mức ưu tiên**: `P1`
- **Bằng chứng**:
  - URL: `https://www.tinhocgenz.io.vn/khoa-hoc/[id]`
  - Hiện tại, trang chi tiết khóa học chỉ có danh sách lộ trình tĩnh (Syllabus Module) và form liên hệ đăng ký tư vấn offline.
  - Học viên không thể bấm vào học thử bài học trực tiếp, không có giao diện học bài (Lesson Viewer) với mục lục bài học, nội dung thực hành và bài tập trắc nghiệm/thực hành kèm phản hồi đúng/sai và giải thích chi tiết.
  - Không có cơ chế lưu trữ tiến độ (Lesson Progress) trên server và đồng bộ local draft.
  - **Cách xử lý**:
    1. Xây dựng cấu trúc dữ liệu khóa học mở rộng gồm các chương (chapters), bài học (lessons) và câu hỏi bài tập (exercises/quizzes) chuẩn chuyên môn tin học (Excel, Word, PowerPoint, IC3, Python).
    2. Tạo route học tập tương tác: `/khoa-hoc/[id]/bai-hoc/[lessonId]`:
       - Mục lục bài học bên trái (Desktop) hoặc Drawer thu gọn (Mobile).
       - Khung nội dung bài học rõ ràng, chuẩn typographic.
       - Khu vực làm bài tập thực hành (Exercise / Quiz) với validation, hiển thị kết quả đúng/sai kèm lời giải chi tiết.
       - Nút điều hướng "Bài trước" / "Bài tiếp theo" và nút đánh dấu hoàn thành.
    3. Xây dựng API `/api/learning/progress` xử lý lưu và đồng bộ tiến độ học tập (idempotent, chống cộng trùng).

---

### AUD-04: Danh mục khóa học `/khoa-hoc` thiếu tìm kiếm & bộ lọc động
- **Trạng thái**: `CONFIRMED`
- **Mức ưu tiên**: `P1`
- **Bằng chứng**:
  - File: `app/khoa-hoc/page.tsx`.
  - Chỉ có 3 nút lọc category tĩnh (`all`, `mos-ic3`, `practical-office`).
  - Thiếu ô nhập tìm kiếm theo từ khóa (hỗ trợ tiếng Việt không dấu và có dấu).
  - Thiếu đồng bộ query param URL (`?q=...&category=...`) để chia sẻ liên kết tìm kiếm.
  - Thiếu trạng thái rỗng (Empty state) với nút "Xóa bộ lọc".
  - **Cách xử lý**: Nâng cấp `app/khoa-hoc/page.tsx` bổ sung thanh tìm kiếm, hàm chuẩn hóa tiếng Việt không dấu, lọc theo cấp độ, đồng bộ URL `useSearchParams` và Empty State thân thiện.

---

### AUD-05: Trang chủ thiếu khối "Tiếp tục học" (Resume Learning)
- **Trạng thái**: `CONFIRMED`
- **Mức ưu tiên**: `P1`
- **Bằng chứng**:
  - File: `components/HeroSection.tsx` & `app/page.tsx`.
  - Khách truy cập hoặc học viên quay lại không thấy khóa học/bài học gần nhất mình đang học dở để tiếp tục chỉ với 1 click.
  - **Cách xử lý**: Tạo component `ContinueLearningWidget` hiển thị trên trang chủ khi phát hiện tiến độ gần nhất (từ server hoặc local draft), hiển thị tên bài học, tỷ lệ % và nút "Tiếp tục học".

---

### AUD-06: Thiếu hệ thống phân tích đo lường học tập (Learning Analytics)
- **Trạng thái**: `CONFIRMED`
- **Mức ưu tiên**: `P1`
- **Bằng chứng**:
  - File: `lib/analytics.ts`.
  - Hiện tại mới chỉ có hàm track cơ bản, chưa chuẩn hóa các sự kiện hành vi học tập: `course_view`, `lesson_start`, `lesson_complete`, `exercise_submit`, `exercise_result`, `resume_learning`.
  - **Cách xử lý**: Mở rộng `lib/analytics.ts` với đầy đủ payload phi định danh (pseudonymous), không chứa thông tin nhạy cảm (PII), chống gửi trùng và tài liệu hóa định nghĩa chỉ số trong `docs/analytics.md`.

---

### AUD-07: Bảo mật Route riêng tư khi mở Public Site
- **Trạng thái**: `CONFIRMED (PASS)`
- **Mức ưu tiên**: `P0`
- **Bằng chứng kiểm thử thực tế**:
  - `/portal/student` -> 307 Redirect tới LMS Login.
  - `/portal/teacher` -> 307 Redirect tới LMS Login.
  - `/portal/academic` -> 307 Redirect tới LMS Login.
  - `/api/admin/courses` -> 403 Forbidden.
  - `/admin` -> Được bảo vệ nghiêm ngặt qua `AdminAuthGate` và `proxy.ts`.
  - **Kết luận**: Tính toàn vẹn và bảo mật của các route nội bộ được giữ vững 100% khi trang chủ và danh mục mở cho công chúng.
