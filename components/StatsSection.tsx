import { statsData } from "@/data/mockData";
import { Users, GraduationCap, Award, School, CheckCircle2 } from "lucide-react";

export default function StatsSection() {
  // Mapping icons to stat item IDs
  const getIcon = (id: string) => {
    switch (id) {
      case "students":
        return <Users size={22} className="text-[#0057B8] group-hover:scale-110 smooth-transition" />;
      case "pass-rate":
        return <CheckCircle2 size={22} className="text-[#0057B8] group-hover:scale-110 smooth-transition" />;
      case "universities":
        return <School size={22} className="text-[#0057B8] group-hover:scale-110 smooth-transition" />;
      case "cert-instructors":
        return <Award size={22} className="text-[#0057B8] group-hover:scale-110 smooth-transition" />;
      default:
        return <GraduationCap size={22} className="text-[#0057B8]" />;
    }
  };

  return (
    <section className="py-10 md:py-18 bg-white relative z-10 border-y border-[#E2E8F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {statsData.map((item) => (
            <div
              key={item.id}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-5 p-4 sm:p-6 rounded-2xl bg-[#F4F8FD]/60 hover:bg-white border border-[#E2E8F0] hover:border-[#0057B8]/40 transition-all duration-300 shadow-[0_4px_16px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_24px_rgba(0,87,184,0.08)] group"
            >
              <div className="p-3 bg-white border border-[#E2E8F0] rounded-xl shadow-xs shrink-0 group-hover:bg-[#F4F8FD] group-hover:border-[#0057B8]/30 transition-colors">
                {getIcon(item.id)}
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-2xl sm:text-3xl font-extrabold text-[#0B2545] tracking-tight leading-none mb-1.5 font-display">
                  {item.value}
                </span>
                <span className="text-xs font-bold text-[#0B2545] uppercase tracking-wide line-clamp-2 sm:truncate">
                  {item.label}
                </span>
                <span className="hidden sm:block text-xs text-slate-600 font-medium mt-0.5 leading-snug">
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
