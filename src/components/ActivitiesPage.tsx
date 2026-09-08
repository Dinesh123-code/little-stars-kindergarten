import React from 'react';
import { PageView } from '../types';
import { INITIAL_ACTIVITIES } from '../data/initialData';
import { SafeImage } from './SafeImage';
import { 
  Sparkles, CheckCircle2, Clock, Sun, BookOpen, Palette, 
  Music, Heart, ArrowRight 
} from 'lucide-react';

interface ActivitiesPageProps {
  onNavigate: (page: PageView) => void;
}

export const ActivitiesPage: React.FC<ActivitiesPageProps> = ({ onNavigate }) => {
  return (
    <div className="bg-white min-h-screen py-12 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-[#5BB836] text-xs font-bold uppercase tracking-wider">
            <Sun className="w-3.5 h-3.5" />
            <span>Holistic Development</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-display font-black text-[#1F2A66] tracking-tight">
            Learning Activities &amp; Daily Exploration
          </h1>

          <p className="text-base sm:text-lg text-[#5B6178] leading-relaxed">
            Every day at Little Stars is packed with tactile wonder. Through play-based and Montessori methodologies, 
            children develop fine motor skills, language fluency, creative confidence, and team camaraderie.
          </p>
        </div>

        {/* 6 Core Activities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {INITIAL_ACTIVITIES.map((act) => (
            <div
              key={act.id}
              className="bg-white rounded-3xl border border-line overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col group"
            >
              <div className="aspect-[16/10] overflow-hidden relative bg-slate-100">
                <SafeImage
                  src={act.image}
                  alt={act.title}
                  focalPosition="center-top"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold shadow-xs ${act.badgeColor}`}>
                  {act.ageGroup}
                </span>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <h3 className="text-xl font-display font-black text-[#1F2A66]">
                    {act.title}
                  </h3>
                  <p className="text-sm text-[#5B6178] leading-relaxed">
                    {act.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-line space-y-2">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                    Skills Cultivated:
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {act.skills.map((skill, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1 text-[11px] px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 font-semibold"
                      >
                        <CheckCircle2 className="w-3 h-3 text-[#5BB836]" />
                        <span>{skill}</span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Daily Routine Schedule */}
        <div className="bg-[#F6F9FF] rounded-3xl border border-line p-6 sm:p-10 space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold text-[#ED2E84] uppercase tracking-wider">Predictable &amp; Calming</span>
            <h2 className="text-3xl font-display font-black text-[#1F2A66]">
              A Typical Day at Little Stars
            </h2>
            <p className="text-sm text-[#5B6178]">
              Children thrive on predictable rhythm balancing focused inquiry, outdoor movement, and restful snack breaks.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-line shadow-2xs space-y-2">
              <div className="text-xs font-bold text-[#ED2E84]">08:30 AM – 09:00 AM</div>
              <h4 className="font-display font-bold text-base text-[#1F2A66]">Welcome &amp; Morning Circle</h4>
              <p className="text-xs text-slate-600">Greeting songs, calendar check, emotional check-in, and tactile warmups.</p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-line shadow-2xs space-y-2">
              <div className="text-xs font-bold text-[#FFC42E]">09:00 AM – 10:15 AM</div>
              <h4 className="font-display font-bold text-base text-[#1F2A66]">Montessori &amp; Phonics</h4>
              <p className="text-xs text-slate-600">Self-chosen Montessori apparatus, Jolly Phonics sound blending, and teacher reading.</p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-line shadow-2xs space-y-2">
              <div className="text-xs font-bold text-[#5BB836]">10:15 AM – 11:00 AM</div>
              <h4 className="font-display font-bold text-base text-[#1F2A66]">Fruit Snack &amp; Turf Play</h4>
              <p className="text-xs text-slate-600">Supervised handwashing, healthy fruit snack, and outdoor soft-turf agility play.</p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-line shadow-2xs space-y-2">
              <div className="text-xs font-bold text-[#29A8E0]">11:00 AM – 12:30 PM</div>
              <h4 className="font-display font-bold text-base text-[#1F2A66]">Art Studio &amp; Math Games</h4>
              <p className="text-xs text-slate-600">Watercolor painting, clay crafts, counting bead challenges, and goodbye reflection.</p>
            </div>
          </div>
        </div>

        {/* Action Banner */}
        <div className="text-center bg-pink-50 border border-pink-200 rounded-3xl p-8 space-y-4">
          <h3 className="text-2xl font-display font-black text-[#1F2A66]">
            Want to see our learning activities in person?
          </h3>
          <p className="text-sm text-slate-600 max-w-lg mx-auto">
            Bring your child for a free morning discovery session and let them explore our Montessori laboratory.
          </p>
          <button
            onClick={() => onNavigate('admissions')}
            className="px-8 py-3.5 rounded-full bg-[#ED2E84] hover:bg-[#D11E6F] text-white font-bold text-sm shadow-md transition-all cursor-pointer"
          >
            Schedule Free Trial Visit
          </button>
        </div>

      </div>
    </div>
  );
};
