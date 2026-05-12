export type AnswerOption = "A" | "B" | "C";

export type CellId =
  | "love"
  | "rational"
  | "emotional"
  | "hungry"
  | "anxiety"
  | "detective"
  | "hysteria"
  | "fashion"
  | "naughty"
  | "etiquette"
  | "shower"
  | "cursing";

export type EvaluationResult = {
  cellId: CellId;
  triggeredRule: string;
  ruleType: "priority" | "default";
  counts: Record<AnswerOption, number>;
};

const allowedAnswers = new Set<AnswerOption>(["A", "B", "C"]);

export function evaluateAnswers(answers: AnswerOption[]): EvaluationResult {
  if (!Array.isArray(answers) || answers.length !== 7) {
    throw new Error("Answers must contain exactly 7 items.");
  }

  for (const answer of answers) {
    if (!allowedAnswers.has(answer)) {
      throw new Error("Each answer must be A, B, or C.");
    }
  }

  const counts: Record<AnswerOption, number> = {
    A: answers.filter((answer) => answer === "A").length,
    B: answers.filter((answer) => answer === "B").length,
    C: answers.filter((answer) => answer === "C").length
  };

  const q1 = answers[0];
  const q2 = answers[1];
  const q3 = answers[2];
  const q4 = answers[3];
  const q5 = answers[4];
  const q6 = answers[5];
  const q7 = answers[6];

  if (counts.A > 4) {
    return {
      cellId: "rational",
      triggeredRule: "Prioritas 1: Jumlah huruf A > 4 (terbanyak)",
      ruleType: "priority",
      counts
    };
  }

  if (counts.B > 4) {
    return {
      cellId: "love",
      triggeredRule: "Prioritas 2: Jumlah huruf B > 4",
      ruleType: "priority",
      counts
    };
  }

  if (counts.C > 4) {
    return {
      cellId: "emotional",
      triggeredRule: "Prioritas 3: Jumlah huruf C > 4",
      ruleType: "priority",
      counts
    };
  }

  if (q4 === "C" && q7 === "B") {
    return {
      cellId: "naughty",
      triggeredRule: "Prioritas 4: Soal 4 = C dan Soal 7 = B",
      ruleType: "priority",
      counts
    };
  }

  if (q3 === "A" && counts.A >= 3) {
    return {
      cellId: "shower",
      triggeredRule: "Prioritas 5: Soal 3 = A dan total A >= 3",
      ruleType: "priority",
      counts
    };
  }

  if (q3 === "B" && counts.B >= 3) {
    return {
      cellId: "hungry",
      triggeredRule: "Prioritas 6: Soal 3 = B dan total B >= 3",
      ruleType: "priority",
      counts
    };
  }

  if (q2 === "B" && q6 === "B") {
    return {
      cellId: "detective",
      triggeredRule: "Prioritas 7: Soal 2 = B dan Soal 6 = B",
      ruleType: "priority",
      counts
    };
  }

  if (q5 === "B" && q1 === "B") {
    return {
      cellId: "hysteria",
      triggeredRule: "Prioritas 8: Soal 5 = B dan Soal 1 = B",
      ruleType: "priority",
      counts
    };
  }

  if (q2 === "A" && q4 === "A") {
    return {
      cellId: "fashion",
      triggeredRule: "Prioritas 9: Soal 2 = A dan Soal 4 = A",
      ruleType: "priority",
      counts
    };
  }

  if (q1 === "B" && q6 === "C" && counts.B >= 2) {
    return {
      cellId: "anxiety",
      triggeredRule: "Prioritas 10: Soal 1 = B, Soal 6 = C, dan total B >= 2",
      ruleType: "priority",
      counts
    };
  }

  if (q5 === "C" && q6 === "A" && counts.A >= 2) {
    return {
      cellId: "etiquette",
      triggeredRule: "Prioritas 11: Soal 5 = C, Soal 6 = A, dan total A >= 2",
      ruleType: "priority",
      counts
    };
  }

  if (q1 === "C" && q2 === "C" && counts.C >= 3) {
    return {
      cellId: "cursing",
      triggeredRule: "Prioritas 12: Soal 1 = C, Soal 2 = C, dan total C >= 3",
      ruleType: "priority",
      counts
    };
  }

  if (counts.A >= counts.B && counts.A >= counts.C) {
    return {
      cellId: "rational",
      triggeredRule: "Default: Mayoritas A",
      ruleType: "default",
      counts
    };
  }

  if (counts.B >= counts.A && counts.B >= counts.C) {
    return {
      cellId: "love",
      triggeredRule: "Default: Mayoritas B",
      ruleType: "default",
      counts
    };
  }

  return {
    cellId: "emotional",
    triggeredRule: "Default: Mayoritas C",
    ruleType: "default",
    counts
  };
}
