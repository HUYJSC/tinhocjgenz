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

  return (
    <div className="bg-white p-6 sm:p-7 rounded-2xl border border-slate-200/80 hover:border-blue-500/25 shadow-premium hover:shadow-premium-hover smooth-transition flex flex-col justify-between h-full group relative">
      
      {/* Dynamic Quotation Mark Mark */}
      <span className="absolute top-3 right-6 text-slate-100 text-7xl font-serif select-none pointer-events-none group-hover:text-blue-50 smooth-transition">
        “
      </span>

      <div className="relative z-10 flex-1 flex flex-col">
        {/* Star Rating */}
        <div className="flex gap-1 text-blue-400 mb-4">
          {[...Array(testimonial.rating)].map((_, i) => (
            <Star key={i} size={15} fill="currentColor" />
          ))}
        </div>

        {/* Content */}
        <blockquote className="text-slate-600 text-xs sm:text-sm leading-relaxed font-semibold italic flex-1">
          &ldquo;{testimonial.content}&rdquo;
        </blockquote>
      </div>

      {/* User Information Footer */}
      <div className="flex items-center gap-3.5 border-t border-slate-100/80 pt-5 mt-6 relative z-10">
        
        <div className="flex h-11 w-11 shrink-0 select-none items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white shadow-sm">
          {getInitials(testimonial.name)}
        </div>
        
        <div className="flex flex-col min-w-0 flex-1">
          <div className="flex items-center justify-between gap-1">
            <cite className="not-italic text-sm font-bold text-slate-900 leading-snug truncate">
              {testimonial.name}
            </cite>
            {testimonial.score && (
              <span className="px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 border border-blue-200 text-xs font-bold shrink-0">
                {testimonial.score}
              </span>
            )}
          </div>
          <span className="text-xs font-bold text-blue-600 uppercase tracking-wide mt-1 truncate">
            {testimonial.courseOrService}
          </span>
          <span className="text-xs text-slate-500 font-bold tracking-normal mt-0.5 truncate">
            {testimonial.role} • {testimonial.universityOrCompany}
          </span>
        </div>

      </div>

    </div>
  );
}
