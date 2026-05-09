import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type TopBarProps = {
  title?: string;
  subtitle?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  className?: string;
  textClassName?: string;
};

const defaultMenu = (
  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden="true">
    <path d="M5 7H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M5 12H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M5 17H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const defaultRight = (
  <div className="flex items-center gap-2">
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
      <path d="M12 21s-6.7-4.35-8.85-8.38C1.75 10 2.6 6.7 5.42 5.4c1.95-.9 4.2-.35 5.58 1.25 1.38-1.6 3.63-2.15 5.58-1.25 2.82 1.3 3.67 4.6 2.27 7.22C18.7 16.65 12 21 12 21Z" />
    </svg>
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
      <circle cx="12" cy="5" r="1.8" />
      <circle cx="12" cy="12" r="1.8" />
      <circle cx="12" cy="19" r="1.8" />
    </svg>
  </div>
);

export function TopBar({
  title = "selmu",
  subtitle,
  leftIcon = defaultMenu,
  rightIcon = defaultRight,
  className,
  textClassName
}: TopBarProps) {
  return (
    <header className={cn("flex h-11 items-center justify-between px-4 text-[#7888aa]", className)}>
      <div className="inline-flex h-8 w-8 items-center justify-center">{leftIcon}</div>
      <div className={cn("text-center", textClassName)}>
        <p className="text-[11px] font-extrabold tracking-[0.12em]">{title}</p>
        {subtitle ? <p className="mt-0.5 text-[9px] font-semibold opacity-80">{subtitle}</p> : null}
      </div>
      <div className="inline-flex h-8 min-w-8 items-center justify-center">{rightIcon}</div>
    </header>
  );
}
