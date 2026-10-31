import React, { useState, useMemo } from 'react';
import { ProblemStats, Problem, ParticipantStats } from '../types/contest';
import {
  FileCode2,
  CheckCircle2,
  XCircle,
  Clock,
  Layers,
  ArrowRight,
  Sparkles,
  Info
} from 'lucide-react';

interface ProblemStatisticsViewProps {
  problemStats: ProblemStats[];
  participants: ParticipantStats[];
  onSelectParticipant: (participant: ParticipantStats) => void;
}

export const ProblemStatisticsView: React.FC<ProblemStatisticsViewProps> = ({
  problemStats,
  participants,
  onSelectParticipant
}) => {
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('ALL');
  const [activeProblemModal, setActiveProblemModal] = useState<ProblemStats | null>(null);

  const filteredProblems = useMemo(() => {
    if (selectedDifficulty === 'ALL') return problemStats;
    return problemStats.filter((p) => p.difficulty === selectedDifficulty);
  }, [problemStats, selectedDifficulty]);

  // Overall metrics
  const totalSubmissions = problemStats.reduce((acc, p) => acc + p.totalAttempts, 0);
  const totalAccepted = problemStats.reduce((acc, p) => acc + p.acceptedCount, 0);
  const avgSuccessRate = totalSubmissions ? Math.round((totalAccepted / totalSubmissions) * 100) : 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-extrabold text-[#0a192f] flex items-center gap-2">
            <FileCode2 className="w-6 h-6 text-sky-600" />
            Problem Performance Analytics
          </h1>
          <p className="text-xs text-slate-500">
            Submission volume, solvers distribution, and success metrics for all {problemStats.length} competitive programming challenges.
          </p>
        </div>

        {/* Difficulty Filter */}
        <div className="flex items-center gap-1.5 p-1 bg-white border border-slate-200 rounded-xl shadow-2xs self-start sm:self-auto">
          {['ALL', 'Easy', 'Medium', 'Hard'].map((diff) => (
            <button
              key={diff}
              onClick={() => setSelectedDifficulty(diff)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                selectedDifficulty === diff
                  ? 'bg-sky-500 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              {diff === 'ALL' ? 'All Difficulties' : diff}
            </button>
          ))}
        </div>
      </div>

      {/* Summary KPI Strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <span className="text-[11px] font-semibold text-slate-500 uppercase block mb-1">
            Total Problems
          </span>
          <span className="text-2xl font-bold font-mono text-[#0a192f]">
            {problemStats.length}
          </span>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <span className="text-[11px] font-semibold text-slate-500 uppercase block mb-1">
            Total Problem Runs
          </span>
          <span className="text-2xl font-bold font-mono text-[#0a192f]">
            {totalSubmissions}
          </span>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <span className="text-[11px] font-semibold text-slate-500 uppercase block mb-1">
            Total Accepted
          </span>
          <span className="text-2xl font-bold font-mono text-emerald-600">
            {totalAccepted}
          </span>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <span className="text-[11px] font-semibold text-slate-500 uppercase block mb-1">
            Overall Pass Rate
          </span>
          <span className="text-2xl font-bold font-mono text-sky-600">
            {avgSuccessRate}%
          </span>
        </div>
      </div>

      {/* Detailed Problems Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredProblems.map((prob) => {
          const diffBadge =
            prob.difficulty === 'Easy'
              ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
              : prob.difficulty === 'Medium'
              ? 'bg-sky-50 text-sky-700 border-sky-200'
              : 'bg-rose-50 text-rose-700 border-rose-200';

          return (
            <div
              key={prob.id}
              className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs hover:border-slate-300 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-xs bg-slate-900 text-white px-2 py-0.5 rounded">
                      {prob.code}
                    </span>
                    <span
                      className={`text-[11px] font-semibold px-2 py-0.5 rounded-full border ${diffBadge}`}
                    >
                      {prob.difficulty}
                    </span>
                  </div>
                  <span className="font-mono font-bold text-slate-800 text-sm">
                    {prob.points} pts
                  </span>
                </div>

                <h3 className="font-bold text-[#0a192f] text-base mb-1.5">
                  {prob.title}
                </h3>
                <p className="text-xs text-slate-500 line-clamp-2 mb-4 leading-relaxed">
                  {prob.description}
                </p>

                {/* Progress Success Rate Bar */}
                <div className="mb-4">
                  <div className="flex justify-between text-xs mb-1 font-mono">
                    <span className="text-slate-500">Success Rate</span>
                    <span className="font-bold text-slate-800">{prob.successRate}%</span>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        prob.difficulty === 'Easy'
                          ? 'bg-emerald-500'
                          : prob.difficulty === 'Medium'
                          ? 'bg-sky-600'
                          : 'bg-rose-500'
                      }`}
                      style={{ width: `${prob.successRate}%` }}
                    />
                  </div>
                </div>

                {/* Submissions & Solvers Matrix */}
                <div className="grid grid-cols-3 gap-2 p-2.5 bg-slate-50 rounded-lg text-center text-xs mb-4">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Solvers</span>
                    <span className="font-mono font-bold text-emerald-600 text-sm">
                      {prob.uniqueSolvers}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Attempts</span>
                    <span className="font-mono font-bold text-slate-700 text-sm">
                      {prob.totalAttempts}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Limits</span>
                    <span className="font-mono font-semibold text-slate-600 text-[11px] block mt-0.5">
                      {prob.timeLimit}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action to view problem statement and solvers */}
              <button
                onClick={() => setActiveProblemModal(prob)}
                className="w-full flex items-center justify-center gap-1.5 py-2 text-xs font-semibold text-sky-700 bg-sky-50/70 hover:bg-sky-100/80 rounded-lg border border-sky-100 transition-colors"
              >
                <span>View Task Statement & Solvers</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          );
        })}
      </div>

      {/* Problem Details Modal */}
      {activeProblemModal && (
        <div
          className="fixed inset-0 z-50 bg-[#0a192f]/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto"
          onClick={() => setActiveProblemModal(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 p-6 space-y-5"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between border-b border-slate-100 pb-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-mono font-bold text-xs bg-slate-900 text-white px-2 py-0.5 rounded">
                    {activeProblemModal.code}
                  </span>
                  <span className="text-xs font-semibold text-sky-700 bg-sky-50 border border-sky-200 px-2.5 py-0.5 rounded-full">
                    {activeProblemModal.difficulty} · {activeProblemModal.points} pts
                  </span>
                </div>
                <h2 className="text-lg font-bold text-[#0a192f]">
                  {activeProblemModal.title}
                </h2>
              </div>
              <button
                onClick={() => setActiveProblemModal(null)}
                className="text-slate-400 hover:text-slate-600 text-lg p-1"
              >
                ✕
              </button>
            </div>

            {/* Description */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                Problem Statement
              </h4>
              <p className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                {activeProblemModal.description}
              </p>
            </div>

            {/* Constraints */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="font-semibold text-slate-700 block mb-0.5">Time Limit</span>
                <span className="font-mono text-slate-600">{activeProblemModal.timeLimit}</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="font-semibold text-slate-700 block mb-0.5">Memory Limit</span>
                <span className="font-mono text-slate-600">{activeProblemModal.memoryLimit}</span>
              </div>
            </div>

            {/* Input & Output Specifications */}
            {activeProblemModal.inputSpec && (
              <div className="space-y-3 text-xs">
                <div>
                  <h4 className="font-bold text-slate-700 mb-1">Input Format</h4>
                  <p className="text-slate-600 bg-slate-50 p-2.5 rounded-lg border border-slate-100 font-mono text-[11px]">
                    {activeProblemModal.inputSpec}
                  </p>
                </div>
                <div>
                  <h4 className="font-bold text-slate-700 mb-1">Output Format</h4>
                  <p className="text-slate-600 bg-slate-50 p-2.5 rounded-lg border border-slate-100 font-mono text-[11px]">
                    {activeProblemModal.outputSpec}
                  </p>
                </div>
              </div>
            )}

            {/* Solvers List */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 flex items-center justify-between">
                <span>Successful Solvers ({activeProblemModal.uniqueSolvers})</span>
                <span className="text-[11px] font-mono text-emerald-600 font-semibold">
                  {activeProblemModal.successRate}% Success
                </span>
              </h4>

              <div className="max-h-40 overflow-y-auto divide-y divide-slate-100 border border-slate-200 rounded-xl">
                {participants
                  .filter((p) => p.problemBreakdown[activeProblemModal.id]?.solved)
                  .map((p) => (
                    <div
                      key={p.id}
                      onClick={() => {
                        setActiveProblemModal(null);
                        onSelectParticipant(p);
                      }}
                      className="p-2.5 flex items-center justify-between hover:bg-slate-50 cursor-pointer text-xs transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-slate-400 font-semibold">#{p.rank}</span>
                        <span className="font-semibold text-slate-900 hover:text-sky-600">
                          {p.name}
                        </span>
                        <span className="text-slate-400">· {p.college}</span>
                      </div>
                      <span className="font-mono text-emerald-700 text-[11px] font-semibold">
                        +{p.problemBreakdown[activeProblemModal.id].timeMinutes}m
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
