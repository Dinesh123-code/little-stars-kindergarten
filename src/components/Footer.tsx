import React from 'react';
import { PageView } from '../types';
import { 
  Star, Phone, Mail, MapPin, Heart, Clock, 
  ArrowRight, ShieldCheck, Lock, Database 
} from 'lucide-react';

interface FooterProps {
  onNavigate: (page: PageView, extraParams?: { selectedClass?: string }) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-[#1F2A66] text-white border-t border-[#161E4A] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Main 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Col 1: Brand Info */}
          <div className="lg:col-span-4 space-y-4">
            <div 
              onClick={() => onNavigate('home')}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center text-[#FFC42E]">
                <Star className="w-6 h-6 fill-[#FFC42E]" />
              </div>
              <div className="font-display font-black text-2xl text-white">
                <span>Little Stars</span>
                <span className="text-[#ED2E84]">.</span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-sm">
              An internationally benchmarked kindergarten &amp; preschool academy in Coimbatore, Tamil Nadu. 
              Fostering joyful inquiry, British EYFS phonics mastery, and holistic Montessori confidence.
            </p>

            <div className="pt-2 flex items-center gap-3 text-xs text-slate-400">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Government Recognized</span>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Heart className="w-4 h-4 text-pink-400 fill-pink-400" />
                <span>Montessori + EYFS</span>
              </span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-display font-bold text-sm text-[#FFC42E] uppercase tracking-wider">
              Quick Navigation
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>
                <button onClick={() => onNavigate('home')} className="hover:text-white transition-colors cursor-pointer">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-white transition-colors cursor-pointer">
                  About Our Academy
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('programs')} className="hover:text-white transition-colors cursor-pointer">
                  Programs &amp; Curriculum
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('activities')} className="hover:text-white transition-colors cursor-pointer">
                  Learning Activities
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('facilities')} className="hover:text-white transition-colors cursor-pointer">
                  Campus Facilities
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('gallery')} className="hover:text-white transition-colors cursor-pointer">
                  Photo Gallery
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('admissions')} className="hover:text-white transition-colors cursor-pointer">
                  Online Admissions
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('contact')} className="hover:text-white transition-colors cursor-pointer">
                  Contact Office
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Programs */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-display font-bold text-sm text-[#FFC42E] uppercase tracking-wider">
              Core Classes
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>
                <button onClick={() => onNavigate('programs', { selectedClass: 'Play Group' })} className="hover:text-white cursor-pointer">
                  Play Group (1.5 – 2.5 Yrs)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('programs', { selectedClass: 'Nursery' })} className="hover:text-white cursor-pointer">
                  Nursery (2.5 – 3.5 Yrs)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('programs', { selectedClass: 'LKG' })} className="hover:text-white cursor-pointer">
                  LKG (3.5 – 4.5 Yrs)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('programs', { selectedClass: 'UKG' })} className="hover:text-white cursor-pointer">
                  UKG (4.5 – 5.5 Yrs)
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Campus Contact */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-display font-bold text-sm text-[#FFC42E] uppercase tracking-wider">
              Coimbatore Campus
            </h4>
            <div className="space-y-2.5 text-xs text-slate-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#ED2E84] shrink-0 mt-0.5" />
                <span>14/2, Star Avenue, Near RS Puram, Coimbatore, Tamil Nadu 641002</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#FFC42E] shrink-0" />
                <a href="tel:+919600318663" className="hover:text-white">+91 96003 18663</a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#29A8E0] shrink-0" />
                <a href="mailto:hello@littlestarskindergarten.online" className="hover:text-white truncate">
                  hello@littlestarskindergarten.online
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Mon – Fri: 08:30 AM – 04:30 PM</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            &copy; {new Date().getFullYear()} Little Stars Kindergarten &amp; Preschool. All Rights Reserved.
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => onNavigate('admin')}
              className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer"
            >
              <Lock className="w-3.5 h-3.5 text-slate-400" />
              <span>Admin Portal</span>
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
