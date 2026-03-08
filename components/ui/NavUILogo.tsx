import type { HTMLAttributes } from "react";

type NavUILogoProps = {
  compact?: boolean;
  hideTextOnMobile?: boolean;
  className?: string;
  textClassName?: string;
} & Omit<HTMLAttributes<HTMLSpanElement>, "className">;

export function NavUILogo({
  compact = false,
  hideTextOnMobile = false,
  className = "",
  textClassName = "",
  ...rest
}: NavUILogoProps) {
  return (
    <span className={`inline-flex items-center gap-1.5 ${className}`} {...rest}>
      <span
        className={`inline-flex items-center justify-center rounded-md bg-black text-white dark:bg-white dark:text-black ${
          compact ? "h-5 w-5" : "h-6 w-6"
        }`}
        aria-hidden
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={compact ? "h-3.5 w-3.5" : "h-4 w-4"}
        >
          <path
            d="M5 18V6L12 14V6L19 18"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <span
        className={`font-semibold tracking-tight ${compact ? "text-xs" : "text-sm"} ${
          hideTextOnMobile ? "hidden sm:inline" : ""
        } ${textClassName}`}
      >
        NavUI
      </span>
    </span>
  );
}
