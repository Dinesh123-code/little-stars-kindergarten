import { Program, AdmissionEnquiry, ContactEnquiry, normalizeActivities } from '../types';
import { INITIAL_PROGRAMS, INITIAL_ADMISSIONS, INITIAL_CONTACTS } from '../data/initialData';

const STORAGE_KEYS = {
  PROGRAMS: 'littlestars_programs',
  ADMISSIONS: 'littlestars_admissions',
  CONTACTS: 'littlestars_contacts',
  AUTH: 'littlestars_admin_session',
};

const RENDER_BASE_URL = (
  (typeof import.meta !== 'undefined' && (import.meta.env?.VITE_RENDER_URL || import.meta.env?.VITE_API_URL)) ||
  'https://little-stars-kindergarten.onrender.com'
).replace(/\/$/, '');

class DatabaseService {
  // In-memory caches for reliable state retention even across iframe sandbox quirks
  private cachedAdmissions: AdmissionEnquiry[] | null = null;
  private cachedPrograms: Program[] | null = null;
  private cachedContacts: ContactEnquiry[] | null = null;

  // --- PROGRAMS CRUD ---
  getPrograms(): Program[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.PROGRAMS);
      if (!raw) {
        localStorage.setItem(STORAGE_KEYS.PROGRAMS, JSON.stringify(INITIAL_PROGRAMS));
        return INITIAL_PROGRAMS;
      }
      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed) || parsed.length === 0) {
        localStorage.setItem(STORAGE_KEYS.PROGRAMS, JSON.stringify(INITIAL_PROGRAMS));
        return INITIAL_PROGRAMS;
      }

      // Automatically upgrade legacy, cut-off, or broken image URLs
      let hasLegacyImages = false;
      const sanitized = parsed.map((rawP: Record<string, unknown>) => {
        const p = rawP as unknown as Program;
        const initProg = INITIAL_PROGRAMS.find((init) => init.id === p.id || init.slug === p.slug);
        if (initProg) {
          const isPlayGroup = p.slug === 'play-group' || (typeof p.name === 'string' && p.name.toLowerCase().includes('play group'));
          if (
            (isPlayGroup && (p.image_url.includes('photo-1587654780291') || 'gallery_images' in rawP)) ||
            p.image_url.includes('photo-1503454537195-1dcabb73ffb9') ||
            p.image_url.includes('photo-1596464716127') ||
            p.image_url.includes('photo-1560421683') ||
            p.image_url.includes('w=800')
          ) {
            hasLegacyImages = true;
            const updated = { ...p, image_url: initProg.image_url };
            delete (updated as Record<string, unknown>).gallery_images;
            return updated;
          }
        }
        return p;
      });

      if (hasLegacyImages) {
        localStorage.setItem(STORAGE_KEYS.PROGRAMS, JSON.stringify(sanitized));
      }
      return sanitized;
    } catch {
      localStorage.setItem(STORAGE_KEYS.PROGRAMS, JSON.stringify(INITIAL_PROGRAMS));
      return INITIAL_PROGRAMS;
    }
  }

  getProgramById(id: number): Program | undefined {
    return this.getPrograms().find((p) => p.id === id);
  }

  addProgram(programData: Omit<Program, 'id' | 'created_at'>): Program {
    const programs = this.getPrograms();
    const newId = programs.length > 0 ? Math.max(...programs.map((p) => p.id)) + 1 : 1;
    const now = new Date().toISOString().replace('T', ' ').substring(0, 19);

    const newProgram: Program = {
      ...programData,
      id: newId,
      created_at: now,
    };

    const updated = [newProgram, ...programs];
    this.cachedPrograms = updated;
    try {
      localStorage.setItem(STORAGE_KEYS.PROGRAMS, JSON.stringify(updated));
    } catch (e) {
      console.warn('localStorage write failed', e);
    }
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('littlestars_programs_changed'));
    }
    return newProgram;
  }

  updateProgram(id: number, programData: Partial<Program>): Program | null {
    const programs = this.getPrograms();
    const index = programs.findIndex((p) => p.id === id);
    if (index === -1) return null;

    const updatedProgram: Program = {
      ...programs[index],
      ...programData,
      updated_at: new Date().toISOString().replace('T', ' ').substring(0, 19),
    };

    programs[index] = updatedProgram;
    this.cachedPrograms = [...programs];
    try {
      localStorage.setItem(STORAGE_KEYS.PROGRAMS, JSON.stringify(programs));
    } catch (e) {
      console.warn('localStorage write failed', e);
    }
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('littlestars_programs_changed'));
    }
    return updatedProgram;
  }

  deleteProgram(id: number): boolean {
    const programs = this.getPrograms();
    const filtered = programs.filter((p) => p.id !== id);
    if (filtered.length === programs.length) return false;
    this.cachedPrograms = filtered;
    try {
      localStorage.setItem(STORAGE_KEYS.PROGRAMS, JSON.stringify(filtered));
    } catch (e) {
      console.warn('localStorage write failed', e);
    }
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('littlestars_programs_changed'));
    }
    return true;
  }

  // --- ADMISSION ENQUIRIES CRUD ---
  getAdmissions(): AdmissionEnquiry[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.ADMISSIONS);
      if (!raw) {
        if (this.cachedAdmissions && this.cachedAdmissions.length > 0) {
          return this.cachedAdmissions;
        }
        localStorage.setItem(STORAGE_KEYS.ADMISSIONS, JSON.stringify(INITIAL_ADMISSIONS));
        this.cachedAdmissions = INITIAL_ADMISSIONS;
        return INITIAL_ADMISSIONS;
      }
      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed)) {
        return this.cachedAdmissions || INITIAL_ADMISSIONS;
      }
      
      let modified = false;
      const sanitized = parsed.map((item: AdmissionEnquiry) => {
        if (item.message && item.message.includes('Thoothukudi')) {
          modified = true;
          return {
            ...item,
            message: item.message.replace(/Thoothukudi/g, 'Coimbatore').replace(/Cruzpuram/g, 'RS Puram'),
          };
        }
        return item;
      });

      if (modified) {
        localStorage.setItem(STORAGE_KEYS.ADMISSIONS, JSON.stringify(sanitized));
      }
      this.cachedAdmissions = sanitized;
      return sanitized;
    } catch {
      if (this.cachedAdmissions && this.cachedAdmissions.length > 0) {
        return this.cachedAdmissions;
      }
      return INITIAL_ADMISSIONS;
    }
  }

  addAdmission(data: Omit<AdmissionEnquiry, 'id' | 'reference_no' | 'status' | 'created_at'>): AdmissionEnquiry {
    const list = this.getAdmissions();
    const newId = list.length > 0 ? Math.max(...list.map((a) => a.id)) + 1 : 1;
    const rand = Math.floor(1000 + Math.random() * 9000);
    const refNo = `ADM-2026-${rand}`;
    const now = new Date().toISOString().replace('T', ' ').substring(0, 19);

    const newEnquiry: AdmissionEnquiry = {
      ...data,
      id: newId,
      reference_no: refNo,
      status: 'Pending',
      created_at: now,
    };

    const updated = [newEnquiry, ...list];
    this.cachedAdmissions = updated;

    try {
      localStorage.setItem(STORAGE_KEYS.ADMISSIONS, JSON.stringify(updated));
    } catch (e) {
      console.warn('localStorage write failed, using memory cache', e);
    }

    // Asynchronously push to Render Backend API
    fetch(`${RENDER_BASE_URL}/api/admissions.php`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
      .then((r) => r.json())
      .then((res) => {
        if (res.success && res.reference_no) {
          newEnquiry.reference_no = res.reference_no;
        }
      })
      .catch((e) => console.warn('Render API sync fallback:', e));

    // Broadcast change to all listening tabs/components
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('littlestars_admissions_changed', { detail: newEnquiry }));
    }

    return newEnquiry;
  }

  updateAdmissionStatus(id: number, status: AdmissionEnquiry['status']): boolean {
    const list = this.getAdmissions();
    const index = list.findIndex((a) => a.id === id);
    if (index === -1) return false;

    list[index].status = status;
    this.cachedAdmissions = [...list];
    try {
      localStorage.setItem(STORAGE_KEYS.ADMISSIONS, JSON.stringify(list));
    } catch (e) {
      console.warn('localStorage write failed', e);
    }

    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('littlestars_admissions_changed'));
    }
    return true;
  }

  deleteAdmission(id: number): boolean {
    const list = this.getAdmissions();
    const filtered = list.filter((a) => a.id !== id);
    if (filtered.length === list.length) return false;
    this.cachedAdmissions = filtered;
    try {
      localStorage.setItem(STORAGE_KEYS.ADMISSIONS, JSON.stringify(filtered));
    } catch (e) {
      console.warn('localStorage write failed', e);
    }

    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('littlestars_admissions_changed'));
    }
    return true;
  }

  // --- CONTACT ENQUIRIES CRUD ---
  getContacts(): ContactEnquiry[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.CONTACTS);
      if (!raw) {
        if (this.cachedContacts && this.cachedContacts.length > 0) {
          return this.cachedContacts;
        }
        localStorage.setItem(STORAGE_KEYS.CONTACTS, JSON.stringify(INITIAL_CONTACTS));
        this.cachedContacts = INITIAL_CONTACTS;
        return INITIAL_CONTACTS;
      }
      const parsed = JSON.parse(raw);
      const res = Array.isArray(parsed) ? parsed : INITIAL_CONTACTS;
      this.cachedContacts = res;
      return res;
    } catch {
      return this.cachedContacts || INITIAL_CONTACTS;
    }
  }

  addContact(data: Omit<ContactEnquiry, 'id' | 'is_read' | 'created_at'>): ContactEnquiry {
    const list = this.getContacts();
    const newId = list.length > 0 ? Math.max(...list.map((c) => c.id)) + 1 : 1;
    const now = new Date().toISOString().replace('T', ' ').substring(0, 19);

    const newContact: ContactEnquiry = {
      ...data,
      id: newId,
      is_read: false,
      created_at: now,
    };

    const updated = [newContact, ...list];
    this.cachedContacts = updated;
    try {
      localStorage.setItem(STORAGE_KEYS.CONTACTS, JSON.stringify(updated));
    } catch (e) {
      console.warn('localStorage write failed', e);
    }
    // Asynchronously push to Render Backend API
    fetch(`${RENDER_BASE_URL}/api/contact.php`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).catch((e) => console.warn('Render API contact sync fallback:', e));

    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('littlestars_contacts_changed'));
    }
    return newContact;
  }

  markContactAsRead(id: number): boolean {
    const list = this.getContacts();
    const index = list.findIndex((c) => c.id === id);
    if (index === -1) return false;

    list[index].is_read = true;
    this.cachedContacts = [...list];
    try {
      localStorage.setItem(STORAGE_KEYS.CONTACTS, JSON.stringify(list));
    } catch (e) {
      console.warn('localStorage write failed', e);
    }
    return true;
  }

  deleteContact(id: number): boolean {
    const list = this.getContacts();
    const filtered = list.filter((c) => c.id !== id);
    if (filtered.length === list.length) return false;
    this.cachedContacts = filtered;
    try {
      localStorage.setItem(STORAGE_KEYS.CONTACTS, JSON.stringify(filtered));
    } catch (e) {
      console.warn('localStorage write failed', e);
    }
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('littlestars_contacts_changed'));
    }
    return true;
  }

  // --- AUTHENTICATION (SESSION SIMULATION) ---
  isLoggedIn(): boolean {
    return sessionStorage.getItem(STORAGE_KEYS.AUTH) === 'true';
  }

  login(password: string): boolean {
    const clean = (password || '').trim().toLowerCase();
    if (clean === 'admin123' || clean === '1234' || clean === 'admin' || clean === '123456') {
      sessionStorage.setItem(STORAGE_KEYS.AUTH, 'true');
      return true;
    }
    return false;
  }

  logout(): void {
    sessionStorage.removeItem(STORAGE_KEYS.AUTH);
  }

  // --- SQL EXPORT & SCHEMA GENERATOR ---
  generateMySQLDump(): string {
    const programs = this.getPrograms();
    const admissions = this.getAdmissions();
    const contacts = this.getContacts();

    return `-- ==========================================================
-- Little Stars Kindergarten & Preschool Database Dump
-- Target DBMS: MySQL 8.0 / MariaDB 10.4+
-- Generated: ${new Date().toISOString()}
-- ==========================================================

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- --------------------------------------------------------
-- Table structure for \`admin_users\`
-- --------------------------------------------------------
DROP TABLE IF EXISTS \`admin_users\`;
CREATE TABLE \`admin_users\` (
  \`id\` int(11) NOT NULL AUTO_INCREMENT,
  \`username\` varchar(50) NOT NULL UNIQUE,
  \`password_hash\` varchar(255) NOT NULL,
  \`name\` varchar(100) NOT NULL,
  \`email\` varchar(100) NOT NULL,
  \`role\` varchar(30) NOT NULL DEFAULT 'Administrator',
  \`created_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (\`id\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO \`admin_users\` (\`id\`, \`username\`, \`password_hash\`, \`name\`, \`email\`, \`role\`) VALUES
(1, 'admin', '$2y$10$TKh8H1.PfQx37YgCzwiKb.KjNyWgaHb9cbcoQgdIVFlYg7B77UdFm', 'Principal Administrator', 'principal@littlestarskindergarten.online', 'Administrator');

-- --------------------------------------------------------
-- Table structure for \`programs\`
-- --------------------------------------------------------
DROP TABLE IF EXISTS \`programs\`;
CREATE TABLE \`programs\` (
  \`id\` int(11) NOT NULL AUTO_INCREMENT,
  \`name\` varchar(100) NOT NULL,
  \`slug\` varchar(100) NOT NULL UNIQUE,
  \`age_group\` varchar(50) NOT NULL,
  \`timings\` varchar(100) NOT NULL,
  \`student_ratio\` varchar(50) NOT NULL,
  \`description\` text NOT NULL,
  \`activities\` text NOT NULL COMMENT 'JSON array or comma-separated activities',
  \`image_url\` varchar(255) NOT NULL,
  \`is_active\` tinyint(1) NOT NULL DEFAULT 1,
  \`created_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  \`updated_at\` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (\`id\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

${programs.map(p => `INSERT INTO \`programs\` (\`id\`, \`name\`, \`slug\`, \`age_group\`, \`timings\`, \`student_ratio\`, \`description\`, \`activities\`, \`image_url\`, \`is_active\`, \`created_at\`) VALUES (${p.id}, '${p.name.replace(/'/g, "''")}', '${p.slug}', '${p.age_group}', '${p.timings}', '${p.student_ratio}', '${p.description.replace(/'/g, "''")}', '${JSON.stringify(normalizeActivities(p.activities)).replace(/'/g, "''")}', '${p.image_url}', 1, '${p.created_at}');`).join('\n')}

-- --------------------------------------------------------
-- Table structure for \`admission_enquiries\`
-- --------------------------------------------------------
DROP TABLE IF EXISTS \`admission_enquiries\`;
CREATE TABLE \`admission_enquiries\` (
  \`id\` int(11) NOT NULL AUTO_INCREMENT,
  \`reference_no\` varchar(30) NOT NULL UNIQUE,
  \`child_name\` varchar(100) NOT NULL,
  \`parent_name\` varchar(100) NOT NULL,
  \`phone\` varchar(25) NOT NULL,
  \`email\` varchar(100) NOT NULL,
  \`dob\` date NOT NULL,
  \`applying_class\` varchar(50) NOT NULL,
  \`message\` text DEFAULT NULL,
  \`status\` enum('Pending','Contacted','Admitted','Rejected') NOT NULL DEFAULT 'Pending',
  \`created_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (\`id\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

${admissions.map(a => `INSERT INTO \`admission_enquiries\` (\`id\`, \`reference_no\`, \`child_name\`, \`parent_name\`, \`phone\`, \`email\`, \`dob\`, \`applying_class\`, \`message\`, \`status\`, \`created_at\`) VALUES (${a.id}, '${a.reference_no}', '${a.child_name.replace(/'/g, "''")}', '${a.parent_name.replace(/'/g, "''")}', '${a.phone}', '${a.email}', '${a.dob}', '${a.applying_class}', '${(a.message || '').replace(/'/g, "''")}', '${a.status}', '${a.created_at}');`).join('\n')}

-- --------------------------------------------------------
-- Table structure for \`contact_enquiries\`
-- --------------------------------------------------------
DROP TABLE IF EXISTS \`contact_enquiries\`;
CREATE TABLE \`contact_enquiries\` (
  \`id\` int(11) NOT NULL AUTO_INCREMENT,
  \`name\` varchar(100) NOT NULL,
  \`email\` varchar(100) NOT NULL,
  \`phone\` varchar(25) NOT NULL,
  \`message\` text NOT NULL,
  \`is_read\` tinyint(1) NOT NULL DEFAULT 0,
  \`created_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (\`id\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

${contacts.map(c => `INSERT INTO \`contact_enquiries\` (\`id\`, \`name\`, \`email\`, \`phone\`, \`message\`, \`is_read\`, \`created_at\`) VALUES (${c.id}, '${c.name.replace(/'/g, "''")}', '${c.email}', '${c.phone}', '${c.message.replace(/'/g, "''")}', ${c.is_read ? 1 : 0}, '${c.created_at}');`).join('\n')}

SET FOREIGN_KEY_CHECKS = 1;
`;
  }

  resetToDefault(): void {
    localStorage.setItem(STORAGE_KEYS.PROGRAMS, JSON.stringify(INITIAL_PROGRAMS));
    localStorage.setItem(STORAGE_KEYS.ADMISSIONS, JSON.stringify(INITIAL_ADMISSIONS));
    localStorage.setItem(STORAGE_KEYS.CONTACTS, JSON.stringify(INITIAL_CONTACTS));
  }
}

export const dbService = new DatabaseService();
