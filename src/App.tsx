import React, { useState, useEffect } from 'react';
import { PageView, Program, AdmissionEnquiry, ContactEnquiry } from './types';
import { dbService } from './services/dbService';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './components/HomePage';
import { AboutPage } from './components/AboutPage';
import { ProgramsPage } from './components/ProgramsPage';
import { ActivitiesPage } from './components/ActivitiesPage';
import { FacilitiesPage } from './components/FacilitiesPage';
import { GalleryPage } from './components/GalleryPage';
import { AdmissionsPage } from './components/AdmissionsPage';
import { ContactPage } from './components/ContactPage';
import { AdminPanel } from './components/AdminPanel';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageView>('home');
  const [initialClassForAdmission, setInitialClassForAdmission] = useState<string | undefined>(undefined);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  // State synchronized with database
  const [programs, setPrograms] = useState<Program[]>([]);
  const [admissions, setAdmissions] = useState<AdmissionEnquiry[]>([]);
  const [contacts, setContacts] = useState<ContactEnquiry[]>([]);

  // Load data from dbService on mount and when refreshed
  const refreshData = () => {
    setPrograms(dbService.getPrograms());
    setAdmissions(dbService.getAdmissions());
    setContacts(dbService.getContacts());
    setIsAdminLoggedIn(dbService.isLoggedIn());
  };

  useEffect(() => {
    refreshData();

    // Hide preloader animation screen
    const timer = setTimeout(() => {
      const preloader = document.getElementById('preloader');
      if (preloader) {
        preloader.classList.add('preloader-hidden');
      }
    }, 350);

    return () => clearTimeout(timer);
  }, []);

  // Scroll to top on page transition
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  // Scroll progress bar and floating Back-to-Top listener
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
      
      const progressBar = document.getElementById('scrollProgressBar');
      if (progressBar) {
        progressBar.style.width = scrolled + '%';
      }

      setShowBackToTop(winScroll > 260);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll Reveal IntersectionObserver Engine for React views
  useEffect(() => {
    const selector = '.scroll-reveal, .scroll-reveal-img, .story-heading, .story-body, .reveal-left, .reveal-right, .reveal-up';
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      document.querySelectorAll(selector).forEach(el => el.classList.add('is-revealed'));
      return;
    }

    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -50px 0px',
      threshold: 0.08
    };

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          obs.unobserve(entry.target);
        }
      });
    }, observerOptions);

    const revealElements = document.querySelectorAll(selector);
    revealElements.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom >= 0) {
        el.classList.add('is-revealed');
      } else {
        observer.observe(el);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [currentPage]);

  const handleNavigate = (page: PageView, extraParams?: { selectedClass?: string }) => {
    if (extraParams?.selectedClass) {
      setInitialClassForAdmission(extraParams.selectedClass);
    }
    setCurrentPage(page);
  };

  const handleAdminLogin = (password: string) => {
    const success = dbService.login(password);
    if (success) {
      setIsAdminLoggedIn(true);
    }
    return success;
  };

  const handleAdminLogout = () => {
    dbService.logout();
    setIsAdminLoggedIn(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-[#1F2A66] font-sans selection:bg-[#ED2E84] selection:text-white">
      {/* Main Navbar */}
      <Navbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        isAdminLoggedIn={isAdminLoggedIn}
      />

      {/* Main View Area */}
      <main className="flex-1">
        {currentPage === 'home' && (
          <HomePage
            programs={programs}
            onNavigate={handleNavigate}
          />
        )}

        {currentPage === 'about' && (
          <AboutPage onNavigate={handleNavigate} />
        )}

        {currentPage === 'programs' && (
          <ProgramsPage
            programs={programs}
            onNavigate={handleNavigate}
          />
        )}

        {currentPage === 'activities' && (
          <ActivitiesPage onNavigate={handleNavigate} />
        )}

        {currentPage === 'facilities' && (
          <FacilitiesPage onNavigate={handleNavigate} />
        )}

        {currentPage === 'gallery' && (
          <GalleryPage onNavigate={handleNavigate} />
        )}

        {currentPage === 'admissions' && (
          <AdmissionsPage
            programs={programs}
            initialClass={initialClassForAdmission}
            admissions={admissions}
            onSuccessSubmit={refreshData}
            onNavigate={handleNavigate}
          />
        )}

        {currentPage === 'contact' && (
          <ContactPage />
        )}

        {currentPage === 'admin' && (
          <AdminPanel
            programs={programs}
            admissions={admissions}
            contacts={contacts}
            isLoggedIn={isAdminLoggedIn}
            onLogin={handleAdminLogin}
            onLogout={handleAdminLogout}
            onRefreshData={refreshData}
            onNavigate={handleNavigate}
          />
        )}
      </main>

      {/* Global Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Floating Back To Top Button */}
      <button
        id="backToTopBtn"
        className={showBackToTop ? 'is-visible' : ''}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Scroll back to top"
      >
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M12 4l-8 8h5v8h6v-8h5z" />
        </svg>
      </button>
    </div>
  );
}
