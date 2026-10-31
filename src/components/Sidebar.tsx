import React from 'react';
import {
  LayoutDashboard,
  Trophy,
  Users,
  FileCode2,
  Info,
  Building2,
  ChevronLeft,
  ChevronRight,
  X,
  Terminal,
  ShieldCheck
} from 'lucide-react';

export type NavTab =
  | 'overview'
  | 'leaderboard'
  | 'participants'
  | 'problems'
  | 'contest'
  | 'about';

interface SidebarProps {
  activeTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  isMobileOpen: boolean;
  onCloseMobile: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onSelectTab,
  isCollapsed,
  onToggleCollapse,
  isMobileOpen,
  onCloseMobile
}) => {
  const navItems = [
    { id: 'overview' as NavTab, label: 'Overview', icon: LayoutDashboard },
    { id: 'leaderboard' as NavTab, label: 'Leaderboard', icon: Trophy },
    { id: 'participants' as NavTab, label: 'Participants', icon: Users },
    { id: 'problems' as NavTab, label: 'Problem Statistics', icon: FileCode2 },
    { id: 'contest' as NavTab, label: 'Contest Details', icon: Info },
    { id: 'about' as NavTab, label: 'About ACM', icon: Building2 }
  ];

  const handleNavClick = (tab: NavTab) => {
    onSelectTab(tab);
    onCloseMobile();
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-[#0a192f]/60 backdrop-blur-xs z-40 md:hidden"
          onClick={onCloseMobile}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed md:sticky top-0 h-screen bg-[#0a192f] text-white flex flex-col justify-between border-r border-[#1e355b] z-50 transition-all duration-300 ${
          isCollapsed ? 'md:w-20' : 'md:w-64'
        } ${
          isMobileOpen ? 'translate-x-0 w-64' : '-translate-x-full md:translate-x-0'
        }`}
      >
        {/* Brand Header */}
        <div>
          <div className="h-16 px-4 flex items-center justify-between border-b border-[#1e355b]">
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center font-mono font-extrabold text-sm text-white shrink-0 shadow-md">
                ACM
              </div>
              {!isCollapsed && (
                <div className="min-w-0">
                  <div className="font-extrabold text-sm tracking-tight text-white leading-tight truncate">
                    CodeSprint
                  </div>
                  <div className="text-[10px] font-semibold uppercase tracking-wider text-sky-400">
                    Student Chapter
                  </div>
                </div>
              )}
            </div>

            {/* Mobile close button */}
            <button
              onClick={onCloseMobile}
              className="p-1.5 text-slate-400 hover:text-white md:hidden"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="p-3 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  title={isCollapsed ? item.label : undefined}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-sky-500 text-white shadow-sm'
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon
                    className={`w-4 h-4 shrink-0 ${
                      isActive ? 'text-white' : 'text-slate-400'
                    }`}
                  />
                  {!isCollapsed && (
                    <span className="truncate whitespace-nowrap">{item.label}</span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Footer / Collapse Toggle */}
        <div className="p-3 border-t border-[#1e355b]">
          {!isCollapsed && (
            <div className="bg-[#112240] p-3 rounded-xl border border-[#1e355b] mb-3 text-xs">
              <div className="flex items-center gap-1.5 text-[11px] font-bold text-sky-300 mb-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>ICPC Compliant</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-tight">
                Deterministic tie-break engine active.
              </p>
            </div>
          )}

          {/* Desktop Collapse Button */}
          <button
            onClick={onToggleCollapse}
            className="hidden md:flex w-full items-center justify-center p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors text-xs font-medium"
            title={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
          >
            {isCollapsed ? (
              <ChevronRight className="w-4 h-4" />
            ) : (
              <div className="flex items-center gap-2">
                <ChevronLeft className="w-4 h-4" />
                <span className="text-[11px]">Collapse View</span>
              </div>
            )}
          </button>
        </div>
      </aside>
    </>
  );
};
