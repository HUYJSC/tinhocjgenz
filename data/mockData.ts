export interface SyllabusModule {
  session: number;
  title: string;
  contents: string[];
}

export interface Course {
  id: string;
  category?: "mos-ic3" | "practical-office" | "it-service";
  categoryName?: string;
  title: string;
  tagline: string;
  price: string | number;
  originalPrice?: string | number;
  duration: string;
  description: string;
  popular?: boolean;
  badge?: string;
  examCode?: string;
  features: string[];
  priceNote?: string;
  isService?: boolean;
  targetAudience?: string;
  passRate?: string;
  syllabus?: SyllabusModule[];
}

export interface TechService {
  id: string;
  name: string;
  price: string;
  priceValue: number;
  description: string;
  features: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  universityOrCompany: string;
  courseOrService: string;
  score?: string;
  avatarUrl?: string;
  content: string;
  rating: number;
}

export interface ValueCard {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

export interface StatItem {
  id: string;
  value: string;
  label: string;
  description: string;
}

export interface BatchSchedule {
  id: string;
  courseName: string;
  courseType: "MOS" | "IC3" | "Excel" | "AI Office";
  startDate: string;
  scheduleTime: string;
  mode: "Online qua Zoom/Google Meet" | "Kèm 1:1 Cấp Tốc";
  slotsRemaining: number;
  status: "Đang mở đăng ký" | "Sắp đầy chỗ" | "Chỉ còn 2 suất";
}

export const upcomingBatchesData: BatchSchedule[] = [
  {
    id: "b1",
    courseName: "Luyện Thi MOS 2019/365 Cấp Tốc (Word & Excel)",
    courseType: "MOS",
    startDate: "Tối Thứ 2 - 4 - 6 hàng tuần (19h30 - 21h30)",
    scheduleTime: "3 buổi ôn + Luyện đề trên máy ảo Certiport",
    mode: "Online qua Zoom/Google Meet",
    slotsRemaining: 3,
    status: "Chỉ còn 2 suất",
  },
  {
    id: "b2",
    courseName: "Luyện Thi IC3 Digital Literacy GS6 Chuẩn Quốc Tế",
    courseType: "IC3",
    startDate: "Tối Thứ 3 - 5 - 7 (19h30 - 21h30)",
    scheduleTime: "5 buổi thực chiến + Bộ đề độc quyền 2026",
    mode: "Online qua Zoom/Google Meet",
    slotsRemaining: 4,
    status: "Đang mở đăng ký",
  },
  {
    id: "b3",
    courseName: "Excel Thực Chiến & Dashboard Báo Cáo Doanh nghiệp",
    courseType: "Excel",
    startDate: "Thứ 7 & Chủ Nhật (14h00 - 17h00)",
    scheduleTime: "6 buổi chuyên sâu + Dự án thực tế",
    mode: "Online qua Zoom/Google Meet",
    slotsRemaining: 2,
    status: "Sắp đầy chỗ",
  },
  {
    id: "b4",
    courseName: "Kèm 1:1 Cấp Tốc Lấy Bằng MOS Đợt Tốt Nghiệp Sớm",
    courseType: "MOS",
    startDate: "Linh hoạt theo lịch học viên (Sáng/Chiều/Tối)",
    scheduleTime: "Cam kết bao đỗ 100% - Học lại miễn phí",
    mode: "Kèm 1:1 Cấp Tốc",
    slotsRemaining: 1,
    status: "Chỉ còn 2 suất",
  },
];

export const coursesData: Course[] = [
  {
    id: "mos-master-combo",
    category: "mos-ic3",
    categoryName: "Chứng Chỉ Quốc Tế MOS & IC3",
    title: "Combo Luyện Thi MOS 3 Môn (Word + Excel + PowerPoint)",
    tagline: "Bảo chứng chuẩn đầu ra Đại học - Cam kết thi đỗ Certiport 100%.",
    price: "2.800.000đ (Trọn gói 3 môn)",
    originalPrice: "3.600.000đ",
    duration: "9 buổi (3 buổi/môn) + Thực hành test đề",
    badge: "Bao Đỗ 100% • Hot Nhất Sinh Viên",
    examCode: "MO-200 / MO-201 / MO-300",
    description: "Khóa học tối ưu nhất dành riêng cho sinh viên DNTU, Lạc Hồng, UEH... cần hoàn thành chuẩn đầu ra tin học cấp tốc để xét tốt nghiệp. Ôn đúng trọng tâm đề thi thật.",
    popular: true,
    targetAudience: "Sinh viên năm 2 - 4 cần chứng chỉ ra trường, nhân sự ứng tuyển tập đoàn đa quốc gia",
    passRate: "99.4% Đỗ lần thi đầu tiên",
    features: [
      "Tài khoản phần mềm mô phỏng thi thử giống 99% đề thi Certiport thật.",
      "Bộ mẹo làm bài, bẫy trắc nghiệm và kỹ thuật làm bài tốc độ cao.",
      "Cam kết bao đỗ 100% - Nếu không đạt được học lại & ôn luyện hoàn toàn miễn phí.",
      "Hỗ trợ thủ tục đăng ký dự thi tại các điểm khảo thí IIG/Certiport chính thức.",
      "Đặc quyền nhóm: Đăng ký nhóm từ 3 bạn giảm thêm 15% - 30% học phí!",
    ],
    priceNote: "Đi nhóm từ 3 người giảm thêm 15% - 30% học phí",
    syllabus: [
      {
        session: 1,
        title: "MOS Word Master: Cấu Trúc Văn Bản & Heading Styles",
        contents: [
          "Làm chủ giao diện bài thi Certiport và cấu trúc Project/Task",
          "Định dạng Heading 1, Heading 2, tạo mục lục tự động (TOC)",
          "Thao tác chèn bảng Table, SmartArt, Bookmark và Hyperlink chuẩn khảo thí"
        ]
      },
      {
        session: 2,
        title: "MOS Word Master: Mail Merge & Quản Trị Tài Liệu",
        contents: [
          "Trộn thư Mail Merge tự động xuất phiếu điểm / hợp đồng",
          "Thiết lập Section Break, Header & Footer so le trang chẵn lẻ",
          "Giải đề thi thử Word Full Project 1 -> 5 có bấm giờ 50 phút"
        ]
      },
      {
        session: 3,
        title: "MOS Excel Specialist: Công Thức & Hàm Tính Toán Cốt Lõi",
        contents: [
          "Cố định vùng tham chiếu ($) và đặt tên vùng Name Range",
          "Hàm điều kiện lồng nhau: IF, AND, OR, SUMIFS, COUNTIFS, AVERAGEIFS",
          "Hàm tìm kiếm nâng cao: XLOOKUP, VLOOKUP, HLOOKUP, INDEX & MATCH"
        ]
      },
      {
        session: 4,
        title: "MOS Excel Specialist: Báo Cáo PivotTable & Biểu Đồ Động",
        contents: [
          "Tạo báo cáo tổng hợp siêu tốc bằng PivotTable & Slicer lọc dữ liệu",
          "Định dạng có điều kiện Conditional Formatting theo nhiều quy tắc",
          "Giải đề thi thử Excel Full Project 1 -> 7 bám sát đề thi IIG 2026"
        ]
      },
      {
        session: 5,
        title: "MOS PowerPoint Specialist: Slide Master & Hiệu Ứng Nâng Cao",
        contents: [
          "Thiết kế Slide Master đồng bộ nhận diện logo và bố cục toàn bài",
          "Chèn và định dạng Video, Audio, 3D Models, biểu đồ Chart",
          "Cấu hình hiệu ứng Morph chuyển cảnh 3D siêu mượt"
        ]
      },
      {
        session: 6,
        title: "Thi Thử Máy Ảo Tổng Lực & Kỹ Thuật Đạt Điểm Tuyệt Đối 1000/1000",
        contents: [
          "Thi thử trên máy ảo mô phỏng Certiport có chấm điểm tự động",
          "Giảng viên sửa bài 1:1, chỉ rõ các lỗi thường khiến rớt điểm",
          "Hướng dẫn quy chế phòng thi và thủ tục nhận bằng Certiport quốc tế"
        ]
      }
    ]
  },
  {
    id: "mos-2019",
    category: "mos-ic3",
    categoryName: "Chứng Chỉ Quốc Tế MOS & IC3",
    title: "Luyện Thi MOS Từng Môn (Word / Excel / PowerPoint)",
    tagline: "Lấy chứng chỉ nhanh chóng - Tiết kiệm thời gian và chi phí.",
    price: "1.200.000đ / 1 môn",
    originalPrice: "1.500.000đ",
    duration: "3 buổi / 1 môn + Kèm bài tập 1:1",
    badge: "Cấp Tốc 3 Buổi",
    examCode: "Certiport Microsoft Office Specialist",
    description: "Dành cho học viên chỉ còn thiếu 1 môn để đủ điều kiện xét bằng tốt nghiệp hoặc cần gấp chứng chỉ theo yêu cầu tuyển dụng.",
    popular: false,
    targetAudience: "Sinh viên, người đi làm cần bổ sung gấp 1 chứng chỉ cụ thể",
    passRate: "99.1% Đỗ điểm cao (800+)",
    features: [
      "Ôn luyện trực tiếp trên hệ thống đề thi chuẩn định dạng mới nhất.",
      "Giảng viên chỉ rõ các lỗi thường gặp khiến thí sinh mất điểm oan.",
      "Giải đáp thắc mắc 1:1 xuyên suốt trước ngày thi.",
      "Tặng video quay lại toàn bộ buổi học để xem lại bất cứ khi nào.",
    ],
    priceNote: "Đăng ký từ 2 môn trở lên giảm ngay 200.000đ/môn",
    syllabus: [
      {
        session: 1,
        title: "Hệ Thống Kiến Thức Cốt Lõi Bám Sát Matrix Đề Thi",
        contents: [
          "Rà soát toàn bộ các câu lệnh thường gặp trong bài thi",
          "Hướng dẫn cách đọc hiểu đề tiếng Anh / tiếng Việt chuẩn Certiport",
          "Thực hành 20 bài tập trọng điểm của từng nhóm kỹ năng"
        ]
      },
      {
        session: 2,
        title: "Luyện Giải 3 Bộ Đề Mẫu Chuẩn Khảo Thí IIG",
        contents: [
          "Thực hành giải chi tiết từng Task trong Project",
          "Ghi nhớ các mẹo thao tác phím tắt tăng tốc độ làm bài",
          "Kỹ thuật xử lý câu hỏi khó và phân bổ thời gian hợp lý"
        ]
      },
      {
        session: 3,
        title: "Thi Thử Trên Phần Mềm Mô Phỏng & Duyệt Điều Kiện Đi Thi",
        contents: [
          "Làm bài thi thử 50 phút trên máy ảo có chấm điểm tự động",
          "Giảng viên sửa lỗi từng câu làm sai cho đến khi đạt trên 850đ",
          "Cấp số báo danh và hướng dẫn thủ tục vào phòng thi chính thức"
        ]
      }
    ]
  },
  {
    id: "ic3-gs6",
    category: "mos-ic3",
    categoryName: "Chứng Chỉ Quốc Tế MOS & IC3",
    title: "Luyện Thi Chứng Chỉ Kỹ Năng Số IC3 GS6 Toàn Diện",
    tagline: "Chứng nhận năng lực công nghệ số chuẩn quốc tế từ Hoa Kỳ.",
    price: "1.800.000đ",
    originalPrice: "2.400.000đ",
    duration: "5 buổi + Luyện ngân hàng đề thi chuẩn",
    badge: "Chuẩn Số Quốc Tế",
    examCode: "IC3 Digital Literacy GS6 (Level 1, 2, 3)",
    description: "Chứng chỉ tin học bắt buộc cho nhiều chương trình đại học, cao học và thi công chức/viên chức. Bao quát từ Máy tính cơ bản, Ứng dụng số đến An toàn không gian mạng.",
    features: [
      "Bám sát khung 7 lĩnh vực kỹ năng số của tổ chức khảo thí thế giới Certiport.",
      "Hệ thống câu hỏi thực hành mô phỏng tương tác cao.",
      "Trang bị kiến thức an ninh thông tin, điện toán đám mây và xử lý dữ liệu số.",
      "Bảo hành đầu ra: Hỗ trợ ôn luyện liên tục đến khi cầm chứng chỉ trên tay.",
    ],
    priceNote: "Ưu đãi sinh viên giảm 10% khi xuất trình thẻ sinh viên",
    syllabus: [
      {
        session: 1,
        title: "Công Nghệ Cơ Bản & Quản Trị Thiết Bị Số (Level 1)",
        contents: [
          "Phần cứng, phần mềm, hệ điều hành và kết nối mạng",
          "Quản lý tệp tin, bảo mật mật khẩu và lưu trữ đám mây"
        ]
      },
      {
        session: 2,
        title: "Khai Thác Ứng Dụng Số & Xử Lý Dữ Liệu (Level 2)",
        contents: [
          "Ứng dụng văn phòng số, bảng tính, trình chiếu trực tuyến",
          "Kỹ năng tìm kiếm và thẩm định thông tin chuẩn xác trên Internet"
        ]
      },
      {
        session: 3,
        title: "An Toàn Mạng, Đạo Đức Số & Định Danh Trực Tuyến (Level 3)",
        contents: [
          "Bảo vệ dữ liệu cá nhân, phòng chống mã độc, phishing và lừa đảo số",
          "Bản quyền tác giả, đạo đức và trách nhiệm trên không gian số"
        ]
      },
      {
        session: 4,
        title: "Giải Trọn Bộ Ngân Hàng 200 Câu Hỏi Trắc Nghiệm Mô Phỏng",
        contents: [
          "Phân tích cặn kẽ từng bẫy câu hỏi của bài thi IC3 GS6",
          "Luyện phản xạ chọn đáp án tốc độ cao"
        ]
      },
      {
        session: 5,
        title: "Thi Thử & Chuẩn Bị Hồ Sơ Khảo Thí IIG",
        contents: [
          "Thi thử trên hệ thống mô phỏng bài thi thật của Hoa Kỳ",
          "Cam kết đầu ra đỗ chứng chỉ IC3 GS6 quốc tế"
        ]
      }
    ]
  },
  {
    id: "combo-survival-office",
    category: "practical-office",
    categoryName: "Tin Học Văn Phòng Thực Chiến",
    title: "Combo \"Sống Sót\" Chốn Văn Phòng (Word + Excel)",
    tagline: "Xử lý công việc thần tốc - Nói không với tăng ca vì giấy tờ.",
    price: "Cơ bản: 3.500.000đ | Nâng cao: 4.000.000đ",
    duration: "10 - 12 buổi",
    badge: "Kỹ Năng Thực Tế",
    description: "Trọn bộ bí kíp từ A-Z giúp bạn soạn thảo hợp đồng, công văn chuyên nghiệp và thao tác bảng tính, báo cáo mượt mà. Phù hợp cho dân hành chính, nhân sự, sales, kinh doanh.",
    popular: true,
    features: [
      "Chuẩn hóa kỹ năng soạn thảo văn bản đúng quy chuẩn thể thức văn bản hành chính nhà nước.",
      "Nắm vững hơn 40 hàm Excel thực tế, chấm dứt hoàn toàn cảnh cộng trừ thủ công.",
      "Bí kíp phím tắt tăng tốc xử lý văn bản nhanh gấp 3 lần.",
      "Tặng kèm kho template biểu mẫu, hợp đồng, báo cáo doanh nghiệp chuẩn chỉnh.",
    ],
    priceNote: "Đi nhóm 3 người giảm 10-30%",
    syllabus: [
      {
        session: 1,
        title: "Soạn Thảo Văn Bản Chuẩn Quy Chuẩn Hành Chính",
        contents: [
          "Quy định thể thức văn bản hành chính nhà nước mới nhất",
          "Căn chỉnh lề, phông chữ, giãn dòng, tạo tiêu đề chuẩn"
        ]
      },
      {
        session: 2,
        title: "Kỹ Thuật Trộn Thư Hàng Loạt (Mail Merge) & Hợp Đồng",
        contents: [
          "Tự động xuất hàng trăm thư mời, hợp đồng, giấy báo lương trong vài giây"
        ]
      },
      {
        session: 3,
        title: "Làm Chủ 40+ Hàm Excel Văn Phòng Thông Dụng Nhất",
        contents: [
          "Hàm tìm kiếm, hàm ngày tháng, hàm tính toán theo nhiều điều kiện kết hợp"
        ]
      },
      {
        session: 4,
        title: "Báo Cáo Pivot Table, Slicer & Biểu Đồ Dashboard Doanh Nghiệp",
        contents: [
          "Tổng hợp dữ liệu doanh số, kho bãi tự động và chuyên nghiệp"
        ]
      }
    ]
  },
  {
    id: "ai-office-breakthrough",
    category: "practical-office",
    categoryName: "Tin Học Văn Phòng Thực Chiến",
    title: "Ứng Dụng AI: Đột Phá Hiệu Suất Văn Phòng 10X",
    tagline: "Dẫn đầu xu hướng công nghệ số - Tự động hóa tác vụ trong 1 nốt nhạc.",
    price: "2.200.000đ",
    originalPrice: "2.800.000đ",
    duration: "5 buổi thực hành dự án",
    badge: "Xu Hướng 2026",
    description: "Biến AI thành trợ lý đắc lực: Tự động hóa viết content, làm báo cáo, tóm tắt tài liệu, thiết kế slide thuyết trình ấn tượng trong vài phút.",
    features: [
      "Prompt Engineering chuẩn xác: Ra lệnh cho ChatGPT, Claude, Copilot viết báo cáo.",
      "Thiết kế Slide thuyết trình PowerPoint tự động cực kỳ đẹp mắt với Gamma & AI Tools.",
      "Phân tích dữ liệu bảng tính Excel tự động chỉ với câu lệnh ngôn ngữ tự nhiên.",
      "Tự động hóa xử lý email và tổng hợp dữ liệu cuộc họp.",
    ],
    priceNote: "Tặng trọn bộ 100+ Prompt chuyên biệt cho dân văn phòng",
    syllabus: [
      {
        session: 1,
        title: "Nghệ Thuật Prompt Engineering: Làm Chủ ChatGPT, Claude, Copilot",
        contents: [
          "Cấu trúc câu lệnh chuẩn để AI viết báo cáo, email, văn bản không bị lỗi"
        ]
      },
      {
        session: 2,
        title: "Thiết Kế Slide Thuyết Trình Tự Động Trong 2 Phút Với AI",
        contents: [
          "Ứng dụng Gamma App, Beautiful.ai biến đề cương thành slide hoàn chỉnh"
        ]
      },
      {
        session: 3,
        title: "Phân Tích Dữ Liệu Excel Tự Động Với Trí Tuệ Nhân Tạo",
        contents: [
          "Viết công thức Excel phức tạp và tạo biểu đồ chỉ bằng câu lệnh tự nhiên"
        ]
      }
    ]
  },
  {
    id: "excel-custom-accounting",
    category: "practical-office",
    categoryName: "Doanh Nghiệp & Kế Toán",
    title: "Excel \"May Đo\" Riêng Cho Kế Toán",
    tagline: "Xóa tan nỗi ám ảnh sổ sách, báo cáo.",
    price: "Chỉ từ 350.000đ - 400.000đ / buổi",
    duration: "Số buổi tùy chỉnh (Custom) theo mục tiêu",
    badge: "Kèm 1:1 Doanh Nghiệp",
    description: "Khóa học được thiết kế 1-1, học và thực hành trực tiếp trên chính chứng từ, dữ liệu sống của công ty bạn. Học đến đâu, áp dụng giải quyết công việc ngay đến đó.",
    features: [
      "Giải quyết triệt để các bài toán khó về quản lý kho, công nợ, tính lương.",
      "Xây dựng hệ thống báo cáo tài chính động (Dashboard) chuyên nghiệp.",
      "Giảng viên trực tiếp gỡ rối các file Excel bạn đang làm việc.",
      "Lộ trình linh hoạt, không lãng phí thời gian vào lý thuyết suông."
    ],
    priceNote: "Đi nhóm 3 người giảm 10-30%"
  },
  {
    id: "cntt-national-app",
    category: "mos-ic3",
    categoryName: "Chứng Chỉ Quốc Gia & Chuẩn Đầu Ra",
    title: "Luyện Thi Chứng Chỉ Ứng Dụng CNTT Chuẩn Quốc Gia",
    tagline: "Nền tảng vững chắc - Tấm vé thông hành sự nghiệp.",
    price: "Cơ bản: 2.500.000đ | Nâng cao: 3.000.000đ",
    duration: "6 buổi",
    badge: "Chuẩn Quốc Gia",
    description: "Bước đệm hoàn hảo để hoàn thiện hồ sơ thi công chức, viên chức, xét tốt nghiệp đại học. Dạy từ mất gốc đến khi tự tin làm chủ máy tính.",
    features: [
      "Hệ thống lại kiến thức Tin học một cách bài bản, dễ hiểu nhất.",
      "Luyện kỹ năng thực hành phản xạ nhanh, bám sát cấu trúc đề thi.",
      "Trang bị mẹo xử lý tình huống thực tế phòng thi để đạt điểm cao.",
      "Cam kết nắm vững kỹ năng quản lý máy tính và làm việc văn phòng."
    ]
  }
];

export const servicesData: TechService[] = [
  {
    id: "cai-win-office",
    name: "Cài Đặt Windows 10/11 & Microsoft Office Bản Quyền",
    price: "100.000đ - 150.000đ",
    priceValue: 100000,
    description: "Cài đặt Windows 10/11 sạch sẽ, kích hoạt Office 365/2021 đầy đủ tính năng, tối ưu hóa máy tính mượt mà không virus.",
    features: [
      "Cài đặt từ xa qua Ultraviewer / AnyDesk an toàn tuyệt đối.",
      "Kích hoạt bản quyền vĩnh viễn, không lo lỗi khóa ứng dụng.",
      "Tối ưu tốc độ khởi động, dọn dẹp bộ nhớ đệm.",
      "Bảo hành hỗ trợ xử lý lại miễn phí trong 6 tháng.",
    ],
  },
  {
    id: "cai-phan-mem-do-hoa",
    name: "Cài Đặt Phần Mềm Đồ Họa & Kỹ Thuật (Adobe, AutoCAD...)",
    price: "150.000đ - 250.000đ",
    priceValue: 150000,
    description: "Trọn bộ Adobe Photoshop, Illustrator, Premiere, AutoCAD, Revit, SketchUp phiên bản ổn định nhất theo cấu hình máy.",
    features: [
      "Tối ưu render card đồ họa GPU, không văng app khi làm việc.",
      "Cài đặt đầy đủ font chữ tiếng Việt, plugin chuyên ngành.",
      "Hỗ trợ cài đặt nhanh chóng trong 30-45 phút.",
      "Bảo hành cài lại miễn phí nếu lỗi Windows.",
    ],
  },
  {
    id: "thiet-ke-excel-custom",
    name: "Thiết Kế Bảng Tính Excel / Dashboard Theo Yêu Cầu Doanh Nghiệp",
    price: "Từ 350.000đ",
    priceValue: 350000,
    description: "Xây dựng hệ thống bảng tính tự động, quản lý kho, theo dõi công nợ, bảng lương và dashboard quản trị động.",
    features: [
      "Tự động hóa 100% công thức, tiết kiệm 80% thời gian xử lý thủ công.",
      "Trực quan hóa biểu đồ trực quan, hỗ trợ ra quyết định kinh doanh.",
      "Cam kết bảo mật dữ liệu kinh doanh 100%.",
      "Bàn giao kèm video hướng dẫn sử dụng chi tiết.",
    ],
  },
];

export const testimonialsData: Testimonial[] = [
  {
    id: "t1",
    name: "Nguyễn Thùy Linh",
    role: "Chuyên Viên Ngân Hàng",
    universityOrCompany: "Ngân hàng Thương Mại Cổ Phần",
    courseOrService: "Combo MOS 3 Môn (Word, Excel, PowerPoint)",
    score: "980/1000 Điểm",
    content: "Lúc cần chứng chỉ gấp để hoàn thiện hồ sơ mình khá lo lắng vì thời gian gấp. May mắn biết đến PH Digital Education, thầy kèm sát đề 3 buổi là mình tự tin đi thi và đạt luôn 980 điểm! Giờ mình đã tự tin làm việc và thăng tiến.",
    rating: 5,
  },
  {
    id: "t2",
    name: "Trần Minh Quang",
    role: "Sinh Viên Đại Học",
    universityOrCompany: "Học Viên Luyện Thi Chứng Chỉ",
    courseOrService: "Luyện Thi IC3 GS6 & MOS Excel",
    score: "950/1000 Điểm",
    content: "Phương pháp ôn tại đây cực kỳ logic và sát đề thi thật. Phần mềm thi thử giao diện giống hệt phòng thi Certiport nên lúc thi không hề bị bỡ ngỡ. Rất cảm ơn thầy đã nhiệt tình giải đáp cả lúc đêm muộn!",
    rating: 5,
  },
  {
    id: "t3",
    name: "Lê Hoàng Yến",
    role: "Chuyên Viên Nhân Sự & Tiền Lương",
    universityOrCompany: "Tập Đoàn Bán Lẻ & Chuỗi Cung Ứng",
    courseOrService: "Excel Thực Chiến & Ứng Dụng AI",
    content: "Trước đây mỗi lần làm bảng tính lương và tổng hợp báo cáo nhân sự là mình phải tăng ca tới 8-9h tối. Sau khóa học tại PH Digital Education, mình tự viết được macro và dashboard tự động, tiết kiệm được 70% thời gian làm việc.",
    rating: 5,
  },
  {
    id: "t4",
    name: "Phạm Quốc Anh",
    role: "Chuyên Viên Phân Tích Dữ Liệu",
    universityOrCompany: "Công Ty Tài Chính Quốc Tế",
    courseOrService: "Luyện Thi MOS Excel Expert",
    score: "1000/1000 Điểm Tuyệt Đối",
    content: "Giảng viên siêu có tâm, hướng dẫn mẹo làm bài cực chuẩn. Mình đạt điểm tối đa 1000/1000 ngay lần thi đầu. Các bạn muốn có chứng chỉ nhanh và điểm cao chắc chắn nên học ở đây!",
    rating: 5,
  },
];

export const valuesData: ValueCard[] = [
  {
    id: "certiport-standard",
    title: "Chuẩn Quốc Tế Certiport",
    description: "Chương trình đào tạo cập nhật chuẩn khảo thí mới nhất của Microsoft & Certiport Hoa Kỳ, giá trị toàn cầu.",
    iconName: "ShieldCheck",
  },
  {
    id: "guarantee-pass",
    title: "Cam Kết Bao Đỗ 100%",
    description: "Học viên được hỗ trợ ôn luyện và học lại hoàn toàn miễn phí nếu không đạt điểm chuẩn trong kỳ thi chính thức.",
    iconName: "Target",
  },
  {
    id: "fast-track",
    title: "Lộ Trình Cấp Tốc 3 - 5 Buổi",
    description: "Tập trung 100% trọng tâm đề thi và kỹ năng thực tế, không học lý thuyết lan man, tiết kiệm tối đa thời gian.",
    iconName: "Zap",
  },
  {
    id: "dedicated-support",
    title: "Hỗ Trợ 1:1 Tận Tâm 24/7",
    description: "Đội ngũ giảng viên chứng nhận MOS Master trực tiếp sửa bài, giải đáp thắc mắc cả trước và sau khi hoàn thành khóa học.",
    iconName: "MessageCircle",
  },
];

export const statsData: StatItem[] = [
  {
    id: "students",
    value: "5.200+",
    label: "Học viên đã tốt nghiệp",
    description: "Học sinh, sinh viên & nhân sự doanh nghiệp",
  },
  {
    id: "pass-rate",
    value: "99.4%",
    label: "Tỷ lệ đỗ ngay lần 1",
    description: "Điểm trung bình học viên đạt từ 850/1000",
  },
  {
    id: "universities",
    value: "100%",
    label: "Cam kết chuẩn quốc tế",
    description: "Chứng chỉ Certiport có giá trị trọn đời toàn cầu",
  },
  {
    id: "cert-instructors",
    value: "100%",
    label: "Giảng viên MOS Master",
    description: "Được chứng nhận chính thức từ Microsoft",
  },
];

