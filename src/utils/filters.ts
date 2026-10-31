import { ParticipantStats } from '../types/contest';

export type SortOption =
  | 'RANK_ASC'
  | 'SCORE_DESC'
  | 'SCORE_ASC'
  | 'PROBLEMS_DESC'
  | 'ACCURACY_DESC'
  | 'PENALTY_ASC';

export interface FilterOptions {
  searchQuery: string;
  college: string;
  minProblems: string;
  scoreRange: string;
  rankRange: string;
  sortBy: SortOption;
}

export function filterAndSortLeaderboard(
  leaderboard: ParticipantStats[],
  filters: FilterOptions
): ParticipantStats[] {
  let result = [...leaderboard];

  // 1. Text Search (Matches Name, Handle, or College)
  if (filters.searchQuery.trim()) {
    const q = filters.searchQuery.toLowerCase().trim();
    result = result.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.username.toLowerCase().includes(q) ||
        p.college.toLowerCase().includes(q)
    );
  }

  // 2. Filter by College
  if (filters.college && filters.college !== 'ALL') {
    result = result.filter((p) => p.college === filters.college);
  }

  // 3. Filter by Problems Solved
  if (filters.minProblems && filters.minProblems !== 'ALL') {
    const min = parseInt(filters.minProblems, 10);
    result = result.filter((p) => p.problemsSolved >= min);
  }

  // 4. Filter by Score Range
  if (filters.scoreRange && filters.scoreRange !== 'ALL') {
    const [minStr, maxStr] = filters.scoreRange.split('-');
    const min = parseInt(minStr, 10);
    const max = maxStr ? parseInt(maxStr, 10) : Infinity;
    result = result.filter((p) => p.score >= min && (isNaN(max) || p.score <= max));
  }

  // 5. Filter by Rank Range
  if (filters.rankRange && filters.rankRange !== 'ALL') {
    const [minStr, maxStr] = filters.rankRange.split('-');
    const min = parseInt(minStr, 10);
    const max = maxStr ? parseInt(maxStr, 10) : Infinity;
    result = result.filter((p) => p.rank >= min && (isNaN(max) || p.rank <= max));
  }

  // 6. Sorting
  result.sort((a, b) => {
    switch (filters.sortBy) {
      case 'SCORE_DESC':
        return b.score - a.score || a.penaltyTime - b.penaltyTime;
      case 'SCORE_ASC':
        return a.score - b.score || b.penaltyTime - a.penaltyTime;
      case 'PROBLEMS_DESC':
        return b.problemsSolved - a.problemsSolved || b.score - a.score || a.penaltyTime - b.penaltyTime;
      case 'ACCURACY_DESC':
        return b.accuracy - a.accuracy || b.score - a.score;
      case 'PENALTY_ASC':
        return a.penaltyTime - b.penaltyTime || b.score - a.score;
      case 'RANK_ASC':
      default:
        return a.rank - b.rank;
    }
  });

  return result;
}

/**
 * Generates and downloads a CSV export of the current filtered leaderboard.
 */
export function exportLeaderboardToCSV(data: ParticipantStats[], filename: string = 'acm_leaderboard.csv') {
  const headers = ['Rank', 'Name', 'Username', 'College', 'Score', 'Problems Solved', 'Total Attempts', 'Accuracy (%)', 'Penalty (min)', 'Last AC (min)'];
  const rows = data.map((p) => [
    p.rank,
    `"${p.name.replace(/"/g, '""')}"`,
    `"${p.username}"`,
    `"${p.college.replace(/"/g, '""')}"`,
    p.score,
    p.problemsSolved,
    p.totalAttempts,
    `${p.accuracy}%`,
    p.penaltyTime,
    p.lastAcceptedTime > 0 ? p.lastAcceptedTime : 'N/A'
  ]);

  const csvContent = [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
