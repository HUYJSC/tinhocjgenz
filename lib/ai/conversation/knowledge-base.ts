/**
 * Official Knowledge Base for Tin Học Gen Z
 * Grounded educational information regarding certifications, formats, tuition policies, and exams.
 */

export interface KnowledgeEntry {
  topic: string;
  title: string;
  content: string;
  highlights?: string[];
}

export const KNOWLEDGE_BASE: Record<string, KnowledgeEntry> = {
  mos_overview: {
    topic: "mos_overview",
    title: "Chứng chỉ Tin học Quốc tế MOS (Microsoft Office Specialist)",
    content:
      "MOS (Microsoft Office Specialist) là chứng chỉ tin học văn phòng quốc tế do tập đoàn Microsoft trực tiếp cấp bằng, có giá trị trọn đời trên toàn thế giới. Bài thi gồm các môn độc lập: Word, Excel, PowerPoint (ở các phiên bản phổ biến 2019/365). Đạt điểm từ 700/1000 là được cấp chứng chỉ chuẩn quốc tế, thường dùng để miễn chuẩn đầu ra đại học và nâng tầm CV tuyển dụng.",
    highlights: [
      "Chứng chỉ do Microsoft cấp, giá trị toàn cầu vĩnh viễn",
      "Thi thực hành 100% trên phần mềm mô phỏng Certiport/IIG",
      "Các môn phổ biến nhất: Excel, Word, PowerPoint",
    ],
  },

  ic3_overview: {
    topic: "ic3_overview",
    title: "Chứng chỉ Tin học Số Quốc tế IC3 GS6",
    content:
      "IC3 GS6 (Internet and Computing Core Certification - Global Standard 6) là tiêu chuẩn quốc tế đánh giá năng lực sử dụng máy tính, thiết bị số và mạng Internet. IC3 GS6 chia làm 3 Level: Level 1 (Nền tảng công nghệ số), Level 2 (Kỹ năng ứng dụng văn phòng & số), Level 3 (Cuộc sống & an toàn trực tuyến). Hoàn thành mỗi level đều có chứng chỉ thành phần, và hoàn thành cả 3 level được cấp chứng chỉ Master IC3 GS6 toàn cầu.",
    highlights: [
      "Được công nhận tại hơn 150 quốc gia",
      "Tiêu chuẩn công nghệ số toàn diện, hợp sinh viên & học sinh",
      "Gồm 3 cấp độ (Level 1, 2, 3) đo lường tư duy số thế hệ mới",
    ],
  },

  mos_vs_ic3: {
    topic: "mos_vs_ic3",
    title: "So sánh MOS và IC3 GS6",
    content:
      "Điểm khác biệt cốt lõi:\n• MOS: Đi sâu vào từng phần mềm chuyên biệt (Word, Excel, PowerPoint) ở cấp độ chuyên nghiệp, rất phù hợp cho sinh viên cần hoàn thành chuẩn đầu ra đại học hoặc người đi làm cần xử lý văn bản, bảng tính phức tạp.\n• IC3 GS6: Rộng và tổng quát hơn, kiểm tra tư duy công nghệ, thiết bị số, mạng Internet, an toàn thông tin và ứng dụng văn phòng cơ bản.\n👉 Nếu trường của bạn yêu cầu cụ thể MOS hoặc bạn muốn master Excel/Word: hãy chọn MOS.\n👉 Nếu trường yêu cầu IC3 hoặc muốn chuẩn hóa kiến thức CNTT tổng quát: hãy chọn IC3 GS6.",
    highlights: [
      "MOS: Chuyên sâu từng công cụ Office (Excel, Word, PPT)",
      "IC3: Bao quát toàn diện tư duy số và an toàn mạng",
    ],
  },

  tuition_policy: {
    topic: "tuition_policy",
    title: "Chính sách Học phí & Cam kết tại Tin Học Gen Z",
    content:
      "Học phí tại Tin Học Gen Z được tối ưu theo gói môn: dao động từ 850.000đ – 1.650.000đ/môn (và các gói Combo 2-3 môn ưu đãi chỉ từ 1.950.000đ). Toàn bộ khóa học đều áp dụng chính sách: Cam kết bao đỗ 100% tại IIG/Certiport, học lại HOÀN TOÀN MIỄN PHÍ 0đ nếu chưa đạt, tặng kèm tài khoản phần mềm thi thử bản quyền trị giá 500.000đ và được trợ giảng kèm 1:1 suốt quá trình học.",
    highlights: [
      "Học phí hợp lý dành riêng cho sinh viên & người đi làm",
      "Cam kết đỗ 100% - Học lại 0đ nếu thi chưa đạt",
      "Kèm 1:1 giải đáp thắc mắc không giới hạn",
    ],
  },

  guarantee_policy: {
    topic: "guarantee_policy",
    title: "Cam kết bao đỗ & Quyền lợi học viên",
    content:
      "Tin Học Gen Z áp dụng chính sách Cam Kết Đỗ 100% bằng văn bản. Học viên được học với ngân hàng đề thi bám sát thực tế nhất từ Certiport. Nếu trong kỳ thi chính thức bạn không may chưa đạt điểm, trung tâm sẽ hoàn toàn bảo hành đào tạo lại miễn phí 100% và hỗ trợ luyện đề 1:1 cho tới khi bạn cầm được bằng trên tay.",
    highlights: [
      "Cam kết chất lượng đầu ra bằng hợp đồng đào tạo",
      "Luyện đề thực chiến sát 99% đề thi thật",
      "Bảo hành học lại trọn đời không phát sinh chi phí",
    ],
  },

  study_format: {
    topic: "study_format",
    title: "Hình thức & Lịch học",
    content:
      "Trung tâm có 2 hình thức linh hoạt:\n1. Online kèm 1:1 tương tác trực tiếp qua Google Meet/Zoom: Giờ học tự chọn theo lịch rảnh của bạn (sáng, chiều hoặc các ca tối 19h - 22h), có video quay lại buổi học.\n2. Trực tiếp tại cơ sở: Trang bị phòng máy tính cấu hình cao, giảng viên hỗ trợ ngay tại chỗ.\nBạn có thể chủ động đổi lịch nếu bận đột xuất.",
    highlights: [
      "Học Online 1:1 chủ động thời gian hoặc Offline phòng lab chuẩn",
      "Ca tối linh hoạt từ 19h - 22h mỗi ngày",
      "Có video xem lại bài học trọn đời",
    ],
  },

  exam_difficulty: {
    topic: "exam_difficulty",
    title: "Độ khó của kỳ thi MOS / IC3",
    content:
      "Kỳ thi MOS và IC3 không hề khó như bạn nghĩ nếu học đúng phương pháp. Bài thi là dạng thực hành thao tác từng bước (Multi-project / Task-based). Tại Tin Học Gen Z, hơn 95% học viên mất gốc chỉ sau 2–4 tuần luyện tập đã đạt điểm 850–1000/1000 ngay lần thi đầu tiên nhờ bám sát dạng đề và mẹo tránh bẫy thao tác.",
    highlights: [
      "Mất gốc từ số 0 vẫn hoàn toàn đạt kết quả cao",
      "Lộ trình chia nhỏ từng task dễ nhớ, dễ hiểu",
      "Trợ giảng sửa lỗi sai thao tác từng li từng tí",
    ],
  },

  excel_skills: {
    topic: "excel_skills",
    title: "Khóa học Excel thực chiến từ số 0 đến đi làm",
    content:
      "Khóa học Excel tại Tin Học Gen Z tập trung vào kỹ năng làm việc thực tế: từ các hàm cơ bản đến hàm nâng cao (VLOOKUP, INDEX/MATCH, XLOOKUP), xử lý dữ liệu với PivotTable, tự động hóa với Power Query và thiết kế Dashboard báo cáo chuyên nghiệp. Khóa kéo dài 10 - 12 buổi, phù hợp cả cho người mất gốc lẫn người muốn nâng cao tốc độ làm việc.",
    highlights: [
      "Học thực hành 100% trên số liệu thực tế doanh nghiệp",
      "Kèm 1:1 từ cách định dạng đến lập Dashboard tự động",
      "Tặng kho tài liệu và 50+ file mẫu Excel văn phòng",
    ],
  },

  python_starter: {
    topic: "python_starter",
    title: "Lập trình Python cho người mới bắt đầu",
    content:
      "Khóa học Python cho người mới bắt đầu được thiết kế đặc biệt cho Gen Z chưa từng học lập trình. Bạn sẽ được rèn luyện tư duy logic, cú pháp hiện đại, xử lý dữ liệu và tự động hóa các tác vụ hàng ngày qua các dự án mini thực tiễn. Khóa kéo dài 10 buổi với lộ trình rõ ràng, dễ tiếp cận.",
    highlights: [
      "Xây dựng nền tảng tư duy code từ con số 0",
      "Thực hành viết script tự động hóa công việc",
      "Giảng viên giải đáp code 1:1 trực tiếp",
    ],
  },

  web_development: {
    topic: "web_development",
    title: "Lập trình Web cho Gen Z",
    content:
      "Khóa học Web giúp bạn làm chủ HTML, CSS, JavaScript hiện đại và xây dựng những trang web hoàn chỉnh, có giao diện đẹp mắt và tương thích trên cả điện thoại lẫn máy tính. Nếu bạn thích nhìn thấy kết quả trực quan ngay lập tức thì Web là lựa chọn rất thú vị!",
    highlights: [
      "Thực hành xây dựng trang web cá nhân/portfolio",
      "Học HTML5, CSS3, Flexbox/Grid và JS cơ bản",
      "Tư duy thiết kế giao diện UI/UX hiện đại",
    ],
  },

  ai_skills: {
    topic: "ai_skills",
    title: "Ứng dụng AI trong học tập & công việc",
    content:
      "Khóa học Ứng dụng AI hướng dẫn bạn làm chủ các công cụ AI thế hệ mới như ChatGPT, Claude, Perplexity và Midjourney để nhân 3 tốc độ nghiên cứu tài liệu, soạn thảo bài thuyết trình, phân tích dữ liệu và tự động hóa học tập. Khóa học ngắn gọn trong 6 buổi thực chiến.",
    highlights: [
      "Làm chủ Prompt Engineering thực tiễn",
      "Ứng dụng AI làm slide, viết báo cáo nhanh",
      "Tiết kiệm 50% thời gian học tập và làm việc",
    ],
  },

  duration_query: {
    topic: "duration_query",
    title: "Thời lượng các khóa học tại Tin Học Gen Z",
    content:
      "Thời lượng các khóa học tại Tin Học Gen Z được thiết kế cô đọng, hiệu quả cao:\n• MOS từng môn (Word/Excel/PowerPoint): 8 - 10 buổi (khoảng 3 tuần).\n• Combo 3 môn MOS Master: 16 - 20 buổi (khoảng 1.5 - 2 tháng).\n• Lập trình Python: 10 buổi thực chiến.\n• Ứng dụng AI: 6 buổi cấp tốc.\nLịch học linh hoạt ca tối hoặc cuối tuần, bạn có thể học cấp tốc nếu cần thi gấp!",
    highlights: [
      "Thời lượng linh hoạt từ 3 tuần đến 2 tháng",
      "Có thể học cấp tốc đẩy nhanh tiến độ",
      "Hỗ trợ bảo lưu và học bù miễn phí",
    ],
  },

  beginner_level: {
    topic: "beginner_level",
    title: "Học từ con số 0 cho người mất gốc",
    content:
      "Nếu bạn chưa biết gì hoặc mất gốc tin học thì hoàn toàn đừng lo lắng nhé! Tại Tin Học Gen Z, hơn 70% học viên bắt đầu từ số 0. Giáo trình được chia nhỏ từng bước cực kỳ dễ hiểu, giảng viên kèm 1:1 sửa bài trực tiếp trên máy của bạn cho tới khi thuần thục.",
    highlights: [
      "Cầm tay chỉ việc từng thao tác từ số 0",
      "Không sợ bị bỏ lại phía sau",
      "Học lại 100% miễn phí nếu chưa tự tin",
    ],
  },
};

