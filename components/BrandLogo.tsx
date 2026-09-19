import React from "react";
import Image from "next/image";
import Link from "next/link";

export type LogoVariant = "horizontal" | "symbol" | "master";
export type LogoTheme = "default" | "light";
export type LogoSize = "xs" | "sm" | "md" | "lg" | "xl";

interface BrandLogoProps {
  variant?: LogoVariant;
  theme?: LogoTheme;
  size?: LogoSize;
  priority?: boolean;
  className?: string;
  asLink?: boolean;
  href?: string;
  ariaLabel?: string;
}

// Dimensions mapping maintaining original aspect ratios
// logo-horizontal: 928 x 215 (~4.316 : 1)
// logo-symbol: 304 x 304 (1 : 1)
const SIZE_CONFIG = {
  horizontal: {
    xs: { width: 121, height: 28 },
    sm: { width: 147, height: 34 },
    md: { width: 173, height: 40 },
    lg: { width: 200, height: 46 },
    xl: { width: 233, height: 54 },
  },
  symbol: {
    xs: { width: 28, height: 28 },
    sm: { width: 34, height: 34 },
    md: { width: 40, height: 40 },
    lg: { width: 48, height: 48 },
    xl: { width: 56, height: 56 },
  },
};

export default function BrandLogo({
  variant = "horizontal",
  theme = "default",
  size = "md",
  priority = false,
  className = "",
  asLink = true,
  href = "/",
  ariaLabel = "Tin Học Gen Z - Học Thiệt, Thi Thật, Giá Trị Thật",
}: BrandLogoProps) {
  const isSymbol = variant === "symbol";
  const sizeMap = isSymbol ? SIZE_CONFIG.symbol : SIZE_CONFIG.horizontal;
  const dimensions = sizeMap[size] || sizeMap.md;

  const src = isSymbol
    ? "/brand/logo-symbol.png"
    : theme === "light"
    ? "/brand/logo-horizontal-light.png"
    : "/brand/logo-horizontal.png";

  const imageElement = (
    <Image
      src={src}
      alt="Tin Học Gen Z - Học Thiệt, Thi Thật, Giá Trị Thật"
      width={dimensions.width}
      height={dimensions.height}
      priority={priority}
      className={`object-contain select-none transition-transform duration-200 group-hover/logo:scale-[1.02] ${className}`}
      style={{ height: `${dimensions.height}px`, width: "auto" }}
    />
  );

  if (asLink) {
    return (
      <Link
        href={href}
        className="group/logo inline-flex items-center shrink-0 focus-visible:outline-2 focus-visible:outline-[#0057B8] rounded-lg p-0.5"
        aria-label={ariaLabel}
      >
        {imageElement}
      </Link>
    );
  }

  return <div className="inline-flex items-center shrink-0">{imageElement}</div>;
}
