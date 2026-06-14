'use client';

import { useState, useCallback } from 'react';
import QuestionCard from './QuestionCard';
import type { QuizAnswer } from '@/types/test';

interface Question {
  id: string;
  text: string;
  dimension: string;
  options: { value: number; label: string }[];
}

interface QuizContainerProps {
  questions: Question[];
  onComplete: (answers: QuizAnswer[]) => void;
}

export default function QuizContainer({ questions, onComplete }: QuizContainerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Map<string, QuizAnswer>>(new Map());

  const currentQuestion = questions[currentIndex];
  const progress = ((currentIndex + 1) / questions.length) * 100;

  const handleSelect = useCallback(
    (value: number) => {
      const newAnswers = new Map(answers);
      newAnswers.set(currentQuestion.id, {
        questionId: currentQuestion.id,
        dimension: currentQuestion.dimension as QuizAnswer['dimension'],
        value,
      });
      setAnswers(newAnswers);

      setTimeout(() => {
        if (currentIndex < questions.length - 1) {
          setCurrentIndex((i) => i + 1);
        } else {
          onComplete(Array.from(newAnswers.values()));
        }
      }, 300);
    },
    [answers, currentQuestion, currentIndex, questions.length, onComplete]
  );

  const handleBack = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex((i) => i - 1);
    }
  }, [currentIndex]);

  return (
    <div className="w-full max-w-2xl mx-auto px-4">
      <div className="mb-8">
        <div className="flex justify-between text-sm text-slate-400 mb-2">
          <span>第 {currentIndex + 1} 题 / 共 {questions.length} 题</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-indigo-500 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <QuestionCard
        key={currentQuestion.id}
        questionId={currentQuestion.id}
        text={currentQuestion.text}
        dimension={currentQuestion.dimension}
        options={currentQuestion.options}
        selectedValue={answers.get(currentQuestion.id)?.value ?? null}
        onSelect={handleSelect}
        questionNumber={currentIndex + 1}
      />

      {currentIndex > 0 && (
        <div className="mt-6 text-center">
          <button
            onClick={handleBack}
            className="text-sm text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            ← 上一题
          </button>
        </div>
      )}
    </div>
  );
}
