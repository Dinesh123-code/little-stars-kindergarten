import React, { useState } from 'react';
import { Program, AdmissionEnquiry, ContactEnquiry, normalizeActivities, PageView } from '../types';
import { dbService } from '../services/dbService';
import { 
  Lock, LogOut, Plus, Edit2, Trash2, CheckCircle2, 
  AlertCircle, RefreshCw, 
  Search, Eye, ShieldCheck, Check, X, FileText 
} from 'lucide-react';

interface AdminPanelProps {
  programs: Program[];
  admissions: AdmissionEnquiry[];
  contacts: ContactEnquiry[];
  isLoggedIn: boolean;
  onLogin: (password: string) => boolean;
  onLogout: () => void;
  onRefreshData: () => void;
  onNavigate: (page: PageView) => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({
  programs,
  admissions,
  contacts,
  isLoggedIn,
  onLogin,
  onLogout,
  onRefreshData,
  onNavigate,
}) => {
  const [activeTab, setActiveTab] = useState<'programs' | 'admissions' | 'contacts'>('admissions');
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState('');

  // Delete Confirmation State
  const [deleteConfirmation, setDeleteConfirmation] = useState<{
    type: 'program' | 'admission' | 'contact';
    id: number;
    title: string;
  } | null>(null);

  // Program Modal State
  const [isProgramModalOpen, setIsProgramModalOpen] = useState(false);
  const [editingProgram, setEditingProgram] = useState<Program | null>(null);
  const [programForm, setProgramForm] = useState({
    name: '',
    slug: '',
    age_group: '',
    timings: '',
    student_ratio: '',
    description: '',
    activities: '',
    image_url: '',
  });

  // Filters & Search
  const [admissionFilter, setAdmissionFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Handle Login
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onLogin(passwordInput)) {
      setLoginError('');
      setPasswordInput('');
    } else {
      setLoginError('Invalid administrator credentials. Please use PIN: 1234 or password: admin123');
    }
  };

  // Open Program Add
  const openAddProgram = () => {
    setEditingProgram(null);
    setProgramForm({
      name: '',
      slug: '',
      age_group: '',
      timings: '08:45 AM – 12:30 PM',
      student_ratio: '1:8 Mentorship',
      description: '',
      activities: '',
      image_url: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1200&q=80',
    });
    setIsProgramModalOpen(true);
  };

  // Open Program Edit
  const openEditProgram = (prog: Program) => {
    setEditingProgram(prog);
    setProgramForm({
      name: prog.name,
      slug: prog.slug,
      age_group: prog.age_group,
      timings: prog.timings,
      student_ratio: prog.student_ratio,
      description: prog.description,
      activities: normalizeActivities(prog.activities).join(', '),
      image_url: prog.image_url,
    });
    setIsProgramModalOpen(true);
  };

  // Save Program
  const handleSaveProgram = (e: React.FormEvent) => {
    e.preventDefault();
    const actArray = programForm.activities.split(',').map((a) => a.trim()).filter(Boolean);

    if (editingProgram) {
      dbService.updateProgram(editingProgram.id, {
        name: programForm.name,
        slug: programForm.slug || programForm.name.toLowerCase().replace(/\s+/g, '-'),
        age_group: programForm.age_group,
        timings: programForm.timings,
        student_ratio: programForm.student_ratio,
        description: programForm.description,
        activities: actArray,
        image_url: programForm.image_url,
      });
    } else {
      dbService.addProgram({
        name: programForm.name,
        slug: programForm.slug || programForm.name.toLowerCase().replace(/\s+/g, '-'),
        age_group: programForm.age_group,
        timings: programForm.timings,
        student_ratio: programForm.student_ratio,
        description: programForm.description,
        activities: actArray,
        image_url: programForm.image_url,
        is_active: true,
      });
    }

    setIsProgramModalOpen(false);
    onRefreshData();
  };

  // Delete Triggers (React confirmation - 100% reliable in iframes)
  const handleDeleteProgram = (id: number, name: string) => {
    setDeleteConfirmation({
      type: 'program',
      id,
      title: `program "${name}"`,
    });
  };

  const handleDeleteAdmission = (id: number, ref: string, childName?: string) => {
    setDeleteConfirmation({
      type: 'admission',
      id,
      title: `enquiry ${ref}${childName ? ` (${childName})` : ''}`,
    });
  };

  const handleDeleteContact = (id: number, name: string) => {
    setDeleteConfirmation({
      type: 'contact',
      id,
      title: `message from "${name}"`,
    });
  };

  // Perform Delete
  const confirmDelete = () => {
    if (!deleteConfirmation) return;
    const { type, id } = deleteConfirmation;
    if (type === 'program') {
      dbService.deleteProgram(id);
    } else if (type === 'admission') {
      dbService.deleteAdmission(id);
    } else if (type === 'contact') {
      dbService.deleteContact(id);
    }
    setDeleteConfirmation(null);
    onRefreshData();
  };

  // Update Admission Status
  const handleStatusChange = (id: number, status: AdmissionEnquiry['status']) => {
    dbService.updateAdmissionStatus(id, status);
    onRefreshData();
  };

  // If Not Logged In -> Show Login Form
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-[#F6F9FF] py-16 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-3xl border border-line p-8 shadow-xl space-y-6">
          <div className="text-center space-y-2">
            <div className="w-14 h-14 rounded-2xl bg-[#1F2A66] text-[#FFC42E] flex items-center justify-center mx-auto shadow-sm">
              <Lock className="w-7 h-7" />
            </div>
            <h2 className="text-2xl font-display font-black text-[#1F2A66]">
              Staff &amp; Admin Login
            </h2>
            <p className="text-xs text-[#5B6178]">
              Authorized administrative access for managing Little Stars programs, student admissions, and parent enquiries.
            </p>
          </div>

          {loginError && (
            <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#1F2A66] block">
                Username
              </label>
              <input
                type="text"
                defaultValue="admin"
                disabled
                className="w-full px-4 py-2.5 rounded-xl border border-line bg-slate-100 text-slate-600 text-sm font-medium"
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-[#1F2A66] block">
                  Password / PIN
                </label>
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => setPasswordInput('1234')}
                    className="text-[11px] font-bold text-[#ED2E84] hover:underline px-2 py-0.5 rounded bg-pink-50"
                  >
                    Use 1234
                  </button>
                  <button
                    type="button"
                    onClick={() => setPasswordInput('admin123')}
                    className="text-[11px] font-bold text-[#1F2A66] hover:underline px-2 py-0.5 rounded bg-slate-100"
                  >
                    Use admin123
                  </button>
                </div>
              </div>
              <input
                type="password"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="Enter 1234 or admin123"
                className="w-full px-4 py-2.5 rounded-xl border border-line text-sm focus:outline-none focus:border-[#ED2E84]"
              />
              <span className="text-[11px] text-slate-500 block pt-0.5">
                Authorized PINs: <strong>1234</strong> or <strong>admin123</strong>
              </span>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-full bg-[#1F2A66] hover:bg-[#161E4A] text-white text-sm font-bold shadow-md transition-all cursor-pointer"
            >
              Sign In to Portal
            </button>
          </form>

          <div className="text-center pt-2">
            <button
              onClick={() => onNavigate('home')}
              className="text-xs font-bold text-slate-500 hover:text-[#1F2A66]"
            >
              &larr; Back to Kindergarten Website
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Filter Admissions
  const filteredAdmissions = admissions.filter((adm) => {
    const matchesFilter = admissionFilter === 'All' || adm.status === admissionFilter;
    const matchesSearch = 
      adm.child_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      adm.parent_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      adm.reference_no.toLowerCase().includes(searchQuery.toLowerCase()) ||
      adm.applying_class.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#F6F9FF] py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Admin Header */}
        <div className="bg-white rounded-3xl border border-line p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
          <div className="space-y-1 text-center sm:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-[#5BB836] text-xs font-bold">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Admin Session Active • Staff Access</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-display font-black text-[#1F2A66]">
              Little Stars Administrative Console
            </h1>
            <p className="text-xs text-[#5B6178]">
              Manage curriculum programs, live admission requests, and parent contact messages.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onRefreshData}
              className="p-2.5 rounded-xl border border-line hover:bg-slate-50 text-slate-600 transition-colors cursor-pointer"
              title="Refresh Data from Storage"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
            <button
              onClick={onLogout}
              className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-red-50 hover:text-red-700 text-slate-700 text-xs font-bold flex items-center gap-2 transition-colors cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              <span>Log Out</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap items-center gap-2 border-b border-line pb-4">
          <button
            onClick={() => setActiveTab('admissions')}
            className={`px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'admissions'
                ? 'bg-[#1F2A66] text-white shadow-md'
                : 'bg-white text-[#5B6178] hover:bg-slate-50 border border-line'
            }`}
          >
            <span>Admission Enquiries</span>
            <span className="px-2 py-0.5 rounded-full text-[10px] bg-[#ED2E84] text-white font-black">
              {admissions.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('programs')}
            className={`px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'programs'
                ? 'bg-[#1F2A66] text-white shadow-md'
                : 'bg-white text-[#5B6178] hover:bg-slate-50 border border-line'
            }`}
          >
            <span>Programs Management</span>
            <span className="px-2 py-0.5 rounded-full text-[10px] bg-slate-200 text-slate-800 font-bold">
              {programs.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('contacts')}
            className={`px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'contacts'
                ? 'bg-[#1F2A66] text-white shadow-md'
                : 'bg-white text-[#5B6178] hover:bg-slate-50 border border-line'
            }`}
          >
            <span>Contact Messages</span>
            <span className="px-2 py-0.5 rounded-full text-[10px] bg-slate-200 text-slate-800 font-bold">
              {contacts.length}
            </span>
          </button>
        </div>

        {/* TAB 1: ADMISSIONS */}
        {activeTab === 'admissions' && (
          <div className="bg-white rounded-3xl border border-line overflow-hidden shadow-sm space-y-4 p-6">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <div className="relative flex-1 sm:w-64">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
                  <input
                    type="text"
                    placeholder="Search by child, ref, class..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 rounded-xl border border-line text-xs focus:outline-none focus:border-[#ED2E84]"
                  />
                </div>
                <select
                  value={admissionFilter}
                  onChange={(e) => setAdmissionFilter(e.target.value)}
                  className="px-3 py-2 rounded-xl border border-line text-xs bg-white focus:outline-none"
                >
                  <option value="All">All Statuses</option>
                  <option value="Pending">Pending</option>
                  <option value="Contacted">Contacted</option>
                  <option value="Admitted">Admitted</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </div>

              <div className="text-xs text-slate-500">
                Showing {filteredAdmissions.length} of {admissions.length} enquiries
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-line text-slate-600 font-bold uppercase tracking-wider">
                    <th className="p-3.5">Ref No</th>
                    <th className="p-3.5">Child &amp; DOB</th>
                    <th className="p-3.5">Parent &amp; Contacts</th>
                    <th className="p-3.5">Class</th>
                    <th className="p-3.5">Status</th>
                    <th className="p-3.5">Submitted</th>
                    <th className="p-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredAdmissions.map((adm) => (
                    <tr key={adm.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="p-3.5 font-bold text-[#1F2A66] whitespace-nowrap">
                        {adm.reference_no}
                      </td>
                      <td className="p-3.5 whitespace-nowrap">
                        <div className="font-bold text-slate-900">{adm.child_name}</div>
                        <div className="text-slate-400 text-[10px]">DOB: {adm.dob}</div>
                      </td>
                      <td className="p-3.5">
                        <div className="font-medium text-slate-900">{adm.parent_name}</div>
                        <div className="text-slate-500 text-[10px]">{adm.phone} • {adm.email}</div>
                        {adm.message && (
                          <div className="text-[10px] text-slate-400 truncate max-w-xs mt-0.5">
                            Note: "{adm.message}"
                          </div>
                        )}
                      </td>
                      <td className="p-3.5 font-bold text-pink-600 whitespace-nowrap">
                        {adm.applying_class}
                      </td>
                      <td className="p-3.5 whitespace-nowrap">
                        <select
                          value={adm.status}
                          onChange={(e) => handleStatusChange(adm.id, e.target.value as any)}
                          className={`px-2 py-1 rounded-md text-[11px] font-bold border focus:outline-none ${
                            adm.status === 'Admitted'
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                              : adm.status === 'Contacted'
                              ? 'bg-blue-50 text-blue-700 border-blue-300'
                              : adm.status === 'Rejected'
                              ? 'bg-red-50 text-red-700 border-red-300'
                              : 'bg-amber-50 text-amber-800 border-amber-300'
                          }`}
                        >
                          <option value="Pending">Pending</option>
                          <option value="Contacted">Contacted</option>
                          <option value="Admitted">Admitted</option>
                          <option value="Rejected">Rejected</option>
                        </select>
                      </td>
                      <td className="p-3.5 text-slate-400 text-[10px] whitespace-nowrap">
                        {adm.created_at}
                      </td>
                      <td className="p-3.5 text-right whitespace-nowrap">
                        <button
                          onClick={() => handleDeleteAdmission(adm.id, adm.reference_no, adm.child_name)}
                          className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                          title="Delete enquiry"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {filteredAdmissions.length === 0 && (
                    <tr>
                      <td colSpan={7} className="p-8 text-center text-slate-400 font-medium">
                        No admission enquiries found matching the criteria.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 2: PROGRAMS MANAGEMENT */}
        {activeTab === 'programs' && (
          <div className="bg-white rounded-3xl border border-line p-6 space-y-6 shadow-sm">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <div>
                <h2 className="text-xl font-display font-black text-[#1F2A66]">
                  Curriculum Programs
                </h2>
                <p className="text-xs text-slate-500">
                  Add, edit, or delete academic classes displayed to parents.
                </p>
              </div>

              <button
                onClick={openAddProgram}
                className="px-5 py-2.5 rounded-full bg-[#ED2E84] hover:bg-[#D11E6F] text-white text-xs font-bold flex items-center gap-2 shadow-sm cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Program</span>
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-line text-slate-600 font-bold uppercase tracking-wider">
                    <th className="p-3.5">ID</th>
                    <th className="p-3.5">Program Name</th>
                    <th className="p-3.5">Age Group</th>
                    <th className="p-3.5">Timings</th>
                    <th className="p-3.5">Class Allocation</th>
                    <th className="p-3.5">Activities</th>
                    <th className="p-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {programs.map((prog) => (
                    <tr key={prog.id} className="hover:bg-slate-50 transition-colors">
                      <td className="p-3.5 text-slate-400 font-bold">{prog.id}</td>
                      <td className="p-3.5 font-bold text-[#1F2A66] whitespace-nowrap">
                        {prog.name}
                      </td>
                      <td className="p-3.5 text-pink-600 font-semibold whitespace-nowrap">
                        {prog.age_group}
                      </td>
                      <td className="p-3.5 text-slate-600 whitespace-nowrap">{prog.timings}</td>
                      <td className="p-3.5 text-slate-700 whitespace-nowrap">{prog.student_ratio}</td>
                      <td className="p-3.5 max-w-xs text-slate-500 truncate">
                        {normalizeActivities(prog.activities).join(', ')}
                      </td>
                      <td className="p-3.5 text-right whitespace-nowrap space-x-2">
                        <button
                          onClick={() => openEditProgram(prog)}
                          className="p-1.5 text-slate-600 hover:text-[#1F2A66] hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                          title="Edit Program"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteProgram(prog.id, prog.name)}
                          className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                          title="Delete Program"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: CONTACTS */}
        {activeTab === 'contacts' && (
          <div className="bg-white rounded-3xl border border-line p-6 space-y-4 shadow-sm">
            <h2 className="text-xl font-display font-black text-[#1F2A66]">
              Contact Desk Enquiries
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-line text-slate-600 font-bold uppercase tracking-wider">
                    <th className="p-3.5">Name</th>
                    <th className="p-3.5">Contact Details</th>
                    <th className="p-3.5">Enquiry Message</th>
                    <th className="p-3.5">Date</th>
                    <th className="p-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {contacts.map((c) => (
                    <tr key={c.id} className="hover:bg-slate-50 transition-colors">
                      <td className="p-3.5 font-bold text-slate-900 whitespace-nowrap">{c.name}</td>
                      <td className="p-3.5 whitespace-nowrap">
                        <div className="text-slate-800">{c.phone}</div>
                        <div className="text-slate-400 text-[10px]">{c.email}</div>
                      </td>
                      <td className="p-3.5 text-slate-600 max-w-sm">{c.message}</td>
                      <td className="p-3.5 text-slate-400 text-[10px] whitespace-nowrap">{c.created_at}</td>
                      <td className="p-3.5 text-right whitespace-nowrap">
                        <button
                          onClick={() => handleDeleteContact(c.id, c.name)}
                          className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg cursor-pointer transition-colors"
                          title="Delete message"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {contacts.length === 0 && (
                    <tr>
                      <td colSpan={5} className="p-8 text-center text-slate-400">
                        No contact messages found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>

      {/* Program Add / Edit Modal */}
      {isProgramModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 space-y-6 shadow-2xl animate-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-line pb-4">
              <h3 className="text-xl font-display font-black text-[#1F2A66]">
                {editingProgram ? 'Edit Curriculum Program' : 'Add New Curriculum Program'}
              </h3>
              <button
                onClick={() => setIsProgramModalOpen(false)}
                className="p-1 rounded-lg hover:bg-slate-100 text-slate-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProgram} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Program Name *</label>
                  <input
                    type="text"
                    required
                    value={programForm.name}
                    onChange={(e) => setProgramForm({ ...programForm, name: e.target.value })}
                    placeholder="e.g. Nursery"
                    className="w-full px-3 py-2 rounded-xl border border-line focus:outline-none focus:border-[#ED2E84]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Age Group *</label>
                  <input
                    type="text"
                    required
                    value={programForm.age_group}
                    onChange={(e) => setProgramForm({ ...programForm, age_group: e.target.value })}
                    placeholder="e.g. 2.5 – 3.5 Years"
                    className="w-full px-3 py-2 rounded-xl border border-line focus:outline-none focus:border-[#ED2E84]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Class Timings</label>
                  <input
                    type="text"
                    value={programForm.timings}
                    onChange={(e) => setProgramForm({ ...programForm, timings: e.target.value })}
                    placeholder="e.g. 08:45 AM – 12:30 PM"
                    className="w-full px-3 py-2 rounded-xl border border-line focus:outline-none focus:border-[#ED2E84]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Class Allocation</label>
                  <input
                    type="text"
                    value={programForm.student_ratio}
                    onChange={(e) => setProgramForm({ ...programForm, student_ratio: e.target.value })}
                    placeholder="e.g. 1:8 Mentorship"
                    className="w-full px-3 py-2 rounded-xl border border-line focus:outline-none focus:border-[#ED2E84]"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">Description</label>
                <textarea
                  rows={3}
                  required
                  value={programForm.description}
                  onChange={(e) => setProgramForm({ ...programForm, description: e.target.value })}
                  placeholder="Program overview and developmental milestones..."
                  className="w-full px-3 py-2 rounded-xl border border-line focus:outline-none focus:border-[#ED2E84]"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">Activities (comma-separated)</label>
                <input
                  type="text"
                  value={programForm.activities}
                  onChange={(e) => setProgramForm({ ...programForm, activities: e.target.value })}
                  placeholder="Jolly Phonics, Counting beads, Clay modeling, Outdoor play"
                  className="w-full px-3 py-2 rounded-xl border border-line focus:outline-none focus:border-[#ED2E84]"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">Image URL</label>
                <input
                  type="url"
                  value={programForm.image_url}
                  onChange={(e) => setProgramForm({ ...programForm, image_url: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-line focus:outline-none focus:border-[#ED2E84]"
                />
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsProgramModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#ED2E84] hover:bg-[#D11E6F] text-white font-bold"
                >
                  Save Program
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal - Guaranteed 100% working in sandbox iframe */}
      {deleteConfirmation && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-7 space-y-5 shadow-2xl border border-line animate-in zoom-in-95">
            <div className="w-12 h-12 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center mx-auto">
              <Trash2 className="w-6 h-6" />
            </div>

            <div className="text-center space-y-2">
              <h3 className="text-lg font-display font-black text-[#1F2A66]">
                Confirm Deletion
              </h3>
              <p className="text-xs text-[#5B6178]">
                Are you sure you want to permanently delete <span className="font-bold text-slate-800">{deleteConfirmation.title}</span>?
              </p>
              <div className="text-[11px] text-red-600 font-medium bg-red-50 py-1.5 px-3 rounded-xl inline-block">
                This item will be deleted immediately.
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                type="button"
                onClick={() => setDeleteConfirmation(null)}
                className="py-2.5 px-4 rounded-full border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold transition-all cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmDelete}
                className="py-2.5 px-4 rounded-full bg-red-600 hover:bg-red-700 text-white text-xs font-bold shadow-md shadow-red-500/25 transition-all cursor-pointer flex items-center justify-center gap-1.5"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Yes, Delete</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
