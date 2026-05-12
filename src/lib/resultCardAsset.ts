import type {CellId} from "@/lib/evaluateAnswers";

const resultCardNameByCellId: Record<CellId, string> = {
  love: "SEL CINTA",
  rational: "SEL AKAL",
  emotional: "SEL EMOSIONAL",
  hungry: "SEL LAPAR",
  anxiety: "SEL ANXIETY",
  detective: "SEL DETEKTIF",
  hysteria: "SEL HISTERIA",
  fashion: "SEL MODE",
  naughty: "SEL NAKAL",
  etiquette: "SEL ETIKA",
  shower: "SEL MANDI",
  cursing: "SEL SUMPAH SERAPAH"
};

export function getResultCardAsset(cellId: CellId, locale: string) {
  const languageSuffix = locale === "en" ? "ENG" : "IND";
  const fileName = `${resultCardNameByCellId[cellId]} ${languageSuffix}.png`;
  const path = encodeURI(`/assets/HASIL IND-ENG/${fileName}`);

  return {
    fileName,
    path
  };
}
