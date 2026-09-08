import React, { useState } from 'react';
import { Program, PageView, normalizeActivities } from '../types';
import { HeroSection } from './HeroSection';
import { SafeImage } from './SafeImage';
import { INITIAL_ACTIVITIES, INITIAL_FACILITIES, INITIAL_GALLERY, INITIAL_TESTIMONIALS } from '../data/initialData';
import { 
  Heart, Sparkles, BookOpen, Smile, ShieldCheck, Sun, Star, ArrowRight,
  MapPin, Phone, Mail, Clock, Check, Users, Compass, Music, Palette, 
  CheckCircle2, Award, ChevronRight, GraduationCap, Send
} from 'lucide-react';

interface HomePageProps {
  programs: Program[];
  onNavigate: (page: PageView, extraParams?: { selectedClass?: string }) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ programs, onNavigate }) => {
  const [activeTestimonialIdx, setActiveTestimonialIdx] = useState(0);

  return (
    <div className="space-y-0">
      
      {/* 1. Hero Section */}
      <HeroSection onNavigate={onNavigate} />

      {/* 2. Kindergarten Introduction */}
      <section className="py-16 bg-white border-b border-line scroll-reveal">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-pink-50 border border-pink-200 text-[#ED2E84] text-xs font-bold uppercase tracking-wider">
                <Heart className="w-3.5 h-3.5 fill-[#ED2E84]" />
                <span>Nurturing Lifelong Joy</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-display font-black text-[#1F2A66] tracking-tight">
                Welcome to Little Stars Kindergarten &amp; Preschool
              </h2>

              <p className="text-base sm:text-lg text-[#5B6178] leading-relaxed">
                Located in the heart of Coimbatore, Little Stars provides a warm, child-centered ecosystem 
                where your toddler transitions gracefully from home into their first academic community.
              </p>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                Our approach pairs the tactile, self-correcting autonomy of <strong>Montessori apparatus</strong> with 
                the world-renowned phonics foundations of the <strong>British Early Years Foundation Stage (EYFS)</strong>. 
                Children learn to speak with clarity, read with confidence, and explore mathematics without fear.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="flex items-center gap-3 p-3 rounded-2xl bg-[#F6F9FF] border border-line scroll-reveal stagger-1">
                  <div className="w-9 h-9 rounded-xl bg-pink-100 text-[#ED2E84] flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-bold text-xs text-[#1F2A66]">Play-Way Method</div>
                    <div className="text-[10px] text-slate-500">Learning through joy</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-2xl bg-[#F6F9FF] border border-line scroll-reveal stagger-2">
                  <div className="w-9 h-9 rounded-xl bg-amber-100 text-[#FFC42E] flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-bold text-xs text-[#1F2A66]">School Readiness</div>
                    <div className="text-[10px] text-slate-500">Smooth primary entry</div>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => onNavigate('about')}
                  className="text-sm font-bold text-[#1F2A66] hover:text-[#ED2E84] inline-flex items-center gap-2 cursor-pointer transition-colors"
                >
                  <span>Learn more about our pedagogy &amp; leadership</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>

            <div className="lg:col-span-6 relative scroll-reveal-img">
              <div className="rounded-3xl overflow-hidden border-4 border-white shadow-2xl bg-slate-100 aspect-[4/3]">
                <SafeImage
                  src="https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&w=1200&q=80"
                  alt="Little Stars children discovering through sensory toys"
                  focalPosition="center"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. Our Programs / Classes Preview */}
      <section className="py-16 bg-[#F6F9FF] border-b border-line scroll-reveal">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-pink-50 border border-pink-200 text-[#ED2E84] text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Academic Pathways</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-display font-black text-[#1F2A66]">
                Our Academic Programs
              </h2>
              <p className="text-sm sm:text-base text-[#5B6178]">
                Four carefully staged learning levels loaded dynamically from our curriculum database.
              </p>
            </div>

            <button
              onClick={() => onNavigate('programs')}
              className="inline-flex items-center gap-2 text-sm font-bold text-[#ED2E84] hover:text-[#D11E6F] cursor-pointer"
            >
              <span>View Full Curriculum Matrix</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {programs.map((prog, idx) => (
              <div
                key={prog.id}
                className={`bg-white rounded-3xl border border-line overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col group scroll-reveal stagger-${(idx % 4) + 1}`}
              >
                <div className="aspect-[16/11] overflow-hidden relative bg-slate-100 scroll-reveal-img">
                  <SafeImage
                    src={prog.image_url}
                    alt={prog.name}
                    focalPosition="center-top"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-white/95 px-3 py-1 rounded-full text-[11px] font-black text-[#1F2A66] shadow-xs">
                    {prog.age_group}
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <h3 className="font-display font-black text-xl text-[#1F2A66]">
                      {prog.name}
                    </h3>
                    <p className="text-xs text-[#5B6178] line-clamp-3 leading-relaxed">
                      {prog.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-line space-y-3">
                    <div className="text-[11px] text-slate-500 font-semibold flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#29A8E0]" />
                      <span>{prog.timings}</span>
                    </div>

                    <button
                      onClick={() => onNavigate('admissions', { selectedClass: prog.name })}
                      className="w-full py-2.5 rounded-xl bg-[#ED2E84] hover:bg-[#D11E6F] text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs hover:scale-[1.01]"
                    >
                      <span>Apply for {prog.name}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 4. Learning Activities Preview */}
      <section className="py-16 bg-white border-b border-line scroll-reveal">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold text-[#5BB836] uppercase tracking-wider">Joyful Exploration</span>
            <h2 className="text-3xl sm:text-4xl font-display font-black text-[#1F2A66]">
              Hands-On Learning Activities
            </h2>
            <p className="text-sm sm:text-base text-[#5B6178]">
              Engaging activities bridging fine motor finesse, musical joy, phonics, and tactile curiosity.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {INITIAL_ACTIVITIES.slice(0, 6).map((act, idx) => (
              <div
                key={act.id}
                className={`p-6 rounded-3xl bg-[#F6F9FF] border border-line hover:border-[#1F2A66]/30 transition-all space-y-3 group scroll-reveal stagger-${(idx % 3) + 1}`}
              >
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${act.badgeColor}`}>
                    {act.ageGroup}
                  </span>
                  <Sparkles className="w-4 h-4 text-[#FFC42E]" />
                </div>
                <h3 className="font-display font-bold text-lg text-[#1F2A66]">
                  {act.title}
                </h3>
                <p className="text-xs text-[#5B6178] leading-relaxed">
                  {act.description}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center pt-2">
            <button
              onClick={() => onNavigate('activities')}
              className="px-7 py-3 rounded-full bg-[#1F2A66] hover:bg-[#161E4A] text-white text-xs sm:text-sm font-bold shadow-md transition-all cursor-pointer"
            >
              Explore All Learning Activities &amp; Daily Schedule &rarr;
            </button>
          </div>

        </div>
      </section>

      {/* 5. Facilities Preview */}
      <section className="py-16 bg-[#F6F9FF] border-b border-line">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold text-[#29A8E0] uppercase tracking-wider">Safe &amp; Modern Campus</span>
            <h2 className="text-3xl sm:text-4xl font-display font-black text-[#1F2A66]">
              Campus Facilities &amp; Security
            </h2>
            <p className="text-sm sm:text-base text-[#5B6178]">
              Engineered from the ground up for toddler hygiene, safety, and sensory stimulation.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {INITIAL_FACILITIES.slice(0, 6).map((fac) => (
              <div
                key={fac.id}
                className="bg-white rounded-3xl border border-line overflow-hidden shadow-xs hover:shadow-lg transition-all"
              >
                <div className="aspect-[16/10] overflow-hidden bg-slate-100">
                  <SafeImage
                    src={fac.image}
                    alt={fac.title}
                    focalPosition="center"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-5 space-y-2">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-[#ED2E84]">
                    {fac.category}
                  </div>
                  <h3 className="font-display font-bold text-base text-[#1F2A66]">
                    {fac.title}
                  </h3>
                  <p className="text-xs text-[#5B6178] line-clamp-2">
                    {fac.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <button
              onClick={() => onNavigate('facilities')}
              className="text-sm font-bold text-[#1F2A66] hover:text-[#ED2E84] inline-flex items-center gap-1.5 cursor-pointer"
            >
              <span>Inspect All Safety Standards &amp; Van Transport Coverage</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </section>

      {/* 6. Why Choose Us */}
      <section className="py-16 bg-white border-b border-line">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold text-[#ED2E84] uppercase tracking-wider">Parent Trust</span>
            <h2 className="text-3xl sm:text-4xl font-display font-black text-[#1F2A66]">
              Why Parents Choose Little Stars
            </h2>
            <p className="text-sm sm:text-base text-[#5B6178]">
              Setting the gold standard in early childhood care and preschool education in Coimbatore.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-6 rounded-3xl bg-[#F6F9FF] border border-line space-y-3">
              <div className="w-10 h-10 rounded-xl bg-pink-100 text-[#ED2E84] flex items-center justify-center font-bold">
                1
              </div>
              <h3 className="font-display font-bold text-lg text-[#1F2A66]">Individualized 1:8 Care</h3>
              <p className="text-xs text-[#5B6178] leading-relaxed">
                Small student-to-teacher class size ensures your child is genuinely listened to, understood, and emotionally supported every hour.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-[#F6F9FF] border border-line space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-[#FFC42E] flex items-center justify-center font-bold">
                2
              </div>
              <h3 className="font-display font-bold text-lg text-[#1F2A66]">British Jolly Phonics</h3>
              <p className="text-xs text-[#5B6178] leading-relaxed">
                Proven synthetic phonics curriculum builds genuine reading fluency and confident speech expression before 1st grade.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-[#F6F9FF] border border-line space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-[#5BB836] flex items-center justify-center font-bold">
                3
              </div>
              <h3 className="font-display font-bold text-lg text-[#1F2A66]">100% CCTV &amp; RFID Safety</h3>
              <p className="text-xs text-[#5B6178] leading-relaxed">
                Complete perimeter surveillance, biometric staff gatepass, and certified pediatric first-aid readiness.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-[#F6F9FF] border border-line space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-[#29A8E0] flex items-center justify-center font-bold">
                4
              </div>
              <h3 className="font-display font-bold text-lg text-[#1F2A66]">Air-Conditioned Safe Vans</h3>
              <p className="text-xs text-[#5B6178] leading-relaxed">
                Door-to-door school transport across Coimbatore equipped with toddler seatbelts and female caregivers on board.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-[#F6F9FF] border border-line space-y-3">
              <div className="w-10 h-10 rounded-xl bg-purple-100 text-[#8B3FB0] flex items-center justify-center font-bold">
                5
              </div>
              <h3 className="font-display font-bold text-lg text-[#1F2A66]">Hygienic RO &amp; Dining</h3>
              <p className="text-xs text-[#5B6178] leading-relaxed">
                UV multi-stage water stations, sanitized dining areas, and supervised healthy fruit break habits.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-[#F6F9FF] border border-line space-y-3">
              <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center font-bold">
                6
              </div>
              <h3 className="font-display font-bold text-lg text-[#1F2A66]">Big-School Readiness</h3>
              <p className="text-xs text-[#5B6178] leading-relaxed">
                Our UKG graduates seamlessly gain admission into top ICSE, CBSE, and Cambridge primary schools with flying colors.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* 7. Gallery Preview */}
      <section className="py-16 bg-[#F6F9FF] border-b border-line">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-2">
              <span className="text-xs font-bold text-[#ED2E84] uppercase tracking-wider">Campus Life</span>
              <h2 className="text-3xl font-display font-black text-[#1F2A66]">
                Smiles &amp; Discoveries
              </h2>
            </div>
            <button
              onClick={() => onNavigate('gallery')}
              className="text-xs sm:text-sm font-bold text-[#1F2A66] hover:text-[#ED2E84] flex items-center gap-1 cursor-pointer"
            >
              <span>Browse Full Photo Gallery</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {INITIAL_GALLERY.slice(0, 4).map((item) => (
              <div
                key={item.id}
                onClick={() => onNavigate('gallery')}
                className="aspect-[4/3] rounded-2xl overflow-hidden bg-slate-200 border border-line cursor-pointer group relative shadow-2xs"
              >
                <SafeImage
                  src={item.image}
                  alt={item.title}
                  focalPosition="center"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-[#1F2A66]/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-3 text-white text-center">
                  <span className="font-display font-bold text-xs">{item.title}</span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 8. Parent Testimonials (Exact from littlestarskindergarten.online) */}
      <section className="py-16 bg-white border-b border-line">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-1 text-[#FFC42E]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-[#FFC42E]" />
              ))}
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-black text-[#1F2A66]">
              Loved by Coimbatore Parents
            </h2>
            <p className="text-sm sm:text-base text-[#5B6178]">
              Read verified testimonials from families whose children thrive at Little Stars Kindergarten.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {INITIAL_TESTIMONIALS.slice(0, 3).map((test) => (
              <div
                key={test.id}
                className="p-6 rounded-3xl bg-[#F6F9FF] border border-line space-y-4 flex flex-col justify-between shadow-2xs"
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-1 text-[#FFC42E]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#FFC42E]" />
                    ))}
                  </div>
                  <p className="text-sm text-[#1B2138] italic leading-relaxed">
                    “{test.quote}”
                  </p>
                </div>

                <div className="flex items-center gap-3 pt-3 border-t border-line">
                  <div className="w-10 h-10 rounded-full bg-[#1F2A66] text-[#FFC42E] font-display font-bold flex items-center justify-center text-sm">
                    {test.avatarLetter}
                  </div>
                  <div>
                    <div className="font-bold text-xs text-[#1F2A66]">{test.parentName}</div>
                    <div className="text-[11px] text-[#5B6178]">{test.relation} ({test.grade})</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 9. Admission CTA Banner */}
      <section className="py-16 bg-[#FFF7FB]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white rounded-3xl border border-pink-200 p-8 sm:p-12 shadow-xl space-y-6 relative overflow-hidden">
            
            <div className="w-16 h-16 rounded-full bg-amber-100 text-[#FFC42E] flex items-center justify-center mx-auto shadow-xs">
              <Star className="w-8 h-8 fill-[#FFC42E]" />
            </div>

            <div className="space-y-2">
              <h2 className="text-3xl sm:text-4xl font-display font-black text-[#1F2A66]">
                Give Your Child the Star Start They Deserve
              </h2>
              <p className="text-sm sm:text-base text-[#5B6178] max-w-xl mx-auto">
                Limited enrollment slots available for the 2026–2027 Academic Year. 
                Register your child's application online or visit our Coimbatore campus today.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                onClick={() => onNavigate('admissions')}
                className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#ED2E84] hover:bg-[#D11E6F] text-white font-bold text-sm shadow-md transition-all cursor-pointer hover:scale-105"
              >
                Apply for Admission Now
              </button>
              <button
                onClick={() => onNavigate('contact')}
                className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-slate-100 hover:bg-slate-200 text-[#1F2A66] font-bold text-sm transition-all cursor-pointer"
              >
                Speak with Admissions Coordinator
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* 10. Contact Information Strip */}
      <section className="py-12 bg-white border-t border-line">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-[#F6F9FF] border border-line">
              <div className="w-10 h-10 rounded-xl bg-pink-100 text-[#ED2E84] flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div className="text-xs">
                <strong className="block font-bold text-[#1F2A66]">Coimbatore Campus</strong>
                <span className="text-slate-600">14/2, Star Avenue, Near RS Puram</span>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 rounded-2xl bg-[#F6F9FF] border border-line">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-[#FFC42E] flex items-center justify-center shrink-0">
                <Phone className="w-5 h-5" />
              </div>
              <div className="text-xs">
                <strong className="block font-bold text-[#1F2A66]">Admissions Helpline</strong>
                <a href="tel:+919600318663" className="text-slate-600 hover:text-[#ED2E84] font-semibold">+91 96003 18663</a>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 rounded-2xl bg-[#F6F9FF] border border-line">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-[#5BB836] flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div className="text-xs">
                <strong className="block font-bold text-[#1F2A66]">Visiting Hours</strong>
                <span className="text-slate-600">Mon – Fri: 08:30 AM – 04:30 PM</span>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
