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

export function GraduationCapMark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 36 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 ${className}`}
    >
      {/* Top Diamond */}
      <path d="M18 2L35 10L18 18L1 10L18 2Z" fill="#0066FF" />
      {/* Cylinder base / cap underside */}
      <path
        d="M6.5 14V22.5C6.5 22.5 10.5 27 18 27C25.5 27 29.5 22.5 29.5 22.5V14C26.5 16.5 22.5 18 18 18C13.5 18 9.5 16.5 6.5 14Z"
        fill="#0052CC"
      />
      {/* Tassel */}
      <path
        d="M31 11V21C31 22 32 23 33 23"
        stroke="#0066FF"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <circle cx="33" cy="23" r="1.5" fill="#0066FF" />
    </svg>
  );
}

export default function BrandLogo({
  variant = "horizontal",
  theme = "default",
  priority = false,
  className = "",
  asLink = true,
  href = "/",
  ariaLabel = "Tin Học Gen Z - Trang chủ",
}: BrandLogoProps) {
  // If variant is "master" or "symbol", render the original image assets
  if (variant === "master" || variant === "symbol") {
    const src =
      variant === "symbol"
        ? "/brand/logo-symbol.png"
        : theme === "light"
        ? "/brand/logo-horizontal-light.png"
        : "/brand/logo-horizontal.png";

    const imageElement = (
      <Image
        src={src}
        alt="Tin Học Gen Z"
        width={variant === "symbol" ? 36 : 180}
        height={36}
        priority={priority}
        className={`object-contain transition-transform duration-200 select-none ${className}`}
        style={{ height: "36px", width: "auto" }}
      />
    );

    if (asLink) {
      return (
        <Link href={href} className="inline-flex items-center shrink-0" aria-label={ariaLabel}>
          {imageElement}
        </Link>
      );
    }
    return <div className="inline-flex items-center shrink-0">{imageElement}</div>;
  }

  // Default "horizontal" uses the clean reference logo (Graduation Cap + Tin Học Gen Z) from the design reference
  const content = (
    <div className={`inline-flex items-center gap-2.5 select-none group/logo ${className}`}>
      <GraduationCapMark className="w-8 h-8 sm:w-9 sm:h-9" />
      <span
        className={`text-xl sm:text-[22px] font-extrabold tracking-tight transition-colors ${
          theme === "light" ? "text-white" : "text-[#0B2545] group-hover/logo:text-[#0066FF]"
        }`}
      >
        Tin Học Gen Z
      </span>
    </div>
  );

  if (asLink) {
    return (
      <Link
        href={href}
        className="inline-flex items-center shrink-0 focus-visible:outline-2 focus-visible:outline-[#0066FF] rounded-lg p-0.5"
        aria-label={ariaLabel}
      >
        {content}
      </Link>
    );
  }

  return <div className="inline-flex items-center shrink-0">{content}</div>;
}
