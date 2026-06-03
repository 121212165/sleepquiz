'use client';

import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
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
  resultId: string;
  isPaid?: boolean;
  onUpgrade?: () => void;
}

function ScoreRing({ score, size = 120 }: { score: number; size?: number }) {
  const radius = (size - 12) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;
  const color = score >= 80 ? '#22c55e' : score >= 60 ? '#eab308' : score >= 40 ? '#f97316' : '#ef4444';

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="rgba(255,255,255,0.1)"
          strokeWidth="8"
          fill="none"
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth="8"
          fill="none"
          strokeLinecap="round"
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          strokeDasharray={circumference}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.span
          className="text-3xl font-bold text-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {score}
        </motion.span>
      </div>
    </div>
  );
}

const qualityLabels: Record<string, string> = {
  excellent: '优秀',
  good: '良好',
  fair: '一般',
  poor: '较差',
};

const qualityColors: Record<string, string> = {
  excellent: 'bg-green-500/20 text-green-300 border-green-400/30',
  good: 'bg-yellow-500/20 text-yellow-300 border-yellow-400/30',
  fair: 'bg-orange-500/20 text-orange-300 border-orange-400/30',
  poor: 'bg-red-500/20 text-red-300 border-red-400/30',
};

const breakdownLabels: Record<string, string> = {
  sleepLatency: '入睡速度',
  nightWaking: '夜间醒来',
  daytimeAlertness: '日间清醒度',
  consistency: '作息规律性',
};

export default function ResultDashboard({ result, resultId, isPaid, onUpgrade }: ResultDashboardProps) {
  const { chronotype, quality, overallScore } = result;

  return (
    <div className="w-full max-w-2xl mx-auto px-4 space-y-6">
      {/* Chronotype Hero */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Card className="bg-white/5 backdrop-blur-xl border-white/10 shadow-2xl overflow-hidden">
          <CardContent className="p-8 text-center">
            <motion.div
              className="text-7xl mb-4"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', bounce: 0.5, delay: 0.2 }}
            >
              {chronotype.emoji}
            </motion.div>
            <h1 className="text-3xl font-bold text-white mb-2">{chronotype.name}</h1>
            <p className="text-slate-300 text-lg mb-4">{chronotype.tagline}</p>
            <p className="text-slate-400 text-sm leading-relaxed max-w-md mx-auto">
              {chronotype.description}
            </p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Score Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Overall Score */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="bg-white/5 backdrop-blur-xl border-white/10 h-full">
            <CardContent className="p-6 flex flex-col items-center">
              <h3 className="text-sm font-medium text-slate-400 mb-4">综合评分</h3>
              <ScoreRing score={overallScore} />
            </CardContent>
          </Card>
        </motion.div>

        {/* Quality Score */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="bg-white/5 backdrop-blur-xl border-white/10 h-full">
            <CardContent className="p-6 flex flex-col items-center">
              <h3 className="text-sm font-medium text-slate-400 mb-4">睡眠质量</h3>
              <ScoreRing score={quality.score} />
              <Badge className={`mt-3 ${qualityColors[quality.level]}`}>
                {qualityLabels[quality.level]}
              </Badge>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Chronotype Details */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Card className="bg-white/5 backdrop-blur-xl border-white/10">
          <CardContent className="p-6 space-y-4">
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
            <Separator className="bg-white/10" />
            <div>
              <p className="text-xs text-slate-500 uppercase tracking-wider mb-2">睡眠建议</p>
              <p className="text-slate-300 text-sm leading-relaxed">{chronotype.sleepTip}</p>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Quality Breakdown */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <Card className="bg-white/5 backdrop-blur-xl border-white/10">
          <CardContent className="p-6">
            <h3 className="text-sm font-medium text-slate-400 mb-4">质量维度分析</h3>
            <div className="space-y-3">
              {Object.entries(quality.breakdown).map(([key, score]) => (
                <div key={key} className="flex items-center gap-3">
                  <span className="text-sm text-slate-400 w-24 flex-shrink-0">
                    {breakdownLabels[key] || key}
                  </span>
                  <div className="flex-1 bg-white/10 rounded-full h-2.5">
                    <motion.div
                      className="h-2.5 rounded-full bg-indigo-500"
                      initial={{ width: 0 }}
                      animate={{ width: `${score}%` }}
                      transition={{ duration: 1, delay: 0.8 }}
                    />
                  </div>
                  <span className="text-sm text-slate-300 w-8 text-right">{score}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Upgrade CTA */}
      {!isPaid && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <Card className="bg-gradient-to-r from-indigo-600/20 to-purple-600/20 backdrop-blur-xl border-indigo-400/30">
            <CardContent className="p-6 text-center">
              <h3 className="text-lg font-semibold text-white mb-2">解锁完整报告</h3>
              <p className="text-slate-300 text-sm mb-4">
                获取个性化改善方案、详细分析和睡眠优化指南。
              </p>
              <Button
                onClick={onUpgrade}
                className="bg-indigo-500 hover:bg-indigo-600 text-white px-8"
              >
                升级 Pro — $9
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Share & Retry */}
      <div className="flex justify-center gap-4 pt-4">
        <Button
          variant="outline"
          className="border-white/20 text-slate-300 hover:bg-white/10"
          onClick={() => {
            navigator.clipboard.writeText(window.location.href);
          }}
        >
          复制链接
        </Button>
        <Button
          variant="ghost"
          className="text-slate-400 hover:text-white"
          onClick={() => (window.location.href = '/test')}
        >
          重新测试
        </Button>
      </div>
    </div>
  );
}
