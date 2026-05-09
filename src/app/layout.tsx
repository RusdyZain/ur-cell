import type { Metadata } from "next";
import { Nunito_Sans, Poppins } from "next/font/google";
import { getLocale } from "next-intl/server";
import { siteUrl } from "@/lib/site";
import "./globals.css";

const heading = Poppins({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["700", "800", "900"]
});

const nunito = Nunito_Sans({
  subsets: ["latin"],
  variable: "--font-nunito",
  weight: ["400", "500", "600", "700", "800"]
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl)
};

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();

  return (
    <html lang={locale}>
      <body className={`${heading.variable} ${nunito.variable} font-body`}>{children}</body>
    </html>
  );
}
