import type { HTMLAttributes, CSSProperties } from "react";
import { cn } from "@/lib/cn";

type AppShellProps = HTMLAttributes<HTMLDivElement> & {
  outerClassName?: string;
  shellStyle?: CSSProperties;
};

export function AppShell({ className, outerClassName, shellStyle, children, ...props }: AppShellProps) {
  return (
    <main
      className={cn(
        "min-h-[100dvh] w-full bg-[radial-gradient(circle_at_20%_10%,#e8f1ff_0%,transparent_45%),radial-gradient(circle_at_80%_90%,#dce8ff_0%,transparent_42%),linear-gradient(180deg,#c8d4ee_0%,#bfcde9_100%)] px-3 py-6",
        outerClassName
      )}
    >
      <div
        className={cn(
          "mx-auto flex min-h-[calc(100dvh-3rem)] w-full max-w-[392px] flex-col overflow-hidden rounded-[30px] bg-[#f7f9ff] shadow-[0_24px_58px_rgba(48,76,133,0.34)]",
          className
        )}
        style={shellStyle}
        {...props}
      >
        {children}
      </div>
    </main>
  );
}
