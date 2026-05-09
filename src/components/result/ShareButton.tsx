"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { PrimaryButton } from "@/components/PrimaryButton";

type ShareButtonProps = {
  cellName: string;
  englishName: string;
  label?: string;
  className?: string;
};

export function ShareButton({ cellName, englishName, label, className }: ShareButtonProps) {
  const t = useTranslations("shareButton");
  const [status, setStatus] = useState<string>("");

  const handleShare = async () => {
    const url = window.location.href;
    const message = t("message", { cellName, englishName, url });

    try {
      if (navigator.share) {
        await navigator.share({
          title: t("title"),
          text: message,
          url
        });
        setStatus(t("shared"));
        return;
      }

      await navigator.clipboard.writeText(message);
      setStatus(t("copied"));
    } catch {
      setStatus(t("failed"));
    }
  };

  return (
    <div className="flex min-w-0 flex-1 flex-col gap-1">
      <PrimaryButton onClick={handleShare} className={className ?? "w-full text-[20px] font-black"}>
        {label ?? "Share"}
      </PrimaryButton>
      {status ? <p className="text-center text-[10px] font-semibold text-ink-soft">{status}</p> : null}
    </div>
  );
}
