"use client";

import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { generateBreadcrumbSchema, BreadcrumbItem } from "@/lib/schema";

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export default function Breadcrumb({ items, className = "" }: BreadcrumbProps) {
  const fullItems: BreadcrumbItem[] = [
    { name: "Trang chủ", url: "/" },
    ...items,
  ];

  const jsonLd = generateBreadcrumbSchema(fullItems);

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Visual Breadcrumb Navigation */}
      <nav
        aria-label="Breadcrumb"
        className={`flex items-center space-x-1 sm:space-x-2 text-xs sm:text-sm text-slate-500 overflow-x-auto py-2.5 scrollbar-none ${className}`}
      >
        {fullItems.map((item, index) => {
          const isLast = index === fullItems.length - 1;

          return (
            <div key={item.url + index} className="flex items-center whitespace-nowrap">
              {index > 0 && (
                <ChevronRight className="w-3.5 h-3.5 text-slate-400 mx-1 flex-shrink-0" />
              )}
              {index === 0 ? (
                <Link
                  href={item.url}
                  className="flex items-center gap-1 text-slate-600 hover:text-blue-600 font-medium transition-colors"
                >
                  <Home className="w-3.5 h-3.5" />
                  <span className="sr-only sm:not-sr-only">{item.name}</span>
                </Link>
              ) : isLast ? (
                <span
                  className="text-slate-900 font-semibold truncate max-w-[200px] sm:max-w-xs md:max-w-md"
                  aria-current="page"
                >
                  {item.name}
                </span>
              ) : (
                <Link
                  href={item.url}
                  className="text-slate-600 hover:text-blue-600 font-medium transition-colors"
                >
                  {item.name}
                </Link>
              )}
            </div>
          );
        })}
      </nav>
    </>
  );
}
