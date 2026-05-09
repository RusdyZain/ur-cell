"use client";

import { useState } from "react";
import Image from "next/image";

type CellVisualProps = {
  assetKey: string;
  fallbackEmoji: string;
  label: string;
};

export function CellVisual({ assetKey, fallbackEmoji, label }: CellVisualProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className="inline-flex h-32 w-32 items-center justify-center rounded-full border border-shell-border bg-shell-accent text-6xl shadow-sm">
        <span role="img" aria-label={label}>
          {fallbackEmoji}
        </span>
      </div>
    );
  }

  return (
    <Image
      src={`/assets/cells/${assetKey}.png`}
      alt={label}
      width={160}
      height={160}
      className="h-32 w-32 rounded-full border border-shell-border bg-white object-cover shadow-sm"
      onError={() => setFailed(true)}
    />
  );
}
