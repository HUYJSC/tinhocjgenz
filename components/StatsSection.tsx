import { statsData } from "@/data/mockData";
import { Users, GraduationCap, Award, School, CheckCircle2 } from "lucide-react";

export default function StatsSection() {
  // Mapping icons to stat item IDs
  const getIcon = (id: string) => {
    switch (id) {
      case "students":
        return <Users size={22} className="text-blue-600 group-hover:scale-110 smooth-transition" />;
      case "pass-rate":
        return <CheckCircle2 size={22} className="text-emerald-500 group-hover:scale-110 smooth-transition" />;
      case "universities":
        return <School size={22} className="text-indigo-500 group-hover:scale-110 smooth-transition" />;
      case "cert-instructors":
        return <Award size={22} className="text-amber-500 group-hover:scale-110 smooth-transition" />;
      default:
        return <GraduationCap size={22} className="text-blue-600" />;
    }
  };

  return (
    <section className="py-14 md:py-18 bg-white relative z-10 border-y border-slate-100/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {statsData.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-5 p-6 rounded-3xl bg-slate-50/70 hover:bg-white border border-slate-200/70 hover:border-blue-500/30 transition-all duration-300 shadow-premium hover:shadow-premium-hover group"
            >
              <div className="p-3.5 bg-white border border-slate-100 rounded-2xl shadow-sm shrink-0 group-hover:bg-slate-50 group-hover:border-blue-100 smooth-transition">
                {getIcon(item.id)}
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-none mb-1.5 font-display">
                  {item.value}
                </span>
                <span className="text-xs font-black text-slate-800 uppercase tracking-wider truncate">
                  {item.label}
                </span>
                <span className="text-[11px] text-slate-500 font-medium mt-0.5 leading-snug">
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
