import { ExamQuestion } from "@/lib/exam-engine";

export const INITIAL_PUBLIC_QUESTIONS: ExamQuestion[] = [
  {
    id: 1,
    subject: "MOS Excel",
    skill: "Hàm & Công thức Tìm kiếm",
    question: "Trong Excel 2019/365, hàm nào được khuyến nghị thay thế cho sự kết hợp giữa INDEX và MATCH để tìm kiếm linh hoạt cả 2 chiều?",
    options: [
      "Hàm VLOOKUP",
      "Hàm XLOOKUP",
      "Hàm HLOOKUP",
      "Hàm SEARCH"
    ]
  },
  {
    id: 2,
    subject: "MOS Word",
    skill: "Cấu trúc Văn bản & Heading",
    question: "Trong đề thi MOS Word 2019, để tạo mục lục tự động đúng chuẩn bài thi Certiport, bạn cần định dạng các tiêu đề trước bằng công cụ nào?",
    options: [
      "Bôi đậm và tăng kích cỡ chữ thủ công",
      "Sử dụng các Heading Styles (Heading 1, 2, 3) trong thẻ Home",
      "Sử dụng Bookmark và Hyperlink",
      "Tạo bảng Table 2 cột để gõ số trang"
    ]
  },
  {
    id: 3,
    subject: "MOS PowerPoint",
    skill: "Slide Master & Định dạng Mẹ",
    question: "Để đồng bộ logo trường/công ty xuất hiện trên tất cả các Slide mà không phải chèn thủ công từng trang, bạn phải thao tác ở đâu?",
    options: [
      "Chèn vào Slide 1 rồi sao chép dán lần lượt",
      "Thẻ View -> Chọn Slide Master",
      "Thẻ Design -> Chọn Format Background",
      "Thẻ Transitions -> Chọn Apply To All"
    ]
  },
  {
    id: 4,
    subject: "IC3 GS6",
    skill: "An toàn Không gian mạng",
    question: "Giao thức nào dưới đây đảm bảo dữ liệu truyền tải giữa trình duyệt web và máy chủ được mã hóa bảo mật SSL/TLS an toàn?",
    options: [
      "HTTP",
      "FTP",
      "HTTPS",
      "SMTP"
    ]
  },
  {
    id: 5,
    subject: "MOS Excel",
    skill: "Quản lý Bảng tính & View",
    question: "Khi muốn cố định cả cột A và dòng 1 trong Excel để khi cuộn trang dữ liệu không bị trôi, bạn đặt con trỏ tại ô nào trước khi chọn Freeze Panes?",
    options: [
      "Ô A1",
      "Ô B1",
      "Ô A2",
      "Ô B2"
    ]
  }
];

