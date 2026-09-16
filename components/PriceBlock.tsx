import React from "react";

interface PriceBlockProps {
  price: string | number;
  originalPrice?: string | number;
  priceNote?: string;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export default function PriceBlock({
  price,
  originalPrice,
  priceNote,
  className = "",
  size = "md",
}: PriceBlockProps) {
  const priceStr = String(price || "");

  // Format currency helper
  const formatCurrency = (val: string | number) => {
    if (typeof val === "number") {
      return new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
      }).format(val);
    }
    return val;
  };

  // Check for multi-tier pricing (separated by |)
  if (priceStr.includes("|")) {
    const parts = priceStr.split("|");
    return (
      <div className={`flex flex-col gap-2 w-full ${className}`}>
        <div className="space-y-1.5 w-full">
          {parts.map((part, idx) => {
            const [label, val] = part.split(":");
            return (
              <div
                key={idx}
                className="flex justify-between items-center bg-white border border-[#0057B8] px-3 py-1.5 rounded-md"
              >
                <span className="text-xs font-semibold text-[#0057B8] uppercase tracking-wide">
                  {label.trim()}
                </span>
                <span className="text-xs font-black text-[#0057B8]">
                  {val ? val.trim() : part.trim()}
                </span>
              </div>
            );
          })}
        </div>
        {priceNote && (
          <div className="text-xs font-semibold text-[#0057B8] border-l-2 border-[#0057B8] pl-2 mt-1">
            {priceNote}
          </div>
        )}
      </div>
    );
  }

  // Parse main price and package/unit
  let mainPrice = priceStr;
  let unit = "";

  if (priceStr.includes("(") && priceStr.includes(")")) {
    const match = priceStr.match(/^(.*?)\s*\((.*?)\)$/);
    if (match) {
      mainPrice = match[1].trim();
      unit = match[2].trim();
    }
  } else if (priceStr.includes("/")) {
    const [p, u] = priceStr.split("/");
    mainPrice = p.trim();
    unit = u ? `/${u.trim()}` : "";
  }

  const isLg = size === "lg";
  const isSm = size === "sm";

  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      {/* Line 1: Main price + original crossed-out price */}
      <div className="flex items-baseline gap-2 flex-wrap">
        <span
          className={`font-black text-[#0057B8] tracking-tight leading-none ${
            isLg ? "text-3xl sm:text-4xl" : isSm ? "text-base font-black" : "text-2xl"
          }`}
        >
          {formatCurrency(mainPrice)}
        </span>
        {originalPrice && (
          <span className="text-xs font-semibold text-[#0057B8] line-through opacity-70">
            {formatCurrency(originalPrice)}
          </span>
        )}
      </div>

      {/* Line 2: Package / Unit breakdown */}
      {unit && (
        <span className="text-xs font-bold text-[#0057B8] tracking-wide">
          {unit}
        </span>
      )}

      {/* Line 3: Promotional offer or discount note */}
      {priceNote && (
        <div className="mt-1">
          <span className="inline-block text-[11px] font-bold text-[#0057B8] border border-[#0057B8] px-2 py-0.5 rounded-sm">
            {priceNote}
          </span>
        </div>
      )}
    </div>
  );
}

