 import React from 'react';
import { Resume } from '@/types/resume';

interface TemplateProps {
  resume: Resume;
}

export const ATSMinimalTemplate: React.FC<TemplateProps> = ({ resume }) => {
  const { personalInfo, summary, experience, education, skills, projects, certifications } = resume;

  return (
    <div className="bg-white p-8 w-full max-w-[8.5in] mx-auto min-h-[11in]" style={{ fontFamily: 'Arial, sans-serif' }}>
      {/* Header */}
      <div className="mb-6 text-center border-b-2 border-black pb-4">
        <h1 className="text-3xl font-bold mb-2 uppercase">{personalInfo.fullName || 'Your Name'}</h1>
        <div className="text-sm space-x-3">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>• {personalInfo.phone}</span>}
          {personalInfo.location && <span>• {personalInfo.location}</span>}
        </div>
        <div className="text-sm space-x-3 mt-1">
          {personalInfo.linkedin && <span>LinkedIn: {personalInfo.linkedin}</span>}
          {personalInfo.github && <span>• GitHub: {personalInfo.github}</span>}
          {personalInfo.website && <span>• {personalInfo.website}</span>}
        </div>
      </div>

      {/* Summary */}
      {summary && (
        <div className="mb-6">
          <h2 className="text-lg font-bold uppercase border-b border-black mb-2">Professional Summary</h2>
          <p className="text-sm leading-relaxed">{summary}</p>
        </div>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold uppercase border-b border-black mb-3">Professional Experience</h2>
          {experience.map((exp) => (
            <div key={exp.id} className="mb-4">
              <div className="flex justify-between items-start mb-1">
                <div>
                  <h3 className="font-bold text-base">{exp.position}</h3>
                  <p className="text-sm">{exp.company} • {exp.location}</p>
                </div>
                <span className="text-sm whitespace-nowrap">
                  {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                </span>
              </div>
              {exp.description && <p className="text-sm mb-2">{exp.description}</p>}
              {exp.achievements.length > 0 && (
                <ul className="list-disc list-inside text-sm space-y-1">
                  {exp.achievements.map((achievement, idx) => (
                    <li key={idx}>{achievement}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold uppercase border-b border-black mb-3">Projects</h2>
          {projects.map((project) => (
            <div key={project.id} className="mb-3">
              <h3 className="font-bold text-base">{project.name}</h3>
              <p className="text-sm mb-1">{project.description}</p>
              {project.technologies.length > 0 && (
                <p className="text-sm italic">Technologies: {project.technologies.join(', ')}</p>
              )}
              {project.highlights.length > 0 && (
                <ul className="list-disc list-inside text-sm space-y-1 mt-1">
                  {project.highlights.map((highlight, idx) => (
                    <li key={idx}>{highlight}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Education */}
      {education.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold uppercase border-b border-black mb-3">Education</h2>
          {education.map((edu) => (
            <div key={edu.id} className="mb-3">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-base">{edu.degree} in {edu.field}</h3>
                  <p className="text-sm">{edu.institution} • {edu.location}</p>
                  {edu.gpa && <p className="text-sm">GPA: {edu.gpa}</p>}
                </div>
                <span className="text-sm whitespace-nowrap">{edu.startDate} - {edu.endDate}</span>
              </div>
              {edu.achievements.length > 0 && (
                <ul className="list-disc list-inside text-sm space-y-1 mt-1">
                  {edu.achievements.map((achievement, idx) => (
                    <li key={idx}>{achievement}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold uppercase border-b border-black mb-3">Technical Skills</h2>
          {skills.map((skillCat) => (
            <div key={skillCat.id} className="mb-2">
              <span className="font-bold text-sm">{skillCat.category}: </span>
              <span className="text-sm">{skillCat.skills.join(', ')}</span>
            </div>
          ))}
        </div>
      )}

      {/* Certifications */}
      {certifications.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold uppercase border-b border-black mb-3">Certifications</h2>
          {certifications.map((cert) => (
            <div key={cert.id} className="mb-2">
              <h3 className="font-bold text-sm">{cert.name}</h3>
              <p className="text-sm">{cert.issuer} • {cert.date}</p>
              {cert.credentialId && <p className="text-sm">Credential ID: {cert.credentialId}</p>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};