# Tin học GenZ - Nền Tảng Đào Tạo & Tòa Soạn Tin Công Nghệ Tự Động (Content Engine)

Website: [https://tinhocgenz.io.vn/](https://tinhocgenz.io.vn/)

---

## 🌟 Giới thiệu: Tin học GenZ Content Engine

**Tin học GenZ Content Engine** là module tòa soạn tin tức và AI content tự động hóa 24/7, chuyên thu thập các bản tin công nghệ mới nhất từ các nguồn uy tín hàng đầu thế giới (Microsoft, Google, OpenAI, Cybersecurity, GitHub, The Verge,...), phát hiện trùng lặp, chấm điểm AI Relevance (0-100), biên tập độc lập chuẩn SEO tiếng Việt cho học sinh, sinh viên và nhân viên văn phòng, hỗ trợ quy trình duyệt bài 2 cột chuyên nghiệp và tự động xuất bản tại `/tin-cong-nghe/[slug]`.

---

## 📐 Kiến trúc Hệ thống (System Architecture)

```text
Nguồn tin RSS / ATOM / API
         ↓
Content Collector Service (fast-xml-parser, sanitization, images)
         ↓
Duplicate Checker Service (SHA256 hash, URL normalization, Jaccard similarity > 85%)
         ↓
AI Relevance Engine (0-100 Score: Topic 30%, Freshness 20%, Edu 20%, SEO 15%, Conversion 15%)
         ↓
AI Content Editor Service (Multi-Tone Rewriter, SEO metadata, reading time, contextual CTA)
         ↓
Draft Database Layer (Sources, Articles, Categories, Audit Logs, Social Posts)
         ↓
Admin Review Portal (/admin/content-engine/articles/[id] - 2-Column Review & Edit)
         ↓
Published Article (/tin-cong-nghe/[slug]) + Social Distribution (FB, Zalo, Telegram) + Sitemap Auto-Sync
```

---

## 🚀 Các Tính Năng Đã Triển Khai (Core Features)

1. **Quản lý Nguồn tin (`/admin/content-engine/sources`):**
   - Hỗ trợ RSS 2.0, ATOM Feed, XML, API.
   - Thêm/Sửa/Xóa nguồn, bật/tắt tự động quét, cấu hình tần suất quét (phút).
   - **Test Feed trực tiếp:** Kiểm tra kết nối, định dạng XML, số lượng bài tìm thấy, tiêu đề bài mới nhất và xem trước bài mẫu.
   - Nút **Quét tin tức thì (Fetch Now)** từng nguồn.

2. **Thu thập & Lọc trùng lặp (Collector & Deduplication):**
   - Thu thập không phụ thuộc trang bị lỗi (Fail-safe, Error handling từng nguồn độc lập).
   - So khớp URL gốc, chuẩn hóa loại bỏ UTM tracking parameters.
   - Băm SHA256 và so khớp độ tương đồng tiêu đề (Similarity > 0.85).

3. **Chấm điểm AI Relevance (0 - 100):**
   - Phân loại rõ ràng:
     - `0 - 59`: **REJECTED** (Từ chối)
     - `60 - 79`: **REVIEW** (Chờ duyệt)
     - `80 - 100`: **AI_DRAFT** (Bản nháp chất lượng cao)
   - Bảng phân tích 5 tiêu chí: *Chủ đề (30), Tính cập nhật (20), Giá trị giáo dục (20), Tiềm năng SEO (15), Khả năng chuyển đổi (15)*.

4. **Biên tập AI Độc lập & Chuẩn SEO (AI Content Editor):**
   - **Tuyệt đối không dịch thô / copy nguyên văn**: Lấy dữ kiện cốt lõi và viết lại bài hoàn toàn mới bằng tiếng Việt tự nhiên.
   - Cấu trúc bài chuẩn: *Mở đầu ngắn, Nội dung mới là gì?, Có gì đáng chú ý?, Ảnh hưởng đến công việc thực tế, Ai nên quan tâm?, Cách áp dụng thực tế, Kết luận, Khung nguồn tham khảo gốc*.
   - Hỗ trợ chọn 7 văn phong (Tone): *Dễ hiểu, Ngắn gọn, Chi tiết, Chuyên gia, Chuẩn SEO, Dành cho học sinh, Dành cho dân văn phòng*.
   - Tự động tạo CTA khóa học ngữ cảnh phù hợp (Excel, MOS, IC3, AI,...).

5. **Giao diện Duyệt bài 2 cột (`/admin/content-engine/articles/[id]`):**
   - **Cột trái:** Hiển thị bài gốc (Original Source, URL, tác giả, ngày đăng, nội dung gốc).
   - **Cột phải:** Bài AI viết lại, chỉnh sửa tiêu đề, slug, tóm tắt, nội dung Markdown, SEO meta title/description, tag, chuyên mục, nút Lưu, Duyệt, Từ chối, Xuất bản, Viết lại AI theo Tone.

6. **Phân phối Mạng xã hội (Social Media Generator):**
   - Tự động tạo caption riêng cho **Facebook** (100-200 từ), **Zalo** (50-120 từ), **Telegram** (50-150 từ) kèm link bài viết và nút sao chép 1 chạm.

7. **Trang Báo Công Nghệ Công Khai (`/tin-cong-nghe` & `/tin-cong-nghe/[slug]`):**
   - Giao diện báo chí hiện đại, hiển thị bài nổi bật (Hero Featured), Tabs phân loại theo chủ đề, hộp banner CTA khóa học.
   - Trang chi tiết với Breadcrumb, thời gian đọc, ngày xuất bản, số lượt xem, hộp trích dẫn nguồn tham khảo, cấu trúc dữ liệu Schema.org JSON-LD (Article & BreadcrumbList).

8. **Tự động hóa Cron Job (`/api/cron/content-fetch`):**
   - Bảo mật với `CRON_SECRET`, sẵn sàng kết nối Vercel Cron, Supabase Cron hoặc n8n.

---

## 📡 Danh Sách API Endpoints

| Phương thức | Endpoint | Mô tả |
| :--- | :--- | :--- |
| `GET` | `/api/admin/content/metrics` | Lấy số liệu thống kê tổng quan của tòa soạn |
| `GET / POST` | `/api/admin/content/sources` | Lấy danh sách / Tạo nguồn tin mới |
| `GET / PUT / DELETE` | `/api/admin/content/sources/:id` | Xem chi tiết / Cập nhật / Xóa nguồn tin |
| `POST` | `/api/admin/content/sources/:id/test` | Kiểm tra kết nối Feed RSS thực tế |
| `POST` | `/api/admin/content/fetch` | Kích hoạt quét tin (tất cả hoặc theo sourceId) |
| `GET / POST` | `/api/admin/content/articles` | Lấy danh sách bài viết với bộ lọc / Tạo bài |
| `GET / PATCH / DELETE` | `/api/admin/content/articles/:id` | Xem / Sửa / Xóa bài viết |
| `POST` | `/api/admin/content/articles/:id/ai` | AI chấm điểm hoặc viết lại theo Tone |
| `POST` | `/api/admin/content/articles/:id/approve` | Duyệt bài viết |
| `POST` | `/api/admin/content/articles/:id/reject` | Từ chối bài viết |
| `POST` | `/api/admin/content/articles/:id/publish` | Xuất bản bài viết hoặc lên lịch đăng |
| `POST` | `/api/admin/content/articles/:id/social` | Sinh caption mạng xã hội FB, Zalo, Telegram |
| `GET` | `/api/admin/content/logs` | Lấy nhật ký hoạt động kiểm toán (Audit Logs) |
| `GET / POST` | `/api/cron/content-fetch` | Endpoint Cron định kỳ (xác thực `CRON_SECRET`) |

---

## 🛠️ Cài Đặt & Chạy Môi Trường Cục Bộ (Local Development)

```bash
# 1. Cài đặt các gói phụ thuộc
npm install

# 2. Cấu hình biến môi trường (sao chép từ .env.example)
cp .env.example .env.local

# 3. Chạy server phát triển
npm run dev
```

Mở trình duyệt:
- Bảng điều khiển tòa soạn: `http://localhost:3000/admin/content-engine`
- Trang tin tức công nghệ: `http://localhost:3000/tin-cong-nghe`
- Trang chủ: `http://localhost:3000/`

---

## 🚢 Triển Khai Với Docker

```bash
# Build và chạy với Docker Compose
docker compose up -d --build
```
