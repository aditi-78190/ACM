import React from 'react';

interface StatCardProps {
  label: string;
  value: string | number;
  subtext?: string;
  icon?: React.ReactNode;
  trend?: string;
  highlight?: boolean;
}

export const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
  subtext,
  icon,
  trend,
  highlight = false
}) => {
  return (
    <div
      className={`p-5 rounded-xl border transition-all ${
        highlight
          ? 'bg-gradient-to-br from-[#0a192f] to-[#172d54] text-white border-[#1e355b] shadow-md'
          : 'bg-white text-slate-800 border-slate-200 hover:border-slate-300 shadow-xs'
      }`}
    >
      <div className="flex items-center justify-between mb-3">
        <span
          className={`text-xs font-semibold uppercase tracking-wider ${
            highlight ? 'text-sky-300' : 'text-slate-500'
          }`}
        >
          {label}
        </span>
        {icon && (
          <div
            className={`p-2 rounded-lg ${
              highlight ? 'bg-white/10 text-sky-300' : 'bg-slate-100 text-slate-600'
            }`}
          >
            {icon}
          </div>
        )}
      </div>

      <div className="flex items-baseline gap-2">
        <span
          className={`text-3xl font-bold font-mono tabular-nums ${
            highlight ? 'text-white' : 'text-[#0a192f]'
          }`}
        >
          {value}
        </span>
        {trend && (
          <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">
            {trend}
          </span>
        )}
      </div>

      {subtext && (
        <p
          className={`text-xs mt-2 truncate ${
            highlight ? 'text-slate-300' : 'text-slate-500'
          }`}
        >
          {subtext}
        </p>
      )}
    </div>
  );
};
