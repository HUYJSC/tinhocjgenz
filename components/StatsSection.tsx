import { statsData } from "@/data/mockData";
import { Users, GraduationCap, Award } from "lucide-react";

export default function StatsSection() {
  // Mapping icons to stat item IDs
  const getIcon = (id: string) => {
    switch (id) {
      case "stat-1":
        return <Users size={22} className="text-blue-600 group-hover:scale-110 smooth-transition" />;
      case "stat-2":
        return <GraduationCap size={22} className="text-cyan-500 group-hover:scale-110 smooth-transition" />;
      case "stat-3":
        return <Award size={22} className="text-emerald-500 group-hover:scale-110 smooth-transition" />;
      default:
        return <Users size={22} className="text-blue-600" />;
    }
  };

  return (
    <section className="py-16 md:py-20 bg-white relative z-10 border-y border-slate-100/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {statsData.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-6 p-6 sm:p-7 rounded-3xl bg-slate-50/50 hover:bg-white border border-slate-100/80 hover:border-blue-500/25 transition-all duration-500 shadow-premium hover:shadow-premium-hover group"
            >
              <div className="p-4 bg-white border border-slate-100 rounded-2xl shadow-sm shrink-0 group-hover:bg-slate-50 group-hover:border-blue-100 smooth-transition">
                {getIcon(item.id)}
              </div>
              <div className="flex flex-col">
                <span className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-none mb-1.5 font-display">
                  {item.value}
                </span>
                <span className="text-xs font-black text-slate-800 uppercase tracking-wider">
                  {item.label}
                </span>
                <span className="text-xs text-slate-400 font-semibold mt-1 leading-normal">
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
