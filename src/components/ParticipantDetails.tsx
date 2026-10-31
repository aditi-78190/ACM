import React from 'react';
import { ParticipantStats, Problem } from '../types/contest';
import {
  X,
  Trophy,
  CheckCircle2,
  XCircle,
  Clock,
  Target,
  School,
  TrendingUp,
  Award,
  FileCode2,
  AlertCircle
} from 'lucide-react';

interface ParticipantDetailsProps {
  participant: ParticipantStats | null;
  problems: Problem[];
  onClose: () => void;
  onToggleCurrentUser?: (id: string) => void;
  isCurrentUser?: boolean;
}

export const ParticipantDetails: React.FC<ParticipantDetailsProps> = ({
  participant,
  problems,
  onClose,
  onToggleCurrentUser,
  isCurrentUser
}) => {
  if (!participant) return null;

  // Derive strength insight
  const solvedCategories = problems
    .filter((prob) => participant.problemBreakdown[prob.id]?.solved)
    .flatMap((p) => p.tags);
  const uniqueTags = Array.from(new Set(solvedCategories));

  return (
    <div
      className="fixed inset-0 z-50 bg-[#0a192f]/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl max-w-3xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-[#0a192f] via-[#112240] to-[#172d54] text-white p-6 rounded-t-2xl relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pr-8">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-sky-400 to-blue-600 text-white flex items-center justify-center font-mono text-xl font-bold shadow-md ring-4 ring-white/10">
                {participant.avatar || participant.name.substring(0, 2).toUpperCase()}
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-bold text-white tracking-tight">
                    {participant.name}
                  </h2>
                  {isCurrentUser && (
                    <span className="text-[10px] font-bold bg-sky-500 text-white px-2 py-0.5 rounded-full">
                      YOU
                    </span>
                  )}
                </div>
                <p className="text-xs font-mono text-sky-200">@{participant.username}</p>
                <p className="text-xs text-slate-300 flex items-center gap-1.5 mt-1">
                  <School className="w-3.5 h-3.5 text-sky-400" />
                  {participant.college}
                </p>
              </div>
            </div>

            {onToggleCurrentUser && (
              <button
                onClick={() => onToggleCurrentUser(participant.id)}
                className={`self-start sm:self-center text-xs px-3 py-1.5 rounded-lg border font-medium transition-all ${
                  isCurrentUser
                    ? 'bg-sky-500 text-white border-sky-400'
                    : 'bg-white/10 text-slate-200 border-white/20 hover:bg-white/20'
                }`}
              >
                {isCurrentUser ? '✓ Pinned as You' : 'Pin as You'}
              </button>
            )}
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6">
          {/* Key Metrics Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
            <div className="bg-slate-50 border border-slate-200 p-3 rounded-xl text-center">
              <span className="text-[11px] font-semibold text-slate-500 uppercase block mb-1">
                Rank
              </span>
              <span className="text-xl font-bold font-mono text-[#0a192f]">
                #{participant.rank}
              </span>
            </div>

            <div className="bg-slate-50 border border-slate-200 p-3 rounded-xl text-center">
              <span className="text-[11px] font-semibold text-slate-500 uppercase block mb-1">
                Total Score
              </span>
              <span className="text-xl font-bold font-mono text-sky-600">
                {participant.score}
              </span>
            </div>

            <div className="bg-slate-50 border border-slate-200 p-3 rounded-xl text-center">
              <span className="text-[11px] font-semibold text-slate-500 uppercase block mb-1">
                Solved
              </span>
              <span className="text-xl font-bold font-mono text-emerald-600">
                {participant.problemsSolved} / {problems.length}
              </span>
            </div>

            <div className="bg-slate-50 border border-slate-200 p-3 rounded-xl text-center">
              <span className="text-[11px] font-semibold text-slate-500 uppercase block mb-1">
                Attempts
              </span>
              <span className="text-xl font-bold font-mono text-slate-700">
                {participant.totalAttempts}
              </span>
            </div>

            <div className="bg-slate-50 border border-slate-200 p-3 rounded-xl text-center">
              <span className="text-[11px] font-semibold text-slate-500 uppercase block mb-1">
                Accuracy
              </span>
              <span className="text-xl font-bold font-mono text-slate-700">
                {participant.accuracy}%
              </span>
            </div>

            <div className="bg-slate-50 border border-slate-200 p-3 rounded-xl text-center">
              <span className="text-[11px] font-semibold text-slate-500 uppercase block mb-1">
                Penalty
              </span>
              <span className="text-xl font-bold font-mono text-slate-700">
                {participant.penaltyTime}m
              </span>
            </div>
          </div>

          {/* Problem-Wise Performance Matrix */}
          <div>
            <h3 className="text-sm font-bold text-[#0a192f] mb-3 flex items-center gap-2">
              <FileCode2 className="w-4 h-4 text-sky-600" />
              Task Breakdown & Score Breakdown
            </h3>

            <div className="space-y-2">
              {problems.map((prob) => {
                const breakdown = participant.problemBreakdown[prob.id];
                const isSolved = breakdown?.solved;
                const attempts = breakdown?.attempts || 0;
                const penalty = breakdown?.penalty || 0;
                const time = breakdown?.timeMinutes;

                return (
                  <div
                    key={prob.id}
                    className={`p-3 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs transition-colors ${
                      isSolved
                        ? 'bg-emerald-50/60 border-emerald-200'
                        : attempts > 0
                        ? 'bg-rose-50/50 border-rose-200'
                        : 'bg-slate-50 border-slate-200 opacity-70'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-7 h-7 rounded-lg flex items-center justify-center font-mono font-bold text-xs shrink-0 ${
                          isSolved
                            ? 'bg-emerald-500 text-white'
                            : attempts > 0
                            ? 'bg-rose-500 text-white'
                            : 'bg-slate-200 text-slate-500'
                        }`}
                      >
                        {isSolved ? '✓' : attempts > 0 ? '✕' : '—'}
                      </div>

                      <div>
                        <div className="font-semibold text-slate-900 flex items-center gap-2">
                          <span className="font-mono text-sky-700">{prob.code}</span>
                          <span>{prob.title}</span>
                          <span className="text-[10px] text-slate-500 font-medium">
                            ({prob.difficulty} · {prob.points} pts)
                          </span>
                        </div>
                        <div className="text-[11px] text-slate-500">
                          {isSolved
                            ? `Accepted at +${time}m with ${breakdown.wrongBeforeSolve} rejected run(s) before AC`
                            : attempts > 0
                            ? `${attempts} failed runs recorded`
                            : 'Not yet attempted in this session'}
                        </div>
                      </div>
                    </div>

                    <div className="text-left sm:text-right shrink-0">
                      {isSolved ? (
                        <div>
                          <span className="font-bold font-mono text-emerald-700 text-sm">
                            +{prob.points} pts
                          </span>
                          <span className="block text-[10px] font-mono text-slate-500">
                            Penalty: {penalty}m
                          </span>
                        </div>
                      ) : (
                        <div>
                          <span className="font-mono text-slate-400 font-bold">0 pts</span>
                          <span className="block text-[10px] font-mono text-slate-400">
                            Penalty: 0m
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Performance Strengths & Focus Areas */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <TrendingUp className="w-3.5 h-3.5 text-sky-600" />
              Algorithmic Coverage & Analysis
            </h4>
            <p className="text-xs text-slate-600 mb-2 leading-relaxed">
              {participant.problemsSolved >= 4
                ? 'Strong pace across multi-tier dynamic programming and tree traversals. Efficient bug turnaround on initial attempts.'
                : participant.problemsSolved >= 2
                ? 'Consistent execution on foundation array and tree problems. Consider optimizing edge-case handling on graph tasks.'
                : 'Initial problem solved successfully. Focus on runtime complexity analysis for large input constraints.'}
            </p>
            {uniqueTags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 pt-1">
                {uniqueTags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[11px] font-medium bg-white border border-slate-200 text-slate-700 px-2 py-0.5 rounded-md"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Raw Submission Logs */}
          <div>
            <h3 className="text-sm font-bold text-[#0a192f] mb-3 flex items-center gap-2">
              <Clock className="w-4 h-4 text-sky-600" />
              Submission Log History ({participant.submissions.length})
            </h3>

            {participant.submissions.length === 0 ? (
              <p className="text-xs text-slate-400 py-3 text-center">No submissions recorded yet.</p>
            ) : (
              <div className="border border-slate-200 rounded-xl overflow-hidden max-h-48 overflow-y-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 sticky top-0">
                    <tr>
                      <th className="py-2.5 px-3">Time</th>
                      <th className="py-2.5 px-3">Problem</th>
                      <th className="py-2.5 px-3">Verdict</th>
                      <th className="py-2.5 px-3">Language</th>
                      <th className="py-2.5 px-3 text-right">Runtime</th>
                      <th className="py-2.5 px-3 text-right">Memory</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {participant.submissions
                      .slice()
                      .sort((a, b) => b.timestampMinutes - a.timestampMinutes)
                      .map((sub) => {
                        const isAC = sub.status === 'AC';
                        return (
                          <tr key={sub.id} className="hover:bg-slate-50/60 font-mono">
                            <td className="py-2 px-3 text-slate-500">+{sub.timestampMinutes}m</td>
                            <td className="py-2 px-3 font-semibold text-slate-800">{sub.problemId}</td>
                            <td className="py-2 px-3">
                              <span
                                className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                                  isAC
                                    ? 'bg-emerald-100 text-emerald-800'
                                    : 'bg-rose-100 text-rose-800'
                                }`}
                              >
                                {sub.status}
                              </span>
                            </td>
                            <td className="py-2 px-3 text-slate-600 font-sans">{sub.language}</td>
                            <td className="py-2 px-3 text-right text-slate-600">
                              {sub.executionTimeMs ? `${sub.executionTimeMs}ms` : '—'}
                            </td>
                            <td className="py-2 px-3 text-right text-slate-600">
                              {sub.memoryKb ? `${Math.round(sub.memoryKb / 1024)}MB` : '—'}
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
