export interface QuizQuestionData {
  id: string;
  dimension: 'chronotype' | 'quality' | 'habits';
  options: { value: number; label: string }[];
}

export const quizQuestions: QuizQuestionData[] = [
  // ── Chronotype (12 questions) ──
  {
    id: 'c1',
    dimension: 'chronotype',
    options: [
      { value: 0, label: '早上 6:00 - 7:30，自然醒' },
      { value: 1, label: '早上 7:30 - 9:00，闹钟叫醒' },
      { value: 2, label: '早上 9:00 - 10:30，需要多个闹钟' },
      { value: 3, label: '上午 10:30 以后，能睡多久睡多久' },
    ],
  },
  {
    id: 'c2',
    dimension: 'chronotype',
    options: [
      { value: 0, label: '非常清醒，想立刻起床运动或工作' },
      { value: 1, label: '还算清醒，但需要 30 分钟缓一缓' },
      { value: 2, label: '迷迷糊糊，需要咖啡才能运转' },
      { value: 3, label: '极度困倦，关掉闹钟继续睡' },
    ],
  },
  {
    id: 'c3',
    dimension: 'chronotype',
    options: [
      { value: 0, label: '凌晨 5:00 - 6:00' },
      { value: 1, label: '早上 6:00 - 8:00' },
      { value: 2, label: '上午 8:00 - 10:00' },
      { value: 3, label: '上午 10:00 以后' },
    ],
  },
  {
    id: 'c4',
    dimension: 'chronotype',
    options: [
      { value: 0, label: '效率最高在上午 8-12 点' },
      { value: 1, label: '效率最高在中午 12-下午 3 点' },
      { value: 2, label: '效率最高在下午 3-6 点' },
      { value: 3, label: '效率最高在晚上 8 点以后' },
    ],
  },
  {
    id: 'c5',
    dimension: 'chronotype',
    options: [
      { value: 0, label: '完全没有，越晚越清醒' },
      { value: 1, label: '轻微，晚上 10 点以后有点困' },
      { value: 2, label: '明显，晚上 9 点就想躺下' },
      { value: 3, label: '非常强，晚上 8 点就开始犯困' },
    ],
  },
  {
    id: 'c6',
    dimension: 'chronotype',
    options: [
      { value: 0, label: '晚上 9:30 - 10:30' },
      { value: 1, label: '晚上 10:30 - 11:30' },
      { value: 2, label: '晚上 11:30 - 凌晨 1:00' },
      { value: 3, label: '凌晨 1:00 以后' },
    ],
  },
  {
    id: 'c7',
    dimension: 'chronotype',
    options: [
      { value: 0, label: '假期和工作日作息几乎一样' },
      { value: 1, label: '假期会晚起 1-2 小时' },
      { value: 2, label: '假期会晚起 2-4 小时' },
      { value: 3, label: '假期作息完全颠倒' },
    ],
  },
  {
    id: 'c8',
    dimension: 'chronotype',
    options: [
      { value: 0, label: '早起鸟：不需要闹钟就能自然早起' },
      { value: 1, label: '偏早型：喜欢早起但需要闹钟' },
      { value: 2, label: '偏晚型：习惯晚睡晚起' },
      { value: 3, label: '夜猫子：凌晨才是我的黄金时间' },
    ],
  },
  {
    id: 'c9',
    dimension: 'chronotype',
    options: [
      { value: 0, label: '早上 6-9 点' },
      { value: 1, label: '上午 9-12 点' },
      { value: 2, label: '下午 2-6 点' },
      { value: 3, label: '晚上 8 点以后' },
    ],
  },
  {
    id: 'c10',
    dimension: 'chronotype',
    options: [
      { value: 0, label: '一顿丰盛的早餐' },
      { value: 1, label: '清淡的早餐或早午餐' },
      { value: 2, label: '跳过早餐，中午才吃第一顿' },
      { value: 3, label: '下午才开始有食欲' },
    ],
  },
  {
    id: 'c11',
    dimension: 'chronotype',
    options: [
      { value: 0, label: '完全不同意，我是晨型人' },
      { value: 1, label: '有点同意，偶尔享受深夜安静' },
      { value: 2, label: '比较同意，夜晚工作效率高' },
      { value: 3, label: '完全同意，深夜才是我的主场' },
    ],
  },
  {
    id: 'c12',
    dimension: 'chronotype',
    options: [
      { value: 0, label: '非常容易，一到 9-10 点就困' },
      { value: 1, label: '还可以，11 点左右能入睡' },
      { value: 2, label: '比较难，经常到凌晨才困' },
      { value: 3, label: '非常难，经常失眠到凌晨 2-3 点' },
    ],
  },

  // ── Sleep Quality (8 questions) ──
  {
    id: 'q1',
    dimension: 'quality',
    options: [
      { value: 0, label: '15 分钟以内' },
      { value: 1, label: '15 - 30 分钟' },
      { value: 2, label: '30 - 60 分钟' },
      { value: 3, label: '超过 60 分钟' },
    ],
  },
  {
    id: 'q2',
    dimension: 'quality',
    options: [
      { value: 0, label: '从不' },
      { value: 1, label: '每周 1-2 次' },
      { value: 2, label: '每周 3-5 次' },
      { value: 3, label: '几乎每天' },
    ],
  },
  {
    id: 'q3',
    dimension: 'quality',
    options: [
      { value: 0, label: '精力充沛，完全不困' },
      { value: 1, label: '偶尔有点困，但能正常工作' },
      { value: 2, label: '经常犯困，需要咖啡提神' },
      { value: 3, label: '极度困倦，严重影响日常' },
    ],
  },
  {
    id: 'q4',
    dimension: 'quality',
    options: [
      { value: 0, label: '非常规律，每天同一时间' },
      { value: 1, label: '大部分规律，偏差在 1 小时内' },
      { value: 2, label: '不太规律，工作日和周末差异大' },
      { value: 3, label: '完全没有规律' },
    ],
  },
  {
    id: 'q5',
    dimension: 'quality',
    options: [
      { value: 0, label: '7 - 9 小时' },
      { value: 1, label: '6 - 7 小时' },
      { value: 2, label: '5 - 6 小时' },
      { value: 3, label: '少于 5 小时' },
    ],
  },
  {
    id: 'q6',
    dimension: 'quality',
    options: [
      { value: 0, label: '非常精神，精力充沛' },
      { value: 1, label: '还可以，慢慢就清醒了' },
      { value: 2, label: '不太精神，需要一段时间才能恢复' },
      { value: 3, label: '很疲惫，感觉没睡够' },
    ],
  },
  {
    id: 'q7',
    dimension: 'quality',
    options: [
      { value: 0, label: '从不' },
      { value: 1, label: '偶尔（每月 1-2 次）' },
      { value: 2, label: '经常（每周 1-2 次）' },
      { value: 3, label: '几乎每天' },
    ],
  },
  {
    id: 'q8',
    dimension: 'quality',
    options: [
      { value: 0, label: '非常满意' },
      { value: 1, label: '基本满意' },
      { value: 2, label: '不太满意' },
      { value: 3, label: '非常不满意' },
    ],
  },

  // ── Sleep Habits (6 questions) ──
  {
    id: 'h1',
    dimension: 'habits',
    options: [
      { value: 0, label: '睡前不看任何屏幕' },
      { value: 1, label: '30 分钟以内' },
      { value: 2, label: '30 - 60 分钟' },
      { value: 3, label: '超过 1 小时，经常刷到睡着' },
    ],
  },
  {
    id: 'h2',
    dimension: 'habits',
    options: [
      { value: 0, label: '从不在下午喝咖啡/茶' },
      { value: 1, label: '偶尔（每周 1-2 次）' },
      { value: 2, label: '经常（每周 3-5 次）' },
      { value: 3, label: '每天下午都会喝' },
    ],
  },
  {
    id: 'h3',
    dimension: 'habits',
    options: [
      { value: 0, label: '早上或下午运动' },
      { value: 1, label: '傍晚运动（6 点前结束）' },
      { value: 2, label: '晚上运动（6-9 点）' },
      { value: 3, label: '睡前运动（9 点以后）' },
    ],
  },
  {
    id: 'h4',
    dimension: 'habits',
    options: [
      { value: 0, label: '黑暗、安静、凉爽' },
      { value: 1, label: '基本可以，有些光线或噪音' },
      { value: 2, label: '有不少干扰（光线、噪音、温度等）' },
      { value: 3, label: '环境很差，严重影响睡眠' },
    ],
  },
  {
    id: 'h5',
    dimension: 'habits',
    options: [
      { value: 0, label: '每天固定时间，周末也一样' },
      { value: 1, label: '大部分规律，偶尔偏差' },
      { value: 2, label: '工作日规律，周末完全不同' },
      { value: 3, label: '完全没有规律，随心所欲' },
    ],
  },
  {
    id: 'h6',
    dimension: 'habits',
    options: [
      { value: 0, label: '从不在睡前饮酒' },
      { value: 1, label: '偶尔（每月 1-2 次）' },
      { value: 2, label: '经常（每周 1-2 次）' },
      { value: 3, label: '几乎每天睡前喝酒' },
    ],
  },
];
