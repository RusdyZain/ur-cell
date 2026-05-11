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
        "min-h-[100dvh] w-full bg-[radial-gradient(circle_at_18%_10%,#dff8ff_0%,transparent_45%),radial-gradient(circle_at_82%_88%,#ccefff_0%,transparent_42%),linear-gradient(180deg,#a8e6f7_0%,#8fd8ef_100%)] px-3 py-6",
        outerClassName
      )}
    >
      <div
        className={cn(
          "mx-auto flex min-h-[calc(100dvh-3rem)] w-full max-w-[392px] flex-col overflow-hidden rounded-[30px] bg-[#f4fcff] shadow-[0_24px_58px_rgba(17,142,177,0.34)]",
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
