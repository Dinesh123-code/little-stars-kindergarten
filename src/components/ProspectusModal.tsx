import React, { useState } from 'react';
import { X, BookOpen, Download, Calendar, Utensils, Shield, Heart, Award, ArrowRight } from 'lucide-react';
import { PageView } from '../types';

interface ProspectusModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (page: PageView) => void;
}

export const ProspectusModal: React.FC<ProspectusModalProps> = ({
  isOpen,
  onClose,
  onNavigate,
}) => {
  const [activeSection, setActiveSection] = useState<'overview' | 'calendar' | 'menu' | 'safety'>('overview');

  if (!isOpen) return null;

  const handleDownload = () => {
    alert('Prospectus 2026-2027 PDF download initiated. A copy has also been archived for your review.');
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl max-w-4xl w-full my-8 shadow-2xl border border-slate-200 overflow-hidden relative text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-slate-900 text-white p-6 sm:p-8 flex justify-between items-start border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-1">
              <Award className="w-4 h-4" />
              <span>Official Publication • Academic Year 2026 – 2027</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-white">
              Prospectus & Academic Handbook
            </h2>
            <p className="text-xs text-slate-300 mt-1 max-w-xl">
              Comprehensive curriculum guidelines, pediatric nutrition standards, term dates, and health protocols for Little Stars Kindergarten.
            </p>
          </div>
          <div className="flex items-center gap-2 ml-4">
            <button
              onClick={handleDownload}
              className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold flex items-center gap-1.5 transition cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Save PDF</span>
            </button>
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center transition cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Section Navigation Tabs */}
        <div className="flex border-b border-slate-200 bg-slate-100 px-6 sm:px-8 text-xs font-bold overflow-x-auto">
          {[
            { id: 'overview', label: 'Curriculum & Pedagogy', icon: BookOpen },
            { id: 'calendar', label: '2026-27 Term Calendar', icon: Calendar },
            { id: 'menu', label: 'Pediatric Weekly Meal Plan', icon: Utensils },
            { id: 'safety', label: 'Child Safety & Health Code', icon: Shield },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveSection(tab.id as any)}
                className={`py-3 px-4 border-b-2 transition whitespace-nowrap cursor-pointer flex items-center gap-2 ${
                  activeSection === tab.id
                    ? 'border-amber-500 text-amber-950 bg-white'
                    : 'border-transparent text-slate-600 hover:text-slate-900'
                }`}
              >
                <Icon className="w-3.5 h-3.5 text-amber-600" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Content Area */}
        <div className="p-6 sm:p-8 max-h-[65vh] overflow-y-auto space-y-6 text-xs text-slate-700 leading-relaxed">
          
          {/* Section 1: Curriculum & Pedagogy */}
          {activeSection === 'overview' && (
            <div className="space-y-6">
              <div className="bg-amber-50/70 p-5 rounded-2xl border border-amber-200">
                <h3 className="text-base font-display font-bold text-slate-900 mb-1">
                  The Little Stars Holistic Early Years Framework
                </h3>
                <p className="text-xs text-slate-600">
                  Our curriculum combines the hands-on inquiry of <strong>Maria Montessori</strong> with the artistic expression of <strong>Reggio Emilia</strong> and British <strong>EYFS early literacy benchmarks</strong>.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-2">
                  <div className="font-bold text-slate-900 text-sm flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center text-xs">1</span>
                    Sensory & Mathematical Foundations
                  </div>
                  <p className="text-slate-600 text-[11px]">
                    Children interact with tactile sensorial apparatus to internalize volume, geometry, numbers, patterns, and foundational problem-solving naturally.
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-2">
                  <div className="font-bold text-slate-900 text-sm flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center text-xs">2</span>
                    Jolly Phonics & Dual Language Immersion
                  </div>
                  <p className="text-slate-600 text-[11px]">
                    Systematic multi-sensory synthetic phonics with 42 core sounds, interactive story circles, puppet theatre, and vocabulary building.
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-2">
                  <div className="font-bold text-slate-900 text-sm flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center text-xs">3</span>
                    STEAM Inquiry & Nature Gardening
                  </div>
                  <p className="text-slate-600 text-[11px]">
                    Little botanists tend organic herb patches, observe caterpillar life cycles, and conduct safe hands-on buoyancy and color-mixing experiments.
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-2">
                  <div className="font-bold text-slate-900 text-sm flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center text-xs">4</span>
                    Social-Emotional & Mindful Habits
                  </div>
                  <p className="text-slate-600 text-[11px]">
                    Emotional recognition through "Feelings Wheels," kindness affirmations, peaceful conflict mediation, and independent self-care routines.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Section 2: Academic Calendar */}
          {activeSection === 'calendar' && (
            <div className="space-y-4">
              <div className="border border-slate-200 rounded-2xl overflow-hidden">
                <table className="w-full text-left text-xs text-slate-600">
                  <thead className="bg-slate-900 text-white uppercase tracking-wider text-[11px]">
                    <tr>
                      <th className="p-3.5">Academic Term</th>
                      <th className="p-3.5">Dates</th>
                      <th className="p-3.5">Key Events & Milestones</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr className="hover:bg-slate-50">
                      <td className="p-3.5 font-bold text-slate-900">Term 1: Discovery</td>
                      <td className="p-3.5 font-mono">June 10 – Sept 25, 2026</td>
                      <td className="p-3.5">Orientation Week, Grandparents Tea, Monsoon Sensory Splash Festival</td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="p-3.5 font-bold text-slate-900">Term 2: Exploration</td>
                      <td className="p-3.5 font-mono">Oct 12 – Dec 23, 2026</td>
                      <td className="p-3.5">Autumn Arts Gala, Annual Sports Carnival, Parent-Teacher Portfolios</td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="p-3.5 font-bold text-slate-900">Term 3: Readiness</td>
                      <td className="p-3.5 font-mono">Jan 06 – March 28, 2027</td>
                      <td className="p-3.5">Little Scientists Expo, Storybook Parade, UKG Graduation Convocation</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-[11px] text-slate-400 italic">
                * School operates Monday through Friday. Half-days and emergency weather protocols follow official regional education department circulars.
              </p>
            </div>
          )}

          {/* Section 3: Pediatric Meal Menu */}
          {activeSection === 'menu' && (
            <div className="space-y-4">
              <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-200 text-emerald-950 text-xs">
                <strong>Certified Nutrition Standards:</strong> 100% vegetarian, organic whole grains, refined-sugar free, strictly zero artificial preservatives. Daily nutrition supervised by our resident pediatric dietitian.
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
                {[
                  { day: 'Monday', morning: 'Steamed Idli with Mild Coconut Chutney', lunch: 'Brown Rice Khichdi, Steamed Carrots & Curd', snack: 'Organic Papaya Slices & Warm Cow Milk' },
                  { day: 'Tuesday', morning: 'Ragi Banana Pancakes (Jaggery sweetened)', lunch: 'Soft Wholewheat Chapati, Dal Tadka & Peas', snack: 'Roasted Foxnuts (Makhana) & Tender Coconut' },
                  { day: 'Wednesday', morning: 'Multigrain Upma with Diced Bell Peppers', lunch: 'Paneer Pulao with Cucumber Mint Raita', snack: 'Apple Puree with Chia Seeds' },
                  { day: 'Thursday', morning: 'Oats Porridge with Almond Flakes', lunch: 'Moong Dal Cheela with Mint Yogurt Dip', snack: 'Steamed Sweet Corn & Warm Milk' },
                  { day: 'Friday', morning: 'Poha with Roasted Peanuts & Squeezed Lime', lunch: 'Vegetable Biryani with Sprouted Moong Salad', snack: 'Homemade Carrot Walnut Cake (Refined Sugar Free)' },
                ].map((m) => (
                  <div key={m.day} className="p-3 rounded-xl border border-slate-200 bg-white space-y-1.5 text-[11px]">
                    <span className="font-bold text-amber-800 text-xs block border-b pb-1">{m.day}</span>
                    <div><strong className="text-slate-700">Breakfast:</strong> {m.morning}</div>
                    <div><strong className="text-slate-700">Lunch:</strong> {m.lunch}</div>
                    <div><strong className="text-slate-700">Snack:</strong> {m.snack}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Section 4: Child Safety */}
          {activeSection === 'safety' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-1.5">
                  <span className="font-bold text-slate-900 text-sm flex items-center gap-2">
                    <Shield className="w-4 h-4 text-emerald-600" />
                    Biometric & 24/7 CCTV Security
                  </span>
                  <p className="text-slate-600 text-[11px]">
                    Over 36 high-definition security cameras cover every corner of the indoor classrooms, sensory labs, hallways, and outdoor perimeter. Secured dual-badge pickup verification for every child.
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-1.5">
                  <span className="font-bold text-slate-900 text-sm flex items-center gap-2">
                    <Heart className="w-4 h-4 text-rose-600" />
                    Resident Nurse & Pediatric Protocol
                  </span>
                  <p className="text-slate-600 text-[11px]">
                    Full-time registered pediatric nurse stationed on campus with complete emergency triage, nebulizer, epipen, and direct ambulance tie-up with Fortis Healthcare Hospital (1.2 km away).
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-1.5">
                  <span className="font-bold text-slate-900 text-sm flex items-center gap-2">
                    <Award className="w-4 h-4 text-amber-600" />
                    100% Background-Verified Staff
                  </span>
                  <p className="text-slate-600 text-[11px]">
                    Every teacher, assistant educator, driver, and housekeeping custodian undergoes police criminal background verification and child protection safeguarding training (POCSO certified).
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-1.5">
                  <span className="font-bold text-slate-900 text-sm flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-sky-600" />
                    GPS Fleet Tracking with SOS
                  </span>
                  <p className="text-slate-600 text-[11px]">
                    Every school bus features real-time parent GPS mobile tracking, female attendant on every route, speed governors restricted to 40 km/h, and verified emergency panic buttons.
                  </p>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Footer actions */}
        <div className="p-4 sm:p-6 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row justify-between items-center gap-3">
          <div className="text-[11px] text-slate-500">
            Admissions currently open for 2026–2027. Seats allocated strictly on developmental readiness.
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => {
                onClose();
                onNavigate('admissions');
              }}
              className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-amber-950 font-bold text-xs cursor-pointer shadow-sm flex items-center gap-1.5"
            >
              <span>Submit Online Admission</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
