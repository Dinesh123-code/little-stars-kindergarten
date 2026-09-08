import React, { useState } from 'react';
import { X, Calendar, Clock, MapPin, CheckCircle, Eye, Shield, Users, Sparkles, ArrowRight } from 'lucide-react';
import { PageView } from '../types';
import { SafeImage } from './SafeImage';
import { dbService } from '../services/dbService';

interface CampusTourModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (page: PageView) => void;
}

export const CampusTourModal: React.FC<CampusTourModalProps> = ({
  isOpen,
  onClose,
  onNavigate,
}) => {
  const [activeTab, setActiveTab] = useState<'schedule' | 'virtual'>('schedule');
  
  // Schedule Form State
  const [parentName, setParentName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [preferredDate, setPreferredDate] = useState('');
  const [preferredSlot, setPreferredSlot] = useState('10:00 AM - 11:00 AM (Morning Tour)');
  const [childAgeGroup, setChildAgeGroup] = useState('Nursery (2.5 - 3.5 yrs)');
  const [isBooked, setIsBooked] = useState(false);
  const [bookingRef, setBookingRef] = useState('');

  // Virtual Tour Active Photo
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);

  if (!isOpen) return null;

  const virtualSpots = [
    {
      title: 'Montessori Sensorial & Discovery Lab',
      desc: 'Ergonomically scaled wooden learning apparatus, sensory trays, tactile beads, and self-correcting mathematical blocks.',
      image: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&w=1200&q=80',
      specs: '1:8 Dedicated Mentorship • Child-Safe Non-Toxic Materials • Natural Sunlight Ventilation',
    },
    {
      title: 'Storytelling Amphitheatre & Library',
      desc: 'Over 2,500 curated international early reader titles, cozy plush reading nooks, and weekly theatrical puppetry stage.',
      image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=1200&q=80',
      specs: 'Acoustic Wall Panels • Bilingual Phonics Kits • Audio Story Stations',
    },
    {
      title: 'Splash & Sensory Aquatic Bay',
      desc: 'Heated, 1.5-foot depth hygienic splash pool managed by pediatric certified swimming coaches and certified lifeguards.',
      image: 'https://images.unsplash.com/photo-1472162072942-cd5147eb3902?auto=format&fit=crop&w=1200&q=80',
      specs: 'UV-Ozone Water Purification • Anti-Slip Safety Flooring • Heated Rinse Showers',
    },
    {
      title: 'Organic Pediatric Dining Hall',
      desc: 'Freshly prepared vegetarian meals planned by certified child nutritionists, introducing balanced seasonal superfoods.',
      image: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&w=1200&q=80',
      specs: 'FSSAI Certified Kitchen • Allergy Alert Protocols • Table Etiquette Coaching',
    },
    {
      title: 'Safe Turf Outdoor Adventure Playground',
      desc: 'Shock-absorbing EPDM rubberized play surface, safe swings, climbing sensory mounds, and shaded sand castle arenas.',
      image: 'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&w=1200&q=80',
      specs: 'Certified Impact Safety Standards • Continuous CCTV Monitoring • First-Aid Station',
    },
  ];

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!parentName.trim() || !phone.trim() || !preferredDate) return;
    
    try {
      const record = dbService.addAdmission({
        child_name: `${parentName.trim()}'s Ward`,
        parent_name: parentName.trim(),
        phone: phone.trim(),
        email: email.trim() || 'campus-tour@littlestars.local',
        dob: '2023-01-01',
        applying_class: childAgeGroup.split(' ')[0] || 'Nursery',
        message: `[Campus Tour Booking] Preferred Date: ${preferredDate}, Slot: ${preferredSlot}`,
      });
      setBookingRef(record.reference_no);
    } catch {
      const ref = 'TOUR-' + Math.floor(100000 + Math.random() * 900000);
      setBookingRef(ref);
    }
    setIsBooked(true);
  };

  const handleReset = () => {
    setIsBooked(false);
    setParentName('');
    setPhone('');
    setEmail('');
    setPreferredDate('');
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
        {/* Header with Navigation Tabs */}
        <div className="bg-slate-900 text-white p-6 sm:p-8 flex justify-between items-start border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-1">
              <MapPin className="w-4 h-4" />
              <span>Campus Experience & Visit Coordinator</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-white">
              Explore Our Campus & Schedule a Tour
            </h2>
            <p className="text-xs text-slate-300 mt-1 max-w-xl">
              Discover our world-class early childhood infrastructure in person or explore interactive photographic spaces online.
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

        {/* Tab switcher */}
        <div className="flex border-b border-slate-200 bg-slate-100 px-6 sm:px-8 text-xs font-bold">
          <button
            onClick={() => setActiveTab('schedule')}
            className={`py-3 px-4 border-b-2 transition cursor-pointer flex items-center gap-2 ${
              activeTab === 'schedule'
                ? 'border-amber-500 text-amber-900 bg-white'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Schedule Personal On-Campus Visit</span>
          </button>
          <button
            onClick={() => setActiveTab('virtual')}
            className={`py-3 px-4 border-b-2 transition cursor-pointer flex items-center gap-2 ${
              activeTab === 'virtual'
                ? 'border-amber-500 text-amber-900 bg-white'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Interactive Virtual Photo Walkthrough</span>
          </button>
        </div>

        {/* Tab 1: Schedule On-Campus Visit */}
        {activeTab === 'schedule' && (
          <div className="p-6 sm:p-8">
            {isBooked ? (
              <div className="text-center py-8 max-w-lg mx-auto space-y-5">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full">
                    Campus Visit Reserved
                  </span>
                  <h3 className="text-2xl font-display font-extrabold text-slate-900 mt-2">
                    We Look Forward to Welcoming You!
                  </h3>
                  <p className="text-xs text-slate-600 mt-2">
                    Your visit pass has been issued for <strong>{preferredDate}</strong> at <strong>{preferredSlot}</strong>.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-left space-y-1">
                  <div className="text-[11px] font-bold text-amber-900 uppercase">Tour Pass Reference:</div>
                  <div className="font-mono text-xl font-black text-slate-900">{bookingRef}</div>
                  <div className="text-[11px] text-slate-500">
                    Location: Little Stars Campus, Kalapatti, Coimbatore.
                  </div>
                </div>

                <div className="flex justify-center gap-3 pt-2">
                  <button
                    onClick={handleReset}
                    className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold cursor-pointer"
                  >
                    Book Another Slot
                  </button>
                  <button
                    onClick={() => {
                      onClose();
                      onNavigate('admissions');
                    }}
                    className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-amber-950 text-xs font-bold cursor-pointer"
                  >
                    Proceed to Admissions
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleBooking} className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="sm:col-span-2">
                  <h3 className="text-base font-display font-bold text-slate-900">
                    Select Your Preferred Campus Visit Window
                  </h3>
                  <p className="text-xs text-slate-500">
                    Meet Principal Sarah Jenkins, observe live classroom interactions, and inspect our pediatric facilities.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Parent / Guardian Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={parentName}
                    onChange={(e) => setParentName(e.target.value)}
                    placeholder="e.g. Dr. Rajesh Mehra"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-amber-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Phone Contact Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-amber-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="parent@example.com"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-amber-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Child's Age Group / Prospective Class
                  </label>
                  <select
                    value={childAgeGroup}
                    onChange={(e) => setChildAgeGroup(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs bg-white focus:ring-2 focus:ring-amber-400 focus:outline-none"
                  >
                    <option value="Play Group (1.5 - 2.5 yrs)">Play Group (1.5 - 2.5 yrs)</option>
                    <option value="Nursery (2.5 - 3.5 yrs)">Nursery (2.5 - 3.5 yrs)</option>
                    <option value="LKG (3.5 - 4.5 yrs)">LKG (3.5 - 4.5 yrs)</option>
                    <option value="UKG (4.5 - 5.5 yrs)">UKG (4.5 - 5.5 yrs)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Preferred Visit Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={preferredDate}
                    onChange={(e) => setPreferredDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-amber-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Convenient Tour Time Slot *
                  </label>
                  <select
                    value={preferredSlot}
                    onChange={(e) => setPreferredSlot(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs bg-white focus:ring-2 focus:ring-amber-400 focus:outline-none"
                  >
                    <option value="09:30 AM - 10:30 AM (Classroom Observation)">09:30 AM - 10:30 AM (Live Class Observation)</option>
                    <option value="11:30 AM - 12:30 PM (Outdoor & Dining Tour)">11:30 AM - 12:30 PM (Outdoor & Dining Tour)</option>
                    <option value="02:30 PM - 03:30 PM (Principal 1-on-1)">02:30 PM - 03:30 PM (Principal 1-on-1 Consultation)</option>
                    <option value="Saturday 10:00 AM - 11:30 AM (Weekend Family Open House)">Saturday 10:00 AM - 11:30 AM (Weekend Family Open House)</option>
                  </select>
                </div>

                <div className="sm:col-span-2 pt-3">
                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-amber-950 font-display font-extrabold text-xs shadow-md transition cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span>Confirm Campus Tour Reservation</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <p className="text-[10px] text-slate-500 text-center mt-2 flex items-center justify-center gap-1">
                    <Shield className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Free of charge • Personalized parent walkthrough with dedicated counselor</span>
                  </p>
                </div>
              </form>
            )}
          </div>
        )}

        {/* Tab 2: Virtual Photo Walkthrough */}
        {activeTab === 'virtual' && (
          <div className="p-6 sm:p-8 space-y-5">
            <div className="relative rounded-2xl overflow-hidden h-72 sm:h-96 shadow-md border border-slate-200 bg-slate-900">
              <SafeImage
                src={virtualSpots[activePhotoIndex].image}
                alt={virtualSpots[activePhotoIndex].title}
                focalPosition="center"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent flex flex-col justify-end p-6 text-white">
                <span className="text-[10px] uppercase font-bold tracking-widest text-amber-400 bg-slate-900/80 px-2.5 py-1 rounded-full self-start mb-2">
                  Campus Zone {activePhotoIndex + 1} of {virtualSpots.length}
                </span>
                <h4 className="text-xl sm:text-2xl font-display font-bold text-white">
                  {virtualSpots[activePhotoIndex].title}
                </h4>
                <p className="text-xs text-slate-200 max-w-2xl mt-1 leading-relaxed">
                  {virtualSpots[activePhotoIndex].desc}
                </p>
                <div className="mt-3 text-[11px] text-amber-300 font-semibold flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{virtualSpots[activePhotoIndex].specs}</span>
                </div>
              </div>
            </div>

            {/* Thumbnail selector */}
            <div className="grid grid-cols-5 gap-2 sm:gap-3">
              {virtualSpots.map((spot, idx) => (
                <button
                  key={idx}
                  onClick={() => setActivePhotoIndex(idx)}
                  className={`rounded-xl overflow-hidden border-2 transition cursor-pointer text-left ${
                    activePhotoIndex === idx
                      ? 'border-amber-500 ring-2 ring-amber-400/50'
                      : 'border-slate-200 opacity-70 hover:opacity-100'
                  }`}
                >
                  <SafeImage
                    src={spot.image}
                    alt={spot.title}
                    focalPosition="center"
                    className="w-full h-14 sm:h-18 object-cover"
                  />
                  <div className="p-1.5 bg-white text-[10px] font-bold text-slate-800 truncate hidden sm:block">
                    {spot.title}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
