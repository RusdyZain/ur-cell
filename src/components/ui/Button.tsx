import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type ButtonVariant = "primary" | "secondary" | "ghost";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
};

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "border border-shell-primary bg-shell-primary text-white shadow-lg shadow-shell-primary/30 hover:bg-shell-primary-dark hover:border-shell-primary-dark",
  secondary:
    "border border-shell-secondary bg-shell-secondary/25 text-shell-foreground hover:bg-shell-secondary/40",
  ghost:
    "border border-shell-border bg-white text-shell-foreground hover:bg-shell-accent/50"
};

export function Button({ className, variant = "primary", type = "button", ...props }: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        "inline-flex min-h-12 items-center justify-center rounded-action px-6 py-3 text-sm font-extrabold transition disabled:cursor-not-allowed disabled:opacity-50",
        variantStyles[variant],
        className
      )}
      {...props}
    />
  );
}
