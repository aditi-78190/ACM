import React from 'react';
import { ParticipantStats, Problem } from '../types/contest';
import { ArrowUp, ArrowDown, Minus, Check, X, Pin, UserCheck } from 'lucide-react';

interface LeaderboardTableProps {
  participants: ParticipantStats[];
  problems: Problem[];
  onSelectParticipant: (participant: ParticipantStats) => void;
  currentUserId?: string;
}

export const LeaderboardTable: React.FC<LeaderboardTableProps> = ({
  participants,
  problems,
  onSelectParticipant,
  currentUserId
}) => {
  if (participants.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-slate-200 p-12 text-center shadow-xs">
        <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-3">
          🔍
        </div>
        <h3 className="text-sm font-bold text-slate-800 mb-1">No Participants Match</h3>
        <p className="text-xs text-slate-500 max-w-sm mx-auto mb-4">
          No contestants match the current combination of search terms, college selection, or score filter.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-slate-50/90 text-slate-600 font-semibold border-b border-slate-200 whitespace-nowrap">
              <th className="py-3.5 pl-4 pr-2 w-16">Rank</th>
              <th className="py-3.5 px-3 min-w-[200px]">Contestant</th>
              <th className="py-3.5 px-3 min-w-[160px]">Institution</th>
              <th className="py-3.5 px-3 text-right">Score</th>
              <th className="py-3.5 px-3 text-center">Solved</th>
              <th className="py-3.5 px-3 text-center">Attempts</th>
              <th className="py-3.5 px-3 text-center">Accuracy</th>
              <th className="py-3.5 px-3 text-right">Penalty</th>
              <th className="py-3.5 px-3 text-right">Last AC</th>
              <th className="py-3.5 px-4 text-center min-w-[160px]">Task Matrix</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {participants.map((p) => {
              const isCurrentUser = p.id === currentUserId || p.isCurrentUser;
              const isTop1 = p.rank === 1;
              const isTop2 = p.rank === 2;
              const isTop3 = p.rank === 3;

              let rankBadgeClass = 'bg-slate-100 text-slate-700 border border-slate-200';
              let rowHighlight = 'hover:bg-slate-50/80';

              if (isTop1) {
                rankBadgeClass = 'bg-amber-400 text-white font-bold shadow-xs';
                rowHighlight = 'bg-amber-50/30 hover:bg-amber-50/60';
              } else if (isTop2) {
                rankBadgeClass = 'bg-slate-300 text-slate-800 font-bold';
                rowHighlight = 'bg-slate-50/50 hover:bg-slate-100/60';
              } else if (isTop3) {
                rankBadgeClass = 'bg-amber-700 text-white font-bold';
                rowHighlight = 'bg-amber-900/5 hover:bg-amber-900/10';
              }

              if (isCurrentUser) {
                rowHighlight = 'bg-sky-50/60 hover:bg-sky-50 border-l-4 border-l-sky-500';
              }

              return (
                <tr
                  key={p.id}
                  onClick={() => onSelectParticipant(p)}
                  className={`transition-colors cursor-pointer ${rowHighlight}`}
                  title="Click to view full participant statistics and submission logs"
                >
                  {/* Rank & Movement */}
                  <td className="py-3.5 pl-4 pr-2 whitespace-nowrap">
                    <div className="flex items-center gap-1.5">
                      <span
                        className={`w-6 h-6 rounded-full flex items-center justify-center font-mono text-xs font-semibold shrink-0 ${rankBadgeClass}`}
                      >
                        {p.rank}
                      </span>
                      <div className="text-[10px] font-mono shrink-0">
                        {p.movement > 0 ? (
                          <span className="text-emerald-600 flex items-center font-bold">
                            <ArrowUp className="w-2.5 h-2.5" />
                            {p.movement}
                          </span>
                        ) : p.movement < 0 ? (
                          <span className="text-rose-600 flex items-center font-bold">
                            <ArrowDown className="w-2.5 h-2.5" />
                            {Math.abs(p.movement)}
                          </span>
                        ) : (
                          <span className="text-slate-300 flex items-center">
                            <Minus className="w-2.5 h-2.5" />
                          </span>
                        )}
                      </div>
                    </div>
                  </td>

                  {/* Contestant Name, Handle, and Current User tag */}
                  <td className="py-3.5 px-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-full bg-slate-800 text-white flex items-center justify-center font-mono text-[11px] font-bold shrink-0">
                        {p.avatar || p.name.substring(0, 2).toUpperCase()}
                      </div>
                      <div className="min-w-0">
                        <div className="font-semibold text-slate-900 flex items-center gap-1.5 truncate">
                          <span className="hover:text-sky-600 transition-colors">
                            {p.name}
                          </span>
                          {isCurrentUser && (
                            <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-sky-600 text-white shrink-0">
                              YOU
                            </span>
                          )}
                        </div>
                        <div className="text-[11px] font-mono text-slate-400">
                          @{p.username}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Institution */}
                  <td className="py-3.5 px-3 text-slate-600 truncate max-w-[200px]">
                    {p.college}
                  </td>

                  {/* Total Score */}
                  <td className="py-3.5 px-3 text-right font-mono font-bold text-sm text-[#0a192f] tabular-nums">
                    {p.score}
                  </td>

                  {/* Problems Solved */}
                  <td className="py-3.5 px-3 text-center">
                    <span className="inline-flex items-center font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded text-xs tabular-nums">
                      {p.problemsSolved} / {problems.length}
                    </span>
                  </td>

                  {/* Total Attempts */}
                  <td className="py-3.5 px-3 text-center font-mono text-slate-600 tabular-nums">
                    {p.totalAttempts}
                  </td>

                  {/* Accuracy */}
                  <td className="py-3.5 px-3 text-center">
                    <div className="inline-flex flex-col items-center">
                      <span className="font-mono font-semibold text-slate-700 tabular-nums text-xs">
                        {p.accuracy}%
                      </span>
                      <div className="w-12 h-1 bg-slate-100 rounded-full overflow-hidden mt-1">
                        <div
                          className="h-full bg-sky-500 rounded-full"
                          style={{ width: `${p.accuracy}%` }}
                        />
                      </div>
                    </div>
                  </td>

                  {/* Penalty Time */}
                  <td className="py-3.5 px-3 text-right font-mono text-slate-700 tabular-nums">
                    {p.penaltyTime}m
                  </td>

                  {/* Last AC Time */}
                  <td className="py-3.5 px-3 text-right font-mono text-slate-500 tabular-nums">
                    {p.lastAcceptedTime > 0 ? `+${p.lastAcceptedTime}m` : '—'}
                  </td>

                  {/* Task Matrix Strip (P1 to P6) */}
                  <td className="py-3.5 px-4 text-center">
                    <div className="flex items-center justify-center gap-1">
                      {problems.map((prob) => {
                        const breakdown = p.problemBreakdown[prob.id];
                        const isSolved = breakdown?.solved;
                        const attempts = breakdown?.attempts || 0;

                        return (
                          <div
                            key={prob.id}
                            title={`${prob.code} (${prob.difficulty}): ${
                              isSolved
                                ? `Solved in ${breakdown.timeMinutes}m (${attempts} tries)`
                                : attempts > 0
                                ? `Failed (${attempts} tries)`
                                : 'Untouched'
                            }`}
                            className={`w-6 h-6 rounded flex items-center justify-center text-[10px] font-mono font-bold transition-transform hover:scale-110 ${
                              isSolved
                                ? 'bg-emerald-500 text-white'
                                : attempts > 0
                                ? 'bg-rose-100 text-rose-700 border border-rose-200'
                                : 'bg-slate-100 text-slate-300'
                            }`}
                          >
                            {isSolved ? (
                              attempts > 1 ? `+${attempts - 1}` : '✓'
                            ) : attempts > 0 ? (
                              `-${attempts}`
                            ) : (
                              '·'
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
