import React, { useState, useMemo } from 'react';
import { ParticipantStats, Problem } from '../types/contest';
import { Users, Search, School, Trophy, Award, ArrowUpRight } from 'lucide-react';

interface ParticipantsViewProps {
  participants: ParticipantStats[];
  problems: Problem[];
  onSelectParticipant: (participant: ParticipantStats) => void;
  currentUserId?: string;
}

export const ParticipantsView: React.FC<ParticipantsViewProps> = ({
  participants,
  problems,
  onSelectParticipant,
  currentUserId
}) => {
  const [search, setSearch] = useState('');
  const [selectedCollege, setSelectedCollege] = useState('ALL');

  const colleges = useMemo(() => {
    return Array.from(new Set(participants.map((p) => p.college))).sort();
  }, [participants]);

  const filtered = useMemo(() => {
    return participants.filter((p) => {
      const matchSearch =
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.username.toLowerCase().includes(search.toLowerCase()) ||
        p.college.toLowerCase().includes(search.toLowerCase());
      const matchCollege = selectedCollege === 'ALL' || p.college === selectedCollege;
      return matchSearch && matchCollege;
    });
  }, [participants, search, selectedCollege]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-extrabold text-[#0a192f] flex items-center gap-2">
            <Users className="w-6 h-6 text-sky-600" />
            Contestant Directory
          </h1>
          <p className="text-xs text-slate-500">
            Registered collegiate competitors, team affiliations, and performance profiles.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-medium text-slate-600">
          <span className="bg-white border border-slate-200 px-3 py-1.5 rounded-lg shadow-2xs font-mono">
            {participants.length} Contestants Total
          </span>
        </div>
      </div>

      {/* College Breakdown Pills */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {colleges.map((col) => {
          const count = participants.filter((p) => p.college === col).length;
          const isSelected = selectedCollege === col;

          return (
            <button
              key={col}
              onClick={() => setSelectedCollege(isSelected ? 'ALL' : col)}
              className={`p-3 rounded-xl border text-left transition-all ${
                isSelected
                  ? 'bg-sky-50 border-sky-400 ring-2 ring-sky-200'
                  : 'bg-white border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="text-[11px] font-semibold text-slate-500 truncate mb-1">
                {col}
              </div>
              <div className="flex items-baseline justify-between">
                <span className="font-mono font-bold text-sm text-[#0a192f]">
                  {count} {count === 1 ? 'student' : 'students'}
                </span>
                {isSelected && (
                  <span className="text-[10px] text-sky-700 font-bold">Active</span>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by participant name, username, or college..."
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs md:text-sm text-slate-800 focus:outline-none focus:border-sky-500 focus:bg-white"
          />
        </div>

        <select
          value={selectedCollege}
          onChange={(e) => setSelectedCollege(e.target.value)}
          className="bg-slate-50 border border-slate-200 rounded-lg py-2 px-3 text-xs text-slate-700 focus:outline-none focus:border-sky-500 w-full sm:w-auto"
        >
          <option value="ALL">All Colleges ({participants.length})</option>
          {colleges.map((col) => (
            <option key={col} value={col}>
              {col}
            </option>
          ))}
        </select>
      </div>

      {/* Participants Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filtered.map((p) => {
          const isCurrentUser = p.id === currentUserId || p.isCurrentUser;
          return (
            <div
              key={p.id}
              onClick={() => onSelectParticipant(p)}
              className={`bg-white rounded-xl border p-4 cursor-pointer hover:shadow-md transition-all group flex flex-col justify-between ${
                isCurrentUser
                  ? 'border-sky-400 ring-2 ring-sky-100'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <div>
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-800 text-white flex items-center justify-center font-mono font-bold text-sm shadow-xs">
                      {p.avatar || p.name.substring(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 group-hover:text-sky-600 transition-colors text-sm truncate">
                        {p.name}
                      </h3>
                      <p className="text-[11px] font-mono text-slate-400">@{p.username}</p>
                    </div>
                  </div>

                  <span className="font-mono font-bold text-xs bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
                    #{p.rank}
                  </span>
                </div>

                <div className="text-xs text-slate-500 flex items-center gap-1.5 mb-3 truncate">
                  <School className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="truncate">{p.college}</span>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-3 gap-2 py-2 px-2.5 bg-slate-50 rounded-lg text-center text-xs mb-3">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Score</span>
                    <span className="font-mono font-bold text-slate-900">{p.score}</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Solved</span>
                    <span className="font-mono font-bold text-emerald-600">
                      {p.problemsSolved}/{problems.length}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Accuracy</span>
                    <span className="font-mono font-bold text-slate-700">{p.accuracy}%</span>
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span className="font-mono text-[11px]">Penalty: {p.penaltyTime}m</span>
                <span className="text-sky-600 font-semibold flex items-center gap-0.5 group-hover:translate-x-0.5 transition-transform">
                  View Profile <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
