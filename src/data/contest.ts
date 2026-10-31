import { Contest } from '../types/contest';

export const initialContestData: Contest = {
  id: "acm-winter-codesprint-2026",
  title: "ACM Collegiate Winter CodeSprint 2026",
  subtitle: "Official ACM Student Chapter Interschool Invitational Contest",
  chapter: "ACM Student Chapter · North Region Section",
  status: "LIVE / OFFICIAL",
  startTime: "10:00 AM UTC",
  endTime: "03:00 PM UTC",
  durationMinutes: 300, // 5 hours
  penaltyPerWrongSubmission: 20, // 20 minutes per rejected submission on solved tasks
  rules: [
    "Contest duration is strictly 300 minutes (5 hours) under official ICPC standard guidelines.",
    "Allowed programming languages: C++20, Java 17, Python 3.11, C99.",
    "Submissions are evaluated on hidden test suites with strict time (1.0s - 2.0s) and memory (256MB - 512MB) bounds.",
    "A task is marked Solved (AC) upon passing all public and private evaluation vectors.",
    "Tie-breaking rule: Higher Score > Higher Problems Solved > Lower Total Penalty Minutes > Earliest Last AC time.",
    "Leaderboard will freeze during the final 60 minutes for the closing ceremony reveal."
  ],
  tieBreakers: [
    "1. Total Accumulated Score (points per problem tier).",
    "2. Number of Accepted Problems (AC count).",
    "3. Total Penalty Minutes (elapsed minutes from start + 20 min per pre-AC rejected trial).",
    "4. Timestamp of the earliest last accepted problem.",
    "5. Alphabetical order of registered handles."
  ],
  notifications: [
    {
      id: "notif-1",
      title: "Problem P4 (Lexicographical Matrix): Obstacle corner case clarification updated.",
      time: "12m ago",
      type: "clarification",
      read: false
    },
    {
      id: "notif-2",
      title: "New High Score! Aarav Sharma leads with 6 problems completed.",
      time: "28m ago",
      type: "verdict",
      read: false
    },
    {
      id: "notif-3",
      title: "Notice: System test queue latency is normal (< 850ms).",
      time: "45m ago",
      type: "announcement",
      read: true
    },
    {
      id: "notif-4",
      title: "Freeze countdown: Final 60-minute scoreboard freeze activates at 02:00 PM UTC.",
      time: "1h ago",
      type: "announcement",
      read: true
    }
  ]
};
