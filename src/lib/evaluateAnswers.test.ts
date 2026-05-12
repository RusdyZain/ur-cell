import { describe, expect, it } from "vitest";
import { evaluateAnswers, type AnswerOption } from "@/lib/evaluateAnswers";

describe("evaluateAnswers", () => {
  it("returns rational on default majority A", () => {
    const answers: AnswerOption[] = ["A", "C", "C", "B", "A", "C", "A"];
    expect(evaluateAnswers(answers).cellId).toBe("rational");
  });

  it("returns love on default majority B", () => {
    const answers: AnswerOption[] = ["A", "B", "C", "A", "B", "C", "B"];
    expect(evaluateAnswers(answers).cellId).toBe("love");
  });

  it("returns emotional on default majority C", () => {
    const answers: AnswerOption[] = ["A", "A", "C", "C", "C", "B", "C"];
    expect(evaluateAnswers(answers).cellId).toBe("emotional");
  });

  it("matches priority 1 (naughty)", () => {
    const answers: AnswerOption[] = ["A", "A", "C", "C", "A", "A", "B"];
    expect(evaluateAnswers(answers).cellId).toBe("naughty");
  });

  it("matches priority 2 (shower)", () => {
    const answers: AnswerOption[] = ["A", "C", "A", "B", "A", "C", "C"];
    expect(evaluateAnswers(answers).cellId).toBe("shower");
  });

  it("matches priority 3 (hungry)", () => {
    const answers: AnswerOption[] = ["A", "C", "B", "A", "B", "C", "B"];
    expect(evaluateAnswers(answers).cellId).toBe("hungry");
  });

  it("matches priority 4 (detective)", () => {
    const answers: AnswerOption[] = ["A", "B", "C", "A", "A", "B", "C"];
    expect(evaluateAnswers(answers).cellId).toBe("detective");
  });

  it("matches priority 5 (hysteria)", () => {
    const answers: AnswerOption[] = ["B", "A", "C", "A", "B", "A", "C"];
    expect(evaluateAnswers(answers).cellId).toBe("hysteria");
  });

  it("matches priority 6 (fashion)", () => {
    const answers: AnswerOption[] = ["C", "A", "C", "A", "A", "B", "B"];
    expect(evaluateAnswers(answers).cellId).toBe("fashion");
  });

  it("matches priority 7 (anxiety)", () => {
    const answers: AnswerOption[] = ["B", "B", "C", "A", "A", "C", "A"];
    expect(evaluateAnswers(answers).cellId).toBe("anxiety");
  });

  it("matches priority 8 (etiquette)", () => {
    const answers: AnswerOption[] = ["A", "B", "C", "B", "C", "A", "C"];
    expect(evaluateAnswers(answers).cellId).toBe("etiquette");
  });

  it("matches priority 9 (cursing)", () => {
    const answers: AnswerOption[] = ["C", "C", "C", "A", "A", "B", "A"];
    expect(evaluateAnswers(answers).cellId).toBe("cursing");
  });

  it("keeps strict priority for all-B answers (hungry)", () => {
    const answers: AnswerOption[] = ["B", "B", "B", "B", "B", "B", "B"];
    expect(evaluateAnswers(answers).cellId).toBe("hungry");
  });

  it("follows section 2 example: A-A-A-C-A-A-B -> naughty (priority 1)", () => {
    const answers: AnswerOption[] = ["A", "A", "A", "C", "A", "A", "B"];
    expect(evaluateAnswers(answers).cellId).toBe("naughty");
  });

  it("follows section 2 example: B-B-C-A-A-C-A -> anxiety (priority 7)", () => {
    const answers: AnswerOption[] = ["B", "B", "C", "A", "A", "C", "A"];
    expect(evaluateAnswers(answers).cellId).toBe("anxiety");
  });

  it("follows section 3 default example: A-B-B-A-A-C-A -> rational", () => {
    const answers: AnswerOption[] = ["A", "B", "B", "A", "A", "C", "A"];
    expect(evaluateAnswers(answers).cellId).toBe("rational");
  });

  it("follows section 3 default example: B-C-A-B-C-B-A -> love", () => {
    const answers: AnswerOption[] = ["B", "C", "A", "B", "C", "B", "A"];
    expect(evaluateAnswers(answers).cellId).toBe("love");
  });

  it("keeps section 2 precedence: C-A-C-A-C-C-B -> fashion (priority 6), not default C", () => {
    const answers: AnswerOption[] = ["C", "A", "C", "A", "C", "C", "B"];
    expect(evaluateAnswers(answers).cellId).toBe("fashion");
  });

  it("throws for invalid answer count", () => {
    expect(() => evaluateAnswers(["A", "B", "C"] as AnswerOption[])).toThrow(
      "Answers must contain exactly 7 items."
    );
  });

  it("throws for invalid answer option", () => {
    expect(() => evaluateAnswers(["A", "B", "C", "A", "B", "C", "D" as AnswerOption])).toThrow(
      "Each answer must be A, B, or C."
    );
  });
});
