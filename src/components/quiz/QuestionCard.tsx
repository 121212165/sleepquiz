'use client';

interface QuestionCardProps {
  questionId: string;
  text: string;
  dimension: string;
  options: { value: number; label: string }[];
  selectedValue: number | null;
  onSelect: (value: number) => void;
  questionNumber: number;
}

const dimensionLabels: Record<string, string> = {
  chronotype: '节律类型',
  quality: '睡眠质量',
  habits: '日常习惯',
};

export default function QuestionCard({
  text,
  dimension,
  options,
  selectedValue,
  onSelect,
  questionNumber,
}: QuestionCardProps) {
  return (
    <div className="w-full max-w-xl mx-auto">
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-6 md:p-8">
        <div className="flex items-center gap-3 mb-6">
          <span className="bg-indigo-500/20 text-indigo-300 border border-indigo-400/30 px-2.5 py-0.5 rounded-full text-xs font-medium">
            {dimensionLabels[dimension] || dimension}
          </span>
          <span className="text-sm text-slate-400">#{questionNumber}</span>
        </div>

        <h2 className="text-lg md:text-xl font-medium text-white mb-8 leading-relaxed">
          {text}
        </h2>

        <div className="space-y-3">
          {options.map((option, idx) => (
            <button
              key={option.value}
              onClick={() => onSelect(option.value)}
              className={`w-full text-left px-5 py-4 rounded-xl border transition-all duration-200 cursor-pointer ${
                selectedValue === option.value
                  ? 'bg-indigo-500/30 border-indigo-400 text-white shadow-lg shadow-indigo-500/20'
                  : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10 hover:border-white/20'
              }`}
            >
              <span className="flex items-center gap-3">
                <span
                  className={`flex-shrink-0 w-7 h-7 rounded-full border-2 flex items-center justify-center text-xs font-bold ${
                    selectedValue === option.value
                      ? 'border-indigo-400 bg-indigo-500 text-white'
                      : 'border-slate-500 text-slate-400'
                  }`}
                >
                  {String.fromCharCode(65 + idx)}
                </span>
                <span className="text-sm md:text-base">{option.label}</span>
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
