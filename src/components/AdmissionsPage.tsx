import React, { useState, useEffect } from 'react';
import { Program, PageView, AdmissionEnquiry } from '../types';
import { dbService } from '../services/dbService';
import { 
  Sparkles, CheckCircle2, ShieldCheck, Clock, FileText, 
  Send, AlertCircle, Calendar, Phone, Mail, User, Heart,
  Search, Eye, ExternalLink, ArrowRight, Lock, Database, RefreshCw, Trash2
} from 'lucide-react';

interface AdmissionsPageProps {
  programs: Program[];
  initialClass?: string;
  admissions?: AdmissionEnquiry[];
  onSuccessSubmit?: () => void;
  onNavigate: (page: PageView) => void;
}

export const AdmissionsPage: React.FC<AdmissionsPageProps> = ({ 
  programs, 
  initialClass, 
  admissions: propAdmissions,
  onSuccessSubmit,
  onNavigate 
}) => {
  const [formData, setFormData] = useState({
    child_name: '',
    parent_name: '',
    phone: '',
    email: '',
    dob: '',
    applying_class: initialClass || 'Play Group',
    message: '',
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [lastSubmittedRecord, setLastSubmittedRecord] = useState<AdmissionEnquiry | null>(null);
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  
  // Local list of stored admissions
  const [storedAdmissions, setStoredAdmissions] = useState<AdmissionEnquiry[]>([]);
  const [searchHistoryQuery, setSearchHistoryQuery] = useState('');
  const [expandedRecordId, setExpandedRecordId] = useState<number | null>(null);

  const loadStored = () => {
    try {
      const list = dbService.getAdmissions();
      setStoredAdmissions(list);
    } catch {
      // fallback
    }
  };

  useEffect(() => {
    loadStored();
    const handleStorageChange = () => loadStored();
    window.addEventListener('littlestars_admissions_changed', handleStorageChange);
    return () => {
      window.removeEventListener('littlestars_admissions_changed', handleStorageChange);
    };
  }, []);

  useEffect(() => {
    if (propAdmissions && propAdmissions.length > 0) {
      setStoredAdmissions(propAdmissions);
    }
  }, [propAdmissions]);

  useEffect(() => {
    if (initialClass) {
      setFormData((prev) => ({ ...prev, applying_class: initialClass }));
    }
  }, [initialClass]);

  const validate = () => {
    const errs: { [key: string]: string } = {};
    
    if (!formData.child_name.trim()) {
      errs.child_name = "Child's full name is required.";
    }
    
    if (!formData.parent_name.trim()) {
      errs.parent_name = "Parent or guardian name is required.";
    }
    
    const phoneClean = formData.phone.replace(/[^0-9+]/g, '');
    if (!formData.phone.trim()) {
      errs.phone = "Contact phone number is required.";
    } else if (phoneClean.length < 6) {
      errs.phone = "Please provide a valid phone number (at least 6 digits).";
    }

    // Email is optional, but if entered check pattern
    if (formData.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errs.email = "Please provide a valid email address or leave blank.";
    }

    if (!formData.applying_class) {
      errs.applying_class = "Please select a program.";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmissionError(null);

    if (!validate()) {
      setSubmissionError('Please fill in the required fields (Child Name, Parent Name, Phone Number).');
      return;
    }

    setIsSubmitting(true);

    try {
      // Calculate sensible fallback DOB if parent didn't choose one
      let effectiveDob = formData.dob;
      if (!effectiveDob) {
        const yr = new Date().getFullYear();
        if (formData.applying_class.toLowerCase().includes('play')) effectiveDob = `${yr - 2}-05-15`;
        else if (formData.applying_class.toLowerCase().includes('nursery')) effectiveDob = `${yr - 3}-05-15`;
        else if (formData.applying_class.toLowerCase().includes('lkg')) effectiveDob = `${yr - 4}-05-15`;
        else effectiveDob = `${yr - 5}-05-15`;
      }

      // Save to database
      const newRecord = dbService.addAdmission({
        child_name: formData.child_name.trim(),
        parent_name: formData.parent_name.trim(),
        phone: formData.phone.trim(),
        email: formData.email.trim() || 'Not Provided',
        dob: effectiveDob,
        applying_class: formData.applying_class,
        message: formData.message.trim() || 'Online Admission Form Submission',
      });

      setLastSubmittedRecord(newRecord);
      loadStored();

      // Reset form
      setFormData({
        child_name: '',
        parent_name: '',
        phone: '',
        email: '',
        dob: '',
        applying_class: programs[0]?.name || 'Play Group',
        message: '',
      });
      setErrors({});

      if (onSuccessSubmit) {
        onSuccessSubmit();
      }
    } catch (err) {
      setSubmissionError('Failed to save to database. Please ensure your browser supports localStorage or try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredStored = storedAdmissions.filter((a) => {
    const q = searchHistoryQuery.toLowerCase();
    return (
      a.child_name.toLowerCase().includes(q) ||
      a.parent_name.toLowerCase().includes(q) ||
      a.reference_no.toLowerCase().includes(q) ||
      a.applying_class.toLowerCase().includes(q)
    );
  });

  return (
    <div className="bg-[#F6F9FF] min-h-screen py-12 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-50 border border-pink-200 text-[#ED2E84] text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Academic Year 2026 – 2027</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-display font-black text-[#1F2A66] tracking-tight">
            Online Admission Enquiry
          </h1>

          <p className="text-base sm:text-lg text-[#5B6178] leading-relaxed">
            Take the first step toward your child's joyful early childhood journey. 
            Fill out the form below; every application is securely recorded in the school's database with an official reference number.
          </p>
        </div>

        {/* Main Grid: Form + Trust Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Form or Success Receipt */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-line p-6 sm:p-10 shadow-md">
            
            {lastSubmittedRecord ? (
              <div className="space-y-6 py-2 animate-in zoom-in-95 duration-300">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-[#5BB836] flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                
                <div className="text-center space-y-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Application Recorded
                  </span>
                  <h3 className="text-2xl font-display font-black text-[#1F2A66]">
                    Application Saved Successfully!
                  </h3>
                  <p className="text-sm text-[#5B6178] max-w-md mx-auto">
                    Your admission enquiry details have been permanently recorded. Below is your official institutional receipt:
                  </p>
                </div>

                {/* Receipt Card */}
                <div className="p-6 bg-slate-50 border border-slate-200 rounded-2xl space-y-4">
                  <div className="flex flex-wrap items-center justify-between border-b border-slate-200 pb-3 gap-2">
                    <div>
                      <div className="text-[11px] text-slate-500 font-bold uppercase tracking-wider">Official Reference No.</div>
                      <div className="text-xl font-black text-[#ED2E84] tracking-wide">{lastSubmittedRecord.reference_no}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-[11px] text-slate-500 font-bold uppercase tracking-wider">Status</div>
                      <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-800">
                        {lastSubmittedRecord.status}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div>
                      <span className="text-slate-400 block font-semibold">Child's Name</span>
                      <strong className="text-slate-900 text-sm font-bold">{lastSubmittedRecord.child_name}</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block font-semibold">Parent / Guardian</span>
                      <strong className="text-slate-900 text-sm font-bold">{lastSubmittedRecord.parent_name}</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block font-semibold">Program / Class</span>
                      <strong className="text-[#1F2A66] font-bold">{lastSubmittedRecord.applying_class}</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block font-semibold">Contact Phone</span>
                      <strong className="text-slate-900 font-bold">{lastSubmittedRecord.phone}</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block font-semibold">Email Address</span>
                      <span className="text-slate-700">{lastSubmittedRecord.email}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block font-semibold">Date of Birth</span>
                      <span className="text-slate-700">{lastSubmittedRecord.dob}</span>
                    </div>
                    <div className="sm:col-span-2">
                      <span className="text-slate-400 block font-semibold">Notes / Requests</span>
                      <span className="text-slate-700 italic">{lastSubmittedRecord.message}</span>
                    </div>
                    <div className="sm:col-span-2 text-[11px] text-slate-400 border-t border-slate-200 pt-2 flex items-center justify-between">
                      <span>Submitted: {lastSubmittedRecord.created_at}</span>
                      <span>Category: Official Admission Application</span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row justify-center gap-3 pt-2">
                  <button
                    onClick={() => setLastSubmittedRecord(null)}
                    className="px-6 py-3 rounded-full bg-[#1F2A66] text-white text-xs sm:text-sm font-bold hover:bg-[#161E4A] transition-colors cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span>Submit Another Child Enquiry</span>
                  </button>
                  <button
                    onClick={() => onNavigate('admin')}
                    className="px-6 py-3 rounded-full bg-slate-100 text-slate-800 text-xs sm:text-sm font-bold hover:bg-slate-200 transition-colors cursor-pointer flex items-center justify-center gap-2"
                  >
                    <Lock className="w-3.5 h-3.5 text-[#ED2E84]" />
                    <span>View in Admin Portal (PIN: 1234)</span>
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                
                <div className="border-b border-line pb-4 flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-display font-black text-[#1F2A66]">
                      Student &amp; Parent Details
                    </h2>
                    <p className="text-xs text-[#5B6178]">
                      Fields marked with <span className="text-[#ED2E84]">*</span> are mandatory for verification.
                    </p>
                  </div>
                  <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 text-[11px] font-bold">
                    <ShieldCheck className="w-3.5 h-3.5" /> Instant Storing
                  </span>
                </div>

                {submissionError && (
                  <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2.5 animate-in fade-in duration-200">
                    <AlertCircle className="w-5 h-5 shrink-0" />
                    <span>{submissionError}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Child Name */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-[#1F2A66] block">
                      Child's Full Name <span className="text-[#ED2E84]">*</span>
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none" />
                      <input
                        type="text"
                        value={formData.child_name}
                        onChange={(e) => {
                          setFormData({ ...formData, child_name: e.target.value });
                          if (errors.child_name) setErrors({ ...errors, child_name: '' });
                        }}
                        placeholder="e.g. Aarav Pandian"
                        className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm transition-colors focus:outline-none ${
                          errors.child_name ? 'border-red-400 bg-red-50/50' : 'border-line focus:border-[#ED2E84]'
                        }`}
                      />
                    </div>
                    {errors.child_name && <p className="text-[11px] text-red-600 font-medium">{errors.child_name}</p>}
                  </div>

                  {/* Parent Name */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-[#1F2A66] block">
                      Parent / Guardian Name <span className="text-[#ED2E84]">*</span>
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none" />
                      <input
                        type="text"
                        value={formData.parent_name}
                        onChange={(e) => {
                          setFormData({ ...formData, parent_name: e.target.value });
                          if (errors.parent_name) setErrors({ ...errors, parent_name: '' });
                        }}
                        placeholder="e.g. Dinesh Pandi"
                        className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm transition-colors focus:outline-none ${
                          errors.parent_name ? 'border-red-400 bg-red-50/50' : 'border-line focus:border-[#ED2E84]'
                        }`}
                      />
                    </div>
                    {errors.parent_name && <p className="text-[11px] text-red-600 font-medium">{errors.parent_name}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Phone */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-[#1F2A66] block">
                      Contact Phone / Mobile <span className="text-[#ED2E84]">*</span>
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none" />
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => {
                          setFormData({ ...formData, phone: e.target.value });
                          if (errors.phone) setErrors({ ...errors, phone: '' });
                        }}
                        placeholder="e.g. 9600318663"
                        className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm transition-colors focus:outline-none ${
                          errors.phone ? 'border-red-400 bg-red-50/50' : 'border-line focus:border-[#ED2E84]'
                        }`}
                      />
                    </div>
                    {errors.phone && <p className="text-[11px] text-red-600 font-medium">{errors.phone}</p>}
                  </div>

                  {/* Email */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold text-[#1F2A66] block">
                        Email Address
                      </label>
                      <span className="text-[10px] text-slate-400 font-medium">Optional</span>
                    </div>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none" />
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => {
                          setFormData({ ...formData, email: e.target.value });
                          if (errors.email) setErrors({ ...errors, email: '' });
                        }}
                        placeholder="e.g. parent@gmail.com"
                        className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm transition-colors focus:outline-none ${
                          errors.email ? 'border-red-400 bg-red-50/50' : 'border-line focus:border-[#ED2E84]'
                        }`}
                      />
                    </div>
                    {errors.email && <p className="text-[11px] text-red-600 font-medium">{errors.email}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Date of Birth */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold text-[#1F2A66] block">
                        Child's Date of Birth
                      </label>
                      <span className="text-[10px] text-slate-400 font-medium">Optional / Auto-set</span>
                    </div>
                    <div className="relative">
                      <Calendar className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none" />
                      <input
                        type="date"
                        value={formData.dob}
                        onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-line text-sm transition-colors focus:outline-none focus:border-[#ED2E84]"
                      />
                    </div>
                  </div>

                  {/* Applying Class */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-[#1F2A66] block">
                      Applying Program / Class <span className="text-[#ED2E84]">*</span>
                    </label>
                    <select
                      value={formData.applying_class}
                      onChange={(e) => setFormData({ ...formData, applying_class: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-line text-sm transition-colors focus:outline-none focus:border-[#ED2E84] bg-white cursor-pointer"
                    >
                      {programs.map((p) => (
                        <option key={p.id} value={p.name}>
                          {p.name} ({p.age_group})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#1F2A66] block">
                    Parent Notes or Special Requests (Optional)
                  </label>
                  <textarea
                    rows={3}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about special dietary preferences, transport pickup requirements, or previous schooling..."
                    className="w-full px-4 py-2.5 rounded-xl border border-line text-sm transition-colors focus:outline-none focus:border-[#ED2E84]"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 px-6 rounded-full bg-[#ED2E84] hover:bg-[#D11E6F] text-white text-base font-bold shadow-md shadow-pink-500/25 transition-all cursor-pointer flex items-center justify-center gap-2 hover:scale-[1.01] disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <span>Submitting Application Details...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Submit Admission Application</span>
                    </>
                  )}
                </button>

                <div className="flex items-center justify-center gap-2 text-[11px] text-slate-500">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Submissions are securely processed and accessible in the Admin Portal.</span>
                </div>

              </form>
            )}

          </div>

          {/* Right Sidebar: Admission Process & Requirements */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Step-by-Step Card */}
            <div className="bg-white rounded-3xl border border-line p-6 sm:p-8 space-y-5 shadow-sm">
              <h3 className="text-xl font-display font-black text-[#1F2A66]">
                3-Step Admission Process
              </h3>

              <div className="space-y-4 text-xs">
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-pink-100 text-[#ED2E84] font-bold flex items-center justify-center shrink-0">
                    1
                  </div>
                  <div>
                    <strong className="block text-slate-900 font-bold text-sm">Online Registration</strong>
                    <span className="text-slate-600">Submit the child details form online to receive your official registration reference number.</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-amber-100 text-[#FFC42E] font-bold flex items-center justify-center shrink-0">
                    2
                  </div>
                  <div>
                    <strong className="block text-slate-900 font-bold text-sm">Campus Interaction &amp; Tour</strong>
                    <span className="text-slate-600">Visit our child-friendly campus in Coimbatore for a gentle classroom observation and parent meeting.</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-emerald-100 text-[#5BB836] font-bold flex items-center justify-center shrink-0">
                    3
                  </div>
                  <div>
                    <strong className="block text-slate-900 font-bold text-sm">Enrollment &amp; Welcome Kit</strong>
                    <span className="text-slate-600">Submit birth certificate copy and passport photos to secure your child's seat and receive their welcome bag!</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Checklist Card */}
            <div className="bg-[#1F2A66] text-white rounded-3xl p-6 sm:p-8 space-y-4 shadow-md">
              <div className="flex items-center gap-2 text-[#FFC42E]">
                <FileText className="w-5 h-5" />
                <h4 className="font-display font-bold text-lg">Documents Required</h4>
              </div>
              <ul className="space-y-2 text-xs text-slate-200">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Copy of Child's Municipal Birth Certificate</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>4 Recent Passport-Size Color Photographs</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Parent / Guardian Aadhar or Photo ID Proof</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Immunization &amp; Pediatric Health Record</span>
                </li>
              </ul>
            </div>

            {/* Admin Quick Link */}
            <div className="p-4 rounded-2xl bg-slate-900 text-white flex items-center justify-between text-xs">
              <div>
                <div className="font-bold flex items-center gap-1.5 text-amber-300">
                  <Lock className="w-3.5 h-3.5" /> Staff Administrator?
                </div>
                <div className="text-slate-300 text-[11px]">View all submissions in the Admin Console (PIN: 1234)</div>
              </div>
              <button
                onClick={() => onNavigate('admin')}
                className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold transition cursor-pointer"
              >
                Open Admin
              </button>
            </div>

          </div>

        </div>

        {/* Section: Applications Tracker */}
        <div className="bg-white rounded-3xl border border-line p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-line pb-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#ED2E84] uppercase tracking-wider mb-1">
                <FileText className="w-4 h-4" />
                <span>Application Tracker</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-display font-black text-[#1F2A66]">
                Recent Admission Applications ({storedAdmissions.length})
              </h3>
              <p className="text-xs text-[#5B6178] mt-0.5">
                Review your submitted applications or track the registration status for your child.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Search by child or ref..."
                  value={searchHistoryQuery}
                  onChange={(e) => setSearchHistoryQuery(e.target.value)}
                  className="pl-8 pr-3 py-1.5 rounded-xl border border-line text-xs w-44 sm:w-56 focus:outline-none focus:border-[#ED2E84]"
                />
              </div>

              <button
                onClick={loadStored}
                className="p-2 rounded-xl border border-line hover:bg-slate-50 text-slate-600 transition cursor-pointer"
                title="Refresh Records"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {filteredStored.length === 0 ? (
            <div className="py-8 text-center text-slate-500 text-xs">
              No matching admission records found. Fill out the form above to record your child's enquiry.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredStored.map((rec) => {
                const isExpanded = expandedRecordId === rec.id;
                const isJustAdded = lastSubmittedRecord?.id === rec.id;

                return (
                  <div
                    key={rec.id}
                    className={`p-4 rounded-2xl border transition-all text-xs space-y-3 ${
                      isJustAdded
                        ? 'bg-emerald-50/60 border-emerald-300 ring-2 ring-emerald-400/30'
                        : 'bg-slate-50/60 border-slate-200 hover:border-[#1F2A66]/30'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="font-bold text-[#ED2E84] font-mono text-xs">{rec.reference_no}</span>
                          {isJustAdded && (
                            <span className="px-1.5 py-0.5 rounded text-[10px] font-black bg-emerald-500 text-white uppercase tracking-wider">
                              Just Added
                            </span>
                          )}
                        </div>
                        <div className="font-display font-bold text-slate-900 text-sm mt-0.5">
                          {rec.child_name}
                        </div>
                      </div>

                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        rec.status === 'Admitted'
                          ? 'bg-emerald-100 text-emerald-800'
                          : rec.status === 'Contacted'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}>
                        {rec.status}
                      </span>
                    </div>

                    <div className="space-y-1 text-slate-600">
                      <div className="flex justify-between">
                        <span className="text-slate-400">Class:</span>
                        <strong className="text-[#1F2A66]">{rec.applying_class}</strong>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Parent:</span>
                        <span className="font-medium text-slate-800">{rec.parent_name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Phone:</span>
                        <span className="font-mono text-slate-800">{rec.phone}</span>
                      </div>
                    </div>

                    {isExpanded && (
                      <div className="border-t border-slate-200 pt-2 space-y-1.5 text-slate-600 animate-in fade-in duration-200">
                        {rec.email && (
                          <div className="flex justify-between">
                            <span className="text-slate-400">Email:</span>
                            <span className="truncate max-w-[170px]">{rec.email}</span>
                          </div>
                        )}
                        <div className="flex justify-between">
                          <span className="text-slate-400">DOB:</span>
                          <span>{rec.dob}</span>
                        </div>
                        {rec.message && (
                          <div className="bg-white p-2 rounded-lg border border-slate-200 text-slate-700 italic text-[11px] mt-1">
                            "{rec.message}"
                          </div>
                        )}
                        <div className="text-[10px] text-slate-400 pt-1">
                          Created: {rec.created_at}
                        </div>
                      </div>
                    )}

                    <div className="flex items-center justify-between pt-1 border-t border-slate-200/80">
                      <button
                        onClick={() => setExpandedRecordId(isExpanded ? null : rec.id)}
                        className="text-[11px] font-bold text-[#1F2A66] hover:text-[#ED2E84] cursor-pointer"
                      >
                        {isExpanded ? 'Show Less' : 'View Full Details'}
                      </button>
                      <button
                        onClick={() => onNavigate('admin')}
                        className="text-[11px] font-bold text-slate-500 hover:text-slate-800 flex items-center gap-1 cursor-pointer"
                        title="View in Admin Panel"
                      >
                        <span>Admin</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
