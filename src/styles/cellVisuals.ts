import type { CellId } from "@/lib/evaluateAnswers";

export type CellVisualTheme = {
  primary: string;
  softBg: string;
  accent: string;
};

type BaseCellVisual = {
  mascot: string;
  thumb: string;
  share: string;
  emoji: string;
  theme: CellVisualTheme;
};

export type CellVisual = BaseCellVisual & {
  quote: string;
  caption: string;
};

const baseCellVisuals: Record<CellId, BaseCellVisual> = {
  love: {
    mascot: "/assets/cells/Sel cinta.png",
    thumb: "/assets/cells/Sel cinta.png",
    share: "/assets/cells/Sel cinta.png",
    emoji: "\uD83D\uDC97",
    theme: { primary: "#FF7DAF", softBg: "#FFE5EF", accent: "#FF5F95" }
  },
  rational: {
    mascot: "/assets/cells/Sel akal rasional.png",
    thumb: "/assets/cells/Sel akal rasional.png",
    share: "/assets/cells/Sel akal rasional.png",
    emoji: "\uD83E\uDDE0",
    theme: { primary: "#6C8DFF", softBg: "#E7EEFF", accent: "#4E6FE8" }
  },
  emotional: {
    mascot: "/assets/cells/Sel emosional.png",
    thumb: "/assets/cells/Sel emosional.png",
    share: "/assets/cells/Sel emosional.png",
    emoji: "\uD83C\uDF27\uFE0F",
    theme: { primary: "#B08CFF", softBg: "#F0E9FF", accent: "#8D6AE8" }
  },
  hungry: {
    mascot: "/assets/cells/Sel lapar.png",
    thumb: "/assets/cells/Sel lapar.png",
    share: "/assets/cells/Sel lapar.png",
    emoji: "\uD83C\uDF5C",
    theme: { primary: "#FFB357", softBg: "#FFF0D9", accent: "#F08D22" }
  },
  anxiety: {
    mascot: "/assets/cells/Sel anxiety.png",
    thumb: "/assets/cells/Sel anxiety.png",
    share: "/assets/cells/Sel anxiety.png",
    emoji: "\uD83D\uDE35\u200D\uD83D\uDCAB",
    theme: { primary: "#8AA0B8", softBg: "#EEF3F7", accent: "#6F879F" }
  },
  detective: {
    mascot: "/assets/cells/Sel detektif.png",
    thumb: "/assets/cells/Sel detektif.png",
    share: "/assets/cells/Sel detektif.png",
    emoji: "\uD83D\uDD75\uFE0F",
    theme: { primary: "#5E7C9B", softBg: "#E8EFF5", accent: "#476480" }
  },
  hysteria: {
    mascot: "/assets/cells/Sel histeris.png",
    thumb: "/assets/cells/Sel histeris.png",
    share: "/assets/cells/Sel histeris.png",
    emoji: "\uD83D\uDEA8",
    theme: { primary: "#FF6B7D", softBg: "#FFE6EA", accent: "#F14F65" }
  },
  fashion: {
    mascot: "/assets/cells/Sel mode.png",
    thumb: "/assets/cells/Sel mode.png",
    share: "/assets/cells/Sel mode.png",
    emoji: "\u2728",
    theme: { primary: "#C27BFF", softBg: "#F4E9FF", accent: "#A95CF2" }
  },
  naughty: {
    mascot: "/assets/cells/Sel nakal.png",
    thumb: "/assets/cells/Sel nakal.png",
    share: "/assets/cells/Sel nakal.png",
    emoji: "\uD83D\uDE08",
    theme: { primary: "#FF6D4D", softBg: "#FFE9E2", accent: "#E65232" }
  },
  etiquette: {
    mascot: "/assets/cells/Sel etika.png",
    thumb: "/assets/cells/Sel etika.png",
    share: "/assets/cells/Sel etika.png",
    emoji: "\uD83C\uDFA9",
    theme: { primary: "#78C58A", softBg: "#EAF7EE", accent: "#58A66A" }
  },
  shower: {
    mascot: "/assets/cells/Sel mandi.png",
    thumb: "/assets/cells/Sel mandi.png",
    share: "/assets/cells/Sel mandi.png",
    emoji: "\uD83D\uDEBF",
    theme: { primary: "#69C9E8", softBg: "#E8F8FD", accent: "#43B3D7" }
  },
  cursing: {
    mascot: "/assets/cells/Sel sumpah serapah.png",
    thumb: "/assets/cells/Sel sumpah serapah.png",
    share: "/assets/cells/Sel sumpah serapah.png",
    emoji: "\uD83D\uDCA2",
    theme: { primary: "#F26D6D", softBg: "#FFE7E7", accent: "#DB4C4C" }
  }
};

type VisualTranslator = (key: string) => string;

function buildVisual(id: CellId, t: VisualTranslator): CellVisual {
  const base = baseCellVisuals[id];

  return {
    ...base,
    quote: t(`${id}.quote`),
    caption: t(`${id}.caption`)
  };
}

export function getCellVisuals(t: VisualTranslator): Record<CellId, CellVisual> {
  return {
    love: buildVisual("love", t),
    rational: buildVisual("rational", t),
    emotional: buildVisual("emotional", t),
    hungry: buildVisual("hungry", t),
    anxiety: buildVisual("anxiety", t),
    detective: buildVisual("detective", t),
    hysteria: buildVisual("hysteria", t),
    fashion: buildVisual("fashion", t),
    naughty: buildVisual("naughty", t),
    etiquette: buildVisual("etiquette", t),
    shower: buildVisual("shower", t),
    cursing: buildVisual("cursing", t)
  };
}
