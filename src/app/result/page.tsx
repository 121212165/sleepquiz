'use client';

import { Suspense, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import ResultDashboard from '@/components/result/ResultDashboard';
import type { Chronotype } from '@/types/test';

interface ChronotypeInfo {
  emoji: string;
  name: string;
  tagline: string;
  description: string;
  peakAlertness: string;
  idealSleepWindow: string;
  sleepTip: string;
}

const chronotypeData: Record<string, ChronotypeInfo> = {
  bear: {
    emoji: '🐻',
    name: '熊型',
    tagline: '跟随太阳作息，最常见的节律类型。',
    description: '熊型约占人口的 55%。你遵循以太阳为基础的睡眠-清醒周期，上午后半段精力最旺盛。',
    peakAlertness: '10:00 - 14:00',
    idealSleepWindow: '23:00 - 07:00',
    sleepTip: '保持固定的 23:00-07:00 睡眠时间表。下午 2 点后避免咖啡因。',
  },
  wolf: {
    emoji: '🐺',
    name: '狼型',
    tagline: '夜猫子，富有创造力且不走寻常路。',
    description: '狼型约占人口的 15%。你的大脑在日落后才真正活跃起来。',
    peakAlertness: '17:00 - 21:00',
    idealSleepWindow: '00:30 - 08:30',
    sleepTip: '如果时间允许，建议 00:30-08:30 睡眠。早晨使用强光疗法。',
  },
  lion: {
    emoji: '🦁',
    name: '狮型',
    tagline: '早起鸟，天生的晨间领袖。',
    description: '狮型约占人口的 15%。你在黎明前醒来就充满活力。',
    peakAlertness: '08:00 - 12:00',
    idealSleepWindow: '21:30 - 05:30',
    sleepTip: '尊重你的早起节律：21:30-05:30 睡眠。把重要任务安排在中午之前。',
  },
  dolphin: {
    emoji: '🐬',
    name: '海豚型',
    tagline: '浅眠者，作息不规律但警觉度高。',
    description: '海豚型约占人口的 15%。你是浅眠者，夜间思绪纷飞。',
    peakAlertness: '10:00 - 12:00',
    idealSleepWindow: '23:30 - 06:30',
    sleepTip: '建立严格的睡前放松流程。白噪音和冥想会有帮助。',
  },
};

function ResultContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const [resultData] = useState(() => {
    if (typeof window === 'undefined' || !id) return null;
    const stored = sessionStorage.getItem(`result-${id}`);
    return stored ? JSON.parse(stored) : null;
  });

  if (!id || !resultData) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-indigo-950 via-blue-950 to-slate-950 flex items-center justify-center">
        <div className="text-center">
          <p className="text-slate-400 mb-4">未找到测试结果</p>
          <a href="/test" className="text-indigo-400 hover:text-indigo-300 underline">
            去做测试 →
          </a>
        </div>
      </main>
    );
  }

  const chronoInfo = chronotypeData[resultData.chronotype.type] || chronotypeData.bear;

  return (
    <main className="min-h-screen bg-gradient-to-b from-indigo-950 via-blue-950 to-slate-950 py-12">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-white">你的睡眠画像</h1>
      </div>
      <ResultDashboard
        result={{
          chronotype: {
            type: resultData.chronotype.type as Chronotype,
            ...chronoInfo,
          },
          quality: {
            score: resultData.quality.score,
            level: resultData.quality.level,
            breakdown: resultData.quality.breakdown,
          },
          overallScore: resultData.overallScore,
        }}
      />
    </main>
  );
}

export default function ResultPage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen bg-gradient-to-b from-indigo-950 via-blue-950 to-slate-950 flex items-center justify-center">
        <p className="text-slate-400">加载中...</p>
      </main>
    }>
      <ResultContent />
    </Suspense>
  );
}
