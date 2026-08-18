export interface Course {
  id: string;
  title: string;
  tagline: string;
  price: string | number;
  originalPrice?: string | number;
  duration: string;
  description: string;
  popular?: boolean;
  features: string[];
  priceNote?: string;
  isService?: boolean;
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
  courseOrService: string;
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

export const coursesData: Course[] = [
  {
    id: "mos-2019",
    title: "Luyện Thi MOS 2019 Điểm Tuyệt Đối",
    tagline: "Bảo chứng năng lực - Tự tin ghi điểm với mọi nhà tuyển dụng.",
    price: "1 môn: 1.200.000đ | 3 môn (Gói tối ưu): 2.800.000đ",
    duration: "3 buổi / 1 môn",
    description: "Lộ trình ôn thi \"thực chiến\" giúp bạn cầm chắc trong tay chứng chỉ Tin học quốc tế danh giá từ Microsoft, làm đẹp CV và mở ra cơ hội thăng tiến vượt bậc.",
    popular: true,
    features: [
      "Ôn luyện sát sao trên phần mềm thi thử giống 99% thực tế.",
      "Bật mí mẹo làm bài và cách tránh bẫy để tối ưu điểm số.",
      "Tiết kiệm thời gian, ôn đúng trọng tâm - Không học lan man.",
      "Đặc quyền: Đi nhóm từ 3 người, giảm sốc 10% - 40% học phí!"
    ],
    priceNote: "Đi nhóm từ 3 người giảm 10% - 40% học phí"
  },
  {
    id: "combo-survival-office",
    title: "Combo \"Sống Sót\" Chốn Văn Phòng (Word + Excel)",
    tagline: "Xử lý công việc thần tốc - Nói không với tăng ca.",
    price: "Cơ bản: 3.500.000đ | Nâng cao: 4.000.000đ",
    duration: "10 - 12 buổi",
    description: "Trọn bộ bí kíp từ A-Z giúp bạn soạn thảo hợp đồng, công văn chuyên nghiệp và thao tác bảng tính, báo cáo mượt mà. Phù hợp cho dân hành chính, nhân sự, sales.",
    features: [
      "Chuẩn hóa kỹ năng soạn thảo văn bản đúng quy định, đẹp mắt.",
      "Nắm trùm các hàm Excel thông dụng, chấm dứt cảnh tính toán thủ công.",
      "Bí kíp dùng phím tắt giúp hiệu suất làm việc nhanh gấp 3 lần.",
      "Tặng kèm kho template biểu mẫu, báo cáo \"dùng là mê\"."
    ],
    priceNote: "Đi nhóm 3 người giảm 10-30%"
  },
  {
    id: "ai-office-breakthrough",
    title: "Ứng Dụng AI: Đột Phá Hiệu Suất Văn Phòng",
    tagline: "Dẫn đầu xu hướng - Nhân 10 hiệu suất làm việc.",
    price: "2.200.000đ - 2.500.000đ",
    duration: "5 buổi",
    description: "Đừng để công nghệ bỏ lại phía sau! Khóa học giúp bạn biến AI thành \"trợ lý ảo\" đắc lực, tự động hóa mọi tác vụ nhàm chán để tập trung vào tư duy chiến lược.",
    features: [
      "Ra lệnh cho AI tự động viết email, soạn thảo kịch bản, báo cáo.",
      "Thiết kế slide thuyết trình PowerPoint thần tốc, đẹp chuẩn thiết kế.",
      "Phân tích dữ liệu và tóm tắt tài liệu hàng chục trang trong 1 nốt nhạc.",
      "Nắm bắt tư duy làm việc thời đại mới, tăng ưu thế cạnh tranh."
    ],
    priceNote: "Đi nhóm 3 người giảm 10-30%"
  },
  {
    id: "excel-custom-accounting",
    title: "Excel \"May Đo\" Riêng Cho Kế Toán",
    tagline: "Xóa tan nỗi ám ảnh sổ sách, báo cáo.",
    price: "Chỉ từ 350.000đ - 400.000đ / buổi",
    duration: "Số buổi tùy chỉnh (Custom) theo mục tiêu",
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
    title: "Luyện Thi Chứng Chỉ Ứng Dụng CNTT",
    tagline: "Nền tảng vững chắc - Tấm vé thông hành sự nghiệp.",
    price: "Cơ bản: 2.500.000đ | Nâng cao: 3.000.000đ",
    duration: "6 buổi",
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
    id: "cai-windows",
    name: "Cài Hệ Điều Hành Windows",
    price: "150.000đ",
    priceValue: 150000,
    description: "Cài đặt Windows 10/11 Pro sạch, kích hoạt bản quyền vĩnh viễn, tối ưu hóa hệ thống chạy siêu mượt mà.",
    features: ["Cài đầy đủ driver chuẩn hãng", "Hỗ trợ sao lưu dữ liệu an toàn", "Tối ưu hóa tốc độ khởi động", "Tặng cài phần mềm giải nén, PDF"]
  },
  {
    id: "cai-office",
    name: "Cài Đặt Microsoft Office",
    price: "150.000đ",
    priceValue: 150000,
    description: "Cài đặt các phiên bản Office 2019/2021/365 kích hoạt đầy đủ tính năng, ổn định, không lỗi font.",
    features: ["Bao gồm Word, Excel, PowerPoint, Outlook", "Cài đặt bộ font tiếng Việt đầy đủ nhất", "Hỗ trợ trọn đời, không lo bị khóa", "Cài đặt nhanh qua Ultraview/Teamview"]
  },
  {
    id: "sua-may-tinh",
    name: "Sửa Chữa Máy Tính / Laptop",
    price: "từ 200.000đ",
    priceValue: 200000,
    description: "Khắc phục triệt để các lỗi phần cứng, phần mềm, máy chạy chậm, đơ lag, nhiễm virus, lỗi màn hình xanh.",
    features: ["Kiểm tra báo lỗi chính xác tại chỗ", "Thay thế linh kiện chính hãng (SSD, RAM, Pin)", "Bảo hành uy tín từ 3 - 12 tháng", "Hỗ trợ tận nhà hoặc lấy ngay trong ngày"]
  },
  {
    id: "ve-sinh-laptop",
    name: "Vệ Sinh Máy Tính / Laptop",
    price: "100.000đ",
    priceValue: 100000,
    description: "Vệ sinh bụi bẩn bên trong, thay keo tản nhiệt MX-4/MX-6 xịn giúp hạ nhiệt độ CPU, bảo vệ máy khỏi hư hại.",
    features: ["Vệ sinh sạch sẽ cánh quạt, khe tản nhiệt", "Tra keo tản nhiệt cao cấp nhập khẩu", "Lau sạch bụi bẩn bàn phím, màn hình", "Giúp máy giảm 10-15°C ngay sau khi vệ sinh"]
  },
  {
    id: "danh-van-ban",
    name: "Dịch Vụ Đánh Văn Bản & Soạn Thảo Theo Yêu Cầu",
    price: "Báo giá theo số trang / khối lượng",
    priceValue: 0,
    description: "Chuyển tài liệu, file ảnh, PDF hoặc file ghi âm thành văn bản Word chỉn chu đúng chuẩn văn bản hành chính siêu tốc.",
    features: [
      "Nhận chuyển đổi từ file ảnh, PDF, bản viết tay, ghi âm...",
      "Căn chỉnh lề, định dạng font, tạo mục lục tự động chuẩn hành chính",
      "Đáp ứng tốt các đơn hàng số lượng lớn hoặc cần gấp trong ngày",
      "Cam kết bảo mật dữ liệu tuyệt đối của khách hàng"
    ]
  },
  {
    id: "thiet-ke-excel",
    name: "Dịch Vụ Thiết Kế File Excel Theo Yêu Cầu (Custom)",
    price: "Coaching hoặc thiết kế riêng từ 350.000đ",
    priceValue: 350000,
    description: "Số hóa quy trình quản lý với hệ thống file Excel thiết kế riêng giúp tiết kiệm 80% thời gian làm báo cáo doanh nghiệp.",
    features: [
      "Tự động hóa 100%, thiết lập công thức thông minh liên kết dữ liệu",
      "Xây dựng báo cáo động Dashboard trực quan dễ dàng theo dõi",
      "Tối ưu hóa file nặng, sửa toàn bộ lỗi hàm giúp chạy mượt mà",
      "Bàn giao kèm hướng dẫn chi tiết, bảo hành dài hạn"
    ]
  }
];

export const testimonialsData: Testimonial[] = [
  {
    id: "testi-1",
    name: "Nguyễn Minh Anh",
    role: "Nhân viên Hành chính Nhân sự",
    courseOrService: "Học viên Excel Thực Chiến Nâng Cao",
    avatarUrl: "/avatars/avatar-1.png",
    content: "Thầy giáo dạy siêu dễ hiểu, thực hành thực tế, học xong áp dụng được ngay vào các báo cáo ở công ty! Trước đây mình mất cả ngày làm báo cáo, giờ chỉ cần 1 tiếng là xong nhờ ứng dụng Pivot Table động.",
    rating: 5
  },
  {
    id: "testi-2",
    name: "Trần Hoàng Nam",
    role: "Sinh viên Đại học Văn Lang",
    courseOrService: "Học viên Luyện thi MOS Excel",
    avatarUrl: "/avatars/avatar-2.png",
    content: "Phương pháp dạy rất GenZ, tràn đầy năng lượng, không bị nhàm chán như đi học ở các trung tâm truyền thống. Mình đã ôn thi rất tự tin và đạt chứng chỉ MOS Excel với số điểm 980/1000 ngay từ lần thi đầu tiên!",
    rating: 5
  },
  {
    id: "testi-3",
    name: "Phạm Thu Thủy",
    role: "Kế toán viên",
    courseOrService: "Khách hàng Vệ sinh laptop & Cài Win",
    avatarUrl: "/avatars/avatar-3.png",
    content: "Dịch vụ nhanh gọn, uy tín, thầy giáo hỗ trợ rất nhiệt tình. Máy tính của mình bị chậm đơ suốt 2 tháng nay, sau khi được cài lại Windows và vệ sinh tra keo tản nhiệt thì chạy nhanh như máy mới mua!",
    rating: 5
  },
  {
    id: "testi-4",
    name: "Lê Quốc Bảo",
    role: "Trưởng phòng Kinh doanh",
    courseOrService: "Học viên Combo Word + PowerPoint",
    avatarUrl: "/avatars/avatar-4.png",
    content: "Khóa học cực kỳ chất lượng. Các mẫu PowerPoint được chia sẻ rất đẹp và hợp xu thế. Mình học xong tự tay thiết kế slide báo cáo kinh doanh cho ban giám đốc, ai cũng khen bố cục trực quan và chuyên nghiệp.",
    rating: 5
  }
];

export const valuesData: ValueCard[] = [
  {
    id: "val-1",
    title: "Phương Pháp Học Vibe GenZ",
    description: "Nói không với giáo điều, lý thuyết suông. Học bằng ngôn ngữ dí dỏm, thực hành trực quan, cuốn hút từ giây đầu tiên.",
    iconName: "Zap"
  },
  {
    id: "val-2",
    title: "Thực Chiến 100% Doanh Nghiệp",
    description: "Học qua các case study thực tế từ văn phòng làm việc. Cam kết làm được việc ngay sau mỗi buổi học.",
    iconName: "Target"
  },
  {
    id: "val-3",
    title: "Support 24/7 Trọn Đời",
    description: "Được hỗ trợ giải đáp thắc mắc học tập, công việc trọn đời thông qua nhóm Zalo kín. Thầy giáo luôn đồng hành sát sao.",
    iconName: "MessageCircle"
  },
  {
    id: "val-4",
    title: "Học Phí Tối Ưu, Cam Kết Đầu Ra",
    description: "Học phí siêu tốt phù hợp học sinh sinh viên và người mới đi làm. Hoàn tiền hoặc học lại miễn phí nếu không làm được việc.",
    iconName: "ShieldCheck"
  }
];

export const statsData: StatItem[] = [
  {
    id: "stat-1",
    value: "500+",
    label: "Học viên",
    description: "Đã tốt nghiệp và đang làm việc hiệu quả"
  },
  {
    id: "stat-2",
    value: "50+",
    label: "Lớp học",
    description: "Đã và đang được khai giảng liên tục"
  },
  {
    id: "stat-3",
    value: "95%",
    label: "Hài lòng",
    description: "Đánh giá 5 sao về chất lượng giảng dạy"
  }
];
