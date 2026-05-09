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
  const primary = visual?.theme.primary ?? "#6e95ff";
  const emoji = visual?.emoji ?? "\u2728";

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "1200px",
          height: "630px",
          background:
            "radial-gradient(circle at 20% 10%, #e8f1ff 0%, transparent 45%), radial-gradient(circle at 80% 90%, #dce8ff 0%, transparent 42%), linear-gradient(180deg, #c8d4ee 0%, #bfcde9 100%)",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "Nunito Sans, sans-serif"
        }}
      >
        <div
          style={{
            width: "580px",
            height: "540px",
            borderRadius: "30px",
            background: "#f7f9ff",
            overflow: "hidden",
            boxShadow: "0 24px 58px rgba(48, 76, 133, 0.34)",
            display: "flex",
            flexDirection: "column"
          }}
        >
          <div
            style={{
              height: "250px",
              background: `linear-gradient(135deg, ${primary} 0%, ${accent} 60%, #8eb4ff 100%)`,
              padding: "20px",
              color: "white",
              position: "relative"
            }}
          >
            <div style={{fontSize: "44px", fontWeight: 900, lineHeight: 1}}>{cellName}</div>
            <div style={{marginTop: "8px", fontSize: "18px", fontWeight: 700, opacity: 0.9}}>{cell?.englishName}</div>
            <div style={{position: "absolute", right: "24px", bottom: "12px", fontSize: "90px", lineHeight: 1}}>{emoji}</div>
          </div>

          <div style={{flex: 1, padding: "24px", color: "#22314d", display: "flex", flexDirection: "column"}}>
            <div style={{fontSize: "32px", fontWeight: 900, color: accent}}>selmu</div>
            <div style={{marginTop: "12px", fontSize: "24px", fontWeight: 800, lineHeight: 1.3}}>{subtitle}</div>
            <div style={{marginTop: "auto", fontSize: "20px", fontWeight: 700, color: "#5f7196"}}>
              {tResultOg("footer")}
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
