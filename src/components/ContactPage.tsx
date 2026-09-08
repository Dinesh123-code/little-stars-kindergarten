import React, { useState } from 'react';
import { dbService } from '../services/dbService';
import { 
  Phone, Mail, MapPin, Clock, Send, CheckCircle2, 
  AlertCircle, MessageSquare, Sparkles, Navigation 
} from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const validate = () => {
    const errs: { [key: string]: string } = {};
    if (!formData.name.trim()) errs.name = 'Please provide your full name.';
    if (!formData.email.trim()) {
      errs.email = 'Email address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'Please enter a valid email format.';
    }
    if (!formData.phone.trim()) errs.phone = 'Phone number is required.';
    if (!formData.message.trim()) errs.message = 'Please type your enquiry message.';

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setSuccessMessage(null);

    setTimeout(() => {
      try {
        dbService.addContact({
          name: formData.name.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim(),
          message: formData.message.trim(),
        });

        setSuccessMessage('Thank you for reaching out! Your message has been safely saved to our database and our administration team will respond shortly.');
        setFormData({ name: '', email: '', phone: '', message: '' });
        setErrors({});
      } catch (err) {
        setErrors({ general: 'Failed to record enquiry. Please try again or call us directly.' });
      } finally {
        setIsSubmitting(false);
      }
    }, 400);
  };

  return (
    <div className="bg-white min-h-screen py-12 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-[#29A8E0] text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Connect with Little Stars</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-display font-black text-[#1F2A66] tracking-tight">
            Contact Our Admissions Office
          </h1>

          <p className="text-base sm:text-lg text-[#5B6178] leading-relaxed">
            We are always here to listen, guide, and welcome your family to our campus in Coimbatore. 
            Send us a message or visit us in person!
          </p>
        </div>

        {/* 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left: Contact Info Cards */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Campus Address */}
            <div className="p-6 rounded-3xl bg-[#F6F9FF] border border-line flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-white text-[#ED2E84] flex items-center justify-center shadow-xs shrink-0">
                <MapPin className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h3 className="font-display font-bold text-lg text-[#1F2A66]">Campus Location</h3>
                <p className="text-xs sm:text-sm text-[#5B6178] leading-relaxed">
                  Little Stars Campus, Kalapatti,<br />
                  Coimbatore, Tamil Nadu – 641048, India
                </p>
                <a
                  href="https://maps.google.com/?q=Kalapatti,Coimbatore,Tamil+Nadu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-bold text-[#ED2E84] hover:underline pt-1"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Get Driving Directions</span>
                </a>
              </div>
            </div>

            {/* Telephone & Mobile */}
            <div className="p-6 rounded-3xl bg-[#F6F9FF] border border-line flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-white text-[#FFC42E] flex items-center justify-center shadow-xs shrink-0">
                <Phone className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h3 className="font-display font-bold text-lg text-[#1F2A66]">Phone &amp; WhatsApp</h3>
                <p className="text-xs sm:text-sm text-[#5B6178]">
                  Direct Admissions Desk: <a href="tel:+919600318663" className="font-bold text-[#1F2A66] hover:text-[#ED2E84]">+91 96003 18663</a>
                </p>
                <p className="text-xs sm:text-sm text-[#5B6178]">
                  WhatsApp Coordinator: <a href="https://wa.me/919600318663" target="_blank" rel="noopener noreferrer" className="font-bold text-[#5BB836] hover:underline">+91 96003 18663</a>
                </p>
              </div>
            </div>

            {/* Email */}
            <div className="p-6 rounded-3xl bg-[#F6F9FF] border border-line flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-white text-[#29A8E0] flex items-center justify-center shadow-xs shrink-0">
                <Mail className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h3 className="font-display font-bold text-lg text-[#1F2A66]">Email Correspondence</h3>
                <p className="text-xs sm:text-sm text-[#5B6178]">
                  Inquiries: <a href="mailto:hello@littlestarskindergarten.online" className="font-bold text-[#1F2A66] hover:text-[#ED2E84]">hello@littlestarskindergarten.online</a>
                </p>
                <p className="text-xs sm:text-sm text-[#5B6178]">
                  Admissions: <a href="mailto:admissions@littlestarskindergarten.online" className="font-bold text-[#1F2A66] hover:text-[#ED2E84]">admissions@littlestarskindergarten.online</a>
                </p>
              </div>
            </div>

            {/* Operating Hours */}
            <div className="p-6 rounded-3xl bg-[#1F2A66] text-white flex items-start gap-4 shadow-md">
              <div className="w-12 h-12 rounded-2xl bg-white/10 text-[#FFC42E] flex items-center justify-center shrink-0">
                <Clock className="w-6 h-6" />
              </div>
              <div className="space-y-1 text-xs">
                <h3 className="font-display font-bold text-lg text-white">Campus Visiting Hours</h3>
                <div className="text-slate-200">Monday – Friday: <strong>08:30 AM – 04:30 PM</strong></div>
                <div className="text-slate-200">Saturday: <strong>09:00 AM – 01:30 PM</strong></div>
                <div className="text-slate-400 text-[11px] pt-1">Closed on Sundays &amp; Government Holidays</div>
              </div>
            </div>

          </div>

          {/* Right: Contact Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-line p-6 sm:p-10 shadow-lg">
            
            <div className="border-b border-line pb-4 mb-6">
              <h2 className="text-2xl font-display font-black text-[#1F2A66]">
                Send Us a Message
              </h2>
              <p className="text-xs text-[#5B6178]">
                Every inquiry is recorded in our database and attended to by the school leadership.
              </p>
            </div>

            {successMessage && (
              <div className="mb-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="block font-bold">Message Received!</strong>
                  <span>{successMessage}</span>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* Name */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#1F2A66] block">
                  Your Full Name <span className="text-[#ED2E84]">*</span>
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Kavitha Ramesh"
                  className={`w-full px-4 py-2.5 rounded-xl border text-sm transition-colors focus:outline-none ${
                    errors.name ? 'border-red-400 bg-red-50/50' : 'border-line focus:border-[#ED2E84]'
                  }`}
                />
                {errors.name && <p className="text-[11px] text-red-600">{errors.name}</p>}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Email */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#1F2A66] block">
                    Email Address <span className="text-[#ED2E84]">*</span>
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g. kavitha@gmail.com"
                    className={`w-full px-4 py-2.5 rounded-xl border text-sm transition-colors focus:outline-none ${
                      errors.email ? 'border-red-400 bg-red-50/50' : 'border-line focus:border-[#ED2E84]'
                    }`}
                  />
                  {errors.email && <p className="text-[11px] text-red-600">{errors.email}</p>}
                </div>

                {/* Phone */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#1F2A66] block">
                    Phone Number <span className="text-[#ED2E84]">*</span>
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="e.g. +91 94433 11223"
                    className={`w-full px-4 py-2.5 rounded-xl border text-sm transition-colors focus:outline-none ${
                      errors.phone ? 'border-red-400 bg-red-50/50' : 'border-line focus:border-[#ED2E84]'
                    }`}
                  />
                  {errors.phone && <p className="text-[11px] text-red-600">{errors.phone}</p>}
                </div>
              </div>

              {/* Message */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#1F2A66] block">
                  Your Question or Message <span className="text-[#ED2E84]">*</span>
                </label>
                <textarea
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Inquiring about syllabus, afternoon daycare, van coverage in RS Puram..."
                  className={`w-full px-4 py-2.5 rounded-xl border text-sm transition-colors focus:outline-none ${
                    errors.message ? 'border-red-400 bg-red-50/50' : 'border-line focus:border-[#ED2E84]'
                  }`}
                />
                {errors.message && <p className="text-[11px] text-red-600">{errors.message}</p>}
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 px-6 rounded-full bg-[#1F2A66] hover:bg-[#161E4A] text-white text-base font-bold shadow-md transition-all cursor-pointer flex items-center justify-center gap-2 hover:scale-[1.01] disabled:opacity-70"
              >
                {isSubmitting ? (
                  <span>Sending Message...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Send Message to Office</span>
                  </>
                )}
              </button>

              <div className="text-center text-[11px] text-slate-400 pt-2">
                Our administration office typically responds within 24 business hours.
              </div>

            </form>

          </div>

        </div>

      </div>
    </div>
  );
};
