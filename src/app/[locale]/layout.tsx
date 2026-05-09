import type {Metadata} from "next";
import type {ReactNode} from "react";
import {NextIntlClientProvider} from "next-intl";
import {getTranslations, setRequestLocale} from "next-intl/server";
import {notFound} from "next/navigation";
import {routing, type AppLocale} from "@/i18n/routing";
import {siteUrl} from "@/lib/site";

type LocaleLayoutProps = {
  children: ReactNode;
  params: Promise<{locale: string}>;
};

function isValidLocale(locale: string): locale is AppLocale {
  return routing.locales.includes(locale as AppLocale);
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

export async function generateMetadata({params}: Pick<LocaleLayoutProps, "params">): Promise<Metadata> {
  const {locale} = await params;
  const resolvedLocale = isValidLocale(locale) ? locale : routing.defaultLocale;
  const t = await getTranslations({locale: resolvedLocale, namespace: "metadata"});
  const title = t("titleDefault");
  const description = t("description");

  return {
    title: {
      default: title,
      template: t("titleTemplate")
    },
    description,
    openGraph: {
      title,
      description,
      type: "website",
      url: `${siteUrl}/${resolvedLocale}`
    },
    twitter: {
      card: "summary_large_image",
      title,
      description
    }
  };
}

export default async function LocaleLayout({children, params}: LocaleLayoutProps) {
  const {locale} = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return <NextIntlClientProvider>{children}</NextIntlClientProvider>;
}
