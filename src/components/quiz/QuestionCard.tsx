import type { Question } from "@/content/questions";
import type { AnswerOption } from "@/lib/evaluateAnswers";
import { AnswerCard } from "@/components/AnswerCard";

type QuestionCardProps = {
  question: Question;
  selectedAnswer: AnswerOption | null;
  onSelectAnswer: (value: AnswerOption) => void;
};

export function QuestionCard({ question, selectedAnswer, onSelectAnswer }: QuestionCardProps) {
  return (
    <section className="motion-reveal-up rounded-[20px] border border-[#e6ecf8] bg-white px-4 py-4 shadow-[0_10px_24px_rgba(92,116,164,0.12)]">
      <h1 className="text-[20px] font-black leading-[1.22] text-[#23324e]">{question.text}</h1>
      <div className="mt-4 flex flex-col gap-3">
        {question.options.map((option, index) => (
          <AnswerCard
            key={option.value}
            value={option.value}
            text={option.text}
            selected={selectedAnswer === option.value}
            onSelect={onSelectAnswer}
            className={`motion-reveal-up motion-stagger-${Math.min(index + 1, 4)}`}
          />
        ))}
      </div>
    </section>
  );
}
