"use client";

import {useMemo, useState} from "react";
import {useTranslations} from "next-intl";
import {getQuestions} from "@/content/questions";
import type {AnswerOption} from "@/lib/evaluateAnswers";
import {encodeAnswers} from "@/lib/answerCodec";
import {AppShell} from "@/components/AppShell";
import {QuestionCard} from "@/components/quiz/QuestionCard";
import {ProgressBar} from "@/components/ui/ProgressBar";
import {PrimaryButton} from "@/components/PrimaryButton";
import {useRouter} from "@/i18n/navigation";

type QuizAnswer = AnswerOption | null;

export default function QuizPage() {
  const router = useRouter();
  const t = useTranslations("quizPage");
  const questions = useMemo(() => getQuestions((key) => t(`questions.${key}`)), [t]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswer[]>(() => Array(questions.length).fill(null));

  const progressLabel = t("progressLabel", {
    current: currentQuestionIndex + 1,
    total: questions.length
  });
  const progressValue = ((currentQuestionIndex + 1) / questions.length) * 100;
  const selectedAnswer = answers[currentQuestionIndex];

  const canFinish = useMemo(() => answers.every((answer): answer is AnswerOption => Boolean(answer)), [answers]);

  const pushResult = (nextAnswers: QuizAnswer[]) => {
    if (!nextAnswers.every((answer): answer is AnswerOption => Boolean(answer))) {
      return;
    }

    const encoded = encodeAnswers(nextAnswers);
    router.push(`/result?a=${encoded}`);
  };

  const handleSelectAnswer = (value: AnswerOption) => {
    const updated = [...answers];
    updated[currentQuestionIndex] = value;
    setAnswers(updated);

    if (currentQuestionIndex === questions.length - 1) {
      pushResult(updated);
      return;
    }

    setCurrentQuestionIndex((prev) => prev + 1);
  };

  const handleBack = () => {
    setCurrentQuestionIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    if (!selectedAnswer) return;

    if (currentQuestionIndex === questions.length - 1) {
      pushResult(answers);
      return;
    }

    setCurrentQuestionIndex((prev) => Math.min(questions.length - 1, prev + 1));
  };

  return (
    <AppShell shellStyle={{background: "#f7f9ff"}}>
      <section className="px-4 pt-4">
        <div className="motion-reveal-up flex items-center justify-between">
          <div className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#d9e5ff] text-[14px] font-black text-[#4366b5]">
            S
          </div>
          <div className="text-[11px] font-semibold tracking-wide text-[#8a97b3]">9:41</div>
          <div className="text-[11px] font-bold text-[#8a97b3]">{t("headerRight")}</div>
        </div>

        <h1 className="motion-reveal-up motion-stagger-1 mt-3 text-[26px] font-black text-[#22314d]">{t("title")}</h1>

        <div className="motion-reveal-up motion-stagger-2 mt-3 rounded-[12px] bg-[#f0f4fd] px-3 py-2 text-[12px] font-semibold text-[#7f90b2]">
          {t("note")}
        </div>
      </section>

      <section className="px-4 pt-3">
        <ProgressBar value={progressValue} label={progressLabel} />
      </section>

      <section key={questions[currentQuestionIndex].id} className="px-4 pt-3">
        <QuestionCard
          question={questions[currentQuestionIndex]}
          selectedAnswer={selectedAnswer}
          onSelectAnswer={handleSelectAnswer}
        />
      </section>

      <section className="motion-reveal-up motion-stagger-3 mt-auto flex items-center gap-3 px-4 pb-5 pt-4">
        <PrimaryButton variant="secondary" onClick={handleBack} disabled={currentQuestionIndex === 0} className="flex-1">
          {t("back")}
        </PrimaryButton>
        <PrimaryButton onClick={handleNext} disabled={!selectedAnswer} className="flex-1" icon="arrow">
          {currentQuestionIndex === questions.length - 1 ? t("viewResult") : t("next")}
        </PrimaryButton>
      </section>

      {!canFinish && currentQuestionIndex === questions.length - 1 ? (
        <p className="pb-5 text-center text-[12px] font-semibold text-[#7f8fb1]">{t("finishHint")}</p>
      ) : null}
    </AppShell>
  );
}
