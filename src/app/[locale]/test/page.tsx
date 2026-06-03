'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import QuizContainer from '@/components/quiz/QuizContainer';
import { quizQuestions } from '@/lib/quiz-data';
import { assessSleep } from '@/lib/sleep-engine';
import type { QuizAnswer } from '@/types/test';

// Build question data with text from a simple inline map
// (In production, these would come from i18n)
const questionTexts: Record<string, string> = {
  c1: '如果没有任何约束，你最自然的起床时间是？',
  c2: '早上醒来后的第一个小时内，你的状态是？',
  c3: '你自然醒来不需要闹钟的话，通常几点醒？',
  c4: '一天中你脑力最活跃、效率最高的时段是？',
  c5: '你在晚上 9-10 点的时候困倦程度如何？',
  c6: '如果不设闹钟，你通常几点入睡？',
  c7: '假期（无工作约束）时，你的作息和工作日相比？',
  c8: '你认为自己更符合以下哪种描述？',
  c9: '你更倾向于在什么时间做重要决策？',
  c10: '早上起床后你更倾向于？',
  c11: '"我更喜欢在深夜工作/学习"，你同意吗？',
  c12: '你在正常时间入睡的困难程度如何？',
  q1: '你通常需要多长时间才能入睡？',
  q2: '过去一个月，你夜里醒来（上厕所除外）的频率是？',
  q3: '白天你感到困倦、难以集中注意力的频率是？',
  q4: '你的睡眠时间表（几点睡几点起）规律程度如何？',
  q5: '你平均每晚实际睡眠时间是多少？',
  q6: '早上醒来后你的精神状态如何？',
  q7: '你使用助眠产品（褪黑素、安眠药等）的频率是？',
  q8: '你对自己目前睡眠质量的总体满意度？',
  h1: '睡前 1 小时内你使用电子设备（手机、电脑、平板）的时间？',
  h2: '你在下午 2 点以后摄入咖啡因（咖啡、茶、可乐）的频率？',
  h3: '你通常在什么时间运动？',
  h4: '你的卧室环境如何？（光线、噪音、温度）',
  h5: '你的睡眠-起床时间规律程度？',
  h6: '你在睡前饮酒的频率？',
};

export default function TestPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const questions = quizQuestions.map((q) => ({
    ...q,
    text: questionTexts[q.id] || q.id,
  }));

  const handleComplete = useCallback(
    async (answers: QuizAnswer[]) => {
      setIsLoading(true);
      try {
        const result = assessSleep(answers);

        // Save to API
        const res = await fetch('/api/result', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ answers, result }),
        });

        const data = await res.json();
        router.push(`/result/${data.id}`);
      } catch {
        // Fallback: generate a local ID and pass result via sessionStorage
        const id = crypto.randomUUID();
        const result = assessSleep(answers);
        sessionStorage.setItem(`result-${id}`, JSON.stringify(result));
        router.push(`/result/${id}`);
      }
    },
    [router]
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-indigo-950 via-blue-950 to-slate-950 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4 animate-bounce">🌙</div>
          <p className="text-slate-300 text-lg">正在分析你的睡眠画像...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-indigo-950 via-blue-950 to-slate-950 flex flex-col items-center justify-center py-12">
      <QuizContainer questions={questions} onComplete={handleComplete} />
    </main>
  );
}
