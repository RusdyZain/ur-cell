import { useTranslations } from "next-intl";
import Image from "next/image";
import type { CellResult } from "@/content/cells";
import { MascotHero } from "@/components/MascotHero";
import { PrimaryButton } from "@/components/PrimaryButton";
import { ShareButton } from "@/components/result/ShareButton";
import { Link } from "@/i18n/navigation";
import { getCellVisuals } from "@/styles/cellVisuals";

type ResultCardProps = {
  cell: CellResult;
};

export function ResultCard({ cell }: ResultCardProps) {
  const t = useTranslations("resultCard");
  const tCellVisuals = useTranslations("cellVisuals");
  const visual = getCellVisuals((key) => tCellVisuals(key))[cell.id];

  return (
    <section className="motion-reveal-pop mx-4 my-4 flex w-full max-w-[340px] flex-1 flex-col rounded-[28px] border border-white/85 bg-[linear-gradient(180deg,#ffffff_0%,#f5f8ff_100%)] px-4 pb-4 pt-5 shadow-[0_18px_36px_rgba(86,112,166,0.22)]">
      <div className="motion-reveal-up flex flex-col items-center">
        <div className="inline-flex h-[76px] w-[114px] items-center justify-center overflow-hidden rounded-[10px] border border-[#d7edf8] bg-white shadow-[0_10px_20px_rgba(73,129,170,0.2)]">
          <Image
            src="/urcell-logo.png"
            alt="your.cell logo"
            width={114}
            height={76}
            className="h-full w-full object-cover"
          />
        </div>
      </div>

      <div className="motion-reveal-pop motion-stagger-1 mt-5 flex justify-center">
        <MascotHero
          src={visual.mascot}
          fallbackEmoji={cell.fallbackEmoji}
          alt={t("mascotAlt", { cellName: cell.name })}
          priority
          className="h-[210px] w-[210px]"
        />
      </div>

      <div className="motion-reveal-up motion-stagger-3 mt-3 flex flex-1 flex-col rounded-[18px] border border-[#edf1fa] bg-white px-4 py-4 shadow-[0_10px_20px_rgba(98,122,170,0.12)]">
        <p className="text-center text-[28px] font-black leading-[1.05] text-[#24344f]">
          <span className="mr-1 text-[#4f8df7]">|</span>
          <span style={{ color: visual.theme.accent }}>{cell.name}</span>
        </p>

        <p className="mt-1 text-center text-[11px] font-semibold text-[#9aa5bc]">
          {cell.englishName}
        </p>

        <p
          className="mt-2 text-center text-[13px] font-extrabold leading-[1.35]"
          style={{ color: visual.theme.accent }}
        >
          {visual.caption}
        </p>

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
            className="w-full text-[13px]"
          />
        </div>
      </div>
    </section>
  );
}
