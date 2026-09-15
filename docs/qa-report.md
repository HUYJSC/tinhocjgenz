# Báo Cáo Kiểm Thử Toàn Diện (QA & Test Report) - Tin Học Gen Z

**Ngày kiểm thử**: 15/09/2026  
**Người thực hiện**: Technical Lead QA  
**Phạm vi**: P0 (Quyền truy cập công khai & Bảo mật route nội bộ), P1 (Vòng học tập tương tác CodeLearn, Tìm kiếm tiếng Việt, Lưu tiến độ Idempotent, Analytics)  

---

## 1. Bảng Tổng Hợp Kết Quả Kiểm Thử (65/65 PASS - 100%)

| Test Suite | Phạm vi kiểm thử | Số test case | Trạng thái |
| :--- | :--- | :--- | :--- |
| **Sprint 0 & 1** | Robots.txt, Noindex header, Proxy trailing slash, PBKDF2/MFA, Xóa mã giả | 12 | **12 PASS, 0 FAIL** |
| **Sprint 2** | Ma trận Granular RBAC, Chống leo thang quyền, Khóa tài khoản, Migration 43 bảng, RLS | 15 | **15 PASS, 0 FAIL** |
| **Sprint 3** | Enterprise Audit Service, Anti-Secret Leak, Event ID, Bộ lọc Severity, Gỡ Blockchain giả | 9 | **9 PASS, 0 FAIL** |
| **Sprint 4** | Kho khóa học (Integer VND), Lịch khai giảng (Slots), CRM Leads (Masking PII), Kho Media | 12 | **12 PASS, 0 FAIL** |
| **Sprint 5** | Chuẩn hóa tiếng Việt không dấu, Cấu trúc bài học, Chấm điểm bài tập, Idempotent Progress | 17 | **17 PASS, 0 FAIL** |
| **TỔNG CỘNG** | **Toàn bộ hệ thống Tin Học Gen Z** | **65** | **65 PASS, 0 FAIL (100%)** |

---

## 2. Ma Trận Nghiệm Thu Tính Năng (Acceptance Verification Matrix)

| Kịch bản kiểm thử | Hành vi kỳ vọng | Kết quả thực tế | Trạng thái |
| :--- | :--- | :--- | :--- |
| **TC-01: Truy cập trang chủ ẩn danh (Guest Session)** | Mở `https://www.tinhocgenz.io.vn/` không xuất hiện màn hình "Log in to Vercel" | Trả mã `HTTP 200 OK`, hiển thị trọn vẹn trang chủ Tin Học Gen Z | **PASS** |
| **TC-02: Bảo vệ Route Quản trị & Cổng nội bộ** | Truy cập `/portal/student`, `/portal/teacher`, `/portal/academic`, `/api/admin/*` không có session | Chuyển hướng 307 về cổng LMS hoặc trả mã 403 Forbidden | **PASS** |
| **TC-03: Tìm kiếm khóa học không dấu** | Gõ từ khóa `excel thuc chien` trên ô tìm kiếm `/khoa-hoc` | Hiển thị đúng khóa "Excel Thực Chiến & Dashboard Báo Cáo Doanh nghiệp" | **PASS** |
| **TC-04: Tìm kiếm khóa học chữ hoa / viết tắt** | Gõ `MOS`, `IC3`, `WORD` | Hiển thị chính xác các khóa thuộc nhóm tương ứng | **PASS** |
| **TC-05: Đồng bộ URL query params** | Nhập từ khóa tìm kiếm và chọn category trên `/khoa-hoc` | URL tự động cập nhật `?q=...&category=...`, tải lại trang giữ nguyên kết quả | **PASS** |
| **TC-06: Trạng thái rỗng (Empty State)** | Tìm kiếm từ khóa không tồn tại `xyz123abc` | Hiển thị khung thông báo thân thiện kèm nút "Xóa bộ lọc & Xem tất cả" | **PASS** |
| **TC-07: Bắt đầu học từ trang chi tiết** | Nhấp nút "Bắt Đầu Học Ngay (Học Thử)" trên trang chi tiết khóa học | Dẫn thẳng vào bài học 1: `/khoa-hoc/[id]/bai-hoc/[lessonId]` | **PASS** |
| **TC-08: Giao diện học bài (Lesson Viewer)** | Cột trái mục lục chương/bài, khu vực trung tâm lý thuyết, mẹo thi Certiport | Layout rõ ràng, typographic chuẩn (line-height 1.6), responsive drawer trên mobile | **PASS** |
| **TC-09: Làm bài tập & Chấm điểm tức thì** | Chọn đáp án trắc nghiệm -> Bấm "Kiểm tra kết quả" | Hiển thị trạng thái đang chấm -> Thông báo Đúng (Xanh) hoặc Sai (Đỏ) kèm lời giải chi tiết | **PASS** |
| **TC-10: Lưu tiến độ Idempotent** | Học viên hoàn thành bài tập -> Bấm "Hoàn thành bài học" | Lưu tiến độ vào server và localStorage; gửi trùng lặp không bị nhân đôi điểm | **PASS** |
| **TC-11: Khối "Tiếp tục học" trên Trang chủ** | Sau khi học dở bài 1, quay lại trang chủ | Xuất hiện thanh banner "Tiếp tục học: [Tên bài] • [Tên khóa]", bấm vào học tiếp ngay | **PASS** |

---

## 3. Kiểm thử Hiệu năng & Khả năng Tiếp cận (Performance & Accessibility)

- **Mục tiêu WCAG 2.2 AA**:
  - Độ tương phản chữ thường $\ge 4.5:1$ (chữ màu `#0f172a` trên nền trắng `#ffffff`, chữ `#1e293b` trên nền `#f8fafc`).
  - Vùng bấm các nút bấm, tab và thẻ lựa chọn đạt tối thiểu $44 \times 44$ px hoặc `min-h-[48px]`.
  - Hỗ trợ đầy đủ thuộc tính ARIA (`role="tablist"`, `role="tab"`, `aria-selected`, `role="radiogroup"`, `aria-label`).
- **Responsive Viewport Testing**:
  - Mobile nhỏ: $360 \times 640$ px (Samsung Galaxy, iPhone SE).
  - Mobile tiêu chuẩn: $390 \times 844$ px (iPhone 14/15/16).
  - Tablet: $768 \times 1024$ px (iPad).
  - Desktop: $1024 \times 768$ px và $1440 \times 900$ px.
  - Không xuất hiện hiện tượng tràn ngang màn hình (Horizontal Overflow), mục lục bài học tự động thu gọn thành Drawer cảm ứng trên mobile.

---

## 4. Các hạn chế & Phần chưa kiểm tra (Non-tested / P2 Scope)

1. **Python Sandbox Execution (P2)**: Hệ thống hiện tại tập trung vào các câu hỏi trắc nghiệm và tình huống thực hành thao tác tin học văn phòng (Word, Excel, PowerPoint, IC3). Tính năng biên dịch và thực thi mã nguồn Python trực tiếp trên trình duyệt sẽ cần triển khai môi trường WebAssembly/Pyodide tách biệt trong Sprint tiếp theo.
2. **Apex Domain 308 Loop**: Phụ thuộc vào việc quản trị viên cập nhật bản ghi DNS `@` trên trang quản lý tên miền bên thứ 3 (`hoalu.vclouddns.com`) trỏ về IP Vercel `76.76.21.21`. Tên miền chính `www.tinhocgenz.io.vn` hoạt động ổn định 100%.

