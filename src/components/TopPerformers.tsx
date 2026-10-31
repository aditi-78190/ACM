import React from 'react';
import { ParticipantStats } from '../types/contest';
import { Trophy, Medal, Award, ArrowUpRight } from 'lucide-react';

interface TopPerformersProps {
  topThree: ParticipantStats[];
  onSelectParticipant: (participant: ParticipantStats) => void;
}

export const TopPerformers: React.FC<TopPerformersProps> = ({
  topThree,
  onSelectParticipant
}) => {
  if (!topThree || topThree.length < 3) return null;

  const [first, second, third] = topThree;

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-base font-bold text-[#0a192f] flex items-center gap-2">
            <Trophy className="w-5 h-5 text-amber-500" />
            Leading Contestants (Podium Ranks)
          </h2>
          <p className="text-xs text-slate-500">
            Top 3 performers currently heading the official scoreboard
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
        {/* 2nd Place - Silver */}
        <div
          onClick={() => onSelectParticipant(second)}
          className="order-2 md:order-1 bg-white rounded-xl border border-slate-200 p-5 cursor-pointer hover:border-slate-400 hover:shadow-md transition-all group relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-slate-400" />
          <div className="flex items-start justify-between mb-3">
            <div className="w-9 h-9 rounded-full bg-slate-100 border border-slate-300 flex items-center justify-center font-bold font-mono text-slate-700 text-sm shadow-xs">
              2
            </div>
            <span className="text-[11px] font-semibold text-slate-500 flex items-center gap-1 group-hover:text-sky-600 transition-colors">
              Inspect <ArrowUpRight className="w-3.5 h-3.5" />
            </span>
          </div>

          <h3 className="font-bold text-slate-900 group-hover:text-sky-600 transition-colors text-base truncate">
            {second.name}
          </h3>
          <p className="text-xs font-mono text-slate-400">@{second.username}</p>
          <p className="text-xs text-slate-500 mt-1 truncate">{second.college}</p>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Score</span>
              <span className="text-lg font-bold font-mono text-[#0a192f]">{second.score} pts</span>
            </div>
            <div className="text-right">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Solved</span>
              <span className="text-sm font-bold font-mono text-emerald-600">{second.problemsSolved} AC ({second.penaltyTime}m)</span>
            </div>
          </div>
        </div>

        {/* 1st Place - Gold (Elevated card) */}
        <div
          onClick={() => onSelectParticipant(first)}
          className="order-1 md:order-2 bg-gradient-to-b from-amber-50/40 via-white to-white rounded-xl border-2 border-amber-400/80 p-6 cursor-pointer hover:shadow-lg transition-all group relative overflow-hidden md:-translate-y-2 shadow-xs"
        >
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400" />
          <div className="flex items-start justify-between mb-3">
            <div className="w-11 h-11 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 text-white flex items-center justify-center font-bold font-mono text-base shadow-sm ring-4 ring-amber-100">
              1
            </div>
            <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-700 bg-amber-100/80 px-2 py-0.5 rounded-full">
              <Medal className="w-3 h-3" /> Gold Leader
            </span>
          </div>

          <h3 className="font-bold text-[#0a192f] group-hover:text-amber-700 transition-colors text-lg truncate">
            {first.name}
          </h3>
          <p className="text-xs font-mono text-slate-400">@{first.username}</p>
          <p className="text-xs text-slate-600 mt-1 truncate font-medium">{first.college}</p>

          <div className="mt-5 pt-3.5 border-t border-amber-100 flex items-center justify-between">
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Total Points</span>
              <span className="text-2xl font-bold font-mono text-[#0a192f]">{first.score}</span>
            </div>
            <div className="text-right">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Solved / Penalty</span>
              <span className="text-base font-bold font-mono text-emerald-700">
                {first.problemsSolved} AC · {first.penaltyTime}m
              </span>
            </div>
          </div>
        </div>

        {/* 3rd Place - Bronze */}
        <div
          onClick={() => onSelectParticipant(third)}
          className="order-3 bg-white rounded-xl border border-slate-200 p-5 cursor-pointer hover:border-slate-400 hover:shadow-md transition-all group relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-amber-700" />
          <div className="flex items-start justify-between mb-3">
            <div className="w-9 h-9 rounded-full bg-amber-50 border border-amber-700/30 flex items-center justify-center font-bold font-mono text-amber-800 text-sm shadow-xs">
              3
            </div>
            <span className="text-[11px] font-semibold text-slate-500 flex items-center gap-1 group-hover:text-sky-600 transition-colors">
              Inspect <ArrowUpRight className="w-3.5 h-3.5" />
            </span>
          </div>

          <h3 className="font-bold text-slate-900 group-hover:text-sky-600 transition-colors text-base truncate">
            {third.name}
          </h3>
          <p className="text-xs font-mono text-slate-400">@{third.username}</p>
          <p className="text-xs text-slate-500 mt-1 truncate">{third.college}</p>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Score</span>
              <span className="text-lg font-bold font-mono text-[#0a192f]">{third.score} pts</span>
            </div>
            <div className="text-right">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Solved</span>
              <span className="text-sm font-bold font-mono text-emerald-600">{third.problemsSolved} AC ({third.penaltyTime}m)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
