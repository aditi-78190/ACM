export type Difficulty = 'Easy' | 'Medium' | 'Hard';

export type SubmissionStatus = 'AC' | 'WA' | 'TLE' | 'RTE' | 'CE';

export interface Problem {
  id: string;
  code: string;
  title: string;
  difficulty: Difficulty;
  points: number;
  timeLimit: string;
  memoryLimit: string;
  description: string;
  tags: string[];
  inputSpec?: string;
  outputSpec?: string;
}

export interface Participant {
  id: string;
  name: string;
  username: string;
  college: string;
  avatar: string;
  previousRank?: number;
  isCurrentUser?: boolean;
}

export interface Submission {
  id: string;
  participantId: string;
  problemId: string;
  status: SubmissionStatus;
  timestampMinutes: number;
  language: string;
  executionTimeMs?: number;
  memoryKb?: number;
}

export interface ProblemScoreResult {
  solved: boolean;
  points: number;
  attempts: number;
  wrongBeforeSolve: number;
  timeMinutes: number | null;
  penalty: number;
}

export interface ParticipantStats extends Participant {
  rank: number;
  score: number;
  problemsSolved: number;
  totalAttempts: number;
  acceptedCount: number;
  accuracy: number;
  penaltyTime: number;
  lastAcceptedTime: number;
  movement: number; // positive = moved up, negative = dropped, 0 = unchanged
  problemBreakdown: Record<string, ProblemScoreResult>;
  submissions: Submission[];
}

export interface ProblemStats extends Problem {
  totalAttempts: number;
  acceptedCount: number;
  wrongCount: number;
  tleCount: number;
  rteCount: number;
  uniqueSolvers: number;
  successRate: number;
}

export interface ScoreBucket {
  label: string;
  count: number;
  percentage: number;
}

export interface ContestOverview {
  totalParticipants: number;
  activeParticipants: number;
  solvers: number;
  zeroSolvers: number;
  totalSubmissions: number;
  accepted: number;
  wrongAnswer: number;
  tle: number;
  rte: number;
  overallAcceptanceRate: number;
  scoreBuckets: ScoreBucket[];
}

export interface ContestNotification {
  id: string;
  title: string;
  time: string;
  type: 'announcement' | 'clarification' | 'verdict';
  read?: boolean;
}

export interface Contest {
  id: string;
  title: string;
  subtitle: string;
  chapter: string;
  status: string;
  startTime: string;
  endTime: string;
  durationMinutes: number;
  penaltyPerWrongSubmission: number;
  rules: string[];
  tieBreakers: string[];
  notifications: ContestNotification[];
}
