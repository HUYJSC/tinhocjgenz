export interface Exercise {
  id: string;
  title: string;
  scenario: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  points: number;
  hint?: string;
}

export interface LessonStep {
  stepNumber: number;
  title: string;
  description: string;
  shortcut?: string;
  tip?: string;
}

export interface LessonContent {
  objectives: string[];
  theory: string[];
  steps: LessonStep[];
  examTips?: string[];
}

export interface Lesson {
  id: string;
  slug: string;
  title: string;
  duration: string;
  summary: string;
  order: number;
  isFreePreview?: boolean;
  content: LessonContent;
  exercise: Exercise;
}

export interface Chapter {
  id: string;
  title: string;
  description: string;
  order: number;
  lessons: Lesson[];
}

export interface CourseCurriculum {
  courseId: string;
  courseTitle: string;
  chapters: Chapter[];
}

export const COURSE_CURRICULUMS: Record<string, CourseCurriculum> = {
  "mos-master-combo": {
    courseId: "mos-master-combo",
    courseTitle: "Combo Luyện Thi MOS 3 Môn (Word + Excel + PowerPoint)",
    chapters: [
      {
        id: "ch-word-foundations",
        title: "Chương 1: MOS Word 2019/365 - Cấu Trúc Văn Bản Chuyên Nghiệp",
        description: "Làm chủ định dạng Heading, mục lục tự động và các thao tác chuẩn bài thi Certiport.",
        order: 1,
        lessons: [
          {
            id: "word-lesson-1",
            slug: "dinh-dang-heading-styles-va-muc-luc-tu-dong",
            title: "Bài 1: Thiết Lập Heading Styles & Mục Lục Tự Động (TOC)",
            duration: "15 phút",
            summary: "Kỹ thuật gán cấp bậc Heading 1, Heading 2 và tạo Table of Contents tự động cập nhật.",
            order: 1,
            isFreePreview: true,
            content: {
              objectives: [
                "Hiểu rõ cơ chế chấm điểm tự động của Certiport đối với cấu trúc Heading.",
                "Gán Heading Styles chuẩn xác cho tài liệu dài.",
                "Chèn và cấu hình Table of Contents với các tùy chọn hiển thị nâng cao."
              ],
              theory: [
                "Trong bài thi MOS Word, giám khảo máy (GMetrix/Certiport) chấm điểm dựa trên các thẻ phong cách (Styles). Nếu thí sinh chỉ bôi đậm và tăng kích cỡ chữ thủ công mà không gán Heading Style, câu hỏi sẽ bị chấm 0 điểm.",
                "Mục lục tự động (Table of Contents - TOC) là công cụ thu thập tất cả các đoạn văn bản được gán Heading 1 đến Heading 3 để tự động tạo danh mục kèm số trang chính xác."
              ],
              steps: [
                {
                  stepNumber: 1,
                  title: "Gán thẻ Heading cho tiêu đề",
                  description: "Bôi đen dòng tiêu đề cần định dạng. Trên thẻ Home, nhóm Styles, chọn Heading 1 (cho tiêu đề lớn) hoặc Heading 2 (cho tiêu đề con).",
                  shortcut: "Ctrl + Alt + 1 (cho Heading 1), Ctrl + Alt + 2 (cho Heading 2)",
                  tip: "Không được tự ý xóa hoặc đổi tên style mặc định của đề thi."
                },
                {
                  stepNumber: 2,
                  title: "Chèn mục lục tự động",
                  description: "Đặt con trỏ tại vị trí đề bài yêu cầu. Chọn thẻ References -> nhóm Table of Contents -> bấm Table of Contents -> chọn kiểu mẫu theo đề (thường là Automatic Table 1 hoặc 2).",
                  shortcut: "Alt + S, T",
                  tip: "Nếu bài thi yêu cầu cập nhật mục lục sau khi sửa nội dung, bấm 'Update Table' -> chọn 'Update entire table'."
                }
              ],
              examTips: [
                "Đề thi tiếng Anh thường ghi: 'Insert an Automatic Table 2 table of contents at the beginning of the document'. Hãy chú ý phân biệt Automatic Table 1 vs 2.",
                "Sau khi chèn mục lục, không gõ thêm dấu cách hoặc ký tự thừa xung quanh vùng mục lục."
              ]
            },
            exercise: {
              id: "ex-word-1",
              title: "Thực hành thiết lập mục lục tự động trong Word",
              scenario: "Bạn đang chuẩn bị tài liệu báo cáo tốt nghiệp. Đề thi yêu cầu bạn tạo mục lục tự động tại trang đầu tiên sao cho khi người dùng bấm vào tiêu đề sẽ nhảy đến đúng trang nội dung.",
              question: "Để bài thi MOS Word ghi nhận điểm cho mục lục tự động, thao tác nào dưới đây là bắt buộc thực hiện trước khi chèn Table of Contents?",
              options: [
                "Tạo bảng biểu Table 2 cột và gõ thủ công số trang tương ứng",
                "Áp dụng các kiểu Heading Styles (Heading 1, Heading 2,...) cho các tiêu đề trong tài liệu",
                "Chèn ngắt trang Page Break ở mỗi tiêu đề bài viết",
                "Đặt Bookmark tại từng trang để liên kết Hyperlink thủ công"
              ],
              correctIndex: 1,
              explanation: "Chính xác! Hệ thống chấm thi Certiport quét các đối tượng mang thẻ Heading Styles để chấm điểm. Việc gán Heading 1, 2 giúp Word tự động trích xuất tiêu đề và số trang vào bảng mục lục Table of Contents mà không cần can thiệp thủ công.",
              points: 100,
              hint: "Hãy nhớ lại thẻ Styles trong nhóm Home của Microsoft Word."
            }
          },
          {
            id: "word-lesson-2",
            slug: "mail-merge-tron-thu-tu-dong",
            title: "Bài 2: Trộn Thư Tự Động Mail Merge Từ Danh Sách Excel",
            duration: "20 phút",
            summary: "Hướng dẫn liên kết tệp dữ liệu Excel để in chứng nhận, hợp đồng và thư mời hàng loạt.",
            order: 2,
            isFreePreview: true,
            content: {
              objectives: [
                "Nắm vững quy trình 4 bước của tính năng Mail Merge.",
                "Liên kết nguồn dữ liệu ngoài (.xlsx) an toàn vào văn bản mẫu.",
                "Chèn trường dữ liệu (Merge Fields) và xuất kết quả hoàn chỉnh."
              ],
              theory: [
                "Mail Merge (Trộn thư) là kỹ thuật mạnh mẽ nhất trong Word để tự động hóa phát hành hàng ngàn chứng chỉ, hóa đơn, thư mời từ một danh sách học viên hoặc khách hàng có sẵn trong Excel.",
                "Đề thi MOS Word thường có các Task yêu cầu chọn nguồn danh sách có sẵn (Use an Existing List) và chèn đúng tên trường dữ liệu yêu cầu."
              ],
              steps: [
                {
                  stepNumber: 1,
                  title: "Khởi động Mail Merge",
                  description: "Trên thanh công cụ, chọn thẻ Mailings -> bấm Start Mail Merge -> chọn Letters (Thư) hoặc Labels (Nhãn).",
                  shortcut: "Alt + M, S"
                },
                {
                  stepNumber: 2,
                  title: "Kết nối danh sách dữ liệu",
                  description: "Bấm Select Recipients -> chọn 'Use an Existing List...' -> duyệt tìm tệp Excel chứa danh sách cần trộn.",
                  tip: "Đảm bảo dòng đầu tiên của bảng Excel là tên cột (First row of data contains column headers)."
                },
                {
                  stepNumber: 3,
                  title: "Chèn Merge Field",
                  description: "Đặt con trỏ tại vị trí cần hiển thị thông tin -> bấm 'Insert Merge Field' -> chọn tên cột tương ứng (Ví dụ: HoTen, DiemSo, MaHocVien).",
                  shortcut: "Alt + M, I"
                }
              ],
              examTips: [
                "Không xóa các dấu ngoặc kép dạng « » bao quanh trường Merge Field.",
                "Nếu đề yêu cầu 'Do not complete the merge', thí sinh CHỈ chèn field mà không bấm 'Finish & Merge'."
              ]
            },
            exercise: {
              id: "ex-word-2",
              title: "Thực hành Mail Merge trong bài thi MOS Word",
              scenario: "Trung tâm Tin Học Gen Z cần gửi thư chúc mừng tới 500 học viên đạt điểm tuyệt đối 1000/1000 môn MOS Excel. Bạn được giao tệp văn bản mẫu ThuChucMung.docx và bảng danh sách DanhSachDat1000.xlsx.",
              question: "Trong quy trình Mail Merge, bước nào cho phép bạn đưa trường họ tên học viên từ Excel vào đúng vị trí trên văn bản mẫu?",
              options: [
                "Copy paste toàn bộ bảng Excel vào Word",
                "Sử dụng công cụ Insert Merge Field từ thẻ Mailings",
                "Chèn đối tượng Object từ thẻ Insert",
                "Tạo bảng Table rồi liên kết qua thẻ View"
              ],
              correctIndex: 1,
              explanation: "Rất chính xác! Lệnh 'Insert Merge Field' trong thẻ Mailings cho phép chèn các trường dữ liệu động từ tệp Excel vào văn bản mẫu để trộn thư.",
              points: 100,
              hint: "Tìm lệnh có chữ 'Merge Field' trên thẻ Mailings."
            }
          }
        ]
      },
      {
        id: "ch-excel-mastery",
        title: "Chương 2: MOS Excel 2019/365 - Công Thức & Hàm Xử Lý Nâng Cao",
        description: "Làm chủ hàm điều kiện, tìm kiếm thế hệ mới XLOOKUP và quản lý bảng tính thực chiến.",
        order: 2,
        lessons: [
          {
            id: "excel-lesson-1",
            slug: "ham-xlookup-va-tim-kiem-linh-hoat",
            title: "Bài 1: Làm Chủ Hàm XLOOKUP Thế Hệ Mới Trong Excel",
            duration: "20 phút",
            summary: "Thay thế hoàn hảo cho VLOOKUP và INDEX/MATCH, hỗ trợ tìm kiếm đa chiều và xử lý lỗi tự động.",
            order: 1,
            isFreePreview: true,
            content: {
              objectives: [
                "Hiểu cấu trúc cú pháp 6 đối số của hàm XLOOKUP.",
                "Thực hiện tra cứu dữ liệu sang trái, sang phải mà không cần chỉnh sửa thứ tự cột.",
                "Bẫy lỗi #N/A trực tiếp thông qua đối số [if_not_found]."
              ],
              theory: [
                "Hàm XLOOKUP được Microsoft giới thiệu từ phiên bản Office 2019/365 để khắc phục mọi nhược điểm cố hữu của VLOOKUP: không thể tra cứu ngược sang trái, dễ hỏng công thức khi chèn thêm cột, và yêu cầu hàm lồng IFERROR phức tạp.",
                "Cú pháp chuẩn: =XLOOKUP(lookup_value, lookup_array, return_array, [if_not_found], [match_mode], [search_mode])."
              ],
              steps: [
                {
                  stepNumber: 1,
                  title: "Xác định giá trị và vùng tìm kiếm",
                  description: "Xác định ô chứa giá trị cần tìm (lookup_value) và mảng cột chứa giá trị đó (lookup_array). Cố định mảng bằng phím F4.",
                  shortcut: "F4 (để thêm dấu $ vào địa chỉ ô)"
                },
                {
                  stepNumber: 2,
                  title: "Xác định vùng kết quả trả về",
                  description: "Chọn mảng cột chứa kết quả mong muốn (return_array). Mảng này có thể nằm ở bất kỳ đâu (trái hoặc phải của cột tìm kiếm).",
                  tip: "Khác với VLOOKUP, return_array trong XLOOKUP chỉ là 1 mảng cột đơn, không đếm số thứ tự cột."
                },
                {
                  stepNumber: 3,
                  title: "Thiết lập giá trị mặc định khi không tìm thấy",
                  description: "Nhập tham số thứ 4 [if_not_found] (Ví dụ: 'Không tìm thấy' hoặc 0). Nếu bỏ qua, Excel sẽ trả về #N/A khi không khớp.",
                  shortcut: "Ví dụ: =XLOOKUP(A2, $D$2:$D$100, $B$2:$B$100, 'Chưa có')"
                }
              ],
              examTips: [
                "Trong đề thi MOS Excel Associate & Expert, hãy chú ý đề bài yêu cầu trả về giá trị gì khi không tìm thấy mã học viên.",
                "Luôn khóa tuyệt đối vùng tham chiếu $ bằng phím F4 khi sao chép công thức xuống các hàng dưới."
              ]
            },
            exercise: {
              id: "ex-excel-1",
              title: "Thực hành ứng dụng hàm XLOOKUP tra cứu điểm thi",
              scenario: "Bạn có bảng điểm học viên với cột A là 'Mã chứng nhận', cột B là 'Họ tên', cột C là 'Môn thi' và cột D là 'Điểm số'. Bạn cần tra cứu 'Họ tên' (cột B) dựa trên 'Điểm số' (cột D) của học viên đạt 1000 điểm.",
              question: "Ưu điểm vượt trội nào của hàm XLOOKUP giúp nó xử lý được tình huống tra cứu này so với hàm VLOOKUP truyền thống?",
              options: [
                "XLOOKUP có thể tra cứu ngược sang bên trái của cột tìm kiếm mà không cần đổi vị trí cột",
                "XLOOKUP chỉ chạy được trên tệp có đuôi .csv",
                "XLOOKUP bắt buộc bảng dữ liệu phải sắp xếp từ A đến Z trước",
                "XLOOKUP không hỗ trợ tìm kiếm giá trị số"
              ],
              correctIndex: 0,
              explanation: "Chính xác! VLOOKUP chỉ có thể tra cứu sang phải (cột tìm kiếm phải nằm ở vị trí đầu tiên bên trái). XLOOKUP cho phép return_array nằm ở bất kỳ đâu, kể cả nằm bên trái của lookup_array, giúp bạn dễ dàng tra cứu Họ tên (cột B) từ Điểm số (cột D).",
              points: 100,
              hint: "VLOOKUP truyền thống chỉ tìm từ trái qua phải, còn XLOOKUP tìm được cả hai chiều."
            }
          },
          {
            id: "excel-lesson-2",
            slug: "pivottable-va-slicer-bao-cao-dong",
            title: "Bài 2: Tổng Hợp Dữ Liệu Siêu Tốc Bằng PivotTable & Slicer",
            duration: "25 phút",
            summary: "Kỹ thuật kéo thả bảng xoay chiều dữ liệu và tạo bộ lọc trực quan Slicer tương tác thời gian thực.",
            order: 2,
            isFreePreview: false,
            content: {
              objectives: [
                "Khởi tạo bảng PivotTable từ vùng dữ liệu thô.",
                "Bố trí 4 vùng: Filters, Columns, Rows và Values.",
                "Chèn bộ lọc nút bấm Slicer và đồng bộ báo cáo đa chiều."
              ],
              theory: [
                "PivotTable là công cụ mạnh mẽ nhất của Excel cho phép người dùng tóm tắt, phân tích, khám phá và trình bày dữ liệu hàng trăm ngàn dòng chỉ bằng thao tác kéo thả.",
                "Slicer là các nút bấm trực quan giúp lọc dữ liệu trong PivotTable nhanh chóng mà không cần mở danh sách thả xuống phức tạp."
              ],
              steps: [
                {
                  stepNumber: 1,
                  title: "Tạo PivotTable",
                  description: "Đặt con trỏ vào bảng dữ liệu -> chọn thẻ Insert -> bấm PivotTable -> chọn vị trí đặt bảng (New Worksheet hoặc Existing Worksheet).",
                  shortcut: "Alt + N, V"
                },
                {
                  stepNumber: 2,
                  title: "Bố trí các trường dữ liệu (PivotTable Fields)",
                  description: "Kéo trường phân loại (ví dụ: 'Môn thi') vào vùng Rows; kéo trường tính toán (ví dụ: 'Doanh thu' hoặc 'Số học viên') vào vùng Values.",
                  tip: "Mặc định vùng Values sẽ tính SUM nếu dữ liệu là số, hoặc COUNT nếu dữ liệu là văn bản."
                },
                {
                  stepNumber: 3,
                  title: "Chèn bộ lọc trực quan Slicer",
                  description: "Bấm vào bảng PivotTable -> chọn thẻ PivotTable Analyze -> bấm 'Insert Slicer' -> tích chọn trường cần tạo nút lọc -> bấm OK.",
                  shortcut: "Alt + J, T, S"
                }
              ],
              examTips: [
                "Đề thi MOS thường yêu cầu đổi tên bảng PivotTable. Vào thẻ PivotTable Analyze -> ô PivotTable Name ở góc trái -> gõ đúng tên đề bài yêu cầu.",
                "Không bao gồm các hàng tổng cộng (Total) của dữ liệu thô vào vùng nguồn của PivotTable."
              ]
            },
            exercise: {
              id: "ex-excel-2",
              title: "Thực hành PivotTable trong bài thi MOS",
              scenario: "Một công ty muốn thống kê tổng số lượng học viên đăng ký theo từng môn học trong quý 3/2026 từ một danh sách thô gồm 1,500 dòng giao dịch.",
              question: "Để hiển thị tên từng môn học ở các hàng và tổng số học viên tương ứng ở cột bên cạnh trong PivotTable, bạn cần kéo các trường vào vùng nào?",
              options: [
                "Kéo 'Môn học' vào Rows, kéo 'Mã học viên' vào Values (với hàm COUNT)",
                "Kéo 'Môn học' vào Filters, kéo 'Mã học viên' vào Columns",
                "Kéo 'Môn học' vào Values, kéo 'Mã học viên' vào Rows",
                "Chỉ cần bấm Filter tự động trên bảng gốc"
              ],
              correctIndex: 0,
              explanation: "Rất chuẩn xác! Vùng Rows xác định tiêu đề hàng (từng môn học), và vùng Values chứa dữ liệu tính toán (đếm số lượng mã học viên bằng hàm COUNT).",
              points: 100,
              hint: "Rows = hàng, Values = giá trị tính toán."
            }
          }
        ]
      },
      {
        id: "ch-ppt-design",
        title: "Chương 3: MOS PowerPoint 2019/365 - Slide Master & Hiệu Ứng",
        description: "Làm chủ Slide Master, chèn đa phương tiện và hiệu ứng chuyển cảnh Morph cao cấp.",
        order: 3,
        lessons: [
          {
            id: "ppt-lesson-1",
            slug: "slide-master-dong-bo-giao-dien",
            title: "Bài 1: Thiết Kế Slide Master Đồng Bộ Nhận Diện Thương Hiệu",
            duration: "15 phút",
            summary: "Cấu hình Master Slide mẹ và các Layouts con để toàn bộ bài thuyết trình tự động ăn khớp định dạng.",
            order: 1,
            isFreePreview: true,
            content: {
              objectives: [
                "Phân biệt Slide Master mẹ (Parent) và các bố cục Layouts con.",
                "Chèn logo, đường kẻ trang trí và số trang tự động vào Master.",
                "Tạo Layout tùy biến mới phục vụ bài thi Certiport."
              ],
              theory: [
                "Slide Master là tính năng quản trị giao diện gốc của bài thuyết trình. Mọi thay đổi về phông chữ, màu sắc, logo hoặc hình nền thực hiện trên Slide Master mẹ sẽ tự động áp dụng cho tất cả các slide con trong bài.",
                "Trong bài thi MOS PowerPoint, Slide Master là kỹ năng chiếm tới 25-30% tổng số điểm."
              ],
              steps: [
                {
                  stepNumber: 1,
                  title: "Mở chế độ xem Slide Master",
                  description: "Trên thanh công cụ, chọn thẻ View -> trong nhóm Master Views, chọn 'Slide Master'.",
                  shortcut: "Alt + W, M",
                  tip: "Thanh cuộn bên trái sẽ xuất hiện cấu trúc cây. Slide lớn nhất trên cùng là Slide Master mẹ."
                },
                {
                  stepNumber: 2,
                  title: "Đồng bộ định dạng trên Slide Master mẹ",
                  description: "Chọn Slide 1 trên cùng (Master Slide). Chèn logo công ty, đổi phông chữ của hộp Title sang Tahoma hoặc Montserrat. Tất cả các bố cục phía dưới sẽ tự động cập nhật.",
                  shortcut: "Thẻ Insert -> Pictures -> Chọn logo"
                },
                {
                  stepNumber: 3,
                  title: "Đóng chế độ Slide Master",
                  description: "Sau khi hoàn thành chỉnh sửa, bấm nút 'Close Master View' trên thẻ Slide Master để quay về chế độ soạn thảo bình thường.",
                  shortcut: "Alt + M, C"
                }
              ],
              examTips: [
                "Lưu ý rất quan trọng: Đề thi thường yêu cầu chỉnh sửa trên layout cụ thể (Ví dụ: 'Title and Content Layout' hoặc 'Two Content Layout'). Hãy trỏ chuột vào từng slide con để xem tên layout trước khi sửa!",
                "Tuyệt đối không quên bấm 'Close Master View' trước khi kết thúc Task để không bị mất điểm thao tác."
              ]
            },
            exercise: {
              id: "ex-ppt-1",
              title: "Thực hành Slide Master trong PowerPoint",
              scenario: "Bạn được giao nhiệm vụ chuẩn bị slide thuyết trình cho hội thảo Tin Học Gen Z. Giám đốc yêu cầu logo trung tâm phải xuất hiện cố định ở góc trên bên phải của TẤT CẢ các slide, nhưng khi người thuyết trình bấm vào slide thì không thể vô tình bấm trúng làm xê dịch logo.",
              question: "Giải pháp tối ưu và chuyên nghiệp nhất trong PowerPoint để đáp ứng yêu cầu trên là gì?",
              options: [
                "Sao chép và dán logo thủ công vào từng trang slide",
                "Chèn logo vào Slide Master mẹ trong chế độ xem Slide Master",
                "Chụp ảnh màn hình logo rồi làm nền Background cho từng slide",
                "Gộp tất cả các slide thành 1 video duy nhất"
              ],
              correctIndex: 1,
              explanation: "Chính xác! Khi chèn logo vào Slide Master mẹ, logo sẽ được khóa cố định vào nền của tất cả các slide. Người biên tập ở chế độ bình thường không thể vô tình kéo lệch logo, đồng thời tiết kiệm dung lượng tệp và thời gian thao tác.",
              points: 100,
              hint: "Chế độ xem nào quản lý cấu trúc giao diện mẹ của slide?"
            }
          }
        ]
      }
    ]
  },
  "ic3-gs6": {
    courseId: "ic3-gs6",
    courseTitle: "Luyện Thi Chứng Chỉ Kỹ Năng Số IC3 GS6 Toàn Diện",
    chapters: [
      {
        id: "ch-ic3-cyber",
        title: "Chương 1: An Toàn Không Gian Mạng & Kỷ Nguyên Số",
        description: "Kiến thức trọng tâm về bảo mật thông tin, điện toán đám mây và kỹ năng công dân số.",
        order: 1,
        lessons: [
          {
            id: "ic3-lesson-1",
            slug: "an-toan-thong-tin-va-mat-khau-manh",
            title: "Bài 1: Nguyên Tắc Thiết Lập Mật Khẩu Mạnh & Xác Thực Hai Bước (2FA)",
            duration: "15 phút",
            summary: "Quy tắc bảo vệ danh tính số, phòng tránh tấn công lừa đảo Phishing và cấu hình bảo mật MFA.",
            order: 1,
            isFreePreview: true,
            content: {
              objectives: [
                "Hiểu các tiêu chí cấu thành mật khẩu an toàn chuẩn NIST.",
                "Nguyên lý hoạt động của xác thực 2 yếu tố (2FA / MFA).",
                "Nhận diện các hình thức tấn công lừa đảo trực tuyến phổ biến (Phishing, Social Engineering)."
              ],
              theory: [
                "Trong kỷ nguyên số, mật khẩu là tuyến phòng thủ đầu tiên. Một mật khẩu mạnh phải có tối thiểu 12 ký tự, bao gồm chữ hoa, chữ thường, chữ số và ký tự đặc biệt, không chứa thông tin cá nhân dễ đoán như ngày sinh, số điện thoại.",
                "Xác thực hai yếu tố (2FA) bổ sung một lớp bảo vệ thứ hai: Ngoài mật khẩu (thứ bạn biết), hệ thống yêu cầu mã OTP từ điện thoại hoặc thiết bị bảo mật (thứ bạn sở hữu)."
              ],
              steps: [
                {
                  stepNumber: 1,
                  title: "Nhận biết mật khẩu yếu",
                  description: "Tránh các mật khẩu phổ biến như '123456', 'password', 'admin123', hoặc mật khẩu trùng lặp giữa nhiều tài khoản mạng xã hội và ngân hàng."
                },
                {
                  stepNumber: 2,
                  title: "Kích hoạt xác thực 2 bước",
                  description: "Truy cập cài đặt bảo mật tài khoản (Google, Microsoft, Facebook) -> chọn Two-Factor Authentication -> sử dụng ứng dụng tạo mã Authenticator (Google Authenticator, Microsoft Authenticator) thay vì nhận SMS để chống cướp SIM."
                }
              ],
              examTips: [
                "Câu hỏi IC3 GS6 thường đưa ra các tình huống thực tế: 'Bạn nhận được email từ ngân hàng yêu cầu nhấp vào liên kết để đổi mật khẩu khẩn cấp'. Câu trả lời đúng luôn là: Kiểm tra kỹ địa chỉ email người gửi, không nhấp vào liên kết lạ và liên hệ hotline chính thức."
              ]
            },
            exercise: {
              id: "ex-ic3-1",
              title: "Thực hành nhận diện bảo mật trong bài thi IC3 GS6",
              scenario: "Một nhân viên văn phòng nhận được email thông báo tài khoản Microsoft 365 sắp bị khóa trong 24 giờ tới và yêu cầu bấm vào một liên kết đính kèm để nhập lại mật khẩu xác thực.",
              question: "Dấu hiệu nào dưới đây chứng minh email trên là một vụ tấn công lừa đảo (Phishing attack)?",
              options: [
                "Địa chỉ người gửi có đuôi tên miền giả mạo (ví dụ: support@micros0ft-security.net), tạo cảm giác cấp bách đe dọa khóa tài khoản và dẫn tới trang web đăng nhập giả mạo",
                "Email có chữ ký điện tử hợp lệ từ quản trị viên nội bộ",
                "Email được gửi trong giờ hành chính",
                "Email không có tệp đính kèm"
              ],
              correctIndex: 0,
              explanation: "Rất chính xác! Tấn công Phishing thường sử dụng tên miền gần giống (typosquatting) như 'micros0ft', kích thích tâm lý sợ hãi, thúc ép người dùng nhập thông tin bảo mật vào trang giả mạo để chiếm đoạt tài khoản.",
              points: 100,
              hint: "Hãy chú ý đến địa chỉ người gửi và yếu tố tâm lý cấp bách."
            }
          }
        ]
      }
    ]
  },
  "excel-nang-cao": {
    courseId: "excel-nang-cao",
    courseTitle: "Excel Thực Chiến Cho Người Đi Làm (Báo Cáo & Dashboard)",
    chapters: [
      {
        id: "ch-excel-pro-dashboards",
        title: "Chương 1: Kỹ Thuật Xây Dựng Báo Cáo Quản Trị Tự Động",
        description: "Ứng dụng SUMIFS, INDEX/MATCH kết hợp Dropdown tương tác chuyên sâu.",
        order: 1,
        lessons: [
          {
            id: "pro-lesson-1",
            slug: "sumifs-va-ham-dieu-kien-da-chieu",
            title: "Bài 1: Tính Tổng Đa Điều Kiện Chuyên Sâu Bằng Hàm SUMIFS",
            duration: "20 phút",
            summary: "Xử lý báo cáo doanh thu theo chi nhánh, nhân viên và khoảng thời gian linh hoạt.",
            order: 1,
            isFreePreview: true,
            content: {
              objectives: [
                "Nắm chắc thứ tự đối số trong hàm SUMIFS: sum_range đứng đầu tiên.",
                "Xử lý điều kiện ngày tháng dạng chuỗi so sánh: '>=' & DATE(yyyy,m,d).",
                "Kết hợp ký tự đại diện (*, ?) để lọc dữ liệu gần đúng."
              ],
              theory: [
                "SUMIFS là hàm tính tổng có nhiều điều kiện đồng thời (logic AND). Điểm khác biệt lớn nhất giữa SUMIF và SUMIFS là vị trí của vùng tính tổng (sum_range): trong SUMIFS, vùng tính tổng luôn được đặt ở vị trí đầu tiên.",
                "Cú pháp: =SUMIFS(sum_range, criteria_range1, criteria1, [criteria_range2, criteria2], ...)"
              ],
              steps: [
                {
                  stepNumber: 1,
                  title: "Xác định vùng tính tổng sum_range",
                  description: "Chọn cột chứa số liệu tiền tệ hoặc số lượng cần tính tổng (ví dụ: cột DoanhThu $E$2:$E$5000).",
                  shortcut: "Ctrl + Shift + Down (để chọn nhanh toàn bộ cột)"
                },
                {
                  stepNumber: 2,
                  title: "Thêm các cặp vùng và điều kiện",
                  description: "Cặp 1: Vùng chi nhánh ($C$2:$C$5000) và điều kiện chi nhánh ('Hà Nội'). Cặp 2: Vùng ngày tháng ($B$2:$B$5000) và điều kiện ngày tháng.",
                  tip: "Số dòng của tất cả criteria_range PHẢI BẰNG NHAU và bằng số dòng của sum_range, nếu không Excel sẽ báo lỗi #VALUE!."
                }
              ],
              examTips: [
                "Khi dùng điều kiện toán tử so sánh (>, <, >=, <=) với một ô tham chiếu, luôn nhớ dùng dấu ghép chuỗi &: Ví dụ: '>=' & G1."
              ]
            },
            exercise: {
              id: "ex-pro-1",
              title: "Thực hành xây dựng hàm SUMIFS báo cáo doanh thu",
              scenario: "Bạn cần tính tổng doanh thu (cột D) của nhân viên có tên 'Nguyễn Văn A' (cột B) trong tháng 8/2026 (ngày tháng lưu ở cột C).",
              question: "Trong cú pháp hàm SUMIFS, phát biểu nào sau đây là chính xác về vị trí của vùng tính tổng doanh thu (cột D)?",
              options: [
                "Vùng tính tổng doanh thu (cột D) phải được đưa vào làm đối số đầu tiên của hàm SUMIFS",
                "Vùng tính tổng doanh thu (cột D) phải được đặt ở cuối cùng của hàm",
                "Hàm SUMIFS không cho phép tính tổng trên cột D nếu có chữ cái",
                "Chỉ cần truyền điều kiện, không cần vùng tính tổng"
              ],
              correctIndex: 0,
              explanation: "Chính xác! Trong hàm SUMIFS, cú pháp bắt buộc là =SUMIFS(sum_range, criteria_range1, criteria1, ...), vì vậy vùng tính tổng (cột D) phải đứng ở vị trí đối số đầu tiên.",
              points: 100,
              hint: "Khác với hàm SUMIF đơn, SUMIFS đặt sum_range ở vị trí nào?"
            }
          }
        ]
      }
    ]
  }
};

export function getCurriculumByCourseId(courseId: string): CourseCurriculum | null {
  if (COURSE_CURRICULUMS[courseId]) {
    return COURSE_CURRICULUMS[courseId];
  }
  // Fallback / alias matching
  if (courseId.includes("mos")) {
    return COURSE_CURRICULUMS["mos-master-combo"];
  }
  if (courseId.includes("ic3")) {
    return COURSE_CURRICULUMS["ic3-gs6"];
  }
  if (courseId.includes("excel")) {
    return COURSE_CURRICULUMS["excel-nang-cao"];
  }
  return COURSE_CURRICULUMS["mos-master-combo"];
}

export function getAllLessons(courseId: string): Lesson[] {
  const curriculum = getCurriculumByCourseId(courseId);
  if (!curriculum) return [];
  return curriculum.chapters.flatMap((ch) => ch.lessons);
}

export function getLessonById(courseId: string, lessonId: string): { lesson: Lesson; chapter: Chapter; curriculum: CourseCurriculum } | null {
  const curriculum = getCurriculumByCourseId(courseId);
  if (!curriculum) return null;
  for (const chapter of curriculum.chapters) {
    const lesson = chapter.lessons.find((l) => l.id === lessonId || l.slug === lessonId);
    if (lesson) {
      return { lesson, chapter, curriculum };
    }
  }
  return null;
}
