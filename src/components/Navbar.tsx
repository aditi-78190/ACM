import React, { useState } from 'react';
import {
  Menu,
  Bell,
  Search,
  RefreshCw,
  UserCheck,
  CheckCircle2,
  Clock,
  Sparkles,
  ExternalLink,
  Download
} from 'lucide-react';
import { ContestNotification, ParticipantStats } from '../types/contest';

interface NavbarProps {
  contestName: string;
  notifications: ContestNotification[];
  onToggleMobileSidebar: () => void;
  onRefreshData: () => void;
  isRefreshing: boolean;
  currentUser: ParticipantStats | null;
  onSelectParticipant?: (p: ParticipantStats) => void;
  onSearchGlobal: (query: string) => void;
  searchQuery: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  contestName,
  notifications,
  onToggleMobileSidebar,
  onRefreshData,
  isRefreshing,
  currentUser,
  onSelectParticipant,
  onSearchGlobal,
  searchQuery
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [unreadCount, setUnreadCount] = useState(
    notifications.filter((n) => !n.read).length
  );

  const handleMarkAllRead = () => {
    setUnreadCount(0);
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 h-16 px-4 md:px-8 flex items-center justify-between shadow-2xs">
      {/* Left zone: Mobile toggle + Contest title & Live tag */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleMobileSidebar}
          className="md:hidden p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
          aria-label="Toggle mobile menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2.5">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-sky-50 text-sky-700 border border-sky-200 font-mono tracking-wide">
            <span className="w-2 h-2 rounded-full bg-sky-500 animate-pulse" />
            LIVE
          </span>
          <span className="font-bold text-sm md:text-base text-[#0a192f] truncate max-w-[200px] sm:max-w-xs md:max-w-md">
            {contestName}
          </span>
        </div>
      </div>

      {/* Right zone: Global search, Refresh, Notifications, User Profile */}
      <div className="flex items-center gap-2 md:gap-3">
        {/* Quick Search Input */}
        <div className="relative hidden sm:block w-48 lg:w-64">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchGlobal(e.target.value)}
            placeholder="Quick search..."
            className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:bg-white transition-all"
          />
        </div>

        {/* Refresh Standings Button */}
        <button
          onClick={onRefreshData}
          disabled={isRefreshing}
          className="p-2 text-slate-600 hover:text-sky-700 hover:bg-slate-100 rounded-lg transition-colors relative"
          title="Refresh contest rankings & submissions"
        >
          <RefreshCw
            className={`w-4 h-4 ${isRefreshing ? 'animate-spin text-sky-600' : ''}`}
          />
        </button>

        {/* Download Project ZIP */}
        <a
          href="/acm-contest-leaderboard.zip"
          download="acm-contest-leaderboard.zip"
          className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-lg transition-colors"
          title="Download complete project ZIP archive"
        >
          <Download className="w-3.5 h-3.5 text-sky-600" />
          <span className="hidden sm:inline">Project ZIP</span>
        </a>

        {/* Functional Notifications Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications((prev) => !prev)}
            className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors relative"
            title="Contest Notifications & Clarifications"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white" />
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-xl shadow-xl border border-slate-200 py-3 z-50 animate-in fade-in slide-in-from-top-1">
              <div className="px-4 pb-2 border-b border-slate-100 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-[#0a192f]">
                    Contest Notifications
                  </h4>
                  <p className="text-[10px] text-slate-400">
                    Clarifications & verdict alerts
                  </p>
                </div>
                {unreadCount > 0 && (
                  <button
                    onClick={handleMarkAllRead}
                    className="text-[11px] font-semibold text-sky-600 hover:text-sky-800"
                  >
                    Mark read
                  </button>
                )}
              </div>

              <div className="divide-y divide-slate-100 max-h-72 overflow-y-auto">
                {notifications.map((item) => (
                  <div
                    key={item.id}
                    className="p-3 text-xs hover:bg-slate-50 transition-colors"
                  >
                    <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 mb-1">
                      <span className="uppercase font-semibold text-sky-700">
                        {item.type}
                      </span>
                      <span>{item.time}</span>
                    </div>
                    <p className="text-slate-700 font-medium leading-relaxed">
                      {item.title}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User Profile Pill */}
        {currentUser && (
          <button
            onClick={() => onSelectParticipant && onSelectParticipant(currentUser)}
            className="flex items-center gap-2 pl-2 pr-2.5 py-1 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg transition-all text-left"
            title="Inspect your participant card and problem breakdown"
          >
            <div className="w-7 h-7 rounded-md bg-gradient-to-br from-sky-500 to-blue-700 text-white flex items-center justify-center font-mono text-xs font-bold shadow-2xs">
              {currentUser.avatar}
            </div>
            <div className="hidden lg:block">
              <div className="text-xs font-bold text-slate-900 leading-tight">
                {currentUser.name.split(' ')[0]}
              </div>
              <div className="text-[10px] font-mono text-emerald-600 font-semibold leading-none">
                Rank #{currentUser.rank}
              </div>
            </div>
          </button>
        )}
      </div>
    </header>
  );
};
