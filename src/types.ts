export interface Program {
  id: number;
  name: string;
  slug: string;
  age_group: string;
  timings: string;
  student_ratio: string;
  description: string;
  activities: string[] | string;
  image_url: string;
  is_active: boolean;
  created_at: string;
  updated_at?: string;
}

export function normalizeActivities(activities: string[] | string | undefined | null): string[] {
  if (!activities) return [];
  if (Array.isArray(activities)) return activities;
  if (typeof activities === 'string') {
    const trimmed = activities.trim();
    if (trimmed.startsWith('[') && trimmed.endsWith(']')) {
      try {
        const parsed = JSON.parse(trimmed);
        if (Array.isArray(parsed)) return parsed.map(String);
      } catch {
        // fallback to split
      }
    }
    return trimmed.split(',').map((a) => a.trim()).filter(Boolean);
  }
  return [];
}

export interface AdmissionEnquiry {
  id: number;
  reference_no: string;
  child_name: string;
  parent_name: string;
  phone: string;
  email: string;
  dob: string;
  applying_class: string;
  message: string;
  status: 'Pending' | 'Contacted' | 'Admitted' | 'Rejected';
  created_at: string;
}

export interface ContactEnquiry {
  id: number;
  name: string;
  email: string;
  phone: string;
  message: string;
  is_read: boolean;
  created_at: string;
}

export interface AdminUser {
  id: number;
  username: string;
  name: string;
  email: string;
  role: string;
}

export interface Facility {
  id: number;
  title: string;
  category: string;
  description: string;
  icon: string;
  image: string;
  highlights: string[];
}

export interface GalleryItem {
  id: number;
  title: string;
  category: 'All' | 'Campus' | 'Classroom' | 'Activities' | 'Events';
  image: string;
  caption: string;
}

export interface ActivityItem {
  id: number;
  title: string;
  ageGroup: string;
  description: string;
  skills: string[];
  icon: string;
  image: string;
  badgeColor: string;
}

export interface TestimonialItem {
  id: number;
  parentName: string;
  relation: string;
  studentName: string;
  grade: string;
  quote: string;
  avatarLetter: string;
  tint: 'yellow' | 'pink' | 'purple' | 'blue' | 'green';
  rating: number;
}

export type PageView =
  | 'home'
  | 'about'
  | 'programs'
  | 'activities'
  | 'facilities'
  | 'gallery'
  | 'admissions'
  | 'contact'
  | 'admin'
  | 'php-source';
