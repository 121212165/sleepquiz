import Link from 'next/link';
import { useMemo } from 'react';

function seededRandom(seed: number) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

export default function LandingPage() {
  const stars = useMemo(() =>
    Array.from({ length: 50 }, (_, i) => ({
      width: seededRandom(i * 7 + 1) * 3 + 1,
      height: seededRandom(i * 7 + 2) * 3 + 1,
      top: `${seededRandom(i * 7 + 3) * 100}%`,
      left: `${seededRandom(i * 7 + 4) * 100}%`,
      opacity: seededRandom(i * 7 + 5) * 0.5 + 0.1,
      animationDuration: `${seededRandom(i * 7 + 6) * 3 + 2}s`,
    })),
  []);

  return (
    <main className="min-h-screen bg-gradient-to-b from-indigo-950 via-blue-950 to-slate-950">
      <section className="relative flex flex-col items-center justify-center min-h-[80vh] px-4 text-center">
        <div className="absolute inset-0 overflow-hidden">
          {stars.map((star, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-white animate-pulse"
              style={star}
            />
          ))}
        </div>

        <div className="relative z-10 max-w-3xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            发现你的{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
              睡眠画像
            </span>
          </h1>
          <p className="text-lg md:text-xl text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed">
            26 道题，3 分钟，揭示你的节律类型、睡眠质量评分和个性化改善方案。
          </p>
          <Link
            href="/test"
            className="inline-flex items-center gap-2 bg-indigo-500 hover:bg-indigo-600 text-white font-semibold px-8 py-4 rounded-full text-lg transition-all duration-200 shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:scale-105"
          >
            开始测试
            <span className="text-xl">→</span>
          </Link>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-12">为什么要做这个测试？</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: '🐻', title: '科学节律分析', desc: '基于时间生物学研究，识别你是熊型、狼型、狮型还是海豚型。' },
              { icon: '📊', title: '量化睡眠质量', desc: '从入睡速度、夜间醒来、日间清醒度、作息规律性四个维度评分。' },
              { icon: '🔍', title: '个性化建议', desc: '根据你的节律类型和生活习惯，给出可执行的改善方案。' },
            ].map((f, i) => (
              <div
                key={i}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors"
              >
                <div className="text-4xl mb-4">{f.icon}</div>
                <h3 className="text-lg font-semibold text-white mb-2">{f.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-white/[0.02]">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-12">如何使用？</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: '1', text: '回答 26 道关于作息、习惯和感受的问题' },
              { step: '2', text: '系统自动分析你的节律类型和睡眠质量' },
              { step: '3', text: '查看详细的睡眠画像和改善建议' },
            ].map((s) => (
              <div key={s.step}>
                <div className="w-12 h-12 rounded-full bg-indigo-500/20 border border-indigo-400/30 flex items-center justify-center text-indigo-300 font-bold text-lg mx-auto mb-4">
                  {s.step}
                </div>
                <p className="text-slate-300">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
