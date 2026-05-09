import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type PrimaryButtonVariant = "primary" | "secondary";
type PrimaryButtonIcon = "play" | "share" | "arrow";

type PrimaryButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: PrimaryButtonVariant;
  icon?: PrimaryButtonIcon;
};

const variants: Record<PrimaryButtonVariant, string> = {
  primary:
    "bg-gradient-to-r from-[#5a89f0] to-[#4f78df] text-white border border-[#4f78df] shadow-[0_10px_22px_rgba(79,120,223,0.34)] hover:brightness-105",
  secondary:
    "bg-white text-[#2b3a56] border border-[#e3eaf8] shadow-[0_6px_16px_rgba(92,116,164,0.14)] hover:bg-[#f8fbff]"
};

function Icon({ kind, className }: { kind: PrimaryButtonIcon; className?: string }) {
  if (kind === "play") {
    return (
      <svg viewBox="0 0 24 24" className={cn("h-4 w-4", className)} fill="currentColor" aria-hidden="true">
        <path d="M8 6.8C8 6 8.8 5.5 9.5 5.9L18.2 11C18.9 11.4 18.9 12.5 18.2 12.9L9.5 18.1C8.8 18.5 8 18 8 17.2V6.8Z" />
      </svg>
    );
  }

  if (kind === "share") {
    return (
      <svg viewBox="0 0 24 24" className={cn("h-4 w-4", className)} fill="none" aria-hidden="true">
        <path d="M14 5H18V9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M10 14L18 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path
          d="M19 13V17C19 18.1 18.1 19 17 19H7C5.9 19 5 18.1 5 17V7C5 5.9 5.9 5 7 5H11"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" className={cn("h-4 w-4", className)} fill="none" aria-hidden="true">
      <path d="M7 12H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M13 8L17 12L13 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function PrimaryButton({
  className,
  variant = "primary",
  type = "button",
  icon,
  children,
  ...props
}: PrimaryButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        "inline-flex min-h-[48px] items-center justify-center gap-2 rounded-[12px] px-4 text-[14px] font-extrabold leading-none tracking-tight transition active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50",
        variants[variant],
        className
      )}
      {...props}
    >
      {icon ? <Icon kind={icon} /> : null}
      {children}
    </button>
  );
}
