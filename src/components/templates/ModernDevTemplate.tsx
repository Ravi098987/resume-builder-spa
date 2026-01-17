 import React from 'react';
import { Resume } from '@/types/resume';

interface TemplateProps {
  resume: Resume;
}

export const ModernDevTemplate: React.FC<TemplateProps> = ({ resume }) => {
  const { personalInfo, summary, experience, education, skills, projects, certifications } = resume;

  return (
    <div className="bg-white w-full max-w-[8.5in] mx-auto min-h-[11in]" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <div className="flex min-h-[11in]">
        {/* Left Sidebar */}
        <div className="w-1/3 bg-slate-800 text-white p-8">
          {/* Contact Info */}
          <div className="mb-8">
            <h2 className="text-xs uppercase tracking-wider font-bold mb-4 text-slate-300">Contact</h2>
            <div className="space-y-2 text-sm">
              {personalInfo.email && (
                <div>
                  <p className="text-slate-400 text-xs">Email</p>
                  <p className="break-words">{personalInfo.email}</p>
                </div>
              )}
              {personalInfo.phone && (
                <div>
                  <p className="text-slate-400 text-xs">Phone</p>
                  <p>{personalInfo.phone}</p>
                </div>
              )}
              {personalInfo.location && (
                <div>
                  <p className="text-slate-400 text-xs">Location</p>
                  <p>{personalInfo.location}</p>
                </div>
              )}
            </div>
          </div>

          {/* Links */}
          {(personalInfo.linkedin || personalInfo.github || personalInfo.website) && (
            <div className="mb-8">
              <h2 className="text-xs uppercase tracking-wider font-bold mb-4 text-slate-300">Links</h2>
              <div className="space-y-2 text-sm">
                {personalInfo.linkedin && (
                  <div>
                    <p className="text-slate-400 text-xs">LinkedIn</p>
                    <p className="break-words">{personalInfo.linkedin}</p>
                  </div>
                )}
                {personalInfo.github && (
                  <div>
                    <p className="text-slate-400 text-xs">GitHub</p>
                    <p className="break-words">{personalInfo.github}</p>
                  </div>
                )}
                {personalInfo.website && (
                  <div>
                    <p className="text-slate-400 text-xs">Website</p>
                    <p className="break-words">{personalInfo.website}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Skills */}
          {skills.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xs uppercase tracking-wider font-bold mb-4 text-slate-300">Skills</h2>
              {skills.map((skillCat) => (
                <div key={skillCat.id} className="mb-4">
                  <p className="font-semibold text-sm mb-2">{skillCat.category}</p>
                  <div className="flex flex-wrap gap-1">
                    {skillCat.skills.map((skill, idx) => (
                      <span key={idx} className="text-xs bg-slate-700 px-2 py-1 rounded">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Certifications */}
          {certifications.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xs uppercase tracking-wider font-bold mb-4 text-slate-300">Certifications</h2>
              {certifications.map((cert) => (
                <div key={cert.id} className="mb-3 text-sm">
                  <p className="font-semibold">{cert.name}</p>
                  <p className="text-xs text-slate-400">{cert.issuer}</p>
                  <p className="text-xs text-slate-400">{cert.date}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Main Content */}
        <div className="w-2/3 p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">{personalInfo.fullName || 'Your Name'}</h1>
            <div className="h-1 w-20 bg-slate-800 mb-4"></div>
            {summary && <p className="text-slate-700 leading-relaxed">{summary}</p>}
          </div>

          {/* Experience */}
          {experience.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-bold mb-4 text-slate-800 uppercase tracking-wide">Experience</h2>
              {experience.map((exp) => (
                <div key={exp.id} className="mb-6">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-bold text-lg">{exp.position}</h3>
                      <p className="text-slate-600">{exp.company} • {exp.location}</p>
                    </div>
                    <span className="text-sm text-slate-500 whitespace-nowrap">
                      {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                    </span>
                  </div>
                  {exp.description && <p className="text-sm text-slate-700 mb-2">{exp.description}</p>}
                  {exp.achievements.length > 0 && (
                    <ul className="space-y-1 text-sm text-slate-700">
                      {exp.achievements.map((achievement, idx) => (
                        <li key={idx} className="flex items-start">
                          <span className="text-slate-400 mr-2">▸</span>
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Projects */}
          {projects.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-bold mb-4 text-slate-800 uppercase tracking-wide">Projects</h2>
              {projects.map((project) => (
                <div key={project.id} className="mb-5">
                  <h3 className="font-bold text-lg mb-1">{project.name}</h3>
                  <p className="text-sm text-slate-700 mb-2">{project.description}</p>
                  {project.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-2">
                      {project.technologies.map((tech, idx) => (
                        <span key={idx} className="text-xs bg-slate-100 text-slate-700 px-2 py-1 rounded">
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                  {project.highlights.length > 0 && (
                    <ul className="space-y-1 text-sm text-slate-700">
                      {project.highlights.map((highlight, idx) => (
                        <li key={idx} className="flex items-start">
                          <span className="text-slate-400 mr-2">▸</span>
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Education */}
          {education.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-bold mb-4 text-slate-800 uppercase tracking-wide">Education</h2>
              {education.map((edu) => (
                <div key={edu.id} className="mb-4">
                  <div className="flex justify-between items-start mb-1">
                    <div>
                      <h3 className="font-bold text-lg">{edu.degree} in {edu.field}</h3>
                      <p className="text-slate-600">{edu.institution}</p>
                      {edu.gpa && <p className="text-sm text-slate-600">GPA: {edu.gpa}</p>}
                    </div>
                    <span className="text-sm text-slate-500 whitespace-nowrap">
                      {edu.startDate} - {edu.endDate}
                    </span>
                  </div>
                  {edu.achievements.length > 0 && (
                    <ul className="space-y-1 text-sm text-slate-700 mt-2">
                      {edu.achievements.map((achievement, idx) => (
                        <li key={idx} className="flex items-start">
                          <span className="text-slate-400 mr-2">▸</span>
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};