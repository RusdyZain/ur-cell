import type {Metadata} from "next";
import {Suspense} from "react";
import {useTranslations} from "next-intl";
import {getTranslations} from "next-intl/server";
import {ResultView} from "@/components/result/ResultView";
import {AppShell} from "@/components/AppShell";
import {getCells} from "@/content/cells";
import {resolveResultFromParam} from "@/lib/resultResolver";
import {siteUrl} from "@/lib/site";

type ResultPageProps = {
  params: Promise<{locale: string}>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export async function generateMetadata({params, searchParams}: ResultPageProps): Promise<Metadata> {
  const [{locale}, resolvedSearchParams] = await Promise.all([params, searchParams]);
  const result = resolveResultFromParam(resolvedSearchParams.a);
  const t = await getTranslations({locale, namespace: "resultPage"});

  if (!result) {
    return {
      title: t("metadataInvalidTitle"),
      description: t("metadataInvalidDescription"),
      openGraph: {
        title: t("metadataInvalidTitle"),
        description: t("metadataInvalidDescription"),
        url: `${siteUrl}/${locale}/result`
      }
    };
  }

  const tCells = await getTranslations({locale, namespace: "cells"});
  const cell = getCells((key) => tCells(key))[result.evaluation.cellId];
  const title = t("metadataTitle", {
    cellName: cell.name,
    englishName: cell.englishName
  });
  const description = t("metadataDescription", {
    shortTitle: cell.shortTitle
  });
  const pageUrl = `${siteUrl}/${locale}/result?a=${result.encodedAnswers}`;
  const imageUrl = `${siteUrl}/${locale}/result/og?a=${result.encodedAnswers}`;

  return {
    title,
    description,
    alternates: {
      canonical: pageUrl
    },
    openGraph: {
      title,
      description,
      type: "website",
      url: pageUrl,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: `${title}`
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl]
    }
  };
}

export default function ResultPage() {
  const t = useTranslations("resultPage");

  return (
    <Suspense
      fallback={
        <AppShell shellStyle={{background: "#f7f9ff"}}>
          <p className="motion-reveal-up mx-4 my-auto text-center text-[13px] font-semibold text-[#6f7f9f]">
            {t("loading")}
          </p>
        </AppShell>
      }
    >
      <ResultView />
    </Suspense>
  );
}
