import { Star } from "lucide-react";
import { Testimonial } from "@/data/mockData";

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export default function TestimonialCard({ testimonial }: TestimonialCardProps) {
  // Extract initials for the custom gradient avatar
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .slice(-2)
      .join("")
      .toUpperCase();
  };

  // Map IDs to specific colorful gradients for visual variety
  const getGradient = (id: string) => {
    const gradients = [
      "from-blue-600 to-cyan-400",
      "from-purple-600 to-pink-500",
      "from-teal-500 to-emerald-400",
      "from-indigo-600 to-blue-500",
    ];
    const index = parseInt(id.replace(/\D/g, "")) || 0;
    return gradients[index % gradients.length];
  };

  return (
    <div className="bg-white p-6 sm:p-7 rounded-3xl border border-slate-200/80 hover:border-blue-500/25 shadow-premium hover:shadow-premium-hover transition-all duration-500 flex flex-col justify-between h-full group relative">
      
      {/* Dynamic Quotation Mark Mark */}
      <span className="absolute top-3 right-6 text-slate-100 text-7xl font-serif select-none pointer-events-none group-hover:text-blue-50 smooth-transition">
        “
      </span>

      <div className="relative z-10 flex-1 flex flex-col">
        {/* Star Rating */}
        <div className="flex gap-1 text-amber-400 mb-4">
          {[...Array(testimonial.rating)].map((_, i) => (
            <Star key={i} size={15} fill="currentColor" />
          ))}
        </div>

        {/* Content */}
        <blockquote className="text-slate-600 text-xs sm:text-sm leading-relaxed font-semibold italic flex-1">
          "{testimonial.content}"
        </blockquote>
      </div>

      {/* User Information Footer */}
      <div className="flex items-center gap-3.5 border-t border-slate-100/80 pt-5 mt-6 relative z-10">
        
        {/* Colorful Gradient Initials Avatar */}
        <div className={`w-11 h-11 rounded-full bg-gradient-to-tr ${getGradient(testimonial.id)} flex items-center justify-center font-black text-white text-xs shadow-md shrink-0 select-none`}>
          {getInitials(testimonial.name)}
        </div>
        
        <div className="flex flex-col min-w-0">
          <cite className="not-italic text-sm font-black text-slate-900 leading-snug truncate">
            {testimonial.name}
          </cite>
          <span className="text-[10px] font-black text-blue-600 uppercase tracking-wide mt-1.5 truncate">
            {testimonial.courseOrService}
          </span>
          <span className="text-[9px] text-slate-400 font-bold tracking-normal mt-0.5 truncate">
            {testimonial.role}
          </span>
        </div>

      </div>

    </div>
  );
}
