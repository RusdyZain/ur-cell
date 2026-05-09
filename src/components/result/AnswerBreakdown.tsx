import type { EvaluationResult } from "@/lib/evaluateAnswers";
import { Card } from "@/components/ui/Card";

type AnswerBreakdownProps = {
  counts: EvaluationResult["counts"];
};

export function AnswerBreakdown({ counts }: AnswerBreakdownProps) {
  return (
    <Card className="p-4">
      <p className="text-sm font-bold uppercase tracking-wide text-shell-muted">Komposisi Jawaban</p>
      <div className="mt-3 grid grid-cols-3 gap-3">
        {(["A", "B", "C"] as const).map((key) => (
          <div key={key} className="rounded-2xl border border-shell-border bg-shell-accent/40 px-3 py-3 text-center">
            <p className="text-xs font-bold text-shell-muted">{key}</p>
            <p className="mt-1 text-2xl font-extrabold text-shell-foreground">{counts[key]}</p>
          </div>
        ))}
      </div>
    </Card>
  );
}
