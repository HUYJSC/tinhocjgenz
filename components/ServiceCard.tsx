import Link from "next/link";
import { Monitor, Cpu, Palette, Terminal, Check, FileSpreadsheet } from "lucide-react";
import { TechService } from "@/data/mockData";

interface ServiceCardProps {
  service: TechService;
  index?: number;
}

export default function ServiceCard({ service, index = 0 }: ServiceCardProps) {
  // Map icons dynamically
  const getIcon = (id: string) => {
    switch (id) {
      case "cai-win-office":
        return <Monitor size={20} className="text-blue-600 group-hover:text-white transition-colors duration-300" />;
      case "cai-phan-mem-do-hoa":
        return <Palette size={20} className="text-blue-500 group-hover:text-white transition-colors duration-300" />;
      case "thiet-ke-excel-custom":
        return <FileSpreadsheet size={20} className="text-blue-600 group-hover:text-white transition-colors duration-300" />;
      case "cai-windows":
        return <Monitor size={20} className="text-blue-600 group-hover:text-white transition-colors duration-300" />;
      case "cai-office":
        return <Cpu size={20} className="text-blue-500 group-hover:text-white transition-colors duration-300" />;
      default:
        return <Terminal size={20} className="text-blue-600 group-hover:text-white transition-colors duration-300" />;
    }
  };

  // Map index to stagger delay class
  const delayClass = index === 0 ? "delay-0" : index === 1 ? "delay-100" : index === 2 ? "delay-200" : "delay-300";

  return (
    <div className={`flex flex-col justify-between bg-white rounded-2xl border border-slate-200/80 hover:border-blue-500/30 shadow-premium hover:shadow-premium-hover smooth-transition animate-slide-up ${delayClass} p-4 sm:p-5 group relative overflow-hidden h-full`}>
      
      {/* Decorative hover accent */}
      <div className="absolute top-0 left-0 w-full h-[3px] bg-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-150" />

      <div className="relative z-10 flex-1 flex flex-col justify-between">
        <div>
          {/* Header Icon + Name */}
          <div className="flex items-start gap-3.5">
            {/* Icon wrapper */}
            <div className="p-2.5 bg-slate-50 border border-slate-100 rounded-xl group-hover:bg-blue-600 group-hover:text-white shrink-0 transition-colors duration-150 text-slate-800">
              {getIcon(service.id)}
            </div>
            <div className="flex flex-col flex-grow">
              <h3 className="text-sm sm:text-[15px] font-bold text-slate-900 leading-snug group-hover:text-blue-600 transition-colors duration-150 min-h-[2.5rem] flex items-center">
                <span className="line-clamp-2">{service.name}</span>
              </h3>
              <span className="text-blue-650 font-bold text-xs mt-1 bg-blue-50/50 px-2 py-0.5 rounded-md border border-blue-100/30 w-fit">
                Giá: {service.price}
              </span>
            </div>
          </div>

          {/* Description - Locked height */}
          <p className="text-slate-500 text-xs leading-relaxed mt-3.5 min-h-[3.75rem] flex items-start font-semibold">
            <span className="line-clamp-3">{service.description}</span>
          </p>
        </div>

        <div>
          {/* Divider */}
          <div className="my-3.5 border-t border-slate-100" />

          {/* Key Features - Locked height */}
          <ul className="space-y-1.5 min-h-[6.5rem] flex flex-col justify-start">
            {service.features.slice(0, 4).map((feature, idx) => (
              <li key={idx} className="flex gap-2 text-slate-650 font-semibold text-xs leading-normal">
                <Check size={12} className="text-blue-500 shrink-0 mt-0.5 group-hover:scale-110 transition-transform duration-300" />
                <span className="flex-1 line-clamp-2">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Button Link */}
      <div className="mt-4 relative z-10">
        <Link
          href={`/lien-he?select=${service.id}`}
          className="w-full py-3 rounded-full text-xs font-bold tracking-wide uppercase transition-all duration-300 text-center active:scale-[0.98] btn-premium-secondary block"
        >
          Đặt dịch vụ ngay
        </Link>
      </div>

    </div>
  );
}
