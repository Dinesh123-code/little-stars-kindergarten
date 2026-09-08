import React from 'react';
import { PageView } from '../types';
import { INITIAL_FACILITIES } from '../data/initialData';
import { SafeImage } from './SafeImage';
import { 
  ShieldCheck, CheckCircle2, Sparkles, Phone, 
  MapPin, Heart, ArrowRight 
} from 'lucide-react';

interface FacilitiesPageProps {
  onNavigate: (page: PageView) => void;
}

export const FacilitiesPage: React.FC<FacilitiesPageProps> = ({ onNavigate }) => {
  return (
    <div className="bg-white min-h-screen py-12 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-[#29A8E0] text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Infrastructure &amp; Safety</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-display font-black text-[#1F2A66] tracking-tight">
            World-Class Campus Facilities
          </h1>

          <p className="text-base sm:text-lg text-[#5B6178] leading-relaxed">
            Every environment at Little Stars is engineered specifically for early childhood ergonomics, 
            safety, hygiene, and imaginative sensory immersion.
          </p>
        </div>

        {/* Facilities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {INITIAL_FACILITIES.map((facility) => (
            <div
              key={facility.id}
              className="bg-white rounded-3xl border border-line overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col group"
            >
              <div className="aspect-[16/10] overflow-hidden relative bg-slate-100">
                <SafeImage
                  src={facility.image}
                  alt={facility.title}
                  focalPosition="center"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold bg-[#1F2A66] text-white shadow-xs">
                  {facility.category}
                </span>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <h3 className="text-xl font-display font-black text-[#1F2A66]">
                    {facility.title}
                  </h3>
                  <p className="text-sm text-[#5B6178] leading-relaxed">
                    {facility.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-line space-y-2">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                    Key Specifications:
                  </div>
                  <ul className="space-y-1.5">
                    {facility.highlights.map((item, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-xs text-slate-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#5BB836] shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Safety First Guarantee Banner */}
        <div className="bg-[#1F2A66] text-white rounded-3xl p-8 sm:p-12 shadow-xl space-y-6">
          <div className="max-w-2xl space-y-2">
            <span className="text-xs font-bold text-[#FFC42E] uppercase tracking-wider">Zero Compromise</span>
            <h2 className="text-3xl font-display font-black text-white">
              Child Safety &amp; Hygiene Standards
            </h2>
            <p className="text-sm text-slate-300">
              Parents trust Little Stars with their most precious treasures. Here are our strict daily protocols:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-2">
            <div className="p-4 rounded-2xl bg-white/10 space-y-2">
              <h4 className="font-display font-bold text-base text-[#FFC42E]">Sanitization Cycles</h4>
              <p className="text-xs text-slate-200">All toys, tables, and play mats sanitized twice daily using non-toxic baby-safe solutions.</p>
            </div>
            <div className="p-4 rounded-2xl bg-white/10 space-y-2">
              <h4 className="font-display font-bold text-base text-[#FFC42E]">Staff Verification</h4>
              <p className="text-xs text-slate-200">Police-verified staff, certified pediatric CPR training, and all-female classroom assistants.</p>
            </div>
            <div className="p-4 rounded-2xl bg-white/10 space-y-2">
              <h4 className="font-display font-bold text-base text-[#FFC42E]">Emergency Preparedness</h4>
              <p className="text-xs text-slate-200">On-call pediatrician partnership, equipped medical dispensary, and smoke detection systems.</p>
            </div>
          </div>
        </div>

        {/* Campus Tour Booking */}
        <div className="flex flex-col sm:flex-row items-center justify-between p-8 rounded-3xl bg-[#F6F9FF] border border-line gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-2xl font-display font-black text-[#1F2A66]">Schedule an On-Campus Tour</h3>
            <p className="text-sm text-[#5B6178]">Walk our corridors, meet the head of school, and inspect our facilities personally.</p>
          </div>
          <button
            onClick={() => onNavigate('contact')}
            className="px-8 py-3.5 rounded-full bg-[#ED2E84] hover:bg-[#D11E6F] text-white font-bold text-sm shadow-md transition-all cursor-pointer whitespace-nowrap"
          >
            Book Visit via Contact Desk
          </button>
        </div>

      </div>
    </div>
  );
};
