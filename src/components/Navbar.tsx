import React, { useState } from 'react';
import { PageView } from '../types';
import { 
  Star, Phone, Menu, X, Shield, ArrowRight, Sparkles, Heart, 
  GraduationCap, Calendar, Clock, Lock
} from 'lucide-react';

interface NavbarProps {
  currentPage: PageView;
  onNavigate: (page: PageView, extraParams?: { selectedClass?: string }) => void;
  isAdminLoggedIn: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  currentPage, 
  onNavigate,
  isAdminLoggedIn 
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { label: string; page: PageView }[] = [
    { label: 'Home', page: 'home' },
    { label: 'About Us', page: 'about' },
    { label: 'Programs / Classes', page: 'programs' },
    { label: 'Activities', page: 'activities' },
    { label: 'Facilities', page: 'facilities' },
    { label: 'Gallery', page: 'gallery' },
    { label: 'Admissions', page: 'admissions' },
    { label: 'Contact Us', page: 'contact' },
  ];

  const handleNavClick = (page: PageView) => {
    onNavigate(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-line shadow-xs">
      {/* Top Notification Bar */}
      <div className="bg-[#1F2A66] text-white py-1.5 px-4 text-xs">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#FFC42E] animate-pulse" />
            <span className="font-semibold text-yellow-300">Admissions Open 2026–2027:</span>
            <span className="hidden sm:inline text-slate-200">Play Group, Nursery, LKG & UKG in Coimbatore</span>
          </div>
          <div className="flex items-center gap-4 text-[11px] text-slate-300">
            <a 
              href="tel:+919600318663" 
              className="flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <Phone className="w-3 h-3 text-[#FFC42E]" />
              <span className="font-bold">+91 96003 18663</span>
            </a>
            <span className="text-slate-600">|</span>
            <button 
              onClick={() => handleNavClick('admin')} 
              className="flex items-center gap-1 hover:text-yellow-300 transition-colors cursor-pointer"
              title="Staff Administration Portal"
            >
              <Lock className="w-3 h-3 text-slate-400" />
              <span>{isAdminLoggedIn ? 'Admin Panel (Logged In)' : 'Admin Login'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo */}
          <div 
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-12 h-12 rounded-2xl bg-[#1F2A66] flex items-center justify-center text-[#FFC42E] shadow-sm group-hover:scale-105 transition-transform">
              <Star className="w-7 h-7 fill-[#FFC42E]" />
            </div>
            <div>
              <div className="font-display font-bold text-2xl sm:text-[26px] text-[#1F2A66] leading-none tracking-tight flex items-center gap-1">
                <span>Little Stars</span>
                <span className="text-[#ED2E84] text-3xl leading-none">.</span>
              </div>
              <div className="text-[11px] font-bold text-[#5B6178] uppercase tracking-wider mt-0.5">
                Kindergarten &amp; Preschool
              </div>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden xl:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = currentPage === item.page;
              return (
                <button
                  key={item.page}
                  onClick={() => handleNavClick(item.page)}
                  className={`px-3 py-2 rounded-xl text-sm font-bold transition-all cursor-pointer ${
                    isActive 
                      ? 'text-[#ED2E84] bg-pink-50' 
                      : 'text-[#1B2138] hover:text-[#1F2A66] hover:bg-slate-100/60'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Header Action Button */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href="https://wa.me/919600318663?text=Hello%20Little%20Stars!%20I%20would%20like%20to%20know%20more%20about%20admissions."
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold text-[#1F2A66] bg-slate-100 hover:bg-slate-200 transition-colors"
            >
              <span>WhatsApp Chat</span>
            </a>

            <button
              onClick={() => handleNavClick('admissions')}
              className="px-5 py-2.5 rounded-full bg-[#ED2E84] hover:bg-[#D11E6F] text-white text-sm font-bold shadow-md shadow-pink-500/20 transition-all cursor-pointer flex items-center gap-2 hover:scale-[1.02]"
            >
              <Sparkles className="w-4 h-4 fill-white" />
              <span>Apply for Admission</span>
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex xl:hidden items-center gap-2">
            <button
              onClick={() => handleNavClick('admissions')}
              className="sm:hidden px-3.5 py-1.5 rounded-full bg-[#ED2E84] text-white text-xs font-bold"
            >
              Apply
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl text-[#1F2A66] hover:bg-slate-100 transition-colors cursor-pointer"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white border-b border-line px-4 pt-3 pb-6 space-y-2 animate-in slide-in-from-top duration-200">
          <div className="grid grid-cols-1 gap-1">
            {navItems.map((item) => {
              const isActive = currentPage === item.page;
              return (
                <button
                  key={item.page}
                  onClick={() => handleNavClick(item.page)}
                  className={`flex items-center justify-between w-full px-4 py-3 rounded-xl text-left text-base font-bold transition-colors ${
                    isActive 
                      ? 'bg-pink-50 text-[#ED2E84]' 
                      : 'text-[#1B2138] hover:bg-slate-50'
                  }`}
                >
                  <span>{item.label}</span>
                  <ArrowRight className="w-4 h-4 text-slate-400" />
                </button>
              );
            })}
          </div>

          <div className="pt-4 border-t border-slate-100 space-y-3">
            <button
              onClick={() => handleNavClick('admin')}
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-sm font-bold text-slate-700 bg-slate-100"
            >
              <Lock className="w-4 h-4" />
              <span>{isAdminLoggedIn ? 'Staff Dashboard' : 'Admin Login'}</span>
            </button>
            <a
              href="tel:+919600318663"
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-sm font-bold text-[#1F2A66] border border-[#1F2A66]/30"
            >
              <Phone className="w-4 h-4" />
              <span>Call +91 96003 18663</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
