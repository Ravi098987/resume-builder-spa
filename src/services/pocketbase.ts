import PocketBase from 'pocketbase';
import { Resume } from '@/types/resume';

// Replace with your PocketBase URL
const PB_URL = import.meta.env.VITE_POCKETBASE_URL || 'http://127.0.0.1:8090';

export const pb = new PocketBase(PB_URL);

// Enable auto cancellation for duplicate requests
pb.autoCancellation(false);

export interface ResumeRecord {
  id: string;
  user: string;
  name: string;
  data: Resume;
  created: string;
  updated: string;
}

export const authService = {
  async login(email: string, password: string) {
    const authData = await pb.collection('users').authWithPassword(email, password);
    return authData;
  },

  async register(email: string, password: string, name: string) {
    const data = {
      email,
      password,
      passwordConfirm: password,
      name,
    };
    const user = await pb.collection('users').create(data);
    return user;
  },

  async logout() {
    pb.authStore.clear();
  },

  getCurrentUser() {
    return pb.authStore.model;
  },

  isAuthenticated() {
    return pb.authStore.isValid;
  },
};

export const resumeService = {
  async getResumes(): Promise<ResumeRecord[]> {
    const records = await pb.collection('resumes').getFullList<ResumeRecord>({
      sort: '-updated',
      filter: `user = "${pb.authStore.model?.id}"`,
    });
    return records;
  },

  async getResume(id: string): Promise<ResumeRecord> {
    const record = await pb.collection('resumes').getOne<ResumeRecord>(id);
    return record;
  },

  async createResume(name: string, data: Resume): Promise<ResumeRecord> {
    const record = await pb.collection('resumes').create<ResumeRecord>({
      user: pb.authStore.model?.id,
      name,
      data,
    });
    return record;
  },

  async updateResume(id: string, data: Partial<{ name: string; data: Resume }>): Promise<ResumeRecord> {
    const record = await pb.collection('resumes').update<ResumeRecord>(id, data);
    return record;
  },

  async deleteResume(id: string): Promise<boolean> {
    await pb.collection('resumes').delete(id);
    return true;
  },
};