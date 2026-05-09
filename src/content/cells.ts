import type { CellId } from "@/lib/evaluateAnswers";

export type CellResult = {
  id: CellId;
  name: string;
  englishName: string;
  shortTitle: string;
  description: string;
  traits: string[];
  shareText: string;
  assetKey: string;
  fallbackEmoji: string;
};

const baseCells: Record<CellId, Pick<CellResult, "id" | "assetKey" | "fallbackEmoji">> = {
  love: {
    id: "love",
    assetKey: "love-cell",
    fallbackEmoji: "\uD83D\uDC97"
  },
  rational: {
    id: "rational",
    assetKey: "rational-cell",
    fallbackEmoji: "\uD83E\uDDE0"
  },
  emotional: {
    id: "emotional",
    assetKey: "emotional-cell",
    fallbackEmoji: "\uD83C\uDF27\uFE0F"
  },
  hungry: {
    id: "hungry",
    assetKey: "hungry-cell",
    fallbackEmoji: "\uD83C\uDF5C"
  },
  anxiety: {
    id: "anxiety",
    assetKey: "anxiety-cell",
    fallbackEmoji: "\uD83D\uDE35\u200D\uD83D\uDCAB"
  },
  detective: {
    id: "detective",
    assetKey: "detective-cell",
    fallbackEmoji: "\uD83D\uDD75\uFE0F"
  },
  hysteria: {
    id: "hysteria",
    assetKey: "hysteria-cell",
    fallbackEmoji: "\uD83D\uDEA8"
  },
  fashion: {
    id: "fashion",
    assetKey: "fashion-cell",
    fallbackEmoji: "\u2728"
  },
  naughty: {
    id: "naughty",
    assetKey: "naughty-cell",
    fallbackEmoji: "\uD83D\uDE08"
  },
  etiquette: {
    id: "etiquette",
    assetKey: "etiquette-cell",
    fallbackEmoji: "\uD83C\uDFA9"
  },
  shower: {
    id: "shower",
    assetKey: "shower-cell",
    fallbackEmoji: "\uD83D\uDEBF"
  },
  cursing: {
    id: "cursing",
    assetKey: "cursing-cell",
    fallbackEmoji: "\uD83D\uDCA2"
  }
};

type CellTranslator = (key: string) => string;

function buildCell(id: CellId, t: CellTranslator): CellResult {
  const base = baseCells[id];

  return {
    ...base,
    name: t(`${id}.name`),
    englishName: t(`${id}.englishName`),
    shortTitle: t(`${id}.shortTitle`),
    description: t(`${id}.description`),
    traits: [1, 2, 3, 4].map((index) => t(`${id}.traits.trait${index}`)),
    shareText: t(`${id}.shareText`)
  };
}

export function getCells(t: CellTranslator): Record<CellId, CellResult> {
  return {
    love: buildCell("love", t),
    rational: buildCell("rational", t),
    emotional: buildCell("emotional", t),
    hungry: buildCell("hungry", t),
    anxiety: buildCell("anxiety", t),
    detective: buildCell("detective", t),
    hysteria: buildCell("hysteria", t),
    fashion: buildCell("fashion", t),
    naughty: buildCell("naughty", t),
    etiquette: buildCell("etiquette", t),
    shower: buildCell("shower", t),
    cursing: buildCell("cursing", t)
  };
}

export function getCellList(t: CellTranslator): CellResult[] {
  return Object.values(getCells(t));
}
