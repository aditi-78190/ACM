import React, { useState, useMemo } from 'react';
import { ParticipantStats, Problem } from '../types/contest';
import { FilterPanel } from './FilterPanel';
import { LeaderboardTable } from './LeaderboardTable';
import { filterAndSortLeaderboard, exportLeaderboardToCSV, FilterOptions } from '../utils/filters';
import { Trophy, Info, ChevronLeft, ChevronRight } from 'lucide-react';

interface LeaderboardProps {
  leaderboardData: ParticipantStats[];
  problems: Problem[];
  onSelectParticipant: (participant: ParticipantStats) => void;
  currentUserId?: string;
}

export const Leaderboard: React.FC<LeaderboardProps> = ({
  leaderboardData,
  problems,
  onSelectParticipant,
  currentUserId
}) => {
  const [filters, setFilters] = useState<FilterOptions>({
    searchQuery: '',
    college: 'ALL',
    minProblems: 'ALL',
    scoreRange: 'ALL',
    rankRange: 'ALL',
    sortBy: 'RANK_ASC'
  });

  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageSize = 10;

  // Extract colleges dynamically
  const colleges = useMemo(() => {
    return Array.from(new Set(leaderboardData.map((p) => p.college))).sort();
  }, [leaderboardData]);

  // Apply Search, Filter, Sort
  const filteredData = useMemo(() => {
    return filterAndSortLeaderboard(leaderboardData, filters);
  }, [leaderboardData, filters]);

  // Reset to page 1 on filter changes
  const handleFilterChange = (newFilters: FilterOptions) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  const handleReset = () => {
    setFilters({
      searchQuery: '',
      college: 'ALL',
      minProblems: 'ALL',
      scoreRange: 'ALL',
      rankRange: 'ALL',
      sortBy: 'RANK_ASC'
    });
    setCurrentPage(1);
  };

  const handleExport = () => {
    exportLeaderboardToCSV(filteredData, 'ACM_Contest_Official_Standings.csv');
  };

  // Pagination calculation
  const totalPages = Math.ceil(filteredData.length / pageSize) || 1;
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredData.slice(start, start + pageSize);
  }, [filteredData, currentPage]);

  return (
    <div className="space-y-4">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-1">
        <div>
          <h1 className="text-xl md:text-2xl font-extrabold text-[#0a192f] flex items-center gap-2">
            <Trophy className="w-6 h-6 text-sky-600" />
            Official Contest Leaderboard
          </h1>
          <p className="text-xs text-slate-500">
            Real-time standings ranked by solved problem score, count, and ICPC cumulative penalty time.
          </p>
        </div>

        {/* Tie-Breaker Info Pill */}
        <div className="flex items-center gap-1.5 text-xs text-slate-600 bg-white border border-slate-200 px-3 py-1.5 rounded-lg shadow-2xs">
          <Info className="w-3.5 h-3.5 text-sky-600 shrink-0" />
          <span>Tie-break: Score → AC count → Penalty time</span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <FilterPanel
        filters={filters}
        onFilterChange={handleFilterChange}
        onReset={handleReset}
        onExportCSV={handleExport}
        colleges={colleges}
        totalCount={leaderboardData.length}
        filteredCount={filteredData.length}
      />

      {/* Main Responsive Table */}
      <LeaderboardTable
        participants={paginatedData}
        problems={problems}
        onSelectParticipant={onSelectParticipant}
        currentUserId={currentUserId}
      />

      {/* Pagination Controls */}
      {filteredData.length > pageSize && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs text-xs text-slate-600">
          <div>
            Showing <span className="font-mono font-semibold text-slate-900">{(currentPage - 1) * pageSize + 1}</span> to{' '}
            <span className="font-mono font-semibold text-slate-900">{Math.min(currentPage * pageSize, filteredData.length)}</span> of{' '}
            <span className="font-mono font-semibold text-slate-900">{filteredData.length}</span> contestants
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="flex items-center gap-1 px-3 py-1.5 rounded-md border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed font-medium transition-colors"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span>Previous</span>
            </button>

            <span className="px-2 font-mono font-semibold text-slate-800">
              Page {currentPage} of {totalPages}
            </span>

            <button
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="flex items-center gap-1 px-3 py-1.5 rounded-md border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed font-medium transition-colors"
            >
              <span>Next</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
