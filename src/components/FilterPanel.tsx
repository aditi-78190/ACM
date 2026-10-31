import React from 'react';
import { FilterOptions, SortOption } from '../utils/filters';
import { Search, RotateCcw, Download, Filter, SlidersHorizontal } from 'lucide-react';

interface FilterPanelProps {
  filters: FilterOptions;
  onFilterChange: (newFilters: FilterOptions) => void;
  onReset: () => void;
  onExportCSV: () => void;
  colleges: string[];
  totalCount: number;
  filteredCount: number;
}

export const FilterPanel: React.FC<FilterPanelProps> = ({
  filters,
  onFilterChange,
  onReset,
  onExportCSV,
  colleges,
  totalCount,
  filteredCount
}) => {
  const handleChange = (key: keyof FilterOptions, value: any) => {
    onFilterChange({
      ...filters,
      [key]: value
    });
  };

  const isFiltered =
    filters.searchQuery !== '' ||
    filters.college !== 'ALL' ||
    filters.minProblems !== 'ALL' ||
    filters.scoreRange !== 'ALL' ||
    filters.rankRange !== 'ALL' ||
    filters.sortBy !== 'RANK_ASC';

  return (
    <div className="bg-white p-4 md:p-5 rounded-xl border border-slate-200 shadow-xs mb-5">
      {/* Search and Main Actions */}
      <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between mb-4">
        {/* Search Bar */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={filters.searchQuery}
            onChange={(e) => handleChange('searchQuery', e.target.value)}
            placeholder="Search by contestant name, handle (@username), or college..."
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs md:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:bg-white transition-all"
          />
          {filters.searchQuery && (
            <button
              onClick={() => handleChange('searchQuery', '')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
            >
              ✕
            </button>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          {isFiltered && (
            <button
              onClick={onReset}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-rose-700 bg-rose-50 border border-rose-200 rounded-lg hover:bg-rose-100 transition-colors"
              title="Reset all search queries and filters to defaults"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          )}

          <button
            onClick={onExportCSV}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-lg transition-colors"
            title="Download leaderboard as CSV spreadsheet"
          >
            <Download className="w-3.5 h-3.5 text-slate-600" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Multi-Filter Dropdowns */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 pt-3 border-t border-slate-100 text-xs">
        {/* College Filter */}
        <div>
          <label className="block text-[11px] font-semibold text-slate-500 mb-1">
            Institution
          </label>
          <select
            value={filters.college}
            onChange={(e) => handleChange('college', e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-md py-1.5 px-2.5 text-slate-700 focus:outline-none focus:border-sky-500 truncate"
          >
            <option value="ALL">All Institutions</option>
            {colleges.map((col) => (
              <option key={col} value={col}>
                {col}
              </option>
            ))}
          </select>
        </div>

        {/* Problems Solved Filter */}
        <div>
          <label className="block text-[11px] font-semibold text-slate-500 mb-1">
            Problems Solved
          </label>
          <select
            value={filters.minProblems}
            onChange={(e) => handleChange('minProblems', e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-md py-1.5 px-2.5 text-slate-700 focus:outline-none focus:border-sky-500"
          >
            <option value="ALL">Any Solved Count</option>
            <option value="1">At least 1 solved</option>
            <option value="3">At least 3 solved</option>
            <option value="5">At least 5 solved</option>
          </select>
        </div>

        {/* Score Range Filter */}
        <div>
          <label className="block text-[11px] font-semibold text-slate-500 mb-1">
            Score Tier
          </label>
          <select
            value={filters.scoreRange}
            onChange={(e) => handleChange('scoreRange', e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-md py-1.5 px-2.5 text-slate-700 focus:outline-none focus:border-sky-500"
          >
            <option value="ALL">All Score Tiers</option>
            <option value="500-1000">500+ points</option>
            <option value="250-499">250 – 499 points</option>
            <option value="0-249">0 – 249 points</option>
          </select>
        </div>

        {/* Rank Range Filter */}
        <div>
          <label className="block text-[11px] font-semibold text-slate-500 mb-1">
            Rank Range
          </label>
          <select
            value={filters.rankRange}
            onChange={(e) => handleChange('rankRange', e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-md py-1.5 px-2.5 text-slate-700 focus:outline-none focus:border-sky-500"
          >
            <option value="ALL">All Ranks (1 – 20)</option>
            <option value="1-3">Top 3 Podium</option>
            <option value="1-10">Top 10 Ranks</option>
            <option value="11-20">Ranks 11 – 20</option>
          </select>
        </div>

        {/* Sort By */}
        <div className="col-span-2 sm:col-span-1">
          <label className="block text-[11px] font-semibold text-slate-500 mb-1">
            Sort Priority
          </label>
          <select
            value={filters.sortBy}
            onChange={(e) => handleChange('sortBy', e.target.value as SortOption)}
            className="w-full bg-slate-50 border border-slate-200 rounded-md py-1.5 px-2.5 text-slate-700 focus:outline-none focus:border-sky-500 font-medium"
          >
            <option value="RANK_ASC">Official Rank (Tie-break)</option>
            <option value="SCORE_DESC">Score: Highest First</option>
            <option value="SCORE_ASC">Score: Lowest First</option>
            <option value="PROBLEMS_DESC">Most Solved</option>
            <option value="ACCURACY_DESC">Best Accuracy</option>
            <option value="PENALTY_ASC">Lowest Penalty</option>
          </select>
        </div>
      </div>

      {/* Results Count Bar */}
      <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
        <div className="flex items-center gap-2">
          <span className="font-medium">
            Showing <strong className="text-slate-900 font-mono">{filteredCount}</strong> of{' '}
            <span className="font-mono">{totalCount}</span> participants
          </span>
          {isFiltered && (
            <span className="text-[11px] bg-sky-50 text-sky-700 font-semibold px-2 py-0.5 rounded-full">
              Filter Active
            </span>
          )}
        </div>
        <span className="text-[11px] text-slate-400">Click any row to inspect participant dossier</span>
      </div>
    </div>
  );
};
