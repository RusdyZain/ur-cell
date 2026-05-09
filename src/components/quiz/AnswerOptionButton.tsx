import type { AnswerOption } from "@/lib/evaluateAnswers";
import { cn } from "@/lib/cn";

type AnswerOptionButtonProps = {
  value: AnswerOption;
  text: string;
  selected: boolean;
  onSelect: (value: AnswerOption) => void;
  motionClassName?: string;
};

export function AnswerOptionButton({
  value,
  text,
  selected,
  onSelect,
  motionClassName
}: AnswerOptionButtonProps) {
  return (
    <button
      type="button"
      onClick={() => onSelect(value)}
      className={cn(
        "group flex min-h-12 w-full items-start gap-3 rounded-2xl border px-4 py-4 text-left transition active:scale-[0.99]",
        selected
          ? "border-shell-primary bg-shell-accent text-shell-foreground shadow-md shadow-shell-primary/20"
          : "border-shell-border bg-white text-shell-foreground hover:-translate-y-0.5 hover:border-shell-primary/40 hover:bg-shell-accent/40",
        motionClassName
      )}
      aria-pressed={selected}
    >
      <span
        className={cn(
          "mt-0.5 inline-flex h-6 w-6 flex-none items-center justify-center rounded-full border text-xs font-extrabold",
          selected ? "border-shell-primary bg-shell-primary text-white" : "border-shell-border text-shell-muted"
        )}
      >
        {value}
      </span>
      <span className="text-[15px] font-semibold leading-relaxed">{text}</span>
    </button>
  );
}
