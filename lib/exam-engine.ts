/**
 * Server-Side Exam Engine & Grading Service
 * Secure Question Bank & Evaluator for MOS / IC3 certifications
 */

export interface ExamQuestion {
  id: number;
  subject: "MOS Word" | "MOS Excel" | "MOS PowerPoint" | "IC3 GS6";
  skill: string;
  question: string;
  options: string[];
}

interface StoredQuestion extends ExamQuestion {
  correctIndex: number;
  explanation: string;
}

const QUESTION_BANK: StoredQuestion[] = [
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
    ],
    correctIndex: 1,
    explanation: "XLOOKUP là hàm tìm kiếm thế hệ mới trong Excel, hỗ trợ tìm kiếm cả chiều ngang/dọc, không yêu cầu cột tìm kiếm phải nằm đầu tiên và tích hợp sẵn xử lý lỗi #N/A."
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
    ],
    correctIndex: 1,
    explanation: "Bài thi Certiport chấm điểm tự động dựa trên thẻ Heading Styles. Nếu không gán Heading 1, 2, hệ thống chấm thi sẽ không nhận diện được cấu trúc tài liệu."
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
    ],
    correctIndex: 1,
    explanation: "Slide Master là tính năng quản lý bố cục mẹ. Chèn logo hoặc định dạng trên Master Slide sẽ tự động áp dụng cho toàn bộ slide bài thuyết trình."
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
    ],
    correctIndex: 2,
    explanation: "HTTPS (Hypertext Transfer Protocol Secure) sử dụng mã hóa SSL/TLS để bảo vệ thông tin mật khẩu, thẻ tín dụng và dữ liệu người dùng khỏi bị đánh cắp."
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
    ],
    correctIndex: 3,
    explanation: "Freeze Panes cố định phía trên và bên trái của ô được chọn. Do đó muốn cố định hàng 1 và cột A, bạn phải chọn ô B2."
  },
  {
    id: 6,
    subject: "IC3 GS6",
    skill: "Kỹ năng Số & Đám Mây",
    question: "Dịch vụ nào sau đây là giải pháp lưu trữ điện toán đám mây cho phép đồng bộ hóa dữ liệu trực tuyến?",
    options: [
      "VLC Media Player",
      "Microsoft OneDrive",
      "Adobe Photoshop",
      "WinRAR"
    ],
    correctIndex: 1,
    explanation: "OneDrive, Google Drive, Dropbox là các dịch vụ Cloud Storage chính thống giúp sao lưu và làm việc cộng tác thời gian thực."
  }
];

/**
 * Returns public questions sanitized of answers and explanations
 */
export function getSanitizedExamQuestions(): ExamQuestion[] {
  return QUESTION_BANK.map(({ id, subject, skill, question, options }) => ({
    id,
    subject,
    skill,
    question,
    options,
  }));
}

export interface ExamGradingResult {
  totalQuestions: number;
  correctCount: number;
  scaledScore: number;
  passed: boolean;
  percentage: number;
  reviewItems: Array<{
    id: number;
    subject: string;
    skill: string;
    question: string;
    options: string[];
    userAnswerIndex: number | null;
    correctIndex: number;
    isCorrect: boolean;
    explanation: string;
  }>;
  skillAnalysis: Array<{
    skill: string;
    subject: string;
    total: number;
    correct: number;
    percent: number;
    status: "Thành thạo" | "Cần cải thiện" | "Yếu";
  }>;
}

/**
 * Server-side evaluation of student answers
 */
export function gradeExamAttempt(answers: Record<number, number>): ExamGradingResult {
  let correctCount = 0;
  const reviewItems = [];
  const skillMap = new Map<string, { subject: string; total: number; correct: number }>();

  for (const q of QUESTION_BANK) {
    const userAnswer = answers[q.id] !== undefined ? answers[q.id] : null;
    const isCorrect = userAnswer === q.correctIndex;

    if (isCorrect) correctCount++;

    reviewItems.push({
      id: q.id,
      subject: q.subject,
      skill: q.skill,
      question: q.question,
      options: q.options,
      userAnswerIndex: userAnswer,
      correctIndex: q.correctIndex,
      isCorrect,
      explanation: q.explanation,
    });

    const curr = skillMap.get(q.skill) || { subject: q.subject, total: 0, correct: 0 };
    curr.total += 1;
    if (isCorrect) curr.correct += 1;
    skillMap.set(q.skill, curr);
  }

  const totalQuestions = QUESTION_BANK.length;
  const scaledScore = Math.round((correctCount / totalQuestions) * 1000);
  const percentage = Math.round((correctCount / totalQuestions) * 100);
  const passed = scaledScore >= 700; // Certiport 700/1000 pass benchmark

  const skillAnalysis = Array.from(skillMap.entries()).map(([skill, data]) => {
    const percent = Math.round((data.correct / data.total) * 100);
    let status: "Thành thạo" | "Cần cải thiện" | "Yếu" = "Thành thạo";
    if (percent < 50) status = "Yếu";
    else if (percent < 80) status = "Cần cải thiện";

    return {
      skill,
      subject: data.subject,
      total: data.total,
      correct: data.correct,
      percent,
      status,
    };
  });

  return {
    totalQuestions,
    correctCount,
    scaledScore,
    passed,
    percentage,
    reviewItems,
    skillAnalysis,
  };
}
