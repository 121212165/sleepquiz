'use client';

import type { Chronotype } from '@/types/test';

interface ResultDashboardProps {
  result: {
    chronotype: {
      type: Chronotype;
      emoji: string;
      name: string;
      tagline: string;
      description: string;
      peakAlertness: string;
      idealSleepWindow: string;
      sleepTip: string;
    };
    quality: {
      score: number;
      level: string;
      breakdown: Record<string, number>;
    };
    overallScore: number;
  };
}

const qualityLabels: Record<string, string> = {
  excellent: '优秀',
  good: '良好',
  fair: '一般',
  poor: '较差',
};

const qualityColors: Record<string, string> = {
  excellent: 'text-green-400',
  good: 'text-yellow-400',
  fair: 'text-orange-400',
  poor: 'text-red-400',
};

const breakdownLabels: Record<string, string> = {
  sleepLatency: '入睡速度',
  nightWaking: '夜间醒来',
  daytimeAlertness: '日间清醒度',
  consistency: '作息规律性',
};

function ScoreDisplay({ score }: { score: number }) {
  const color = score >= 80 ? 'text-green-400' : score >= 60 ? 'text-yellow-400' : score >= 40 ? 'text-orange-400' : 'text-red-400';

  return (
    <div className="flex flex-col items-center">
      <span className={`text-5xl font-bold ${color}`}>{score}</span>
      <span className="text-xs text-slate-500 mt-1">/ 100</span>
    </div>
  );
}

export default function ResultDashboard({ result }: ResultDashboardProps) {
  const { chronotype, quality, overallScore } = result;

  return (
    <div className="w-full max-w-2xl mx-auto px-4 space-y-6">
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-8 text-center">
        <div className="text-7xl mb-4">{chronotype.emoji}</div>
        <h1 className="text-3xl font-bold text-white mb-2">{chronotype.name}</h1>
        <p className="text-slate-300 text-lg mb-4">{chronotype.tagline}</p>
        <p className="text-slate-400 text-sm leading-relaxed max-w-md mx-auto">
          {chronotype.description}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 flex flex-col items-center">
          <h3 className="text-sm font-medium text-slate-400 mb-4">综合评分</h3>
          <ScoreDisplay score={overallScore} />
        </div>

        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 flex flex-col items-center">
          <h3 className="text-sm font-medium text-slate-400 mb-4">睡眠质量</h3>
          <ScoreDisplay score={quality.score} />
          <span className={`mt-3 text-sm font-medium ${qualityColors[quality.level]}`}>
            {qualityLabels[quality.level]}
          </span>
        </div>
      </div>

      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-slate-500 uppercase tracking-wider">最佳清醒时段</p>
            <p className="text-lg font-semibold text-indigo-300">{chronotype.peakAlertness}</p>
          </div>
          <div>
            <p className="text-xs text-slate-500 uppercase tracking-wider">理想睡眠窗口</p>
            <p className="text-lg font-semibold text-indigo-300">{chronotype.idealSleepWindow}</p>
          </div>
        </div>
        <div className="border-t border-white/10" />
        <div>
          <p className="text-xs text-slate-500 uppercase tracking-wider mb-2">睡眠建议</p>
          <p className="text-slate-300 text-sm leading-relaxed">{chronotype.sleepTip}</p>
        </div>
      </div>

      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
        <h3 className="text-sm font-medium text-slate-400 mb-4">质量维度分析</h3>
        <div className="space-y-3">
          {Object.entries(quality.breakdown).map(([key, score]) => (
            <div key={key} className="flex items-center gap-3">
              <span className="text-sm text-slate-400 w-24 flex-shrink-0">
                {breakdownLabels[key] || key}
              </span>
              <div className="flex-1 bg-white/10 rounded-full h-2.5">
                <div
                  className="h-2.5 rounded-full bg-indigo-500"
                  style={{ width: `${score}%` }}
                />
              </div>
              <span className="text-sm text-slate-300 w-8 text-right">{score}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center gap-4 pt-4">
        <button
          className="border border-white/20 text-slate-300 hover:bg-white/10 px-4 py-2 rounded-lg transition-colors cursor-pointer"
          onClick={() => {
            navigator.clipboard.writeText(window.location.href);
          }}
        >
          复制链接
        </button>
        <button
          className="text-slate-400 hover:text-white px-4 py-2 transition-colors cursor-pointer"
          onClick={() => (window.location.href = '/test')}
        >
          重新测试
        </button>
      </div>
    </div>
  );
}
