import type { AnswerOption } from "@/lib/evaluateAnswers";

export type Question = {
  id: number;
  text: string;
  options: {
    value: AnswerOption;
    text: string;
  }[];
};

const questionIds = [1, 2, 3, 4, 5, 6, 7] as const;
const answerOptions: AnswerOption[] = ["A", "B", "C"];

export function getQuestions(t: (key: string) => string): Question[] {
  return questionIds.map((id) => ({
    id,
    text: t(`${id}.text`),
    options: answerOptions.map((value) => ({
      value,
      text: t(`${id}.options.${value}`)
    }))
  }));
}
