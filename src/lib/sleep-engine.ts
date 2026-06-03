import type { Chronotype, ChronotypeResult, QualityResult, HabitFlag, SleepAssessment, QuizAnswer } from '@/types/test';

// Chronotype scoring: each answer maps to scores for bear/wolf/lion/dolphin
const CHRONO_SCORING: Record<string, Record<Chronotype, number>[]> = {
  // 12 chronotype questions, 4 options each
  // option value 0-3 maps to the array index
  'c1': [
    { bear: 3, wolf: 0, lion: 2, dolphin: 1 },
    { bear: 2, wolf: 1, lion: 3, dolphin: 0 },
    { bear: 1, wolf: 3, lion: 0, dolphin: 2 },
    { bear: 0, wolf: 2, lion: 1, dolphin: 3 },
  ],
  'c2': [
    { bear: 2, wolf: 0, lion: 3, dolphin: 1 },
    { bear: 3, wolf: 1, lion: 2, dolphin: 0 },
    { bear: 1, wolf: 3, lion: 0, dolphin: 2 },
    { bear: 0, wolf: 2, lion: 1, dolphin: 3 },
  ],
  'c3': [
    { bear: 3, wolf: 1, lion: 2, dolphin: 0 },
    { bear: 2, wolf: 0, lion: 3, dolphin: 1 },
    { bear: 0, wolf: 3, lion: 1, dolphin: 2 },
    { bear: 1, wolf: 2, lion: 0, dolphin: 3 },
  ],
  'c4': [
    { bear: 2, wolf: 1, lion: 3, dolphin: 0 },
    { bear: 3, wolf: 0, lion: 2, dolphin: 1 },
    { bear: 1, wolf: 3, lion: 0, dolphin: 2 },
    { bear: 0, wolf: 2, lion: 1, dolphin: 3 },
  ],
  'c5': [
    { bear: 3, wolf: 0, lion: 2, dolphin: 1 },
    { bear: 1, wolf: 2, lion: 3, dolphin: 0 },
    { bear: 2, wolf: 3, lion: 0, dolphin: 1 },
    { bear: 0, wolf: 1, lion: 1, dolphin: 3 },
  ],
  'c6': [
    { bear: 2, wolf: 0, lion: 3, dolphin: 1 },
    { bear: 3, wolf: 1, lion: 1, dolphin: 2 },
    { bear: 1, wolf: 3, lion: 0, dolphin: 2 },
    { bear: 0, wolf: 2, lion: 2, dolphin: 3 },
  ],
  'c7': [
    { bear: 3, wolf: 1, lion: 2, dolphin: 0 },
    { bear: 2, wolf: 2, lion: 3, dolphin: 1 },
    { bear: 1, wolf: 3, lion: 0, dolphin: 2 },
    { bear: 0, wolf: 0, lion: 1, dolphin: 3 },
  ],
  'c8': [
    { bear: 3, wolf: 0, lion: 2, dolphin: 1 },
    { bear: 2, wolf: 1, lion: 3, dolphin: 0 },
    { bear: 0, wolf: 3, lion: 1, dolphin: 2 },
    { bear: 1, wolf: 2, lion: 0, dolphin: 3 },
  ],
  'c9': [
    { bear: 2, wolf: 1, lion: 3, dolphin: 0 },
    { bear: 3, wolf: 0, lion: 2, dolphin: 1 },
    { bear: 1, wolf: 2, lion: 0, dolphin: 3 },
    { bear: 0, wolf: 3, lion: 1, dolphin: 2 },
  ],
  'c10': [
    { bear: 3, wolf: 0, lion: 2, dolphin: 1 },
    { bear: 2, wolf: 2, lion: 3, dolphin: 0 },
    { bear: 0, wolf: 3, lion: 1, dolphin: 2 },
    { bear: 1, wolf: 1, lion: 0, dolphin: 3 },
  ],
  'c11': [
    { bear: 2, wolf: 0, lion: 3, dolphin: 1 },
    { bear: 3, wolf: 1, lion: 2, dolphin: 0 },
    { bear: 0, wolf: 3, lion: 0, dolphin: 2 },
    { bear: 1, wolf: 2, lion: 1, dolphin: 3 },
  ],
  'c12': [
    { bear: 3, wolf: 1, lion: 2, dolphin: 0 },
    { bear: 2, wolf: 0, lion: 3, dolphin: 1 },
    { bear: 1, wolf: 3, lion: 1, dolphin: 2 },
    { bear: 0, wolf: 2, lion: 0, dolphin: 3 },
  ],
};

const CHRONO_INFO: Record<Chronotype, { emoji: string; peakAlertness: string; idealSleepWindow: string }> = {
  bear: { emoji: '🐻', peakAlertness: '10:00 - 14:00', idealSleepWindow: '23:00 - 07:00' },
  wolf: { emoji: '🐺', peakAlertness: '17:00 - 21:00', idealSleepWindow: '00:30 - 08:30' },
  lion: { emoji: '🦁', peakAlertness: '08:00 - 12:00', idealSleepWindow: '21:30 - 05:30' },
  dolphin: { emoji: '🐬', peakAlertness: '10:00 - 12:00', idealSleepWindow: '23:30 - 06:30' },
};

function calcChronotype(answers: QuizAnswer[]): ChronotypeResult {
  const scores: Record<Chronotype, number> = { bear: 0, wolf: 0, lion: 0, dolphin: 0 };

  for (const ans of answers) {
    const scoring = CHRONO_SCORING[ans.questionId];
    if (!scoring) continue;
    const optionScores = scoring[Math.min(ans.value, scoring.length - 1)];
    if (!optionScores) continue;
    for (const [type, score] of Object.entries(optionScores)) {
      scores[type as Chronotype] += score;
    }
  }

  const maxScore = Math.max(...Object.values(scores));
  const total = Object.values(scores).reduce((a, b) => a + b, 0);
  const bestType = (Object.entries(scores).find(([, s]) => s === maxScore)?.[0] ?? 'bear') as Chronotype;
  const confidence = total > 0 ? Math.round((maxScore / total) * 100) : 50;
  const info = CHRONO_INFO[bestType];

  return {
    type: bestType,
    score: confidence,
    peakAlertness: info.peakAlertness,
    idealSleepWindow: info.idealSleepWindow,
  };
}

// Quality scoring: questions q1-q8
function calcQuality(answers: QuizAnswer[]): QualityResult {
  const answerMap = new Map(answers.map(a => [a.questionId, a.value]));

  // q1: How long to fall asleep? (0=<15min, 1=15-30, 2=30-60, 3=>60)
  const latencyScore = (() => {
    const v = answerMap.get('q1') ?? 1;
    return [25, 20, 10, 5][Math.min(v, 3)];
  })();

  // q2: How often wake at night? (0=never, 1=once, 2=twice, 3=3+)
  const wakingScore = (() => {
    const v = answerMap.get('q2') ?? 1;
    return [25, 20, 12, 5][Math.min(v, 3)];
  })();

  // q3: Daytime alertness (0=very alert, 1=alert, 2=somewhat, 3=very sleepy)
  const alertScore = (() => {
    const v = answerMap.get('q3') ?? 1;
    return [25, 20, 12, 5][Math.min(v, 3)];
  })();

  // q4: Sleep schedule consistency (0=very consistent, 1=mostly, 2=irregular, 3=chaotic)
  const consistencyScore = (() => {
    const v = answerMap.get('q4') ?? 1;
    return [25, 20, 10, 5][Math.min(v, 3)];
  })();

  // q5-q8 contribute additional modifiers
  // q5: Sleep hours (0=7-9, 1=6-7, 2=5-6, 3=<5)
  const hoursPenalty = (() => {
    const v = answerMap.get('q5') ?? 0;
    return [0, 5, 12, 20][Math.min(v, 3)];
  })();

  // q6: How refreshed on waking? (0=very, 1=somewhat, 2=not really, 3=not at all)
  const refreshPenalty = (() => {
    const v = answerMap.get('q6') ?? 1;
    return [0, 3, 8, 15][Math.min(v, 3)];
  })();

  // q7: Use sleep aids? (0=never, 1=rarely, 2=sometimes, 3=often)
  const aidsPenalty = (() => {
    const v = answerMap.get('q7') ?? 0;
    return [0, 3, 8, 15][Math.min(v, 3)];
  })();

  // q8: Sleep satisfaction (0=very satisfied, 1=satisfied, 2=dissatisfied, 3=very)
  const satPenalty = (() => {
    const v = answerMap.get('q8') ?? 1;
    return [0, 3, 8, 12][Math.min(v, 3)];
  })();

  const raw = latencyScore + wakingScore + alertScore + consistencyScore
    - hoursPenalty - refreshPenalty - aidsPenalty - satPenalty;

  const score = Math.max(0, Math.min(100, raw));

  const level = score >= 80 ? 'excellent' : score >= 60 ? 'good' : score >= 40 ? 'fair' : 'poor';

  return {
    score,
    level,
    breakdown: {
      sleepLatency: latencyScore,
      nightWaking: wakingScore,
      daytimeAlertness: alertScore,
      consistency: consistencyScore,
    },
  };
}

// Habit flagging: questions h1-h6
function calcHabits(answers: QuizAnswer[]): HabitFlag[] {
  const flags: HabitFlag[] = [];
  const answerMap = new Map(answers.map(a => [a.questionId, a.value]));

  // h1: Screen time before bed (0=no screen, 1=<30min, 2=30-60min, 3=>60min)
  const h1 = answerMap.get('h1');
  if (h1 !== undefined && h1 >= 2) {
    flags.push({ id: 'screen-before-bed', severity: h1 >= 3 ? 'high' : 'medium', category: 'screen' });
  }

  // h2: Caffeine after 2pm (0=never, 1=rarely, 2=sometimes, 3=daily)
  const h2 = answerMap.get('h2');
  if (h2 !== undefined && h2 >= 1) {
    flags.push({ id: 'late-caffeine', severity: h2 >= 3 ? 'high' : h2 >= 2 ? 'medium' : 'low', category: 'caffeine' });
  }

  // h3: Exercise timing (0=morning, 1=afternoon, 2=evening, 3=right before bed)
  const h3 = answerMap.get('h3');
  if (h3 !== undefined && h3 >= 2) {
    flags.push({ id: 'late-exercise', severity: h3 >= 3 ? 'high' : 'medium', category: 'exercise' });
  }

  // h4: Bedroom environment (0=dark/quiet/cool, 1=mostly good, 2=some issues, 3=bad)
  const h4 = answerMap.get('h4');
  if (h4 !== undefined && h4 >= 2) {
    flags.push({ id: 'poor-environment', severity: h4 >= 3 ? 'high' : 'medium', category: 'environment' });
  }

  // h5: Irregular sleep/wake times (0=same every day, 1=mostly, 2=weekdays differ, 3=totally random)
  const h5 = answerMap.get('h5');
  if (h5 !== undefined && h5 >= 2) {
    flags.push({ id: 'irregular-schedule', severity: h5 >= 3 ? 'high' : 'medium', category: 'timing' });
  }

  // h6: Alcohol before bed (0=never, 1=rarely, 2=sometimes, 3=daily)
  const h6 = answerMap.get('h6');
  if (h6 !== undefined && h6 >= 1) {
    flags.push({ id: 'alcohol-before-bed', severity: h6 >= 3 ? 'high' : h6 >= 2 ? 'medium' : 'low', category: 'alcohol' });
  }

  return flags;
}

export function assessSleep(answers: QuizAnswer[]): SleepAssessment {
  const chronoAnswers = answers.filter(a => a.dimension === 'chronotype');
  const qualityAnswers = answers.filter(a => a.dimension === 'quality');
  const habitAnswers = answers.filter(a => a.dimension === 'habits');

  const chronotype = calcChronotype(chronoAnswers);
  const quality = calcQuality(qualityAnswers);
  const badHabits = calcHabits(habitAnswers);

  const habitPenalty = badHabits.reduce((sum, h) => {
    return sum + (h.severity === 'high' ? 15 : h.severity === 'medium' ? 8 : 3);
  }, 0);

  const overallScore = Math.round(
    quality.score * 0.5 + Math.max(0, 100 - habitPenalty) * 0.3 + chronotype.score * 0.2
  );

  return { chronotype, quality, badHabits, overallScore };
}

export function getChronotypeInfo(type: Chronotype) {
  const info = CHRONO_INFO[type];
  return {
    ...info,
    type,
  };
}
