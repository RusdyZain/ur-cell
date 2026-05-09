"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/cn";

type MascotHeroProps = {
  src: string;
  fallbackEmoji: string;
  alt: string;
  priority?: boolean;
  className?: string;
};

export function MascotHero({ src, fallbackEmoji, alt, priority = false, className }: MascotHeroProps) {
  const candidates = useMemo(() => {
    const fallbackPng = src.endsWith(".webp") ? src.replace(/\.webp$/i, ".png") : src;
    return Array.from(new Set([src, fallbackPng]));
  }, [src]);

  const [sourceIndex, setSourceIndex] = useState(0);
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className={cn(
          "inline-flex h-[190px] w-[190px] items-center justify-center rounded-full bg-white/75 text-7xl shadow-[0_18px_42px_rgba(116,122,170,0.2)]",
          className
        )}
      >
        <span role="img" aria-label={alt}>
          {fallbackEmoji}
        </span>
      </div>
    );
  }

  return (
    <Image
      src={candidates[sourceIndex]}
      alt={alt}
      width={220}
      height={220}
      priority={priority}
      className={cn(
        "mascot-float h-[190px] w-[190px] object-contain drop-shadow-[0_18px_32px_rgba(37,40,60,0.18)]",
        className
      )}
      onError={() => {
        if (sourceIndex < candidates.length - 1) {
          setSourceIndex((prev) => prev + 1);
          return;
        }
        setFailed(true);
      }}
    />
  );
}
