"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { PrimaryButton } from "@/components/PrimaryButton";

type ShareButtonProps = {
  cellName: string;
  englishName: string;
  label?: string;
  className?: string;
};

export function ShareButton({ cellName, englishName, label, className }: ShareButtonProps) {
  const locale = useLocale();
  const t = useTranslations("shareButton");
  const [status, setStatus] = useState<string>("");

  const handleShare = async () => {
    const currentUrl = new URL(window.location.href);
    const encodedAnswers = currentUrl.searchParams.get("a");
    const tryUrl = `${currentUrl.origin}/${locale}`;
    const cardUrl = encodedAnswers
      ? `${currentUrl.origin}/${locale}/result/og?a=${encodedAnswers}`
      : `${currentUrl.origin}/urcell-logo.png`;
    const message = t("message", { cellName, englishName, tryUrl });

    try {
      if (navigator.share) {
        try {
          const imageResponse = await fetch(cardUrl, { cache: "no-store" });
          if (imageResponse.ok) {
            const imageBlob = await imageResponse.blob();
            const imageFile = new File([imageBlob], "your-cell-result.png", {
              type: "image/png"
            });

            if (navigator.canShare?.({ files: [imageFile] })) {
              await navigator.share({
                title: t("title"),
                text: message,
                files: [imageFile]
              });
              setStatus(t("shared"));
              return;
            }
          }
        } catch {
          // Fall through to text-only share.
        }

        await navigator.share({
          title: t("title"),
          text: `${message}\n${cardUrl}`
        });
        setStatus(t("shared"));
        return;
      }

      await navigator.clipboard.writeText(`${message}\n${cardUrl}`);
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
