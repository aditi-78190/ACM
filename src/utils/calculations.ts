import {
  Participant,
  Problem,
  Submission,
  ParticipantStats,
  ProblemStats,
  ContestOverview,
  ScoreBucket,
  ProblemScoreResult
} from '../types/contest';

/**
 * Calculates individual participant performance and builds official rankings
 * using the standard ACM/ICPC tie-breaker rules.
 */
export function computeLeaderboard(
  participants: Participant[],
  problems: Problem[],
  submissions: Submission[],
  penaltyPerWrongSubmission: number = 20
): ParticipantStats[] {
  // 1. Calculate per-participant performance
  const participantStats: ParticipantStats[] = participants.map((participant) => {
    const userSubs = submissions.filter((s) => s.participantId === participant.id);
    const totalAttempts = userSubs.length;

    let totalScore = 0;
    let problemsSolvedCount = 0;
    let totalPenalty = 0;
    let acceptedSubmissionsCount = 0;
    let lastAcceptedTime = 0;

    const problemBreakdown: Record<string, ProblemScoreResult> = {};

    problems.forEach((problem) => {
      const pSubs = userSubs
        .filter((s) => s.problemId === problem.id)
        .sort((a, b) => a.timestampMinutes - b.timestampMinutes);

      const acSub = pSubs.find((s) => s.status === 'AC');

      if (acSub) {
        // Count rejected attempts strictly prior to the first AC
        const wrongPriorCount = pSubs.filter(
          (s) => s.status !== 'AC' && s.timestampMinutes < acSub.timestampMinutes
        ).length;

        // ACM Penalty Formula: AC elapsed minutes + (wrongAttempts * penaltyFactor)
        const penalty = acSub.timestampMinutes + wrongPriorCount * penaltyPerWrongSubmission;

        totalScore += problem.points;
        problemsSolvedCount += 1;
        acceptedSubmissionsCount += 1;
        totalPenalty += penalty;

        if (acSub.timestampMinutes > lastAcceptedTime) {
          lastAcceptedTime = acSub.timestampMinutes;
        }

        problemBreakdown[problem.id] = {
          solved: true,
          points: problem.points,
          attempts: pSubs.length,
          wrongBeforeSolve: wrongPriorCount,
          timeMinutes: acSub.timestampMinutes,
          penalty
        };
      } else {
        // Problem not solved: incurs 0 penalty in ICPC rules
        problemBreakdown[problem.id] = {
          solved: false,
          points: 0,
          attempts: pSubs.length,
          wrongBeforeSolve: pSubs.length,
          timeMinutes: null,
          penalty: 0
        };
      }
    });

    const accuracy = totalAttempts > 0
      ? Math.round((acceptedSubmissionsCount / totalAttempts) * 100)
      : 0;

    return {
      ...participant,
      rank: 0, // Assigned below after sorting
      score: totalScore,
      problemsSolved: problemsSolvedCount,
      totalAttempts,
      acceptedCount: acceptedSubmissionsCount,
      accuracy,
      penaltyTime: totalPenalty,
      lastAcceptedTime,
      movement: 0,
      problemBreakdown,
      submissions: userSubs
    };
  });

  // 2. Strict Tie-Breaking Order:
  // - 1st: Higher Total Score
  // - 2nd: Higher Problems Solved
  // - 3rd: Lower Penalty Time
  // - 4th: Earliest Last Accepted Submission
  // - 5th: Name alphabetical
  participantStats.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    if (b.problemsSolved !== a.problemsSolved) return b.problemsSolved - a.problemsSolved;
    if (a.penaltyTime !== b.penaltyTime) return a.penaltyTime - b.penaltyTime;
    if (a.lastAcceptedTime !== b.lastAcceptedTime) return a.lastAcceptedTime - b.lastAcceptedTime;
    return a.name.localeCompare(b.name);
  });

  // 3. Assign Rankings and calculate rank movement vs baseline
  return participantStats.map((item, index) => {
    const rank = index + 1;
    const movement = item.previousRank ? item.previousRank - rank : 0;
    return {
      ...item,
      rank,
      movement
    };
  });
}

/**
 * Computes problem-level analytics across all submissions.
 */
export function computeProblemStats(
  problems: Problem[],
  submissions: Submission[]
): ProblemStats[] {
  return problems.map((problem) => {
    const problemSubs = submissions.filter((s) => s.problemId === problem.id);
    const acceptedSubs = problemSubs.filter((s) => s.status === 'AC');
    const wrongSubs = problemSubs.filter((s) => s.status === 'WA');
    const tleSubs = problemSubs.filter((s) => s.status === 'TLE');
    const rteSubs = problemSubs.filter((s) => s.status === 'RTE' || s.status === 'CE');

    const uniqueSolvers = new Set(acceptedSubs.map((s) => s.participantId)).size;
    const totalAttempts = problemSubs.length;
    const successRate = totalAttempts > 0
      ? Math.round((acceptedSubs.length / totalAttempts) * 100)
      : 0;

    return {
      ...problem,
      totalAttempts,
      acceptedCount: acceptedSubs.length,
      wrongCount: wrongSubs.length,
      tleCount: tleSubs.length,
      rteCount: rteSubs.length,
      uniqueSolvers,
      successRate
    };
  });
}

/**
 * Computes global contest metrics and score distribution buckets.
 */
export function computeContestOverview(
  leaderboard: ParticipantStats[],
  submissions: Submission[]
): ContestOverview {
  const totalParticipants = leaderboard.length;
  const activeParticipants = leaderboard.filter((p) => p.totalAttempts > 0).length;
  const solvers = leaderboard.filter((p) => p.problemsSolved > 0).length;

  const totalSubmissions = submissions.length;
  const accepted = submissions.filter((s) => s.status === 'AC').length;
  const wrongAnswer = submissions.filter((s) => s.status === 'WA').length;
  const tle = submissions.filter((s) => s.status === 'TLE').length;
  const rte = submissions.filter((s) => s.status === 'RTE' || s.status === 'CE').length;

  const bucketsConfig = [
    { label: '0 – 150 pts', min: 0, max: 150 },
    { label: '151 – 350 pts', min: 151, max: 350 },
    { label: '351 – 550 pts', min: 351, max: 550 },
    { label: '551 – 750 pts', min: 551, max: 750 },
    { label: '751+ pts', min: 751, max: 99999 }
  ];

  const scoreBuckets: ScoreBucket[] = bucketsConfig.map((b) => {
    const count = leaderboard.filter((p) => p.score >= b.min && p.score <= b.max).length;
    const percentage = totalParticipants > 0 ? Math.round((count / totalParticipants) * 100) : 0;
    return {
      label: b.label,
      count,
      percentage
    };
  });

  return {
    totalParticipants,
    activeParticipants,
    solvers,
    zeroSolvers: totalParticipants - solvers,
    totalSubmissions,
    accepted,
    wrongAnswer,
    tle,
    rte,
    overallAcceptanceRate: totalSubmissions > 0 ? Math.round((accepted / totalSubmissions) * 100) : 0,
    scoreBuckets
  };
}
