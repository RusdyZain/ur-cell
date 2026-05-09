import { decodeAnswers, encodeAnswers } from "@/lib/answerCodec";
import { evaluateAnswers, type AnswerOption, type EvaluationResult } from "@/lib/evaluateAnswers";

export type ResolvedResult = {
  encodedAnswers: string;
  answers: AnswerOption[];
  evaluation: EvaluationResult;
};

export function readSingleSearchParam(value: string | string[] | undefined): string | null {
  if (Array.isArray(value)) {
    return value[0] ?? null;
  }

  return value ?? null;
}

export function resolveResultFromParam(value: string | string[] | undefined): ResolvedResult | null {
  const rawValue = readSingleSearchParam(value);
  const answers = decodeAnswers(rawValue);

  if (!answers) {
    return null;
  }

  const evaluation = evaluateAnswers(answers);

  return {
    encodedAnswers: encodeAnswers(answers),
    answers,
    evaluation
  };
}
