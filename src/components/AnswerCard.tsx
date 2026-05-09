import type { AnswerOption } from "@/lib/evaluateAnswers";
import { cn } from "@/lib/cn";

type AnswerCardProps = {
  value: AnswerOption;
  text: string;
  selected: boolean;
  onSelect: (value: AnswerOption) => void;
  className?: string;
};

export function AnswerCard({ value, text, selected, onSelect, className }: AnswerCardProps) {
  return (
    <button
      type="button"
      onClick={() => onSelect(value)}
      className={cn(
        "w-full rounded-[16px] border bg-white px-4 py-3 text-left transition active:scale-[0.99]",
        selected
          ? "border-[#6790ef] shadow-[0_12px_26px_rgba(95,130,201,0.22)]"
          : "border-[#e6ecf8] shadow-[0_6px_16px_rgba(92,116,164,0.09)] hover:border-[#cfdcf7]",
        className
      )}
      aria-pressed={selected}
    >
      <div className="flex items-start gap-3">
        <span
          className={cn(
            "inline-flex h-6 w-6 flex-none items-center justify-center rounded-full border text-[11px] font-black",
            selected ? "border-[#5a89f0] bg-[#5a89f0] text-white" : "border-[#d6e0f6] text-[#7a8ab0]"
          )}
        >
          {value}
        </span>
        <span className="text-[14px] font-semibold leading-relaxed text-[#2a3853]">{text}</span>
      </div>
    </button>
  );
}
