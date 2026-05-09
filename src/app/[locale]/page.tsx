import {useTranslations} from "next-intl";
import {AppShell} from "@/components/AppShell";
import {TopBar} from "@/components/TopBar";
import {PrimaryButton} from "@/components/PrimaryButton";
import {MascotHero} from "@/components/MascotHero";
import {Link} from "@/i18n/navigation";
import {getCellVisuals} from "@/styles/cellVisuals";

const highlights = [
  {id: "lifeScene", tone: "bg-[#dce8ff]", emoji: "\uD83D\uDCF1"},
  {id: "quickResult", tone: "bg-[#ffe4f2]", emoji: "\u26A1"},
  {id: "shareReady", tone: "bg-[#fff2cf]", emoji: "\uD83D\uDE80"}
] as const;

export default function HomePage() {
  const t = useTranslations("homePage");
  const tCellVisuals = useTranslations("cellVisuals");
  const landingVisual = getCellVisuals((key) => tCellVisuals(key)).love;

  return (
    <AppShell shellStyle={{background: "#f6f9ff"}}>
      <section className="relative mx-4 mt-4 overflow-hidden rounded-[24px] bg-[linear-gradient(145deg,#f7bad6_0%,#dfbde9_55%,#b9cff7_100%)] pb-11 pt-3">
        <TopBar title={t("topBarTitle")} className="text-white" textClassName="text-white" />
        <div className="motion-reveal-pop mt-1 flex justify-center">
          <MascotHero
            src={landingVisual.mascot}
            fallbackEmoji={landingVisual.emoji}
            alt={t("mascotAlt")}
            priority
            className="h-[150px] w-[150px]"
          />
        </div>
      </section>

      <div className="motion-reveal-up relative z-10 mx-4 -mt-7 rounded-[16px] bg-gradient-to-r from-[#5f86df] to-[#4d73d6] px-4 py-3 text-white shadow-[0_12px_24px_rgba(71,101,177,0.35)]">
        <div className="grid grid-cols-2 gap-3 text-center">
          <div>
            <p className="text-[15px] font-black">2287k</p>
            <p className="text-[10px] font-semibold text-white/80">{t("stats.like")}</p>
          </div>
          <div>
            <p className="text-[15px] font-black">3217k</p>
            <p className="text-[10px] font-semibold text-white/80">{t("stats.view")}</p>
          </div>
        </div>
      </div>

      <section className="mx-4 mt-3 flex flex-1 flex-col rounded-[22px] bg-white p-4 shadow-[0_14px_28px_rgba(79,107,166,0.14)]">
        <div className="motion-reveal-up flex gap-2 text-[10px] font-bold text-[#6f7f9f]">
          <span className="rounded-full bg-[#eef3ff] px-2.5 py-1">{t("tags.socialToy")}</span>
          <span className="rounded-full bg-[#f5f8ff] px-2.5 py-1">{t("tags.quiz")}</span>
          <span className="rounded-full bg-[#eef3ff] px-2.5 py-1">{t("tags.mobile")}</span>
        </div>

        <h1 className="motion-reveal-up motion-stagger-1 mt-4 text-[24px] font-black leading-tight text-[#22314d]">
          {t("title")}
        </h1>
        <p className="motion-reveal-up motion-stagger-2 mt-2 text-[13px] font-semibold leading-relaxed text-[#6f7f9f]">
          {t("description")}
        </p>

        <div className="motion-reveal-up motion-stagger-3 mt-4 space-y-2">
          {highlights.map((item) => (
            <article key={item.id} className="flex items-center gap-3 rounded-[14px] border border-[#e7edf9] p-2.5">
              <div className={`inline-flex h-10 w-10 items-center justify-center rounded-[12px] ${item.tone}`}>
                <span className="text-lg" aria-hidden="true">
                  {item.emoji}
                </span>
              </div>
              <div className="min-w-0">
                <p className="truncate text-[13px] font-extrabold text-[#2b3a56]">{t(`highlights.${item.id}.title`)}</p>
                <p className="text-[11px] font-semibold text-[#7f8fb1]">{t(`highlights.${item.id}.subtitle`)}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="motion-reveal-up motion-stagger-4 mt-auto space-y-2 pt-5">
          <Link href="/quiz" className="block">
            <PrimaryButton icon="play" className="w-full text-[15px]">
              {t("startQuiz")}
            </PrimaryButton>
          </Link>
          <Link href="/cells" className="block">
            <PrimaryButton variant="secondary" className="w-full">
              {t("viewCells")}
            </PrimaryButton>
          </Link>
        </div>
      </section>
    </AppShell>
  );
}
