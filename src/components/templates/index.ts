import { ATSMinimalTemplate } from './ATSMinimalTemplate';
import { ModernDevTemplate } from './ModernDevTemplate';
import { Resume } from '@/types/resume';

export interface TemplateInfo {
  id: string;
  name: string;
  description: string;
  component: React.FC<{ resume: Resume }>;
  preview: string;
}

export const templates: TemplateInfo[] = [
  {
    id: 'ats-minimal',
    name: 'ATS Minimal',
    description: 'Clean, ATS-friendly format optimized for applicant tracking systems',
    component: ATSMinimalTemplate,
    preview: '/previews/ats-minimal.png',
  },
  {
    id: 'modern-dev',
    name: 'Modern Developer',
    description: 'Contemporary design perfect for tech professionals and developers',
    component: ModernDevTemplate,
    preview: '/previews/modern-dev.png',
  },
];

export const getTemplate = (templateId: string) => {
  return templates.find((t) => t.id === templateId) || templates[0];
};