import {useTranslations} from "next-intl";
import type { CellResult } from "@/content/cells";
import type { EvaluationResult } from "@/lib/evaluateAnswers";
import { MascotHero } from "@/components/MascotHero";
import { PrimaryButton } from "@/components/PrimaryButton";
import { ShareButton } from "@/components/result/ShareButton";
import {Link} from "@/i18n/navigation";
import {getCellVisuals} from "@/styles/cellVisuals";

type ResultCardProps = {
  cell: CellResult;
  evaluation: EvaluationResult;
};

export function ResultCard({ cell, evaluation }: ResultCardProps) {
  const t = useTranslations("resultCard");
  const tCellVisuals = useTranslations("cellVisuals");
  const visual = getCellVisuals((key) => tCellVisuals(key))[cell.id];

  return (
    <section className="motion-reveal-pop mx-4 my-4 flex w-full max-w-[340px] flex-1 flex-col rounded-[28px] border border-white/85 bg-[linear-gradient(180deg,#ffffff_0%,#f5f8ff_100%)] px-4 pb-4 pt-5 shadow-[0_18px_36px_rgba(86,112,166,0.22)]">
      <div className="motion-reveal-up flex flex-col items-center">
        <div className="inline-flex h-8 w-8 items-center justify-center rounded-[10px] bg-[#4f8df7] shadow-[0_6px_14px_rgba(79,141,247,0.35)]">
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
            <path d="M12 21s-6.7-4.35-8.85-8.38C1.75 10 2.6 6.7 5.42 5.4c1.95-.9 4.2-.35 5.58 1.25 1.38-1.6 3.63-2.15 5.58-1.25 2.82 1.3 3.67 4.6 2.27 7.22C18.7 16.65 12 21 12 21Z" />
          </svg>
        </div>
        <p className="mt-2 font-heading text-[30px] font-black leading-none tracking-[-0.02em] text-[#ef5659]">selmu</p>
        <p className="mt-1 text-[9px] font-semibold text-[#9aa7c2]">{t("communityTag")}</p>
      </div>

      <div className="motion-reveal-pop motion-stagger-1 mt-5 flex justify-center">
        <MascotHero
          src={visual.mascot}
          fallbackEmoji={cell.fallbackEmoji}
          alt={t("mascotAlt", {cellName: cell.name})}
          className="h-[170px] w-[170px]"
        />
      </div>

      <div className="motion-reveal-up motion-stagger-2 mt-2 flex justify-center">
        <span className="max-w-[188px] rounded-full border border-[#edf2fc] bg-white/95 px-3 py-1 text-center text-[9px] font-bold text-[#6d7f9f]">
          {visual.quote}
        </span>
      </div>

      <div className="motion-reveal-up motion-stagger-3 mt-4 flex flex-1 flex-col rounded-[18px] border border-[#edf1fa] bg-white px-4 py-4 shadow-[0_10px_20px_rgba(98,122,170,0.12)]">
        <p className="text-center text-[28px] font-black leading-[1.05] text-[#24344f]">
          <span className="mr-1 text-[#4f8df7]">|</span>
          <span style={{ color: visual.theme.accent }}>{cell.name}</span>
          <span className="ml-1">{cell.fallbackEmoji}</span>
        </p>

        <p className="mt-1 text-center text-[11px] font-semibold text-[#9aa5bc]">{cell.englishName}</p>

        <p className="mt-2 text-center text-[13px] font-extrabold leading-[1.35]" style={{ color: visual.theme.accent }}>
          {visual.caption}
        </p>

        <div className="mt-3 flex items-center justify-center gap-2 text-[10px] font-bold text-[#7f91b4]">
          {(["A", "B", "C"] as const).map((key) => (
            <span key={key} className="rounded-full border border-[#e8eefc] bg-[#f8fbff] px-2 py-1">
              {key} {evaluation.counts[key]}
            </span>
          ))}
        </div>

        <div className="mt-auto flex items-start gap-2 pt-4">
          <Link href="/quiz" className="min-w-0 flex-1">
            <PrimaryButton variant="secondary" className="w-full text-[13px]">
              {t("retryTest")}
            </PrimaryButton>
          </Link>
          <ShareButton
            cellName={cell.name}
            englishName={cell.englishName}
            label={t("share")}
            className="w-full text-[20px] font-black"
          />
        </div>
      </div>
    </section>
  );
}
