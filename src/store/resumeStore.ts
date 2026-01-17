import { create } from 'zustand';
import { Resume, createEmptyResume } from '@/types/resume';

interface ResumeStore {
  resume: Resume;
  isLoading: boolean;
  isSaving: boolean;
  
  // Actions
  setResume: (resume: Resume) => void;
  updatePersonalInfo: (info: Partial<Resume['personalInfo']>) => void;
  updateSummary: (summary: string) => void;
  setTemplateId: (templateId: string) => void;
  
  // Experience
  addExperience: (exp: Resume['experience'][0]) => void;
  updateExperience: (id: string, exp: Partial<Resume['experience'][0]>) => void;
  deleteExperience: (id: string) => void;
  
  // Education
  addEducation: (edu: Resume['education'][0]) => void;
  updateEducation: (id: string, edu: Partial<Resume['education'][0]>) => void;
  deleteEducation: (id: string) => void;
  
  // Skills
  addSkillCategory: (category: Resume['skills'][0]) => void;
  updateSkillCategory: (id: string, category: Partial<Resume['skills'][0]>) => void;
  deleteSkillCategory: (id: string) => void;
  
  // Projects
  addProject: (project: Resume['projects'][0]) => void;
  updateProject: (id: string, project: Partial<Resume['projects'][0]>) => void;
  deleteProject: (id: string) => void;
  
  // Certifications
  addCertification: (cert: Resume['certifications'][0]) => void;
  updateCertification: (id: string, cert: Partial<Resume['certifications'][0]>) => void;
  deleteCertification: (id: string) => void;
  
  // State management
  setLoading: (loading: boolean) => void;
  setSaving: (saving: boolean) => void;
  resetResume: () => void;
}

export const useResumeStore = create<ResumeStore>((set) => ({
  resume: createEmptyResume(),
  isLoading: false,
  isSaving: false,

  setResume: (resume) => set({ resume }),
  
  updatePersonalInfo: (info) =>
    set((state) => ({
      resume: {
        ...state.resume,
        personalInfo: { ...state.resume.personalInfo, ...info },
        metadata: { ...state.resume.metadata, updatedAt: new Date().toISOString() },
      },
    })),

  updateSummary: (summary) =>
    set((state) => ({
      resume: {
        ...state.resume,
        summary,
        metadata: { ...state.resume.metadata, updatedAt: new Date().toISOString() },
      },
    })),

  setTemplateId: (templateId) =>
    set((state) => ({
      resume: {
        ...state.resume,
        templateId,
        metadata: { ...state.resume.metadata, updatedAt: new Date().toISOString() },
      },
    })),

  // Experience
  addExperience: (exp) =>
    set((state) => ({
      resume: {
        ...state.resume,
        experience: [...state.resume.experience, exp],
        metadata: { ...state.resume.metadata, updatedAt: new Date().toISOString() },
      },
    })),

  updateExperience: (id, exp) =>
    set((state) => ({
      resume: {
        ...state.resume,
        experience: state.resume.experience.map((e) =>
          e.id === id ? { ...e, ...exp } : e
        ),
        metadata: { ...state.resume.metadata, updatedAt: new Date().toISOString() },
      },
    })),

  deleteExperience: (id) =>
    set((state) => ({
      resume: {
        ...state.resume,
        experience: state.resume.experience.filter((e) => e.id !== id),
        metadata: { ...state.resume.metadata, updatedAt: new Date().toISOString() },
      },
    })),

  // Education
  addEducation: (edu) =>
    set((state) => ({
      resume: {
        ...state.resume,
        education: [...state.resume.education, edu],
        metadata: { ...state.resume.metadata, updatedAt: new Date().toISOString() },
      },
    })),

  updateEducation: (id, edu) =>
    set((state) => ({
      resume: {
        ...state.resume,
        education: state.resume.education.map((e) =>
          e.id === id ? { ...e, ...edu } : e
        ),
        metadata: { ...state.resume.metadata, updatedAt: new Date().toISOString() },
      },
    })),

  deleteEducation: (id) =>
    set((state) => ({
      resume: {
        ...state.resume,
        education: state.resume.education.filter((e) => e.id !== id),
        metadata: { ...state.resume.metadata, updatedAt: new Date().toISOString() },
      },
    })),

  // Skills
  addSkillCategory: (category) =>
    set((state) => ({
      resume: {
        ...state.resume,
        skills: [...state.resume.skills, category],
        metadata: { ...state.resume.metadata, updatedAt: new Date().toISOString() },
      },
    })),

  updateSkillCategory: (id, category) =>
    set((state) => ({
      resume: {
        ...state.resume,
        skills: state.resume.skills.map((s) =>
          s.id === id ? { ...s, ...category } : s
        ),
        metadata: { ...state.resume.metadata, updatedAt: new Date().toISOString() },
      },
    })),

  deleteSkillCategory: (id) =>
    set((state) => ({
      resume: {
        ...state.resume,
        skills: state.resume.skills.filter((s) => s.id !== id),
        metadata: { ...state.resume.metadata, updatedAt: new Date().toISOString() },
      },
    })),

  // Projects
  addProject: (project) =>
    set((state) => ({
      resume: {
        ...state.resume,
        projects: [...state.resume.projects, project],
        metadata: { ...state.resume.metadata, updatedAt: new Date().toISOString() },
      },
    })),

  updateProject: (id, project) =>
    set((state) => ({
      resume: {
        ...state.resume,
        projects: state.resume.projects.map((p) =>
          p.id === id ? { ...p, ...project } : p
        ),
        metadata: { ...state.resume.metadata, updatedAt: new Date().toISOString() },
      },
    })),

  deleteProject: (id) =>
    set((state) => ({
      resume: {
        ...state.resume,
        projects: state.resume.projects.filter((p) => p.id !== id),
        metadata: { ...state.resume.metadata, updatedAt: new Date().toISOString() },
      },
    })),

  // Certifications
  addCertification: (cert) =>
    set((state) => ({
      resume: {
        ...state.resume,
        certifications: [...state.resume.certifications, cert],
        metadata: { ...state.resume.metadata, updatedAt: new Date().toISOString() },
      },
    })),

  updateCertification: (id, cert) =>
    set((state) => ({
      resume: {
        ...state.resume,
        certifications: state.resume.certifications.map((c) =>
          c.id === id ? { ...c, ...cert } : c
        ),
        metadata: { ...state.resume.metadata, updatedAt: new Date().toISOString() },
      },
    })),

  deleteCertification: (id) =>
    set((state) => ({
      resume: {
        ...state.resume,
        certifications: state.resume.certifications.filter((c) => c.id !== id),
        metadata: { ...state.resume.metadata, updatedAt: new Date().toISOString() },
      },
    })),

  setLoading: (loading) => set({ isLoading: loading }),
  setSaving: (saving) => set({ isSaving: saving }),
  resetResume: () => set({ resume: createEmptyResume() }),
}));