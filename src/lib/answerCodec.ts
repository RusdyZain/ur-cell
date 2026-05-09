import type { AnswerOption } from "./evaluateAnswers";

export function encodeAnswers(answers: AnswerOption[]): string {
  return answers.join("");
}

export function decodeAnswers(value: string | null): AnswerOption[] | null {
  if (!value) return null;
  const normalized = value.toUpperCase().trim();

  if (!/^[ABC]{7}$/.test(normalized)) {
    return null;
  }

  return normalized.split("") as AnswerOption[];
}
