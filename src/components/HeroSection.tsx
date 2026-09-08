import React from 'react';
import { PageView } from '../types';
import { SafeImage } from './SafeImage';
import { 
  Sparkles, CheckCircle2, ArrowRight, ShieldCheck, Heart, 
  Star, Users, Clock, Compass 
} from 'lucide-react';

interface HeroSectionProps {
  onNavigate: (page: PageView, extraParams?: { selectedClass?: string }) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onNavigate }) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#F6F9FF] via-white to-white py-12 lg:py-20">
      {/* Playful background decorative shapes */}
      <div className="absolute top-10 left-5 w-72 h-72 rounded-full bg-[#FFC42E]/10 blur-3xl pointer-events-none" />
      <div className="absolute top-20 right-5 w-80 h-80 rounded-full bg-[#ED2E84]/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Hero Column */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left scroll-reveal">
            
            {/* Admissions Banner Pill */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[#E7EBF5] text-[#1F2A66] text-xs sm:text-sm font-bold shadow-xs">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
              <span>Admissions Open 2026 – 2027</span>
              <span className="text-[#ED2E84] font-semibold">• Limited Seats Available</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl xl:text-6xl font-display font-black text-[#1F2A66] leading-[1.12] tracking-tight">
              A Joyful Start for <span className="text-[#ED2E84]">Little Stars</span>.
            </h1>

            <p className="text-lg sm:text-xl text-[#5B6178] leading-relaxed max-w-2xl mx-auto lg:mx-0 font-medium">
              Where joyful curiosity, phonetic mastery, and gentle care blossom into lifelong confidence. 
              Coimbatore's premier kindergarten blending Montessori tactile learning with international EYFS standards.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={() => onNavigate('admissions')}
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#ED2E84] hover:bg-[#D11E6F] text-white text-base font-bold shadow-lg shadow-pink-500/25 transition-all cursor-pointer flex items-center justify-center gap-2 group hover:scale-[1.02]"
              >
                <span>Apply for Admission</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => onNavigate('programs')}
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-white hover:bg-slate-50 text-[#1F2A66] text-base font-bold border-2 border-[#1F2A66]/20 transition-all cursor-pointer flex items-center justify-center gap-2 hover:border-[#1F2A66]"
              >
                <Compass className="w-5 h-5 text-[#29A8E0]" />
                <span>Explore Classes</span>
              </button>
            </div>

            {/* Four Institutional Trust Bullets */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 text-left scroll-reveal stagger-1">
              <div className="bg-white p-3 rounded-2xl border border-line shadow-2xs">
                <div className="w-7 h-7 rounded-lg bg-pink-100 flex items-center justify-center text-[#ED2E84] mb-1.5">
                  <Users className="w-4 h-4" />
                </div>
                <div className="font-bold text-xs text-[#1F2A66]">1:8 Mentorship</div>
                <div className="text-[10px] text-[#5B6178]">Individualized care</div>
              </div>

              <div className="bg-white p-3 rounded-2xl border border-line shadow-2xs">
                <div className="w-7 h-7 rounded-lg bg-amber-100 flex items-center justify-center text-[#FFC42E] mb-1.5">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div className="font-bold text-xs text-[#1F2A66]">Jolly Phonics</div>
                <div className="text-[10px] text-[#5B6178]">Fluent early reading</div>
              </div>

              <div className="bg-white p-3 rounded-2xl border border-line shadow-2xs">
                <div className="w-7 h-7 rounded-lg bg-emerald-100 flex items-center justify-center text-[#5BB836] mb-1.5">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div className="font-bold text-xs text-[#1F2A66]">CCTV Campus</div>
                <div className="text-[10px] text-[#5B6178]">100% verified security</div>
              </div>

              <div className="bg-white p-3 rounded-2xl border border-line shadow-2xs">
                <div className="w-7 h-7 rounded-lg bg-sky-100 flex items-center justify-center text-[#29A8E0] mb-1.5">
                  <Clock className="w-4 h-4" />
                </div>
                <div className="font-bold text-xs text-[#1F2A66]">Safe AC Vans</div>
                <div className="text-[10px] text-[#5B6178]">GPS tracking enabled</div>
              </div>
            </div>

          </div>

          {/* Right Hero Visual */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Main Photo Card */}
              <div className="overflow-hidden rounded-3xl border-4 border-white shadow-2xl bg-white aspect-[4/3] sm:aspect-[5/4]">
                <SafeImage
                  src="https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=80"
                  alt="Little Stars Kindergarten children and teacher learning joyfully in Montessori classroom"
                  focalPosition="center"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Floating Review Badge */}
              <div className="absolute -bottom-6 -left-4 sm:-left-6 bg-white p-4 rounded-2xl border border-line shadow-xl flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-[#FFC42E]">
                  <Star className="w-7 h-7 fill-[#FFC42E]" />
                </div>
                <div>
                  <div className="flex items-center gap-1 text-[#FFC42E]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-[#FFC42E]" />
                    ))}
                  </div>
                  <div className="font-bold text-xs text-[#1F2A66] mt-0.5">5.0 Star Parent Rating</div>
                  <div className="text-[10px] text-[#5B6178]">180+ reviews in Coimbatore</div>
                </div>
              </div>

              {/* Floating Curriculum Pill */}
              <div className="absolute -top-4 -right-2 sm:-right-4 bg-[#1F2A66] text-white py-2 px-4 rounded-full shadow-lg text-xs font-bold flex items-center gap-2">
                <Heart className="w-4 h-4 text-[#ED2E84] fill-[#ED2E84]" />
                <span>Montessori + EYFS</span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
