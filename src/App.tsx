import React, { useState, useMemo, useEffect } from 'react';
import { initialContestData } from './data/contest';
import { problemsData } from './data/problems';
import { participantsData } from './data/participants';
import { initialSubmissionsData } from './data/submissions';
import {
  computeLeaderboard,
  computeProblemStats,
  computeContestOverview
} from './utils/calculations';
import { Submission, ParticipantStats } from './types/contest';

import { Navbar } from './components/Navbar';
import { Sidebar, NavTab } from './components/Sidebar';
import { Overview } from './components/Overview';
import { Leaderboard } from './components/Leaderboard';
import { ParticipantsView } from './components/ParticipantsView';
import { ProblemStatisticsView } from './components/ProblemStatisticsView';
import { ContestDetailsView } from './components/ContestDetailsView';
import { AboutACMView } from './components/AboutACMView';
import { ParticipantDetails } from './components/ParticipantDetails';
import { CheckCircle2, Sparkles, X } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<NavTab>('overview');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState<boolean>(false);

  // Data state
  const [submissions, setSubmissions] = useState<Submission[]>(initialSubmissionsData);
  const [participants, setParticipants] = useState(participantsData);
  const [currentUserId, setCurrentUserId] = useState<string>('usr_03'); // Devansh Patel
  const [selectedParticipant, setSelectedParticipant] = useState<ParticipantStats | null>(null);

  // Search & interaction state
  const [navbarSearch, setNavbarSearch] = useState<string>('');
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<{ title: string; subtitle: string } | null>(null);

  // Clear toast after 4s
  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => setToastMessage(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  // Reactive ICPC Computation
  const leaderboard = useMemo(() => {
    return computeLeaderboard(
      participants,
      problemsData,
      submissions,
      initialContestData.penaltyPerWrongSubmission
    );
  }, [participants, submissions]);

  const problemStats = useMemo(() => {
    return computeProblemStats(problemsData, submissions);
  }, [submissions]);

  const overview = useMemo(() => {
    return computeContestOverview(leaderboard, submissions);
  }, [leaderboard, submissions]);

  const topThree = useMemo(() => {
    return leaderboard.slice(0, 3);
  }, [leaderboard]);

  const currentUser = useMemo(() => {
    return leaderboard.find((p) => p.id === currentUserId) || leaderboard[0] || null;
  }, [leaderboard, currentUserId]);

  // Keep selectedParticipant up to date if open during live state updates
  useEffect(() => {
    if (selectedParticipant) {
      const updated = leaderboard.find((p) => p.id === selectedParticipant.id);
      if (updated) setSelectedParticipant(updated);
    }
  }, [leaderboard]);

  // Live Submission Simulation
  const handleSimulateSubmission = () => {
    // Pick a candidate submission that causes an interesting scoreboard shift
    const candidates = [
      {
        participantId: 'usr_02', // Sophia Zhang
        participantName: 'Sophia Zhang',
        problemId: 'P6',
        status: 'AC' as const,
        language: 'C++20',
        message: 'Sophia Zhang just solved P6 (Quantum Bit Flip Queries) for +250 pts!'
      },
      {
        participantId: 'usr_03', // Devansh Patel
        participantName: 'Devansh Patel',
        problemId: 'P6',
        status: 'AC' as const,
        language: 'Java 17',
        message: 'Devansh Patel achieved AC on P6! Score jumps by +250 pts!'
      },
      {
        participantId: 'usr_04', // Elena Rostova
        participantName: 'Elena Rostova',
        problemId: 'P5',
        status: 'AC' as const,
        language: 'C++20',
        message: 'Elena Rostova cleared P5 (Hyper-Dimensional Knapsack) for +200 pts!'
      },
      {
        participantId: 'usr_07', // Lucas Vance
        participantName: 'Lucas Vance',
        problemId: 'P4',
        status: 'AC' as const,
        language: 'C++20',
        message: 'Lucas Vance solved P4 (Matrix Paths)! Standings updated.'
      }
    ];

    // Pick random candidate or next unsolved
    const selected = candidates[Math.floor(Math.random() * candidates.length)];
    const newSub: Submission = {
      id: `sub_sim_${Date.now()}`,
      participantId: selected.participantId,
      problemId: selected.problemId,
      status: selected.status,
      timestampMinutes: Math.floor(Math.random() * 20) + 270,
      language: selected.language,
      executionTimeMs: Math.floor(Math.random() * 400) + 100,
      memoryKb: 24000
    };

    setSubmissions((prev) => [newSub, ...prev]);
    setToastMessage({
      title: 'Real-time Verdict Injected',
      subtitle: selected.message
    });
  };

  const handleRefreshData = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      setToastMessage({
        title: 'Standings Synchronized',
        subtitle: 'All submission evaluations, tie-breaks, and penalty times are up to date.'
      });
    }, 600);
  };

  const handleGlobalSearch = (query: string) => {
    setNavbarSearch(query);
    if (query.trim() && activeTab !== 'leaderboard') {
      setActiveTab('leaderboard');
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex">
      {/* Sidebar Navigation */}
      <Sidebar
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed((prev) => !prev)}
        isMobileOpen={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
      />

      {/* Main Layout Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top App Bar */}
        <Navbar
          contestName={initialContestData.title}
          notifications={initialContestData.notifications}
          onToggleMobileSidebar={() => setIsMobileSidebarOpen(true)}
          onRefreshData={handleRefreshData}
          isRefreshing={isRefreshing}
          currentUser={currentUser}
          onSelectParticipant={setSelectedParticipant}
          onSearchGlobal={handleGlobalSearch}
          searchQuery={navbarSearch}
        />

        {/* Page Content Viewport */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {activeTab === 'overview' && (
            <Overview
              contest={initialContestData}
              overview={overview}
              topThree={topThree}
              problemStats={problemStats}
              submissions={submissions}
              problems={problemsData}
              participants={leaderboard}
              onSelectParticipant={setSelectedParticipant}
              onNavigateLeaderboard={() => setActiveTab('leaderboard')}
              onSimulateSubmission={handleSimulateSubmission}
            />
          )}

          {activeTab === 'leaderboard' && (
            <Leaderboard
              leaderboardData={leaderboard}
              problems={problemsData}
              onSelectParticipant={setSelectedParticipant}
              currentUserId={currentUserId}
            />
          )}

          {activeTab === 'participants' && (
            <ParticipantsView
              participants={leaderboard}
              problems={problemsData}
              onSelectParticipant={setSelectedParticipant}
              currentUserId={currentUserId}
            />
          )}

          {activeTab === 'problems' && (
            <ProblemStatisticsView
              problemStats={problemStats}
              participants={leaderboard}
              onSelectParticipant={setSelectedParticipant}
            />
          )}

          {activeTab === 'contest' && (
            <ContestDetailsView contest={initialContestData} />
          )}

          {activeTab === 'about' && <AboutACMView />}
        </main>

        {/* Global Footer */}
        <footer className="border-t border-slate-200 bg-white py-4 px-6 text-center text-xs text-slate-500">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 max-w-7xl mx-auto">
            <span>
              Official Leaderboard Engine · {initialContestData.chapter}
            </span>
            <span className="font-mono text-slate-400">
              ICPC Scoring System · Build 2026.1
            </span>
          </div>
        </footer>
      </div>

      {/* Participant Profile Modal */}
      {selectedParticipant && (
        <ParticipantDetails
          participant={selectedParticipant}
          problems={problemsData}
          onClose={() => setSelectedParticipant(null)}
          onToggleCurrentUser={(id) => setCurrentUserId(id)}
          isCurrentUser={selectedParticipant.id === currentUserId}
        />
      )}

      {/* Live Toast Notice */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 bg-[#0a192f] text-white p-4 rounded-xl shadow-xl border border-sky-500/40 max-w-md animate-in slide-in-from-bottom-3 flex items-start gap-3">
          <Sparkles className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" />
          <div className="flex-1 pr-2">
            <h4 className="text-xs font-bold text-white mb-0.5">
              {toastMessage.title}
            </h4>
            <p className="text-xs text-slate-300 leading-snug">
              {toastMessage.subtitle}
            </p>
          </div>
          <button
            onClick={() => setToastMessage(null)}
            className="text-slate-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}
