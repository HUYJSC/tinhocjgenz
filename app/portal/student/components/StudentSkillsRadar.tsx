"use client";

interface SkillMetric {
  name: string;
  percent: number;
  status: string;
  note: string;
}

const DEFAULT_SKILLS: SkillMetric[] = [
  { name: "Công thức & Hàm Excel (XLOOKUP, IF, SUMIFS)", percent: 92, status: "Thành thạo", note: "Đạt chuẩn 1000/1000 bài thi thử" },
  { name: "Cấu trúc Văn bản & Heading Styles Word", percent: 88, status: "Thành thạo", note: "Tạo mục lục tự động chính xác" },
  { name: "Trộn Thư Tự Động (Mail Merge)", percent: 95, status: "Thành thạo", note: "Hoàn thành 100% yêu cầu bài tập" },
  { name: "Báo cáo Động PivotTable & Biểu Đồ", percent: 75, status: "Cần cải thiện", note: "Cần ôn thêm kỹ thuật Slicer lồng nhau" },
  { name: "An Toàn Dữ Liệu & Điện Toán Đám Mây (IC3)", percent: 90, status: "Thành thạo", note: "Hiểu rõ bảo mật 2FA và Cloud" },
  { name: "Slide Master & Hiệu Ứng Trình Chiếu", percent: 65, status: "Cần cải thiện", note: "Sắp học tại Buổi 5" },
];

export default function StudentSkillsRadar() {
  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-xl font-bold text-white">Bảng Đo Lường Năng Lực & Kỹ Năng Số</h3>
          <p className="text-xs text-slate-400">
            Dữ liệu tổng hợp từ bài kiểm tra đầu vào, bài tập thực hành và đề thi thử Certiport.
          </p>
        </div>
        <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-950 text-blue-300 border border-blue-700">
          ĐIỂM NĂNG LỰC: 885 / 1000
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {DEFAULT_SKILLS.map((sk, idx) => (
          <div key={idx} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
            <div className="flex justify-between items-center text-xs font-bold">
              <span className="text-white">{sk.name}</span>
              <span className="text-blue-400">
                {sk.percent}% • {sk.status}
              </span>
            </div>
            <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full bg-blue-500"
                style={{ width: `${sk.percent}%` }}
              />
            </div>
            <p className="text-xs text-slate-500">{sk.note}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

