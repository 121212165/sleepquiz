export type Chronotype = 'bear' | 'wolf' | 'lion' | 'dolphin';

export interface ChronotypeResult {
  type: Chronotype;
  score: number;
  peakAlertness: string;
  idealSleepWindow: string;
}

export interface QualityResult {
  score: number;
  level: 'excellent' | 'good' | 'fair' | 'poor';
  breakdown: {
    sleepLatency: number;
    nightWaking: number;
    daytimeAlertness: number;
    consistency: number;
  };
}

export interface HabitFlag {
  id: string;
  severity: 'high' | 'medium' | 'low';
  category: 'screen' | 'caffeine' | 'exercise' | 'environment' | 'timing' | 'alcohol';
}

export interface SleepAssessment {
  chronotype: ChronotypeResult;
  quality: QualityResult;
  badHabits: HabitFlag[];
  overallScore: number;
}

export interface QuizAnswer {
  questionId: string;
  dimension: 'chronotype' | 'quality' | 'habits';
  value: number;
}

export interface QuizQuestion {
  id: string;
  dimension: 'chronotype' | 'quality' | 'habits';
  type: 'single' | 'scale' | 'time';
  options?: { value: number; label: string }[];
}
