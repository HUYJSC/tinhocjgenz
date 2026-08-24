export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  coverImage: string;
  category: "mos-ic3" | "chuan-dau-ra" | "excel-office" | "ai-technology";
  categoryName: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  publishedAt: string;
  readTime: string;
  views: number;
  featured?: boolean;
  tags: string[];
  tableOfContents: { id: string; title: string }[];
  content: string;
  relatedCourseId?: string;
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "bi-quyet-dat-1000-diem-mos-excel-ngay-lan-thi-dau",
    title: "Bí Quyết Đạt 1000/1000 Điểm MOS Excel 2019 / 365 Ngay Lần Thi Đầu Tiên",
    excerpt: "Tổng hợp chiến thuật ôn thi MOS Excel cấp tốc từ giảng viên Master: Nhận diện bẫy Certiport, quản lý thời gian 50 phút và mẹo làm bài chuẩn xác 100%.",
    coverImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1000&auto=format&fit=crop&q=80",
    category: "mos-ic3",
    categoryName: "Luyện Thi MOS & IC3",
    author: {
      name: "Thầy Huy (MOS Master)",
      role: "Giám Đốc Đào Tạo PH Digital",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80"
    },
    publishedAt: "2026-08-15",
    readTime: "7 phút đọc",
    views: 3420,
    featured: true,
    tags: ["MOS Excel", "Luyện thi Certiport", "Thủ thuật MOS", "Điểm tuyệt đối"],
    relatedCourseId: "mos-master-combo",
    tableOfContents: [
      { id: "cau-truc-de-thi", title: "1. Cấu trúc bài thi MOS Excel Multi-Project" },
      { id: "nhung-bay-thuong-gap", title: "2. Top 5 bẫy điểm trừ phổ biến nhất tại phòng thi IIG" },
      { id: "chien-luoc-phan-bo-thoi-gian", title: "3. Chiến lược phân bổ 50 phút làm bài tối ưu" },
      { id: "cac-ham-excel-trong-tam", title: "4. Danh mục các hàm trọng tâm 90% xuất hiện trong đề" },
      { id: "lo-trinh-on-cap-toc", title: "5. Lộ trình ôn luyện cấp tốc 3 - 5 buổi bao đỗ 100%" }
    ],
    content: `
      <h2>1. Cấu trúc bài thi MOS Excel Multi-Project</h2>
      <p>Bài thi <strong>Microsoft Office Specialist (MOS) Excel 2019 / Microsoft 365 Apps</strong> hiện nay áp dụng format <em>Multi-Project</em>. Thí sinh sẽ hoàn thành từ <strong>5 đến 7 Projects (Dự án)</strong>, mỗi dự án gồm 4 - 7 tasks (nhiệm vụ nhỏ) trong thời gian quy định là <strong>50 phút</strong>. Điểm tối đa là <strong>1000 điểm</strong>, điểm đạt chuẩn là <strong>700 điểm</strong>.</p>
      
      <div class="bg-blue-50 border-l-4 border-blue-600 p-4 my-4 rounded-r-xl">
        <p class="text-blue-900 font-bold m-0">💡 Lưu ý quan trọng:</p>
        <p class="text-blue-800 text-sm m-0 mt-1">Phần mềm chấm thi Certiport chấm điểm dựa trên kết quả trạng thái cuối cùng của file sau khi bấm 'Mark Completed'. Chỉ cần sai 1 dấu phẩy hoặc lệch tên vùng đặt trước (Named Range) là toàn bộ task đó sẽ bị 0 điểm.</p>
      </div>

      <h2>2. Top 5 bẫy điểm trừ phổ biến nhất tại phòng thi IIG</h2>
      <ul>
        <li><strong>Bẫy 1: Không đặt đúng tên bảng (Table Name) hoặc Vùng dữ liệu (Named Range):</strong> Đề bài yêu cầu đặt tên chính xác từng chữ hoa/thường, không thừa dấu cách ở cuối.</li>
        <li><strong>Bẫy 2: Tự ý thay đổi định dạng ô ngoài yêu cầu:</strong> Việc vô tình kéo dãn cột, thay đổi font size nếu đề không yêu cầu có thể khiến phần mềm chấm sai định dạng tổng thể.</li>
        <li><strong>Bẫy 3: Quên bấm 'Mark Completed':</strong> Với mỗi task làm xong, bạn nên đánh dấu để kiểm soát tiến độ và tránh bỏ sót.</li>
        <li><strong>Bẫy 4: Áp dụng Conditional Formatting sai phạm vi:</strong> Chọn thừa cả hàng tiêu đề hoặc dòng Total khi bôi đen vùng dữ liệu cần định dạng điều kiện.</li>
        <li><strong>Bẫy 5: Nhập sai hàm do không chú ý cấu hình dấu phẩy (,) và chấm phẩy (;):</strong> Phòng thi IIG sử dụng chuẩn định dạng số US (dấu phẩy ngăn cách đối số).</li>
      </ul>

      <h2>3. Chiến lược phân bổ 50 phút làm bài tối ưu</h2>
      <p>Để đạt mốc 950 - 1000 điểm, hãy áp dụng quy tắc <strong>35 - 10 - 5</strong> đã được kiểm chứng qua hàng ngàn học viên tại PH Digital Education:</p>
      <ol>
        <li><strong>35 phút đầu:</strong> Quét nhanh toàn bộ các dự án, làm dứt điểm các câu dễ và câu thao tác cơ bản (tạo Table, Chart, Sort/Filter, Header/Footer).</li>
        <li><strong>10 phút tiếp theo:</strong> Xử lý các câu hỏi phức tạp về hàm mảng, hàm điều kiện lồng nhau (IFS, COUNTIFS, INDEX-MATCH hoặc XLOOKUP) và PivotTable.</li>
        <li><strong>5 phút cuối:</strong> Review lại những câu đã bấm <em>'Mark for Review'</em>, kiểm tra kỹ tên sheet, ẩn/hiện gridlines và bấm Hoàn thành bài thi.</li>
      </ol>

      <h2>4. Danh mục các hàm trọng tâm 90% xuất hiện trong đề</h2>
      <p>Bạn bắt buộc phải thành thạo cú pháp và cách lồng ghép các nhóm hàm sau:</p>
      <ul>
        <li><strong>Nhóm hàm thống kê có điều kiện:</strong> COUNTIF, COUNTIFS, SUMIF, SUMIFS, AVERAGEIF, AVERAGEIFS.</li>
        <li><strong>Nhóm hàm logic:</strong> IF, AND, OR, IFS, IFERROR.</li>
        <li><strong>Nhóm hàm tra cứu dữ liệu:</strong> VLOOKUP (với đối số False/Exact match), HLOOKUP, XLOOKUP.</li>
        <li><strong>Nhóm hàm văn bản & xử lý chuỗi:</strong> CONCAT / TEXTJOIN, UPPER, LOWER, PROPER, LEFT, RIGHT, MID.</li>
      </ul>

      <h2>5. Lộ trình ôn luyện cấp tốc 3 - 5 buổi bao đỗ 100%</h2>
      <p>Tại <strong>PH Digital Education</strong>, học viên được tiếp cận với phần mềm thi thử bản quyền Certiport có độ sát thực 99% so với đề thi thật tại IIG Việt Nam. Giảng viên MOS Master trực tiếp sửa từng lỗi thao tác 1:1, giúp các bạn sinh viên DNTU, Lạc Hồng, UEH tự tin thi đỗ ngay lần đầu chỉ sau 3 - 5 buổi học trọng tâm.</p>
    `
  },
  {
    slug: "quy-che-chuan-dau-ra-tin-hoc-dntu-dong-nai-moi-nhat",
    title: "Quy Định Chuẩn Đầu Ra Tin Học Đại Học Công Nghệ Đồng Nai (DNTU) Mới Nhất",
    excerpt: "Cập nhật chi tiết quy chế chuẩn đầu ra MOS / IC3 xét tốt nghiệp DNTU: Điểm chuẩn tối thiểu, thời hạn nộp chứng chỉ và lộ trình lấy bằng cấp tốc.",
    coverImage: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1000&auto=format&fit=crop&q=80",
    category: "chuan-dau-ra",
    categoryName: "Chuẩn Đầu Ra Đại Học",
    author: {
      name: "Ban Đào Tạo PH Digital",
      role: "Chuyên Viên Khảo Thí & Chuẩn ĐH",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=80"
    },
    publishedAt: "2026-08-18",
    readTime: "5 phút đọc",
    views: 4890,
    featured: true,
    tags: ["DNTU", "Chuẩn đầu ra DNTU", "Xét tốt nghiệp Đồng Nai", "MOS DNTU"],
    relatedCourseId: "mos-master-combo",
    tableOfContents: [
      { id: "quy-dinh-chung", title: "1. Quy định chuẩn đầu ra Tin học tại DNTU" },
      { id: "cac-chung-chi-duoc-chap-nhan", title: "2. Danh mục chứng chỉ tin học quốc tế được công nhận" },
      { id: "thoi-han-nop-bang", title: "3. Thời hạn nộp chứng chỉ để xét tốt nghiệp các đợt" },
      { id: "giai-phap-cap-toc", title: "4. Giải pháp ôn thi cấp tốc 3 - 5 buổi cho sinh viên DNTU" }
    ],
    content: `
      <h2>1. Quy định chuẩn đầu ra Tin học tại DNTU</h2>
      <p>Trường Đại học Công nghệ Đồng Nai (DNTU) áp dụng chuẩn đầu ra công nghệ thông tin & tin học ứng dụng bắt buộc đối với tất cả sinh viên hệ đại học chính quy để đủ điều kiện nhận bằng tốt nghiệp.</p>

      <h2>2. Danh mục chứng chỉ tin học quốc tế được công nhận</h2>
      <div class="overflow-x-auto my-4">
        <table class="w-full text-left border-collapse border border-slate-200 text-sm">
          <thead>
            <tr class="bg-slate-100 font-bold text-slate-900">
              <th class="border p-3">Loại Chứng Chỉ</th>
              <th class="border p-3">Yêu Cầu Môn / Module</th>
              <th class="border p-3">Điểm Đạt Chuẩn Tối Thiểu</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="border p-3 font-semibold text-blue-700">MOS (Microsoft Office Specialist)</td>
              <td class="border p-3">Word, Excel, PowerPoint (MOS 2016 / 2019 / 365)</td>
              <td class="border p-3">≥ 700 / 1000 điểm mỗi môn</td>
            </tr>
            <tr class="bg-slate-50">
              <td class="border p-3 font-semibold text-indigo-700">IC3 GS5 / GS6 (Digital Literacy)</td>
              <td class="border p-3">3 bài thi thành phần (CF, KA, LO hoặc Level 1-2-3)</td>
              <td class="border p-3">Đạt theo thang điểm Certiport</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2>3. Thời hạn nộp chứng chỉ để xét tốt nghiệp các đợt</h2>
      <p>Sinh viên cần hoàn thành và nộp bản photo công chứng chứng chỉ về phòng Khảo thí / Đào tạo của trường trước ít nhất <strong>30 ngày</strong> trước đợt xét tốt nghiệp chính thức (thường diễn ra vào các tháng 3, 6, 9 và 12 hàng năm).</p>

      <h2>4. Giải pháp ôn thi cấp tốc 3 - 5 buổi cho sinh viên DNTU</h2>
      <p>PH Digital Education đã đào tạo hơn <strong>2.500+ sinh viên DNTU</strong> vượt qua chuẩn đầu ra với tỷ lệ đỗ 100%. Lớp học được thiết kế linh hoạt buổi tối hoặc cuối tuần, kèm 1:1 sát đề thi, tặng phần mềm luyện thi Certiport không giới hạn.</p>
    `
  },
  {
    slug: "top-10-ham-excel-nang-cao-dan-van-phong-phai-biet",
    title: "Top 10 Hàm Excel Nâng Cao Dân Văn Phòng & Kế Toán Bắt Buộc Phải Thuộc Lòng",
    excerpt: "Khám phá các hàm Excel quyền lực giúp tự động hóa báo cáo, xử lý dữ liệu lớn và tiết kiệm 80% thời gian làm việc văn phòng mỗi ngày.",
    coverImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1000&auto=format&fit=crop&q=80",
    category: "excel-office",
    categoryName: "Thực Chiến Excel & Office",
    author: {
      name: "Chuyên Gia Excel PH Digital",
      role: "Chuyên Gia Dữ Liệu & Dashboard",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80"
    },
    publishedAt: "2026-08-12",
    readTime: "8 phút đọc",
    views: 5210,
    tags: ["Excel nâng cao", "Hàm XLOOKUP", "Tự động hóa báo cáo", "Kế toán Excel"],
    relatedCourseId: "combo-survival-office",
    tableOfContents: [
      { id: "xlookup-thay-the-vlookup", title: "1. XLOOKUP - Vũ khí tối thượng thay thế VLOOKUP & INDEX/MATCH" },
      { id: "sumifs-averageifs", title: "2. SUMIFS & COUNTIFS đa điều kiện" },
      { id: "filter-sort-dynamic", title: "3. FILTER & SORT - Hàm mảng động mới nhất" },
      { id: "unique-textjoin", title: "4. UNIQUE & TEXTJOIN - Gom lọc dữ liệu siêu tốc" },
      { id: "iferror-ket-hop", title: "5. IFERROR - Giữ bảng tính luôn sạch đẹp" }
    ],
    content: `
      <h2>1. XLOOKUP - Vũ khí tối thượng thay thế VLOOKUP & INDEX/MATCH</h2>
      <p>Nếu bạn vẫn đang dùng VLOOKUP và phải đếm cột thủ công, đã đến lúc chuyển sang <strong>XLOOKUP</strong>. Hàm này có thể tra cứu sang trái, sang phải, trả về giá trị mặc định khi không tìm thấy mà không cần lồng IFERROR.</p>
      
      <pre><code class="language-excel">=XLOOKUP(lookup_value, lookup_array, return_array, [if_not_found], [match_mode])</code></pre>

      <h2>2. SUMIFS & COUNTIFS đa điều kiện</h2>
      <p>Dùng để tính tổng doanh thu theo nhiều tiêu chí như theo Nhân viên, theo Tháng và theo Khu vực. Đây là hàm xương sống trong mọi file kế toán và quản trị bán hàng.</p>

      <h2>3. FILTER & SORT - Hàm mảng động mới nhất</h2>
      <p>Chỉ cần 1 công thức duy nhất, Excel tự động lọc và đổ ra danh sách thỏa mãn điều kiện sang một vùng dữ liệu mới mà không cần thao tác bấm Filter thủ công mỗi ngày.</p>
    `
  },
  {
    slug: "huong-dan-ung-dung-ai-chatgpt-powerpoint-tang-toc-10x",
    title: "Hướng Dẫn Kết Hợp ChatGPT + Copilot + Gamma Thiết Kế Slide Thuyết Trình Đẹp Chỉ Trong 5 Phút",
    excerpt: "Tuyệt chiêu tạo bài thuyết trình chuyên nghiệp, dàn ý logic và hình ảnh minh họa sống động bằng công nghệ AI tiên tiến nhất hiện nay.",
    coverImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1000&auto=format&fit=crop&q=80",
    category: "ai-technology",
    categoryName: "Ứng Dụng AI Văn Phòng",
    author: {
      name: "Thầy Huy (MOS Master)",
      role: "Giám Đốc Đào Tạo PH Digital",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80"
    },
    publishedAt: "2026-08-20",
    readTime: "6 phút đọc",
    views: 2980,
    tags: ["AI văn phòng", "ChatGPT PowerPoint", "Gamma AI", "Tăng tốc hiệu suất"],
    relatedCourseId: "ai-office-breakthrough",
    tableOfContents: [
      { id: "quy-trinh-3-buoc-ai", title: "1. Quy trình 3 bước ứng dụng AI tạo slide chuẩn chuyên gia" },
      { id: "prompt-chatgpt-tao-dan-y", title: "2. Bộ câu lệnh Prompt chuẩn để ChatGPT viết nội dung slide" },
      { id: "gamma-app-bien-text-thanh-slide", title: "3. Sử dụng Gamma App biến văn bản thành slide chỉ 60 giây" },
      { id: "tinh-chinh-bang-powerpoint", title: "4. Hoàn thiện và tinh chỉnh trên Microsoft PowerPoint 365" }
    ],
    content: `
      <h2>1. Quy trình 3 bước ứng dụng AI tạo slide chuẩn chuyên gia</h2>
      <p>Việc làm slide thuyết trình trước đây mất từ 4 - 8 tiếng, nay có thể rút ngắn xuống còn <strong>dưới 15 phút</strong> nếu bạn kết hợp đúng công cụ AI.</p>
      
      <h2>2. Bộ câu lệnh Prompt chuẩn để ChatGPT viết nội dung slide</h2>
      <p>Áp dụng cấu trúc Prompt đóng vai:</p>
      <blockquote class="border-l-4 border-cyan-500 pl-4 italic text-slate-700 bg-slate-50 p-3 rounded-r-xl">
        "Bạn là một chuyên gia tư vấn chiến lược cấp cao. Hãy lập dàn ý bài thuyết trình 10 slides về chủ đề [Chủ đề của bạn] dành cho đối tượng [Khán giả]. Với mỗi slide, hãy ghi rõ: Tiêu đề slide, 3 ý chính dạng bullet point ngắn gọn, và gợi ý 1 hình ảnh trực quan tương ứng."
      </blockquote>
    `
  },
  {
    slug: "so-sanh-mos-2016-mos-2019-va-mos-365-nen-thi-loai-nao",
    title: "So Sánh MOS 2016, MOS 2019 và MOS 365: Sinh Viên Nên Thi Phiên Bản Nào?",
    excerpt: "Phân tích chi tiết sự khác biệt về giao diện, độ khó và tính ứng dụng của các phiên bản chứng chỉ MOS để giúp bạn chọn đúng môn thi phù hợp chuẩn trường ĐH.",
    coverImage: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1000&auto=format&fit=crop&q=80",
    category: "mos-ic3",
    categoryName: "Luyện Thi MOS & IC3",
    author: {
      name: "Ban Đào Tạo PH Digital",
      role: "Chuyên Viên Khảo Thí & Chuẩn ĐH",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=80"
    },
    publishedAt: "2026-08-05",
    readTime: "6 phút đọc",
    views: 4120,
    tags: ["MOS 2019", "MOS 365", "So sánh chứng chỉ", "Tư vấn MOS"],
    relatedCourseId: "mos-2019",
    tableOfContents: [
      { id: "tong-quan-cac-phien-ban", title: "1. Tổng quan 3 phiên bản MOS phổ biến hiện nay" },
      { id: "bang-so-sanh-chi-tiet", title: "2. Bảng so sánh tính năng và giao diện thi" },
      { id: "loi-khuyen-chon-phien-ban", title: "3. Lời khuyên lựa chọn phiên bản tối ưu nhất 2026" }
    ],
    content: `
      <h2>1. Tổng quan 3 phiên bản MOS phổ biến hiện nay</h2>
      <p>Chứng chỉ Microsoft Office Specialist (MOS) có giá trị <strong>vô thời hạn trên toàn cầu</strong>. Tuy nhiên, việc lựa chọn phiên bản 2016, 2019 hay Microsoft 365 Apps ảnh hưởng trực tiếp đến chuẩn đầu ra và cơ hội nghề nghiệp.</p>

      <h2>2. Bảng so sánh tính năng và giao diện thi</h2>
      <div class="overflow-x-auto my-4">
        <table class="w-full text-left border-collapse border border-slate-200 text-sm">
          <thead>
            <tr class="bg-slate-100 font-bold text-slate-900">
              <th class="border p-3">Tiêu Chí</th>
              <th class="border p-3">MOS 2016</th>
              <th class="border p-3">MOS 2019 / 365</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="border p-3 font-semibold">Format Đề Thi</td>
              <td class="border p-3">Multi-Project (5-7 dự án)</td>
              <td class="border p-3">Multi-Project tối ưu hóa</td>
            </tr>
            <tr class="bg-slate-50">
              <td class="border p-3 font-semibold">Mức độ thịnh hành</td>
              <td class="border p-3">Đang giảm dần</td>
              <td class="border p-3 font-bold text-emerald-600">Chuẩn khuyến nghị 2026</td>
            </tr>
            <tr>
              <td class="border p-3 font-semibold">Công nhận chuẩn ĐH</td>
              <td class="border p-3">Đa số vẫn chấp nhận</td>
              <td class="border p-3 font-bold text-blue-600">100% tất cả các trường ĐH chấp nhận</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2>3. Lời khuyên lựa chọn phiên bản tối ưu nhất 2026</h2>
      <p>Chúng tôi khuyên bạn nên lựa chọn thi <strong>MOS 2019 hoặc MOS 365</strong> vì đây là phiên bản hiện đại, có thêm các hàm Excel mới (như TEXTJOIN, CONCAT, IFS, XLOOKUP) và giao diện bám sát các máy tính văn phòng tại doanh nghiệp hiện đại.</p>
    `
  },
  {
    slug: "chuan-dau-ra-tin-hoc-dai-hoc-lac-hong-lhu",
    title: "Chuẩn Đầu Ra Tin Học Đại Học Lạc Hồng (LHU) - Hướng Dẫn Chi Tiết A-Z",
    excerpt: "Thông tin chuẩn đầu ra IC3 GS6 và MOS dành cho sinh viên Lạc Hồng (LHU): Khung điểm yêu cầu, cách đăng ký dự thi và bí quyết đạt điểm cao.",
    coverImage: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1000&auto=format&fit=crop&q=80",
    category: "chuan-dau-ra",
    categoryName: "Chuẩn Đầu Ra Đại Học",
    author: {
      name: "Ban Đào Tạo PH Digital",
      role: "Chuyên Viên Khảo Thí & Chuẩn ĐH",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=80"
    },
    publishedAt: "2026-08-10",
    readTime: "5 phút đọc",
    views: 3180,
    tags: ["LHU", "Chuẩn đầu ra Lạc Hồng", "IC3 LHU", "MOS Lạc Hồng"],
    relatedCourseId: "ic3-gs6",
    tableOfContents: [
      { id: "quy-dinh-lhu", title: "1. Quy định chuẩn đầu ra CNTT Đại học Lạc Hồng" },
      { id: "cac-lua-chon-chung-chi", title: "2. Các chứng chỉ sinh viên LHU có thể lựa chọn" },
      { id: "lop-on-thi-lhu", title: "3. Lớp luyện thi chuyên biệt dành cho sinh viên LHU" }
    ],
    content: `
      <h2>1. Quy định chuẩn đầu ra CNTT Đại học Lạc Hồng</h2>
      <p>Sinh viên Trường Đại học Lạc Hồng (LHU) cần hoàn thành chuẩn đầu ra tin học trước khi nhận đồ án/khóa luận tốt nghiệp. Trường công nhận cả hai hệ thống chứng chỉ là <strong>MOS (Word + Excel)</strong> và <strong>IC3 GS5 / GS6</strong>.</p>
      
      <h2>2. Các chứng chỉ sinh viên LHU có thể lựa chọn</h2>
      <p>Lựa chọn phổ biến nhất và tiết kiệm thời gian nhất cho sinh viên LHU là khóa <strong>IC3 GS6 (Kỹ năng số toàn diện)</strong> hoặc <strong>Combo 2 môn MOS Word & Excel</strong>.</p>
    `
  }
];

export const BLOG_CATEGORIES = [
  { id: "all", label: "Tất cả bài viết", icon: "Sparkles" },
  { id: "mos-ic3", label: "Luyện Thi MOS & IC3", icon: "Award" },
  { id: "chuan-dau-ra", label: "Chuẩn Đầu Ra ĐH", icon: "School" },
  { id: "excel-office", label: "Thực Chiến Excel & Office", icon: "BookOpen" },
  { id: "ai-technology", label: "Ứng Dụng AI Văn Phòng", icon: "Zap" },
];
