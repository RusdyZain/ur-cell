import {useTranslations} from "next-intl";
import Image from "next/image";
import {getCellList} from "@/content/cells";
import {AppShell} from "@/components/AppShell";
import {TopBar} from "@/components/TopBar";
import {PrimaryButton} from "@/components/PrimaryButton";
import {Link} from "@/i18n/navigation";
import {getCellVisuals} from "@/styles/cellVisuals";

export default function CellsPage() {
  const t = useTranslations("cellsPage");
  const tCells = useTranslations("cells");
  const tCellVisuals = useTranslations("cellVisuals");
  const cells = getCellList((key) => tCells(key));
  const visuals = getCellVisuals((key) => tCellVisuals(key));

  return (
    <AppShell shellStyle={{background: "#ffffff"}}>
      <TopBar title={t("topBarTitle")} className="text-[#7b8aaa]" textClassName="text-[#7b8aaa]" />

      <section className="px-4 pb-5">
        <h1 className="motion-reveal-up text-[28px] font-black text-[#22314d]">{t("title")}</h1>
        <p className="motion-reveal-up motion-stagger-1 mt-1 text-[13px] font-semibold text-[#7d8dae]">{t("description")}</p>

        <div className="motion-reveal-up motion-stagger-2 mt-4 grid grid-cols-3 gap-2">
          {cells.map((cell) => {
            const visual = visuals[cell.id];
            return (
              <article
                key={cell.id}
                className="overflow-hidden rounded-[14px] border border-[#e7edf9] bg-white p-2 shadow-[0_6px_14px_rgba(91,114,160,0.1)]"
              >
                <div
                  className="flex h-16 items-center justify-center rounded-[10px]"
                  style={{background: `linear-gradient(145deg, ${visual.theme.softBg} 0%, #ffffff 100%)`}}
                >
                  <Image
                    src={visual.thumb}
                    alt={cell.name}
                    width={64}
                    height={64}
                    className="h-14 w-14 object-contain"
                  />
                </div>
                <p className="mt-1 truncate text-[10px] font-extrabold text-[#2a3956]">{cell.name}</p>
              </article>
            );
          })}
        </div>

        <div className="mt-5 grid grid-cols-2 gap-2">
          <Link href="/quiz" className="block">
            <PrimaryButton icon="play" className="w-full">
              {t("start")}
            </PrimaryButton>
          </Link>
          <Link href="/" className="block">
            <PrimaryButton variant="secondary" className="w-full">
              {t("home")}
            </PrimaryButton>
          </Link>
        </div>
      </section>
    </AppShell>
  );
}
