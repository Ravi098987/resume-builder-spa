import React, { useState } from 'react';
import { useResumeStore } from '@/store/resumeStore';
import { Input, Textarea } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Plus, Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import { Experience, Education, SkillCategory, Project, Certification } from '@/types/resume';

export const ResumeEditor: React.FC = () => {
  const { resume, updatePersonalInfo, updateSummary } = useResumeStore();
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set(['personal', 'summary'])
  );

  const toggleSection = (section: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(section)) {
      newExpanded.delete(section);
    } else {
      newExpanded.add(section);
    }
    setExpandedSections(newExpanded);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Edit Resume</h2>

      {/* Personal Information */}
      <Section
        title="Personal Information"
        isExpanded={expandedSections.has('personal')}
        onToggle={() => toggleSection('personal')}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Full Name"
            value={resume.personalInfo.fullName}
            onChange={(e) => updatePersonalInfo({ fullName: e.target.value })}
            placeholder="John Doe"
          />
          <Input
            label="Email"
            type="email"
            value={resume.personalInfo.email}
            onChange={(e) => updatePersonalInfo({ email: e.target.value })}
            placeholder="john@example.com"
          />
          <Input
            label="Phone"
            value={resume.personalInfo.phone}
            onChange={(e) => updatePersonalInfo({ phone: e.target.value })}
            placeholder="+1 (555) 123-4567"
          />
          <Input
            label="Location"
            value={resume.personalInfo.location}
            onChange={(e) => updatePersonalInfo({ location: e.target.value })}
            placeholder="San Francisco, CA"
          />
          <Input
            label="LinkedIn"
            value={resume.personalInfo.linkedin || ''}
            onChange={(e) => updatePersonalInfo({ linkedin: e.target.value })}
            placeholder="linkedin.com/in/johndoe"
          />
          <Input
            label="GitHub"
            value={resume.personalInfo.github || ''}
            onChange={(e) => updatePersonalInfo({ github: e.target.value })}
            placeholder="github.com/johndoe"
          />
        </div>
      </Section>

      {/* Summary */}
      <Section
        title="Professional Summary"
        isExpanded={expandedSections.has('summary')}
        onToggle={() => toggleSection('summary')}
      >
        <Textarea
          value={resume.summary}
          onChange={(e) => updateSummary(e.target.value)}
          placeholder="Brief professional summary highlighting your key strengths and experience..."
          rows={4}
        />
      </Section>

      {/* Experience */}
      <ExperienceSection
        isExpanded={expandedSections.has('experience')}
        onToggle={() => toggleSection('experience')}
      />

      {/* Education */}
      <EducationSection
        isExpanded={expandedSections.has('education')}
        onToggle={() => toggleSection('education')}
      />

      {/* Skills */}
      <SkillsSection
        isExpanded={expandedSections.has('skills')}
        onToggle={() => toggleSection('skills')}
      />

      {/* Projects */}
      <ProjectsSection
        isExpanded={expandedSections.has('projects')}
        onToggle={() => toggleSection('projects')}
      />

      {/* Certifications */}
      <CertificationsSection
        isExpanded={expandedSections.has('certifications')}
        onToggle={() => toggleSection('certifications')}
      />
    </div>
  );
};

const Section: React.FC<{
  title: string;
  isExpanded: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}> = ({ title, isExpanded, onToggle, children }) => {
  return (
    <div className="border rounded-lg">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-colors"
      >
        <h3 className="font-semibold text-lg">{title}</h3>
        {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
      </button>
      {isExpanded && <div className="p-4">{children}</div>}
    </div>
  );
};

const ExperienceSection: React.FC<{ isExpanded: boolean; onToggle: () => void }> = ({
  isExpanded,
  onToggle,
}) => {
  const { resume, addExperience, updateExperience, deleteExperience } = useResumeStore();

  const handleAdd = () => {
    const newExp: Experience = {
      id: Date.now().toString(),
      company: '',
      position: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      description: '',
      achievements: [],
    };
    addExperience(newExp);
  };

  return (
    <Section title="Experience" isExpanded={isExpanded} onToggle={onToggle}>
      <div className="space-y-4">
        {resume.experience.map((exp) => (
          <div key={exp.id} className="border rounded-lg p-4 bg-gray-50">
            <div className="flex justify-between mb-4">
              <h4 className="font-medium">Experience Entry</h4>
              <Button variant="danger" size="sm" onClick={() => deleteExperience(exp.id)}>
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Position"
                value={exp.position}
                onChange={(e) => updateExperience(exp.id, { position: e.target.value })}
              />
              <Input
                label="Company"
                value={exp.company}
                onChange={(e) => updateExperience(exp.id, { company: e.target.value })}
              />
              <Input
                label="Location"
                value={exp.location}
                onChange={(e) => updateExperience(exp.id, { location: e.target.value })}
              />
              <Input
                label="Start Date"
                value={exp.startDate}
                onChange={(e) => updateExperience(exp.id, { startDate: e.target.value })}
                placeholder="Jan 2020"
              />
              <Input
                label="End Date"
                value={exp.endDate}
                onChange={(e) => updateExperience(exp.id, { endDate: e.target.value })}
                placeholder="Dec 2022"
                disabled={exp.current}
              />
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={exp.current}
                  onChange={(e) => updateExperience(exp.id, { current: e.target.checked })}
                  className="mr-2"
                />
                <label className="text-sm">Current Position</label>
              </div>
            </div>
            <div className="mt-4">
              <Textarea
                label="Description"
                value={exp.description}
                onChange={(e) => updateExperience(exp.id, { description: e.target.value })}
                rows={2}
              />
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Achievements (one per line)
              </label>
              <Textarea
                value={exp.achievements.join('\n')}
                onChange={(e) =>
                  updateExperience(exp.id, { achievements: e.target.value.split('\n') })
                }
                rows={3}
                placeholder="• Led team of 5 developers&#10;• Increased performance by 40%"
              />
            </div>
          </div>
        ))}
        <Button onClick={handleAdd} variant="secondary" className="w-full">
          <Plus className="w-4 h-4 mr-2" />
          Add Experience
        </Button>
      </div>
    </Section>
  );
};

const EducationSection: React.FC<{ isExpanded: boolean; onToggle: () => void }> = ({
  isExpanded,
  onToggle,
}) => {
  const { resume, addEducation, updateEducation, deleteEducation } = useResumeStore();

  const handleAdd = () => {
    const newEdu: Education = {
      id: Date.now().toString(),
      institution: '',
      degree: '',
      field: '',
      location: '',
      startDate: '',
      endDate: '',
      achievements: [],
    };
    addEducation(newEdu);
  };

  return (
    <Section title="Education" isExpanded={isExpanded} onToggle={onToggle}>
      <div className="space-y-4">
        {resume.education.map((edu) => (
          <div key={edu.id} className="border rounded-lg p-4 bg-gray-50">
            <div className="flex justify-between mb-4">
              <h4 className="font-medium">Education Entry</h4>
              <Button variant="danger" size="sm" onClick={() => deleteEducation(edu.id)}>
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Institution"
                value={edu.institution}
                onChange={(e) => updateEducation(edu.id, { institution: e.target.value })}
              />
              <Input
                label="Degree"
                value={edu.degree}
                onChange={(e) => updateEducation(edu.id, { degree: e.target.value })}
              />
              <Input
                label="Field of Study"
                value={edu.field}
                onChange={(e) => updateEducation(edu.id, { field: e.target.value })}
              />
              <Input
                label="Location"
                value={edu.location}
                onChange={(e) => updateEducation(edu.id, { location: e.target.value })}
              />
              <Input
                label="Start Date"
                value={edu.startDate}
                onChange={(e) => updateEducation(edu.id, { startDate: e.target.value })}
              />
              <Input
                label="End Date"
                value={edu.endDate}
                onChange={(e) => updateEducation(edu.id, { endDate: e.target.value })}
              />
              <Input
                label="GPA (Optional)"
                value={edu.gpa || ''}
                onChange={(e) => updateEducation(edu.id, { gpa: e.target.value })}
              />
            </div>
          </div>
        ))}
        <Button onClick={handleAdd} variant="secondary" className="w-full">
          <Plus className="w-4 h-4 mr-2" />
          Add Education
        </Button>
      </div>
    </Section>
  );
};

const SkillsSection: React.FC<{ isExpanded: boolean; onToggle: () => void }> = ({
  isExpanded,
  onToggle,
}) => {
  const { resume, addSkillCategory, updateSkillCategory, deleteSkillCategory } = useResumeStore();

  const handleAdd = () => {
    const newCat: SkillCategory = {
      id: Date.now().toString(),
      category: '',
      skills: [],
    };
    addSkillCategory(newCat);
  };

  return (
    <Section title="Skills" isExpanded={isExpanded} onToggle={onToggle}>
      <div className="space-y-4">
        {resume.skills.map((skillCat) => (
          <div key={skillCat.id} className="border rounded-lg p-4 bg-gray-50">
            <div className="flex justify-between mb-4">
              <h4 className="font-medium">Skill Category</h4>
              <Button variant="danger" size="sm" onClick={() => deleteSkillCategory(skillCat.id)}>
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
            <Input
              label="Category"
              value={skillCat.category}
              onChange={(e) => updateSkillCategory(skillCat.id, { category: e.target.value })}
              placeholder="Programming Languages"
            />
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Skills (comma-separated)
              </label>
              <Input
                value={skillCat.skills.join(', ')}
                onChange={(e) =>
                  updateSkillCategory(skillCat.id, {
                    skills: e.target.value.split(',').map((s) => s.trim()),
                  })
                }
                placeholder="React, TypeScript, Node.js"
              />
            </div>
          </div>
        ))}
        <Button onClick={handleAdd} variant="secondary" className="w-full">
          <Plus className="w-4 h-4 mr-2" />
          Add Skill Category
        </Button>
      </div>
    </Section>
  );
};

const ProjectsSection: React.FC<{ isExpanded: boolean; onToggle: () => void }> = ({
  isExpanded,
  onToggle,
}) => {
  const { resume, addProject, updateProject, deleteProject } = useResumeStore();

  const handleAdd = () => {
    const newProject: Project = {
      id: Date.now().toString(),
      name: '',
      description: '',
      technologies: [],
      highlights: [],
    };
    addProject(newProject);
  };

  return (
    <Section title="Projects" isExpanded={isExpanded} onToggle={onToggle}>
      <div className="space-y-4">
        {resume.projects.map((project) => (
          <div key={project.id} className="border rounded-lg p-4 bg-gray-50">
            <div className="flex justify-between mb-4">
              <h4 className="font-medium">Project Entry</h4>
              <Button variant="danger" size="sm" onClick={() => deleteProject(project.id)}>
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
            <div className="space-y-4">
              <Input
                label="Project Name"
                value={project.name}
                onChange={(e) => updateProject(project.id, { name: e.target.value })}
              />
              <Textarea
                label="Description"
                value={project.description}
                onChange={(e) => updateProject(project.id, { description: e.target.value })}
                rows={2}
              />
              <Input
                label="Technologies (comma-separated)"
                value={project.technologies.join(', ')}
                onChange={(e) =>
                  updateProject(project.id, {
                    technologies: e.target.value.split(',').map((t) => t.trim()),
                  })
                }
                placeholder="React, Node.js, PostgreSQL"
              />
            </div>
          </div>
        ))}
        <Button onClick={handleAdd} variant="secondary" className="w-full">
          <Plus className="w-4 h-4 mr-2" />
          Add Project
        </Button>
      </div>
    </Section>
  );
};

const CertificationsSection: React.FC<{ isExpanded: boolean; onToggle: () => void }> = ({
  isExpanded,
  onToggle,
}) => {
  const { resume, addCertification, updateCertification, deleteCertification } = useResumeStore();

  const handleAdd = () => {
    const newCert: Certification = {
      id: Date.now().toString(),
      name: '',
      issuer: '',
      date: '',
    };
    addCertification(newCert);
  };

  return (
    <Section title="Certifications" isExpanded={isExpanded} onToggle={onToggle}>
      <div className="space-y-4">
        {resume.certifications.map((cert) => (
          <div key={cert.id} className="border rounded-lg p-4 bg-gray-50">
            <div className="flex justify-between mb-4">
              <h4 className="font-medium">Certification Entry</h4>
              <Button variant="danger" size="sm" onClick={() => deleteCertification(cert.id)}>
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Certification Name"
                value={cert.name}
                onChange={(e) => updateCertification(cert.id, { name: e.target.value })}
              />
              <Input
                label="Issuer"
                value={cert.issuer}
                onChange={(e) => updateCertification(cert.id, { issuer: e.target.value })}
              />
              <Input
                label="Date"
                value={cert.date}
                onChange={(e) => updateCertification(cert.id, { date: e.target.value })}
                placeholder="Jan 2023"
              />
              <Input
                label="Credential ID (Optional)"
                value={cert.credentialId || ''}
                onChange={(e) => updateCertification(cert.id, { credentialId: e.target.value })}
              />
            </div>
          </div>
        ))}
        <Button onClick={handleAdd} variant="secondary" className="w-full">
          <Plus className="w-4 h-4 mr-2" />
          Add Certification
        </Button>
      </div>
    </Section>
  );
};