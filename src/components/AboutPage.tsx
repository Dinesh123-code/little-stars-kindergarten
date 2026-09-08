import React from 'react';
import { PageView } from '../types';
import { SafeImage } from './SafeImage';
import { 
  Heart, Star, Sparkles, ShieldCheck, Award, Users, 
  BookOpen, Compass, CheckCircle2, ArrowRight 
} from 'lucide-react';

interface AboutPageProps {
  onNavigate: (page: PageView) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  return (
    <div className="bg-white min-h-screen py-12 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-50 border border-pink-200 text-[#ED2E84] text-xs font-bold uppercase tracking-wider">
            <Heart className="w-3.5 h-3.5 fill-[#ED2E84]" />
            <span>Our Heritage &amp; Philosophy</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-display font-black text-[#1F2A66] tracking-tight">
            About Little Stars Kindergarten
          </h1>

          <p className="text-base sm:text-lg text-[#5B6178] leading-relaxed">
            Founded with a passionate conviction that every child carries an innate genius that blossoms 
            best in an atmosphere of warmth, respect, tactile wonder, and joyful discovery.
          </p>
        </div>

        {/* 2-Column Hero Story */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <h2 className="text-3xl font-display font-black text-[#1F2A66]">
              A Nurturing Second Home in Coimbatore
            </h2>
            <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
              At <strong>Little Stars Kindergarten &amp; Preschool</strong>, we believe the early years (ages 1.5 to 6) 
              lay the fundamental neural and emotional architecture for a lifetime. Rather than rigid rote drilling, 
              our curriculum merges the proven tactile autonomy of Montessori with the rigorous literacy benchmarks of the British Early Years Foundation Stage (EYFS).
            </p>
            <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
              From our safe, dust-free classrooms to our soft-turf outdoor play stations, every square foot is 
              engineered with child-centric safety, hygienic dining, and joyful engagement in mind.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-[#F6F9FF] border border-line">
                <div className="font-display font-black text-2xl text-[#ED2E84]">1:8</div>
                <div className="text-xs font-bold text-[#1F2A66]">Faculty Ratio</div>
                <div className="text-[11px] text-[#5B6178]">Individualized attention</div>
              </div>
              <div className="p-4 rounded-2xl bg-[#F6F9FF] border border-line">
                <div className="font-display font-black text-2xl text-[#FFC42E]">100%</div>
                <div className="text-xs font-bold text-[#1F2A66]">Phonics Fluency</div>
                <div className="text-[11px] text-[#5B6178]">Jolly Phonics 42 sounds</div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-[4/3] bg-slate-100">
              <SafeImage
                src="https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1200&q=80"
                alt="Teacher guiding young children at Little Stars Kindergarten"
                focalPosition="center-top"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Vision & Mission Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-8 rounded-3xl bg-[#F6F9FF] border border-line space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-pink-100 text-[#ED2E84] flex items-center justify-center">
              <Compass className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-display font-black text-[#1F2A66]">Our Vision</h3>
            <p className="text-sm text-[#5B6178] leading-relaxed">
              To be the most beloved and trusted early childhood academy in South India, celebrated for cultivating curious minds, kind hearts, and joyful, school-ready learners who step confidently into primary education.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-[#F6F9FF] border border-line space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-[#FFC42E] flex items-center justify-center">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-display font-black text-[#1F2A66]">Our Mission</h3>
            <p className="text-sm text-[#5B6178] leading-relaxed">
              To provide an inclusive, safe, and stimulating environment where experiential play, phonetic mastery, emotional safety, and ethical character flourish hand-in-hand through certified mentorship and parent partnership.
            </p>
          </div>
        </div>

        {/* 4 Pillars of Pedagogical Excellence */}
        <div className="space-y-8">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl font-display font-black text-[#1F2A66]">
              Our Educational Pillars
            </h2>
            <p className="text-sm text-[#5B6178] mt-2">
              Every lesson plan is engineered around these four developmental domains.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-white border border-line shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-[#29A8E0] flex items-center justify-center">
                <BookOpen className="w-5 h-5" />
              </div>
              <h4 className="font-display font-bold text-lg text-[#1F2A66]">Cognitive Inquiry</h4>
              <p className="text-xs text-[#5B6178] leading-relaxed">
                Hands-on Montessori apparatus, classification puzzles, and mathematical visualizer rods.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-line shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-pink-100 text-[#ED2E84] flex items-center justify-center">
                <Heart className="w-5 h-5" />
              </div>
              <h4 className="font-display font-bold text-lg text-[#1F2A66]">Social-Emotional</h4>
              <p className="text-xs text-[#5B6178] leading-relaxed">
                Collaborative circle time, empathy sharing, emotion naming, and graceful conflict resolution.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-line shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-[#5BB836] flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h4 className="font-display font-bold text-lg text-[#1F2A66]">Physical &amp; Motor</h4>
              <p className="text-xs text-[#5B6178] leading-relaxed">
                Fine motor clay modeling and pencil grip paired with gross motor turf hurdles and balance beam play.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-line shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-purple-100 text-[#8B3FB0] flex items-center justify-center">
                <Award className="w-5 h-5" />
              </div>
              <h4 className="font-display font-bold text-lg text-[#1F2A66]">Creative Expression</h4>
              <p className="text-xs text-[#5B6178] leading-relaxed">
                Free-expression watercolors, musical chime bells, rhythmic rhymes, and theatrical dramatic play.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Strip */}
        <div className="p-8 sm:p-12 rounded-3xl bg-[#1F2A66] text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-2xl sm:text-3xl font-display font-black text-white">
              Ready to Explore Our Campus in Person?
            </h3>
            <p className="text-slate-200 text-sm max-w-xl">
              Book a guided walk-through with our academic coordinator and observe our joyful classrooms in action.
            </p>
          </div>
          <button
            onClick={() => onNavigate('admissions')}
            className="px-8 py-3.5 rounded-full bg-[#ED2E84] hover:bg-[#D11E6F] text-white font-bold text-sm shadow-md transition-all cursor-pointer whitespace-nowrap hover:scale-105"
          >
            Apply for Admission
          </button>
        </div>

      </div>
    </div>
  );
};
