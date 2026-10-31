import React from 'react';
import {
  Contest,
  ContestOverview,
  ParticipantStats,
  ProblemStats,
  Submission,
  Problem
} from '../types/contest';
import { StatCard } from './StatCard';
import { TopPerformers } from './TopPerformers';
import {
  ScoreDistributionChart,
  ProblemSuccessRateChart,
  SubmissionStatusBreakdown,
  ParticipationAnalytics
} from './Charts';
import { RecentActivity } from './RecentActivity';
import {
  Users,
  Code2,
  Send,
  CheckCircle2,
  Hourglass,
  Activity,
  ArrowRight,
  Sparkles,
  Download
} from 'lucide-react';

interface OverviewProps {
  contest: Contest;
  overview: ContestOverview;
  topThree: ParticipantStats[];
  problemStats: ProblemStats[];
  submissions: Submission[];
  problems: Problem[];
  participants: ParticipantStats[];
  onSelectParticipant: (participant: ParticipantStats) => void;
  onNavigateLeaderboard: () => void;
  onSimulateSubmission: () => void;
}

export const Overview: React.FC<OverviewProps> = ({
  contest,
  overview,
  topThree,
  problemStats,
  submissions,
  problems,
  participants,
  onSelectParticipant,
  onNavigateLeaderboard,
  onSimulateSubmission
}) => {
  return (
    <div className="space-y-6">
      {/* Contest Header Banner */}
      <div className="bg-gradient-to-r from-[#0a192f] via-[#112240] to-[#172d54] text-white p-6 md:p-8 rounded-2xl shadow-sm border border-[#1e355b] relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-2">
              <span className="bg-sky-500/20 text-sky-300 border border-sky-400/30 text-xs font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                {contest.status}
              </span>
              <span className="text-xs text-slate-300 font-mono">
                5h Duration · North Section
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white mb-2">
              {contest.title}
            </h1>
            <p className="text-sm text-slate-300 leading-relaxed">
              {contest.subtitle}. Track real-time rankings, problem solve distributions, and participant achievements under official ICPC competition rules.
            </p>
          </div>

          <div className="flex flex-wrap md:flex-col gap-2.5 shrink-0">
            <button
              onClick={onNavigateLeaderboard}
              className="flex items-center justify-center gap-2 px-5 py-2.5 bg-sky-500 hover:bg-sky-400 text-white rounded-xl text-sm font-semibold transition-all shadow-md active:scale-95"
            >
              <span>View Leaderboard</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <div className="flex gap-2">
              <button
                onClick={onSimulateSubmission}
                className="flex-1 flex items-center justify-center gap-1.5 px-3.5 py-2 bg-white/10 hover:bg-white/15 text-slate-200 border border-white/20 rounded-xl text-xs font-medium transition-all active:scale-95"
              >
                <Sparkles className="w-3.5 h-3.5 text-sky-300" />
                <span>Simulate Sub</span>
              </button>
              <a
                href="/acm-contest-leaderboard.zip"
                download="acm-contest-leaderboard.zip"
                className="flex items-center justify-center gap-1.5 px-3.5 py-2 bg-white/10 hover:bg-white/15 text-slate-200 border border-white/20 rounded-xl text-xs font-medium transition-all active:scale-95"
                title="Download full project source code as ZIP"
              >
                <Download className="w-3.5 h-3.5 text-sky-300" />
                <span>ZIP</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* 6 Primary Key Metric Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
        <StatCard
          label="Registered"
          value={overview.totalParticipants}
          subtext="Contestants enrolled"
          icon={<Users className="w-4 h-4" />}
        />
        <StatCard
          label="Problems"
          value={problems.length}
          subtext="6 tasks (Easy to Hard)"
          icon={<Code2 className="w-4 h-4" />}
        />
        <StatCard
          label="Submissions"
          value={overview.totalSubmissions}
          subtext="Total code runs"
          icon={<Send className="w-4 h-4" />}
        />
        <StatCard
          label="Accepted"
          value={overview.accepted}
          subtext={`${overview.overallAcceptanceRate}% pass rate`}
          icon={<CheckCircle2 className="w-4 h-4" />}
          highlight={true}
        />
        <StatCard
          label="Duration"
          value="300m"
          subtext="5:00:00 total clock"
          icon={<Hourglass className="w-4 h-4" />}
        />
        <StatCard
          label="Active Solvers"
          value={overview.solvers}
          subtext={`${Math.round((overview.solvers / overview.totalParticipants) * 100)}% solved $\\ge 1$`}
          icon={<Activity className="w-4 h-4" />}
        />
      </div>

      {/* Top 3 Performers Podium */}
      <TopPerformers
        topThree={topThree}
        onSelectParticipant={onSelectParticipant}
      />

      {/* Analytics & Performance Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ScoreDistributionChart buckets={overview.scoreBuckets} />
        <ProblemSuccessRateChart problemStats={problemStats} />
      </div>

      {/* Analytics & Activity Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <ParticipationAnalytics overview={overview} />
        </div>
        <div className="lg:col-span-1">
          <SubmissionStatusBreakdown overview={overview} />
        </div>
        <div className="lg:col-span-1">
          <RecentActivity
            submissions={submissions}
            participants={participants}
            problems={problems}
            onSimulateSubmission={onSimulateSubmission}
            onSelectParticipant={onSelectParticipant}
          />
        </div>
      </div>
    </div>
  );
};
