"use client";

import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { PrimaryButton } from "@/components/PrimaryButton";

type ShareButtonProps = {
  cellName: string;
  englishName: string;
  label?: string;
  className?: string;
};

type ShareTargets = {
  tryUrl: string;
  cardUrl: string;
};

function buildShareTargets(locale: string): ShareTargets | null {
  if (typeof window === "undefined") return null;

  const currentUrl = new URL(window.location.href);
  const encodedAnswers = currentUrl.searchParams.get("a");
  const tryUrl = `${currentUrl.origin}/${locale}`;
  const cardUrl = encodedAnswers
    ? `${currentUrl.origin}/${locale}/result/og?a=${encodedAnswers}`
    : `${currentUrl.origin}/urcell-logo.png`;

  return { tryUrl, cardUrl };
}

async function fetchCardFile(cardUrl: string): Promise<File | null> {
  const controller = new AbortController();
  const timeoutId = window.setTimeout(() => controller.abort(), 8000);

  try {
    const imageResponse = await fetch(cardUrl, { cache: "no-store", signal: controller.signal });
    if (!imageResponse.ok) return null;

    const imageBlob = await imageResponse.blob();
    if (!imageBlob.type.includes("image")) return null;

    return new File([imageBlob], "your-cell-result.png", {
      type: "image/png"
    });
  } catch {
    return null;
  } finally {
    window.clearTimeout(timeoutId);
  }
}

export function ShareButton({ cellName, englishName, label, className }: ShareButtonProps) {
  const locale = useLocale();
  const t = useTranslations("shareButton");
  const [status, setStatus] = useState<string>("");
  const [preparedFile, setPreparedFile] = useState<File | null>(null);
  const [isSharing, setIsSharing] = useState(false);

  useEffect(() => {
    const targets = buildShareTargets(locale);
    if (!targets) return;

    let cancelled = false;

    const preload = async () => {
      const file = await fetchCardFile(targets.cardUrl);
      if (!cancelled) {
        setPreparedFile(file);
      }
    };

    void preload();

    return () => {
      cancelled = true;
    };
  }, [locale]);

  const handleShare = async () => {
    if (isSharing) return;
    const targets = buildShareTargets(locale);
    if (!targets) return;

    setIsSharing(true);
    setStatus("");

    const message = t("message", { cellName, englishName, tryUrl: targets.tryUrl });

    try {
      if (navigator.share) {
        const file = preparedFile ?? (await fetchCardFile(targets.cardUrl));
        if (file) {
          setPreparedFile(file);
        }

        const canShareFiles = file
          ? typeof navigator.canShare === "function"
            ? navigator.canShare({ files: [file] })
            : true
          : false;

        if (file && canShareFiles) {
          try {
            await navigator.share({
              title: t("title"),
              text: message,
              files: [file]
            });
            setStatus(t("shared"));
            return;
          } catch (error) {
            if (error instanceof DOMException && error.name === "AbortError") {
              return;
            }
          }
        }

        await navigator.share({
          title: t("title"),
          text: message,
          url: targets.cardUrl
        });
        setStatus(t("shared"));
        return;
      }

      await navigator.clipboard.writeText(`${message}\n${targets.cardUrl}`);
      setStatus(t("copied"));
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") {
        return;
      }
      setStatus(t("failed"));
    } finally {
      setIsSharing(false);
    }
  };

  return (
    <div className="flex min-w-0 flex-1 flex-col gap-1">
      <PrimaryButton
        onClick={handleShare}
        className={className ?? "w-full text-[20px] font-black"}
        disabled={isSharing}
      >
        {label ?? "Share"}
      </PrimaryButton>
      {status ? <p className="text-center text-[10px] font-semibold text-ink-soft">{status}</p> : null}
    </div>
  );
}
