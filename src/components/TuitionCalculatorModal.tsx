import React, { useState } from 'react';
import { X, Calculator, Check, ArrowRight, ShieldCheck, Sparkles, Download } from 'lucide-react';
import { PageView } from '../types';

interface TuitionCalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (page: PageView, extraParams?: { selectedClass?: string }) => void;
}

export const TuitionCalculatorModal: React.FC<TuitionCalculatorModalProps> = ({
  isOpen,
  onClose,
  onNavigate,
}) => {
  const [selectedClass, setSelectedClass] = useState<'Play Group' | 'Nursery' | 'LKG' | 'UKG'>('Nursery');
  const [sessionPlan, setSessionPlan] = useState<'half' | 'standard' | 'extended'>('standard');
  const [transport, setTransport] = useState<'none' | 'oneway' | 'twoway'>('twoway');
  const [mealPlan, setMealPlan] = useState<'standard' | 'full'>('full');
  const [hasSibling, setHasSibling] = useState<boolean>(false);
  const [enrichmentClub, setEnrichmentClub] = useState<boolean>(true);

  if (!isOpen) return null;

  // Base tuition by class per month (in INR)
  const baseFees: Record<string, number> = {
    'Play Group': 4800,
    'Nursery': 5200,
    'LKG': 5600,
    'UKG': 5800,
  };

  // Session plan additions
  const sessionMultipliers: Record<string, number> = {
    half: 0,
    standard: 600,
    extended: 2200,
  };

  // Transport costs
  const transportCosts: Record<string, number> = {
    none: 0,
    oneway: 1200,
    twoway: 2000,
  };

  // Meal costs
  const mealCosts: Record<string, number> = {
    standard: 400, // Morning fresh fruit & milk
    full: 1200,     // Fresh cooked vegetarian hot lunch + fruit snack
  };

  const enrichmentCost = enrichmentClub ? 800 : 0;

  const grossMonthly =
    baseFees[selectedClass] +
    sessionMultipliers[sessionPlan] +
    transportCosts[transport] +
    mealCosts[mealPlan] +
    enrichmentCost;

  const siblingDiscount = hasSibling ? Math.round(grossMonthly * 0.1) : 0;
  const netMonthly = grossMonthly - siblingDiscount;
  const annualEstimate = netMonthly * 10; // 10-month academic calendar
  const oneTimeAdmission = 15000; // One-time refundable security + welcome kit

  const handleApplyWithPlan = () => {
    onClose();
    onNavigate('admissions', { selectedClass });
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl max-w-3xl w-full my-8 shadow-2xl border border-slate-200 overflow-hidden relative text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-slate-900 text-white p-6 sm:p-8 flex justify-between items-start border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-1">
              <Calculator className="w-4 h-4" />
              <span>Transparent Pricing • Academic Year 2026 - 2027</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-white">
              Tuition & Program Fee Estimator
            </h2>
            <p className="text-xs text-slate-300 mt-1 max-w-xl">
              Customize your child’s educational schedule, meal options, and safety transport to view a transparent, itemized investment summary.
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center transition cursor-pointer shrink-0 ml-3"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Controls (Col 7) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Step 1: Grade Level */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-800 mb-2">
                1. Select Academic Program
              </label>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                {(['Play Group', 'Nursery', 'LKG', 'UKG'] as const).map((grade) => (
                  <button
                    key={grade}
                    type="button"
                    onClick={() => setSelectedClass(grade)}
                    className={`py-2.5 px-3 rounded-xl text-xs font-bold border transition cursor-pointer text-center ${
                      selectedClass === grade
                        ? 'border-amber-500 bg-amber-50 text-amber-950 shadow-xs'
                        : 'border-slate-200 hover:border-slate-300 bg-slate-50 text-slate-700'
                    }`}
                  >
                    {grade}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Session Timings */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-800 mb-2">
                2. Daily Schedule Format
              </label>
              <div className="space-y-2">
                {[
                  { id: 'half', title: 'Half Day (8:30 AM – 11:45 AM)', desc: 'Core academic hours, sensory play & morning fruit circle' },
                  { id: 'standard', title: 'Standard Full Day (8:30 AM – 01:15 PM)', desc: 'Includes creative arts, science lab & hot lunch hour' },
                  { id: 'extended', title: 'Extended Daycare (8:00 AM – 06:00 PM)', desc: 'Includes rest cottage nap, evening snack & guided play' },
                ].map((s) => (
                  <label
                    key={s.id}
                    onClick={() => setSessionPlan(s.id as any)}
                    className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition ${
                      sessionPlan === s.id
                        ? 'border-amber-500 bg-amber-50/70 text-slate-900'
                        : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <input
                      type="radio"
                      name="session"
                      checked={sessionPlan === s.id}
                      onChange={() => {}}
                      className="mt-1 text-amber-600 focus:ring-amber-500"
                    />
                    <div className="text-xs">
                      <div className="font-bold text-slate-900">{s.title}</div>
                      <div className="text-slate-500 text-[11px]">{s.desc}</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Step 3: Transport & Meals */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-800 mb-1.5">
                  3. AC Bus Transportation
                </label>
                <select
                  value={transport}
                  onChange={(e) => setTransport(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs bg-white text-slate-800 font-medium focus:ring-2 focus:ring-amber-400 focus:outline-none"
                >
                  <option value="none">Self Drop / Pick-Up (₹0)</option>
                  <option value="oneway">One-Way Route (₹1,200/mo)</option>
                  <option value="twoway">Two-Way GPS Fleet (₹2,000/mo)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-800 mb-1.5">
                  4. Pediatric Meal Program
                </label>
                <select
                  value={mealPlan}
                  onChange={(e) => setMealPlan(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs bg-white text-slate-800 font-medium focus:ring-2 focus:ring-amber-400 focus:outline-none"
                >
                  <option value="standard">Snacks & Milk only (₹400/mo)</option>
                  <option value="full">Hot Lunch + Fresh Fruit (₹1,200/mo)</option>
                </select>
              </div>
            </div>

            {/* Step 4: Add-ons & Sibling Discount */}
            <div className="space-y-2 pt-1 border-t border-slate-100">
              <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={enrichmentClub}
                  onChange={(e) => setEnrichmentClub(e.target.checked)}
                  className="rounded text-amber-600 focus:ring-amber-500"
                />
                <span className="font-semibold text-slate-800">Junior STEAM, Robotics & Music Club (+₹800/mo)</span>
              </label>

              <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={hasSibling}
                  onChange={(e) => setHasSibling(e.target.checked)}
                  className="rounded text-amber-600 focus:ring-amber-500"
                />
                <span className="font-semibold text-emerald-700">Sibling Concession Discount (-10% off monthly tuition)</span>
              </label>
            </div>
          </div>

          {/* Breakdown Summary Card (Col 5) */}
          <div className="lg:col-span-5 bg-slate-50 p-6 rounded-2xl border border-slate-200 flex flex-col justify-between space-y-5">
            <div>
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Plan Summary</span>
                <span className="text-xs font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full">
                  {selectedClass}
                </span>
              </div>

              <div className="space-y-2.5 pt-4 text-xs text-slate-600">
                <div className="flex justify-between">
                  <span>Base Tuition ({selectedClass}):</span>
                  <span className="font-semibold text-slate-900">₹{baseFees[selectedClass].toLocaleString()}</span>
                </div>
                {sessionMultipliers[sessionPlan] > 0 && (
                  <div className="flex justify-between">
                    <span>Schedule Extension:</span>
                    <span className="font-semibold text-slate-900">+₹{sessionMultipliers[sessionPlan].toLocaleString()}</span>
                  </div>
                )}
                {transportCosts[transport] > 0 && (
                  <div className="flex justify-between">
                    <span>Transport ({transport === 'twoway' ? '2-Way' : '1-Way'}):</span>
                    <span className="font-semibold text-slate-900">+₹{transportCosts[transport].toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Nutrition & Meals:</span>
                  <span className="font-semibold text-slate-900">+₹{mealCosts[mealPlan].toLocaleString()}</span>
                </div>
                {enrichmentClub && (
                  <div className="flex justify-between">
                    <span>Enrichment Club:</span>
                    <span className="font-semibold text-slate-900">+₹{enrichmentCost.toLocaleString()}</span>
                  </div>
                )}
                {hasSibling && (
                  <div className="flex justify-between text-emerald-700 font-semibold">
                    <span>Sibling Concession (10%):</span>
                    <span>-₹{siblingDiscount.toLocaleString()}</span>
                  </div>
                )}
              </div>

              {/* Totals */}
              <div className="mt-5 pt-4 border-t-2 border-slate-200">
                <div className="flex justify-between items-baseline">
                  <span className="text-xs font-bold text-slate-700 uppercase">Estimated Monthly:</span>
                  <span className="text-2xl font-display font-black text-slate-950">
                    ₹{netMonthly.toLocaleString()}
                    <span className="text-xs font-normal text-slate-500"> / mo</span>
                  </span>
                </div>
                <div className="flex justify-between items-center text-xs text-slate-500 mt-1">
                  <span>Academic Year (10 mos):</span>
                  <span className="font-semibold text-slate-700">₹{annualEstimate.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center text-[11px] text-slate-400 mt-1">
                  <span>One-time Enrollment Deposit:</span>
                  <span>₹{oneTimeAdmission.toLocaleString()} (Refundable)</span>
                </div>
              </div>
            </div>

            <div className="space-y-2 pt-4">
              <button
                onClick={handleApplyWithPlan}
                className="w-full py-3.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-600 text-amber-950 font-display font-extrabold text-xs shadow-md transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Apply Online for {selectedClass}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <p className="text-[10px] text-slate-500 text-center flex items-center justify-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Zero hidden fees • Books, uniforms, and art supplies included</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
