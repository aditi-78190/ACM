import React, { useState } from 'react';
import { Contest } from '../types/contest';
import { Info, Clock, Calendar, CheckSquare, Scale, ShieldAlert, Award, FileText } from 'lucide-react';

interface ContestDetailsViewProps {
  contest: Contest;
}

export const ContestDetailsView: React.FC<ContestDetailsViewProps> = ({ contest }) => {
  return (
    <div className="space-y-6">
      {/* Contest Title & Info Card */}
      <div className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-sky-50 text-sky-700 border border-sky-200 text-xs font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                {contest.status}
              </span>
              <span className="text-xs text-slate-500 font-mono">
                Identifier: {contest.id}
              </span>
            </div>
            <h1 className="text-2xl font-extrabold text-[#0a192f] tracking-tight">
              {contest.title}
            </h1>
            <p className="text-sm text-slate-600 mt-1">{contest.subtitle}</p>
          </div>

          <div className="text-left md:text-right shrink-0">
            <span className="text-xs font-semibold text-slate-500 block uppercase tracking-wider">
              Hosted By
            </span>
            <span className="text-sm font-bold text-[#0a192f] block mt-0.5">
              {contest.chapter}
            </span>
          </div>
        </div>

        {/* Schedule & Operational Parameters */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-6">
          <div className="flex items-start gap-3 p-3.5 bg-slate-50 rounded-xl border border-slate-200">
            <Clock className="w-5 h-5 text-sky-600 shrink-0 mt-0.5" />
            <div>
              <span className="text-xs font-semibold text-slate-500 block">Total Duration</span>
              <span className="text-sm font-bold text-slate-900 font-mono">
                {contest.durationMinutes} Minutes (5h 00m)
              </span>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3.5 bg-slate-50 rounded-xl border border-slate-200">
            <Calendar className="w-5 h-5 text-sky-600 shrink-0 mt-0.5" />
            <div>
              <span className="text-xs font-semibold text-slate-500 block">Schedule Window</span>
              <span className="text-sm font-bold text-slate-900 font-mono">
                {contest.startTime} – {contest.endTime}
              </span>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3.5 bg-slate-50 rounded-xl border border-slate-200">
            <Scale className="w-5 h-5 text-sky-600 shrink-0 mt-0.5" />
            <div>
              <span className="text-xs font-semibold text-slate-500 block">Penalty Rate</span>
              <span className="text-sm font-bold text-slate-900 font-mono">
                +{contest.penaltyPerWrongSubmission} min / rejected run
              </span>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3.5 bg-slate-50 rounded-xl border border-slate-200">
            <ShieldAlert className="w-5 h-5 text-sky-600 shrink-0 mt-0.5" />
            <div>
              <span className="text-xs font-semibold text-slate-500 block">Scoreboard Freeze</span>
              <span className="text-sm font-bold text-slate-900 font-mono">
                Last 60 Minutes
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Rules and Scoring Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Rules & Guidelines */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <CheckSquare className="w-5 h-5 text-sky-600" />
            <h2 className="text-base font-bold text-[#0a192f]">
              Contest Rules & Submission Guidelines
            </h2>
          </div>

          <ul className="space-y-3 text-xs text-slate-600 leading-relaxed">
            {contest.rules.map((rule, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-sky-50 text-sky-700 font-mono font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <span>{rule}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Tie-Breaking Logic & Methodology */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <Scale className="w-5 h-5 text-sky-600" />
            <h2 className="text-base font-bold text-[#0a192f]">
              Official Tie-Breaking Hierarchy
            </h2>
          </div>

          <div className="space-y-3 text-xs text-slate-600">
            <p className="leading-relaxed">
              In accordance with international collegiate programming contest standards, ranking parity is resolved through an unambiguous deterministic priority sequence:
            </p>

            <div className="space-y-2 pt-1">
              {contest.tieBreakers.map((tb, idx) => (
                <div
                  key={idx}
                  className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 font-medium text-slate-800 flex items-center gap-2"
                >
                  <Award className="w-4 h-4 text-sky-600 shrink-0" />
                  <span>{tb}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Technical Environment & Execution Limits */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
          <FileText className="w-5 h-5 text-sky-600" />
          <h2 className="text-base font-bold text-[#0a192f]">
            Judge Platform & Sandboxed Compiler Specifications
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
            <span className="font-bold text-slate-800 block mb-1">C++ Compiler</span>
            <span className="text-slate-600">GCC 13.2 / Clang 17 (-O3, -std=c++20)</span>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
            <span className="font-bold text-slate-800 block mb-1">Java Runtime</span>
            <span className="text-slate-600">OpenJDK 17 LTS (HotSpot 64-bit VM)</span>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
            <span className="font-bold text-slate-800 block mb-1">Python Runtime</span>
            <span className="text-slate-600">CPython 3.11.8 with PyPy3 fallback option</span>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
            <span className="font-bold text-slate-800 block mb-1">Honor Code</span>
            <span className="text-slate-600">MOSS source code similarity cross-verification enabled</span>
          </div>
        </div>
      </div>
    </div>
  );
};
