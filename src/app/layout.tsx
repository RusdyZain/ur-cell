import type { Metadata, Viewport } from "next";
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
  metadataBase: new URL(siteUrl),
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      {url: "/favicon.ico", sizes: "any"},
      {url: "/urcell-logo.svg", type: "image/svg+xml"},
      {url: "/urcell-logo.png", type: "image/png", sizes: "1536x1024"}
    ],
    shortcut: "/favicon.ico",
    apple: [{url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png"}]
  }
};

export const viewport: Viewport = {
  themeColor: "#11B4DB"
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
