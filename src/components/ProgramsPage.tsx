import React, { useState } from 'react';
import { Program, PageView, normalizeActivities } from '../types';
import { SafeImage } from './SafeImage';
import { 
  CheckCircle2, Clock, Users, ArrowRight, Sparkles, 
  Calendar, BookOpen, Heart, Shield, Award 
} from 'lucide-react';

interface ProgramsPageProps {
  programs: Program[];
  onNavigate: (page: PageView, extraParams?: { selectedClass?: string }) => void;
}

export const ProgramsPage: React.FC<ProgramsPageProps> = ({ programs, onNavigate }) => {
  const [activeFilter, setActiveFilter] = useState<string>('All');

  const filterOptions = ['All', 'Play Group', 'Nursery', 'LKG', 'UKG'];

  const filteredPrograms = programs.filter((p) => {
    if (activeFilter === 'All') return true;
    return p.name.toLowerCase().includes(activeFilter.toLowerCase());
  });

  return (
    <div className="bg-white min-h-screen py-10 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-50 border border-pink-200 text-[#ED2E84] text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Age-Appropriate Early Learning</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-display font-black text-[#1F2A66] tracking-tight">
            Our Academic Programs &amp; Classes
          </h1>

          <p className="text-base sm:text-lg text-[#5B6178] leading-relaxed">
            Designed to bridge every stage of child development from toddler curiosity to confident primary school readiness. 
            All programs are dynamically served and managed via our institutional curriculum database.
          </p>
        </div>

        {/* Filter Navigation Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {filterOptions.map((opt) => {
            const isActive = activeFilter === opt;
            return (
              <button
                key={opt}
                onClick={() => setActiveFilter(opt)}
                className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#1F2A66] text-white shadow-md'
                    : 'bg-slate-100 text-[#5B6178] hover:bg-slate-200 hover:text-[#1F2A66]'
                }`}
              >
                {opt}
              </button>
            );
          })}
        </div>

        {/* Programs Grid */}
        <div className="space-y-10">
          {filteredPrograms.map((program) => {
            const activitiesList = normalizeActivities(program.activities);

            return (
              <div
                key={program.id}
                className="bg-white rounded-3xl border border-line overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 grid grid-cols-1 lg:grid-cols-12 items-stretch group"
              >
                {/* Image Section (5/12 width ratio) */}
                <div className="lg:col-span-5 relative min-h-[260px] aspect-[16/10] lg:aspect-auto lg:h-full lg:min-h-full overflow-hidden bg-slate-100">
                  <SafeImage
                    src={program.image_url}
                    alt={program.name}
                    focalPosition="center-top"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-xs px-3.5 py-1.5 rounded-full text-xs font-black text-[#1F2A66] shadow-sm">
                    {program.age_group}
                  </div>
                  <div className="absolute top-4 right-4 bg-[#ED2E84] text-white px-3 py-1 rounded-full text-xs font-bold shadow-sm">
                    Enrolling Now
                  </div>
                </div>

                {/* Content Section (7/12 width ratio) */}
                <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between space-y-6">
                  <div className="space-y-4">
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line pb-4">
                      <h2 className="text-2xl font-display font-black text-[#1F2A66]">
                        {program.name}
                      </h2>
                      <div className="flex items-center gap-1.5 text-xs font-bold text-slate-600 bg-slate-100 px-3 py-1.5 rounded-lg">
                        <Users className="w-3.5 h-3.5 text-[#29A8E0]" />
                        <span>Batch Size: {program.student_ratio}</span>
                      </div>
                    </div>

                    <p className="text-sm sm:text-base text-[#5B6178] leading-relaxed">
                      {program.description}
                    </p>

                    {/* Class Timings */}
                    <div className="flex items-center gap-2 text-xs font-semibold text-[#1F2A66] bg-blue-50/70 p-3 rounded-xl border border-blue-100">
                      <Clock className="w-4 h-4 text-[#29A8E0] shrink-0" />
                      <span>Class Timings: <strong>{program.timings}</strong></span>
                    </div>

                    {/* Activities List */}
                    <div className="space-y-2 pt-2">
                      <div className="text-xs font-bold uppercase tracking-wider text-[#1F2A66] flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-[#FFC42E]" />
                        <span>Core Learning Activities:</span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {activitiesList.map((activity, idx) => (
                          <div
                            key={idx}
                            className="flex items-center gap-2 text-xs text-slate-700 bg-amber-50/60 border border-amber-100/80 px-3 py-2 rounded-xl"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
                            <span>{activity}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-4 border-t border-line flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={() => onNavigate('admissions', { selectedClass: program.name })}
                      className="flex-1 py-3 px-6 rounded-full bg-[#ED2E84] hover:bg-[#D11E6F] text-white text-sm font-bold shadow-md shadow-pink-500/20 transition-all cursor-pointer flex items-center justify-center gap-2 hover:scale-[1.01]"
                    >
                      <span>Apply for {program.name}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onNavigate('contact')}
                      className="py-3 px-5 rounded-full bg-slate-100 hover:bg-slate-200 text-[#1F2A66] text-sm font-bold transition-colors cursor-pointer"
                    >
                      Fee Inquiry
                    </button>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

        {filteredPrograms.length === 0 && (
          <div className="text-center py-16 bg-slate-50 rounded-3xl border border-dashed border-slate-300">
            <p className="text-slate-500 font-bold">No programs match the selected category.</p>
            <button
              onClick={() => setActiveFilter('All')}
              className="mt-4 px-6 py-2 rounded-full bg-[#1F2A66] text-white text-sm font-bold"
            >
              Show All Classes
            </button>
          </div>
        )}

        {/* Curriculum Comparison Matrix */}
        <div className="bg-[#F6F9FF] rounded-3xl border border-line p-6 sm:p-10 space-y-6">
          <div className="max-w-2xl">
            <span className="text-xs font-bold text-[#ED2E84] uppercase tracking-wider">Comprehensive Roadmap</span>
            <h3 className="text-2xl sm:text-3xl font-display font-black text-[#1F2A66] mt-1">
              Curriculum Comparison Matrix
            </h3>
            <p className="text-sm text-[#5B6178] mt-1">
              Clear academic progression from initial sensory habituation to structured reading, cursive penmanship, and primary school readiness.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse bg-white rounded-2xl overflow-hidden shadow-xs">
              <thead>
                <tr className="bg-[#1F2A66] text-white text-xs uppercase tracking-wider font-bold">
                  <th className="p-4">Class</th>
                  <th className="p-4">Age Benchmark</th>
                  <th className="p-4">Schedule</th>
                  <th className="p-4">Staff Allocation</th>
                  <th className="p-4">Primary Milestone</th>
                  <th className="p-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {programs.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50 transition-colors">
                    <td className="p-4 font-bold text-[#1F2A66] whitespace-nowrap">{p.name}</td>
                    <td className="p-4 font-semibold text-pink-600 whitespace-nowrap">{p.age_group}</td>
                    <td className="p-4 text-slate-600 whitespace-nowrap">{p.timings}</td>
                    <td className="p-4 text-slate-700 whitespace-nowrap">{p.student_ratio}</td>
                    <td className="p-4 text-slate-600 max-w-xs">{p.description.substring(0, 85)}...</td>
                    <td className="p-4 text-right whitespace-nowrap">
                      <button
                        onClick={() => onNavigate('admissions', { selectedClass: p.name })}
                        className="text-xs font-bold text-[#ED2E84] hover:underline"
                      >
                        Apply &rarr;
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
};
