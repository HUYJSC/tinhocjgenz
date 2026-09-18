import Image from "next/image";
import Link from "next/link";

export type LogoVariant = "horizontal" | "symbol";
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

// Aspect ratio of master horizontal logo: 928 / 215 ≈ 4.316
// Aspect ratio of symbol logo: 1:1
const SIZE_CONFIG = {
  horizontal: {
    xs: { height: 26, width: 112 },
    sm: { height: 32, width: 138 },
    md: { height: 42, width: 181 },
    lg: { height: 50, width: 216 },
    xl: { height: 60, width: 259 },
  },
  symbol: {
    xs: { height: 24, width: 24 },
    sm: { height: 32, width: 32 },
    md: { height: 40, width: 40 },
    lg: { height: 48, width: 48 },
    xl: { height: 64, width: 64 },
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
  ariaLabel = "Tin Học Gen Z - Trang chủ",
}: BrandLogoProps) {
  let src = "/brand/logo-horizontal.png";
  if (variant === "symbol") {
    src = "/brand/logo-symbol.png";
  } else if (theme === "light") {
    src = "/brand/logo-horizontal-light.png";
  }

  const dimensions = SIZE_CONFIG[variant][size] || SIZE_CONFIG[variant].md;

  const imageElement = (
    <Image
      src={src}
      alt="Tin Học Gen Z"
      width={dimensions.width}
      height={dimensions.height}
      priority={priority}
      className={`object-contain transition-transform duration-200 select-none ${className}`}
      style={{
        height: `${dimensions.height}px`,
        width: "auto",
        maxWidth: "100%",
      }}
    />
  );

  if (asLink) {
    return (
      <Link
        href={href}
        className="inline-flex items-center shrink-0 focus-visible:outline-2 focus-visible:outline-[#0057B8] rounded-lg p-0.5 group"
        aria-label={ariaLabel}
      >
        {imageElement}
      </Link>
    );
  }

  return <div className="inline-flex items-center shrink-0">{imageElement}</div>;
}

