'use client';

import type { Chronotype } from '@/types/test';

interface ShareCardProps {
  chronotype: { type: Chronotype; emoji: string; name: string };
  overallScore: number;
  qualityScore: number;
}

export default function ShareCard({ chronotype, overallScore, qualityScore }: ShareCardProps) {
  return (
    <div
      id="share-card"
      className="relative w-[600px] h-[315px] overflow-hidden rounded-2xl"
      style={{
        background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #0c0a1d 100%)',
      }}
    >
      {/* Stars decoration */}
      <div className="absolute inset-0">
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              width: Math.random() * 3 + 1,
              height: Math.random() * 3 + 1,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.7 + 0.1,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 flex items-center justify-between h-full px-12">
        <div>
          <div className="text-6xl mb-3">{chronotype.emoji}</div>
          <h2 className="text-2xl font-bold text-white mb-1">我是{chronotype.name}型</h2>
          <p className="text-indigo-300 text-sm">睡眠画像测试结果</p>
        </div>

        <div className="text-right">
          <div className="text-5xl font-bold text-white mb-1">{overallScore}</div>
          <p className="text-slate-400 text-sm">综合评分</p>
          <div className="mt-3 text-3xl font-bold text-indigo-300">{qualityScore}</div>
          <p className="text-slate-500 text-xs">睡眠质量</p>
        </div>
      </div>

      {/* Watermark */}
      <div className="absolute bottom-4 right-6 text-xs text-slate-600">
        restcheck.com
      </div>
    </div>
  );
}
