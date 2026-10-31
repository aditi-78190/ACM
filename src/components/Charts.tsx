import React from 'react';
import { ScoreBucket, ProblemStats, ContestOverview } from '../types/contest';

interface ScoreDistributionChartProps {
  buckets: ScoreBucket[];
}

export const ScoreDistributionChart: React.FC<ScoreDistributionChartProps> = ({ buckets }) => {
  const maxCount = Math.max(...buckets.map((b) => b.count), 1);

  return (
    <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-bold text-[#0a192f]">Score Distribution</h3>
          <p className="text-xs text-slate-500">Participants grouped by total contest points</p>
        </div>
        <span className="text-xs font-mono text-slate-400">N={buckets.reduce((a, b) => a + b.count, 0)}</span>
      </div>

      <div className="space-y-3">
        {buckets.map((bucket, idx) => {
          const widthPercent = Math.max(Math.round((bucket.count / maxCount) * 100), 4);
          return (
            <div key={idx} className="flex items-center gap-3 text-xs">
              <span className="w-24 text-right text-slate-600 font-medium whitespace-nowrap shrink-0">
                {bucket.label}
              </span>
              <div className="flex-1 bg-slate-100 h-6 rounded-md overflow-hidden relative flex items-center">
                <div
                  className="h-full bg-gradient-to-r from-[#0284c7] to-[#38bdf8] rounded-md transition-all duration-500"
                  style={{ width: `${widthPercent}%` }}
                />
                <span className="absolute left-2 text-[11px] font-mono font-semibold text-slate-700">
                  {bucket.count > 0 ? `${bucket.count} (${bucket.percentage}%)` : '0'}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

interface ProblemSuccessRateChartProps {
  problemStats: ProblemStats[];
}

export const ProblemSuccessRateChart: React.FC<ProblemSuccessRateChartProps> = ({ problemStats }) => {
  return (
    <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-bold text-[#0a192f]">Problem-Wise Success Rates</h3>
          <p className="text-xs text-slate-500">Accepted submissions / total attempts per task</p>
        </div>
        <div className="flex items-center gap-2 text-[11px] font-medium text-slate-500">
          <span className="inline-flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500" /> Easy
          </span>
          <span className="inline-flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-sky-500" /> Medium
          </span>
          <span className="inline-flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-rose-500" /> Hard
          </span>
        </div>
      </div>

      <div className="space-y-3">
        {problemStats.map((prob) => {
          const barColor =
            prob.difficulty === 'Easy'
              ? 'bg-emerald-500'
              : prob.difficulty === 'Medium'
              ? 'bg-sky-600'
              : 'bg-rose-500';

          return (
            <div key={prob.id} className="flex items-center gap-3 text-xs">
              <div className="w-20 text-slate-800 font-mono font-semibold truncate shrink-0">
                {prob.code}
              </div>
              <div className="flex-1 bg-slate-100 h-6 rounded-md overflow-hidden relative flex items-center">
                <div
                  className={`h-full ${barColor} rounded-md transition-all duration-500`}
                  style={{ width: `${Math.max(prob.successRate, 3)}%` }}
                />
                <span className="absolute left-2 text-[11px] font-mono font-semibold text-slate-700">
                  {prob.uniqueSolvers} solved · {prob.successRate}% AC
                </span>
              </div>
              <span className="w-12 text-right font-mono font-bold text-slate-700 shrink-0">
                {prob.points} pt
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

interface SubmissionStatusBreakdownProps {
  overview: ContestOverview;
}

export const SubmissionStatusBreakdown: React.FC<SubmissionStatusBreakdownProps> = ({ overview }) => {
  const { accepted, wrongAnswer, tle, rte, totalSubmissions } = overview;

  const acPct = totalSubmissions ? Math.round((accepted / totalSubmissions) * 100) : 0;
  const waPct = totalSubmissions ? Math.round((wrongAnswer / totalSubmissions) * 100) : 0;
  const tlePct = totalSubmissions ? Math.round((tle / totalSubmissions) * 100) : 0;
  const rtePct = totalSubmissions ? Math.max(0, 100 - acPct - waPct - tlePct) : 0;

  return (
    <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-bold text-[#0a192f]">Submission Analytics</h3>
          <p className="text-xs text-slate-500">Distribution across evaluation verdicts</p>
        </div>
        <span className="text-xs font-mono font-semibold text-slate-600">
          Total: {totalSubmissions}
        </span>
      </div>

      {/* Proportional Segmented Bar */}
      <div className="h-4 rounded-full overflow-hidden flex bg-slate-100 mb-5">
        <div
          style={{ width: `${acPct}%` }}
          className="bg-emerald-500 transition-all duration-500"
          title={`Accepted: ${accepted} (${acPct}%)`}
        />
        <div
          style={{ width: `${waPct}%` }}
          className="bg-rose-500 transition-all duration-500"
          title={`Wrong Answer: ${wrongAnswer} (${waPct}%)`}
        />
        <div
          style={{ width: `${tlePct}%` }}
          className="bg-amber-500 transition-all duration-500"
          title={`Time Limit Exceeded: ${tle} (${tlePct}%)`}
        />
        <div
          style={{ width: `${rtePct}%` }}
          className="bg-slate-500 transition-all duration-500"
          title={`Runtime Error / Other: ${rte} (${rtePct}%)`}
        />
      </div>

      {/* Grid of Verdicts */}
      <div className="grid grid-cols-2 gap-2 text-xs">
        <div className="p-2.5 rounded-lg bg-emerald-50/70 border border-emerald-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            <span className="font-semibold text-emerald-900">Accepted (AC)</span>
          </div>
          <span className="font-mono font-bold text-emerald-800 tabular-nums">
            {accepted} ({acPct}%)
          </span>
        </div>

        <div className="p-2.5 rounded-lg bg-rose-50/70 border border-rose-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
            <span className="font-semibold text-rose-900">Wrong Answer (WA)</span>
          </div>
          <span className="font-mono font-bold text-rose-800 tabular-nums">
            {wrongAnswer} ({waPct}%)
          </span>
        </div>

        <div className="p-2.5 rounded-lg bg-amber-50/70 border border-amber-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
            <span className="font-semibold text-amber-900">Time Limit (TLE)</span>
          </div>
          <span className="font-mono font-bold text-amber-800 tabular-nums">
            {tle} ({tlePct}%)
          </span>
        </div>

        <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-slate-500" />
            <span className="font-semibold text-slate-800">Runtime / CE</span>
          </div>
          <span className="font-mono font-bold text-slate-700 tabular-nums">
            {rte} ({rtePct}%)
          </span>
        </div>
      </div>
    </div>
  );
};

interface ParticipationAnalyticsProps {
  overview: ContestOverview;
}

export const ParticipationAnalytics: React.FC<ParticipationAnalyticsProps> = ({ overview }) => {
  const { totalParticipants, activeParticipants, solvers } = overview;
  const activePct = totalParticipants ? Math.round((activeParticipants / totalParticipants) * 100) : 0;
  const solverPct = totalParticipants ? Math.round((solvers / totalParticipants) * 100) : 0;

  return (
    <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
      <h3 className="text-sm font-bold text-[#0a192f] mb-1">Participation Funnel</h3>
      <p className="text-xs text-slate-500 mb-4">Registration to active problem solving conversion</p>

      <div className="space-y-4">
        <div>
          <div className="flex justify-between text-xs mb-1">
            <span className="font-medium text-slate-700">1. Registered Participants</span>
            <span className="font-mono font-bold text-[#0a192f]">{totalParticipants} (100%)</span>
          </div>
          <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full bg-slate-400 w-full rounded-full" />
          </div>
        </div>

        <div>
          <div className="flex justify-between text-xs mb-1">
            <span className="font-medium text-slate-700">2. Active (Submitted $\ge$ 1)</span>
            <span className="font-mono font-bold text-sky-700">{activeParticipants} ({activePct}%)</span>
          </div>
          <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-sky-600 rounded-full transition-all duration-500"
              style={{ width: `${activePct}%` }}
            />
          </div>
        </div>

        <div>
          <div className="flex justify-between text-xs mb-1">
            <span className="font-medium text-slate-700">3. Solvers (Solved $\ge$ 1)</span>
            <span className="font-mono font-bold text-emerald-700">{solvers} ({solverPct}%)</span>
          </div>
          <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-emerald-500 rounded-full transition-all duration-500"
              style={{ width: `${solverPct}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
