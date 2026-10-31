import React from 'react';
import { Building2, Users, Code, Award, ExternalLink, Mail, Github, BookOpen } from 'lucide-react';

export const AboutACMView: React.FC = () => {
  const committee = [
    { role: 'Faculty Chapter Sponsor', name: 'Dr. Evelyn Martinez', department: 'Department of Computer Science & Engineering' },
    { role: 'Student Chapter Chair', name: 'Devansh Patel', department: 'Algorithms & Distributed Systems' },
    { role: 'Vice Chair & Events Lead', name: 'Sophia Zhang', department: 'Software Engineering & AI' },
    { role: 'Competitive Programming Lead', name: 'Aarav Sharma', department: 'Theory of Computation & ICPC Coach' },
    { role: 'Technical Systems & Webmaster', name: 'Mateo Silva', department: 'Cloud Infrastructure & Security' }
  ];

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Chapter Overview */}
      <div className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0a192f] to-[#1e355b] text-white flex items-center justify-center font-bold text-sm">
            ACM
          </div>
          <div>
            <h1 className="text-xl md:text-2xl font-extrabold text-[#0a192f]">
              ACM Student Chapter
            </h1>
            <p className="text-xs text-slate-500">
              Association for Computing Machinery — Advancement of Computing as a Science & Profession
            </p>
          </div>
        </div>

        <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
          The <strong>ACM Student Chapter</strong> serves as the premier community for aspiring computer scientists, competitive coders, and software engineers on campus. We facilitate weekly algorithmic problem-solving labs, hackathons, technical speaker seminars, and regional ICPC qualification bootcamps.
        </p>

        <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
          This <strong>Coding Contest Leaderboard</strong> is designed, engineered, and maintained by student developers from the Chapter to provide clean, transparent, real-time feedback during invitational competitions.
        </p>
      </div>

      {/* Pillars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
          <div className="w-9 h-9 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center mb-3">
            <Code className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-slate-900 text-sm mb-1">Competitive Programming</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Bi-weekly algorithmic problem sprints focusing on graph theory, dynamic programming, and computational geometry for ICPC and Olympiads.
          </p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
          <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3">
            <BookOpen className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-slate-900 text-sm mb-1">Peer Mentorship</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Upperclassmen mentoring underclassmen on data structures, technical interview prep, and open source research contributions.
          </p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
          <div className="w-9 h-9 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center mb-3">
            <Award className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-slate-900 text-sm mb-1">Invitational Hackathons</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Annual collegiate software showdowns bridging theoretical computer science with practical product engineering.
          </p>
        </div>
      </div>

      {/* Committee Table */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
        <h2 className="text-base font-bold text-[#0a192f] mb-4 flex items-center gap-2">
          <Users className="w-4 h-4 text-sky-600" />
          Executive Committee & Technical Board
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-600">
                <th className="py-2.5 px-3">Role / Responsibility</th>
                <th className="py-2.5 px-3">Appointee</th>
                <th className="py-2.5 px-3">Academic Department</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {committee.map((member, idx) => (
                <tr key={idx} className="hover:bg-slate-50/60">
                  <td className="py-2.5 px-3 font-semibold text-slate-800">{member.role}</td>
                  <td className="py-2.5 px-3 text-sky-700 font-medium">{member.name}</td>
                  <td className="py-2.5 px-3 text-slate-500">{member.department}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
