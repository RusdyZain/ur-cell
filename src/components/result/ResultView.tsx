"use client";

import {useMemo} from "react";
import {useTranslations} from "next-intl";
import { useSearchParams } from "next/navigation";
import {getCells} from "@/content/cells";
import { resolveResultFromParam } from "@/lib/resultResolver";
import { AppShell } from "@/components/AppShell";
import { ResultCard } from "@/components/result/ResultCard";
import { PrimaryButton } from "@/components/PrimaryButton";
import {Link} from "@/i18n/navigation";

export function ResultView() {
  const t = useTranslations("resultPage");
  const tCells = useTranslations("cells");
  const cells = useMemo(() => getCells((key) => tCells(key)), [tCells]);
  const searchParams = useSearchParams();
  const result = resolveResultFromParam(searchParams.get("a") ?? undefined);

  if (!result) {
    return (
      <AppShell shellStyle={{ background: "#f7f9ff" }}>
        <div className="mx-4 my-auto rounded-[22px] border border-[#e7edf9] bg-white px-5 py-7 text-center shadow-[0_10px_24px_rgba(90,114,164,0.14)]">
          <h1 className="text-[28px] font-black text-[#23324e]">{t("invalidTitle")}</h1>
          <p className="mt-2 text-[13px] font-semibold text-[#6f7f9f]">{t("invalidDescription")}</p>
          <Link href="/quiz" className="mt-4 block">
            <PrimaryButton className="w-full">{t("invalidRetry")}</PrimaryButton>
          </Link>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell shellStyle={{ background: "#f7f9ff" }}>
      <div className="flex flex-1 items-center justify-center">
        <ResultCard cell={cells[result.evaluation.cellId]} />
      </div>
    </AppShell>
  );
}
