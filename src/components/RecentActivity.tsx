import React from 'react';
import { Submission, ParticipantStats, Problem } from '../types/contest';
import { Clock, CheckCircle2, XCircle, AlertTriangle, Sparkles, RefreshCw } from 'lucide-react';

interface RecentActivityProps {
  submissions: Submission[];
  participants: ParticipantStats[];
  problems: Problem[];
  onSimulateSubmission: () => void;
  onSelectParticipant: (participant: ParticipantStats) => void;
}

export const RecentActivity: React.FC<RecentActivityProps> = ({
  submissions,
  participants,
  problems,
  onSimulateSubmission,
  onSelectParticipant
}) => {
  // Sort submissions by timestamp descending to show newest activity
  const recentSubs = [...submissions]
    .sort((a, b) => b.timestampMinutes - a.timestampMinutes)
    .slice(0, 6);

  const getParticipant = (id: string) => participants.find((p) => p.id === id);
  const getProblem = (id: string) => problems.find((p) => p.id === id);

  return (
    <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-bold text-[#0a192f] flex items-center gap-2">
            <Clock className="w-4 h-4 text-sky-600" />
            Live Contest Activity & Verdicts
          </h3>
          <p className="text-xs text-slate-500">Real-time evaluation queue logs</p>
        </div>

        <button
          onClick={onSimulateSubmission}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-sky-700 bg-sky-50 border border-sky-200 rounded-lg hover:bg-sky-100 transition-colors shadow-2xs active:scale-95"
          title="Simulate an incoming live submission to test real-time scoreboard rank updates"
        >
          <Sparkles className="w-3.5 h-3.5 text-sky-600" />
          <span>Simulate Live Sub</span>
        </button>
      </div>

      <div className="divide-y divide-slate-100">
        {recentSubs.map((sub) => {
          const participant = getParticipant(sub.participantId);
          const problem = getProblem(sub.problemId);

          const isAC = sub.status === 'AC';
          const isWA = sub.status === 'WA';
          const isTLE = sub.status === 'TLE';

          return (
            <div
              key={sub.id}
              className="py-3 flex items-center justify-between hover:bg-slate-50/60 px-2 rounded-lg transition-colors cursor-pointer"
              onClick={() => participant && onSelectParticipant(participant)}
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="shrink-0">
                  {isAC ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  ) : isWA ? (
                    <XCircle className="w-4 h-4 text-rose-500" />
                  ) : (
                    <AlertTriangle className="w-4 h-4 text-amber-500" />
                  )}
                </div>

                <div className="min-w-0">
                  <div className="text-xs font-semibold text-slate-900 truncate">
                    <span className="hover:text-sky-600 transition-colors font-bold">
                      {participant ? participant.name : 'Contestant'}
                    </span>{' '}
                    <span className="text-slate-500 font-normal">submitted</span>{' '}
                    <span className="font-mono text-slate-800 font-semibold">{problem ? problem.code : sub.problemId}</span>
                  </div>
                  <div className="text-[11px] text-slate-500 truncate flex items-center gap-2">
                    <span>{participant?.college}</span>
                    <span>·</span>
                    <span className="font-mono">{sub.language}</span>
                    {sub.executionTimeMs && (
                      <>
                        <span>·</span>
                        <span className="font-mono">{sub.executionTimeMs}ms</span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div className="text-right shrink-0 pl-3">
                <span
                  className={`inline-block text-[11px] font-mono font-bold px-2 py-0.5 rounded ${
                    isAC
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : isWA
                      ? 'bg-rose-50 text-rose-700 border border-rose-200'
                      : 'bg-amber-50 text-amber-700 border border-amber-200'
                  }`}
                >
                  {sub.status}
                </span>
                <span className="block text-[10px] font-mono text-slate-400 mt-0.5">
                  +{sub.timestampMinutes}m
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
