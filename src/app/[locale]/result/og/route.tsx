import {ImageResponse} from "next/og";
import {getTranslations} from "next-intl/server";
import {getCells} from "@/content/cells";
import {resolveResultFromParam} from "@/lib/resultResolver";
import {getCellVisuals} from "@/styles/cellVisuals";

export const runtime = "edge";
export const contentType = "image/png";

type ResultOgRouteContext = {
  params: Promise<{locale: string}>;
};

export async function GET(request: Request, {params}: ResultOgRouteContext) {
  const {locale} = await params;
  const {searchParams} = new URL(request.url);
  const result = resolveResultFromParam(searchParams.get("a") ?? undefined);

  const [tResultOg, tCells, tCellVisuals] = await Promise.all([
    getTranslations({locale, namespace: "resultOg"}),
    getTranslations({locale, namespace: "cells"}),
    getTranslations({locale, namespace: "cellVisuals"})
  ]);

  const cells = getCells((key) => tCells(key));
  const visuals = getCellVisuals((key) => tCellVisuals(key));
  const cell = result ? cells[result.evaluation.cellId] : null;
  const visual = result ? visuals[result.evaluation.cellId] : null;

  const cellName = cell?.name ?? tResultOg("defaultCellName");
  const subtitle = cell?.shortTitle ?? tResultOg("defaultSubtitle");
  const accent = visual?.theme.accent ?? "#4F8DF7";
  const mascotUrl = visual
    ? new URL(visual.share, request.url).toString()
    : new URL("/urcell-logo.png", request.url).toString();
  const logoUrl = new URL("/urcell-logo.png", request.url).toString();

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "1200px",
          height: "630px",
          background:
            "radial-gradient(circle at 20% 8%, #eef5ff 0%, transparent 44%), radial-gradient(circle at 78% 88%, #dee8fb 0%, transparent 42%), linear-gradient(180deg, #d7deec 0%, #cdd6e8 100%)",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "sans-serif"
        }}
      >
        <div
          style={{
            display: "flex",
            width: "410px",
            height: "590px",
            borderRadius: "34px",
            background: "linear-gradient(180deg,#eef3fc 0%,#e6ebf7 100%)",
            overflow: "hidden",
            boxShadow: "0 24px 56px rgba(58, 86, 143, 0.24)",
            padding: "14px"
          }}
        >
          <div
            style={{
              display: "flex",
              width: "100%",
              height: "100%",
              borderRadius: "28px",
              background: "#f7f9ff",
              boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.92)",
              flexDirection: "column",
              padding: "22px 20px 20px"
            }}
          >
            <div style={{display: "flex", justifyContent: "center"}}>
              <div
                style={{
                  display: "flex",
                  width: "160px",
                  height: "102px",
                  borderRadius: "14px",
                  overflow: "hidden",
                  boxShadow: "0 14px 24px rgba(20,93,128,0.28)"
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={logoUrl}
                  alt="your.cell logo"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover"
                  }}
                />
              </div>
            </div>

            <div style={{display: "flex", justifyContent: "center", marginTop: "28px"}}>
              <div
                style={{
                  display: "flex",
                  width: "250px",
                  height: "250px",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={mascotUrl}
                  alt={cellName}
                  style={{
                    maxWidth: "100%",
                    maxHeight: "100%",
                    objectFit: "contain"
                  }}
                />
              </div>
            </div>

            <div
              style={{
                display: "flex",
                marginTop: "18px",
                width: "100%",
                borderRadius: "24px",
                background: "#ffffff",
                boxShadow: "0 12px 26px rgba(87,112,160,0.14)",
                padding: "20px 18px",
                flexDirection: "column",
                flex: 1
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  textAlign: "center",
                  fontSize: "44px",
                  fontWeight: 900,
                  lineHeight: 1.05
                }}
              >
                <span style={{marginRight: "8px", color: "#4f8df7"}}>|</span>
                <span style={{color: accent}}>{cellName}</span>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "8px",
                  textAlign: "center",
                  fontSize: "18px",
                  fontWeight: 700,
                  color: "#98a6c2"
                }}
              >
                {cell?.englishName}
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: "16px",
                  minHeight: "88px",
                  overflow: "hidden",
                  textAlign: "center",
                  fontSize: "18px",
                  fontWeight: 800,
                  lineHeight: 1.3,
                  color: accent
                }}
              >
                {visual?.caption ?? subtitle}
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630
    }
  );
}
