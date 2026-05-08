export type TraitDimension =
  | 'stage_presence'
  | 'camera_friendly'
  | 'self_management'
  | 'fan_communication'
  | 'improvisation'
  | 'collaboration'
  | 'content_planning'
  | 'mental_resilience';

export type TraitCard = {
  dimensions: Record<TraitDimension, number>;
  reasoning: Record<TraitDimension, string>;
  summary: string;
};

export type JobId =
  | 'live-commerce-host'
  | 'vocal-dance-trainer'
  | 'mc-reporter'
  | 'influencer-marketer'
  | 'kids-dance-instructor'
  | 'kpop-choreographer'
  | 'agency-ar-manager'
  | 'musical-actor'
  | 'voice-coach'
  | 'event-producer';

export type Job = {
  id: JobId;
  name: string;
  description: string;
  requiredTraits: Record<TraitDimension, number>;
  avgMonthlySalary: string;
  growthRate: string;
};

export type SurveyQuestion = {
  id: string;
  text: string;
  dimension: TraitDimension;
};

export type SurveyAnswers = Record<string, number>;

export type PortfolioSection = {
  title: string;
  content: string[];
};

export type Portfolio = {
  targetJob: string;
  sections: PortfolioSection[];
  summary: string;
};

export type JobRecommendation = {
  rank: number;
  jobName: string;
  matchScore: number;
  reason: string;
  avgMonthlySalary: string;
  growthRate: string;
};

export type AssessmentRequest = {
  surveyAnswers: SurveyAnswers;
  freeText: string;
  useDemo: boolean;
  wikiUrl?: string;
  name?: string;
  stageName?: string;
};

export type AssessmentResult = {
  traitCard: TraitCard;
  portfolios: Portfolio[];
  recommendations: JobRecommendation[];
};

export type RoadmapStep = {
  stepNumber: number;
  title: string;
  duration: string;
  description: string;
  tasks: string[];
};

export type LearningPlatform = '인프런' | '클래스101' | '국비지원' | '유튜브';

export type LearningResource = {
  platform: LearningPlatform;
  title: string;
  url: string;
  estimatedHours: string;
};

export type Roadmap = {
  jobId: JobId;
  overview: string;
  timeline: RoadmapStep[];
  learningResources: LearningResource[];
};

export type Mentor = {
  stageName: string;
  currentJob: string;
  yearsInJob: number;
};

export type QAPost = {
  id: string;
  title: string;
  body: string;
  asker: string;
  askedAt: string;
  mentor: Mentor;
  answer: string;
  rating: number;
  helpfulCount: number;
};

export type ClassCategory = '커리어 전환' | '스킬' | '멘탈 케어';

export type LiveClass = {
  id: string;
  title: string;
  mentor: { stageName: string; currentJob: string; profileBadge: string };
  price: string;
  ratingAvg: number;
  studentCount: number;
  category: ClassCategory;
};
