# Đặc Tả Phân Tích Dữ Liệu Học Tập (Learning Analytics Specification)

**Dự án**: Tin Học Gen Z  
**Mục tiêu**: Đo lường hành trình học tập, hiệu quả đào tạo và tỷ lệ giữ chân học viên theo chuẩn dữ liệu học trực tuyến.  

---

## 1. Định nghĩa các chỉ số đo lường chính (Core Metrics & KPIs)

### 1.1. Tỷ lệ Kích Hoạt (Activation Rate)
- **Định nghĩa**: Tỷ lệ học viên mới hoàn thành ít nhất 1 bài học hoặc 1 bài tập trắc nghiệm hợp lệ trong vòng 7 ngày đầu tiên kể từ lần truy cập đầu tiên.
- **Công thức**:
  $$\text{Activation Rate} = \frac{\text{Số học viên hoàn thành } \ge 1 \text{ bài học trong 7 ngày}}{\text{Tổng số học viên mới có đủ 7 ngày quan sát}} \times 100\%$$
- **Mục tiêu tối thiểu**: $\ge 65\%$ đối với học viên bắt đầu học thử.

### 1.2. Tỷ lệ Hoàn Thành Khóa Học (Course Completion Rate)
- **Định nghĩa**: Tỷ lệ học viên hoàn thành 100% các bài học và bài tập yêu cầu trong khóa học đối với cohort học viên bắt đầu khóa.
- **Công thức**:
  $$\text{Completion Rate} = \frac{\text{Số học viên hoàn thành toàn bộ bài học trong khóa}}{\text{Số học viên đã bắt đầu bài học đầu tiên trong cùng cohort}} \times 100\%$$
- **Quy tắc**: Chỉ tính khi cohort đã trải qua thời gian quan sát tối thiểu bằng 2 lần thời lượng khóa học (ví dụ: khóa 3 tuần thì thời gian quan sát là 6 tuần).

### 1.3. Tỷ lệ Giữ Chân Ngày Thứ 7 (D7 Retention Rate)
- **Định nghĩa**: Tỷ lệ người dùng quay lại và có ít nhất 1 hoạt động học tập hợp lệ (`lesson_start`, `exercise_submit`, hoặc `lesson_complete`) vào đúng ngày thứ 7 ($\pm 24$ giờ) sau ngày kích hoạt.
- **Công thức**:
  $$\text{D7 Retention} = \frac{\text{Số người có hoạt động học tập vào Ngày 7}}{\text{Tổng số người trong cohort ngày 0 có đủ thời gian quan sát}} \times 100\%$$
- **Lưu ý thống nhất**: Sử dụng múi giờ chuẩn Việt Nam (`Asia/Ho_Chi_Minh` - GMT+7).

---

## 2. Danh mục sự kiện theo dõi (Tracking Events Schema)

Mọi sự kiện đều tuân thủ nguyên tắc bảo vệ quyền riêng tư (Privacy-by-Design):
- **TUYỆT ĐỐI KHÔNG** gửi email, mật khẩu, họ tên thật, số điện thoại hoặc đáp án chi tiết của bài thi vào payload.
- Sử dụng mã định danh giả danh (Pseudonymous Session ID / User ID).

| Tên sự kiện | Thời điểm kích hoạt | Payload bắt buộc | Mục đích đo lường |
| :--- | :--- | :--- | :--- |
| `course_view` | Khi học viên mở xem trang chi tiết khóa học | `event_id`, `timestamp`, `course_id`, `category` | Đo lường mức độ quan tâm của khóa học |
| `lesson_start` | Khi học viên mở trang bài học lần đầu | `event_id`, `timestamp`, `course_id`, `lesson_id`, `session_id` | Đo lường lượt bắt đầu học (Top-of-funnel bài học) |
| `lesson_complete` | Khi học viên hoàn thành bài đọc và bài tập | `event_id`, `timestamp`, `course_id`, `lesson_id`, `time_spent_seconds` | Đo lường tỷ lệ hoàn thành bài học (Idempotent) |
| `exercise_submit` | Khi học viên bấm nộp bài tập thực hành | `event_id`, `timestamp`, `course_id`, `lesson_id`, `exercise_id`, `attempt_count` | Đo lường mức độ tương tác thực hành |
| `exercise_result` | Khi hệ thống trả kết quả chấm bài | `event_id`, `timestamp`, `course_id`, `exercise_id`, `is_correct` (boolean) | Đo lường độ khó và tỷ lệ giải đúng |
| `resume_learning` | Khi học viên nhấp vào nút "Tiếp tục học" trên trang chủ | `event_id`, `timestamp`, `course_id`, `last_lesson_id` | Đo lường hiệu quả lối tắt quay lại học |

---

## 3. Cấu trúc Payload chuẩn (Standard Event Payload)

```typescript
export interface LearningAnalyticsEvent {
  event_id: string;          // UUID v4 duy nhất chống trùng lặp
  event_name: 
    | "course_view"
    | "lesson_start"
    | "lesson_complete"
    | "exercise_submit"
    | "exercise_result"
    | "resume_learning";
  timestamp: string;         // ISO 8601 UTC
  session_id: string;        // Pseudonymous ID tạo từ browser session
  user_id?: string;          // Pseudonymous Hash nếu đã đăng nhập
  course_id?: string;
  lesson_id?: string;
  exercise_id?: string;
  content_type?: "mos-word" | "mos-excel" | "mos-powerpoint" | "ic3" | "python" | "general";
  is_correct?: boolean;
  time_spent_seconds?: number;
  metadata?: Record<string, string | number | boolean>;
}
```

---

## 4. Quy tắc chống dữ liệu ảo & Gửi trùng (De-duplication)
1. **Idempotency**: Sự kiện `lesson_complete` cho cùng một cặp `{ course_id, lesson_id }` chỉ được ghi nhận tăng số lượng hoàn thành duy nhất 1 lần trong 1 phiên học. Nếu người dùng refresh hoặc làm lại, chỉ ghi nhận là `exercise_submit` bổ sung.
2. **Loại trừ bot & Admin test**: Bộ lọc tự động bỏ qua các user agent của bot tìm kiếm (Googlebot, Bingbot) và các tài khoản thuộc nhóm quản trị viên (`role: admin`, `role: super_admin`).

