import {useLocale, useTranslations} from "next-intl";
import {AppShell} from "@/components/AppShell";
import {TopBar} from "@/components/TopBar";
import {PrimaryButton} from "@/components/PrimaryButton";
import {MascotHero} from "@/components/MascotHero";
import {Link} from "@/i18n/navigation";
import {cn} from "@/lib/cn";

const highlights = [
  {id: "lifeScene", tone: "bg-[#dce8ff]", emoji: "\uD83D\uDCF1"},
  {id: "quickResult", tone: "bg-[#ffe4f2]", emoji: "\u26A1"},
  {id: "shareReady", tone: "bg-[#fff2cf]", emoji: "\uD83D\uDE80"}
] as const;

export default function HomePage() {
  const locale = useLocale();
  const t = useTranslations("homePage");
  const landingLogo = "/urcell-logo.png";

  return (
    <AppShell shellStyle={{background: "#f4fcff"}}>
      <section className="relative mx-4 mt-4 overflow-hidden rounded-[24px] bg-[#11b4db] pb-11 pt-3">
        <TopBar
          title={t("topBarTitle")}
          className="text-white"
          textClassName="text-white"
          rightIcon={
            <nav aria-label={t("languageSwitcherLabel")} className="inline-flex rounded-full bg-white/15 p-0.5">
              {(["id", "en"] as const).map((targetLocale) => {
                const isActive = locale === targetLocale;
                return (
                  <Link
                    key={targetLocale}
                    href="/"
                    locale={targetLocale}
                    className={cn(
                      "rounded-full px-2.5 py-1 text-[10px] font-extrabold tracking-[0.08em] transition",
                      isActive ? "bg-white text-[#11b4db]" : "text-white/85 hover:text-white"
                    )}
                  >
                    {targetLocale.toUpperCase()}
                  </Link>
                );
              })}
            </nav>
          }
        />
        <div className="motion-reveal-pop mt-1 flex justify-center">
          <MascotHero
            src={landingLogo}
            fallbackEmoji="\u2728"
            alt={t("mascotAlt")}
            priority
            className="h-auto w-[220px] max-h-[150px] !drop-shadow-none"
          />
        </div>
      </section>

      <section className="mx-4 mt-4 flex flex-1 flex-col rounded-[22px] bg-white p-4 shadow-[0_14px_28px_rgba(79,107,166,0.14)]">
        <h1 className="motion-reveal-up motion-stagger-1 mt-1 text-[24px] font-black leading-tight text-[#22314d]">
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
