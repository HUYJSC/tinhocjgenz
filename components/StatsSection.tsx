import { Award, Clock, ShieldCheck } from "lucide-react";

export default function StatsSection() {
  const verifiedStats = [
    {
      id: "cert-instructors",
      value: "100%",
      label: "Giảng viên MOS Master Trainer",
      description: "Được chứng nhận chính thức từ Certiport / Microsoft",
      icon: <Award size={22} className="text-[#0057B8]" />,
    },
    {
      id: "duration-efficient",
      value: "3 - 5",
      label: "Buổi học thực chiến cấp tốc",
      description: "Lộ trình tinh gọn, thực hành trên máy ảo thi thử",
      icon: <Clock size={22} className="text-[#0057B8]" />,
    },
    {
      id: "guarantee-policy",
      value: "0 ₫",
      label: "Chi phí học lại nếu chưa đạt chuẩn",
      description: "Hỗ trợ học lại miễn phí đến khi đạt chuẩn đầu ra",
      icon: <ShieldCheck size={22} className="text-[#0057B8]" />,
    },
  ];

  return (
    <section className="py-8 md:py-12 bg-white relative z-10 border-b border-[#0057B8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {verifiedStats.map((item) => (
            <div
              key={item.id}
              className="flex items-start gap-4 p-5 sm:p-6 rounded-2xl bg-white border border-[#0057B8] text-[#0057B8]"
            >
              <div className="p-3 bg-white border border-[#0057B8] rounded-xl shrink-0">
                {item.icon}
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-2xl sm:text-3xl font-black text-[#0057B8] tracking-tight leading-none mb-1 font-display">
                  {item.value}
                </span>
                {/* UI-03: Allow text to wrap cleanly onto multiple lines without truncation */}
                <span className="text-xs sm:text-sm font-black text-[#0057B8] uppercase tracking-wide break-words whitespace-normal mt-0.5">
                  {item.label}
                </span>
                <span className="text-xs text-[#0057B8] font-medium mt-1 leading-snug break-words whitespace-normal">
                  {item.description}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
