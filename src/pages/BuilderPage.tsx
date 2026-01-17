 import React, { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { resumeService } from '@/services/pocketbase';
import { useResumeStore } from '@/store/resumeStore';
import { getTemplate, templates } from '@/components/templates';
import { Button } from '@/components/ui/Button';
import { exportToPDF } from '@/utils/pdfExport';
import { Save, Download, ArrowLeft, Eye } from 'lucide-react';
import { ResumeEditor } from '@/components/builder/ResumeEditor';

export const BuilderPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { resume, setResume, isSaving, setSaving } = useResumeStore();
  const [isExporting, setIsExporting] = useState(false);
  const [showPreview, setShowPreview] = useState(true);
  const [previewZoom, setPreviewZoom] = useState(0.6);
  const previewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (id && id !== resume.id) {
      loadResume(id);
    }
  }, [id]);

  const loadResume = async (resumeId: string) => {
    try {
      const record = await resumeService.getResume(resumeId);
      setResume({ ...record.data, id: record.id });
    } catch (error) {
      console.error('Failed to load resume:', error);
      navigate('/dashboard');
    }
  };

  const handleSave = async () => {
    if (!id) return;
    
    setSaving(true);
    try {
      await resumeService.updateResume(id, { data: resume });
      alert('Resume saved successfully!');
    } catch (error) {
      console.error('Failed to save resume:', error);
      alert('Failed to save resume. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleExport = async () => {
    if (!previewRef.current) return;

    setIsExporting(true);
    try {
      // Get the actual template element (not the scaled wrapper)
      const templateElement = previewRef.current.querySelector('.resume-template');
      if (!templateElement) {
        throw new Error('Template element not found');
      }
      
      await exportToPDF(templateElement as HTMLElement, {
        filename: `${resume.personalInfo.fullName || 'resume'}.pdf`,
      });
    } catch (error) {
      console.error('Export failed:', error);
      alert('Failed to export PDF. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  const TemplateComponent = getTemplate(resume.templateId).component;

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" onClick={() => navigate('/dashboard')}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <h1 className="text-xl font-semibold text-gray-900">Resume Builder</h1>
            </div>

            <div className="flex items-center space-x-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowPreview(!showPreview)}
              >
                <Eye className="w-4 h-4 mr-2" />
                {showPreview ? 'Hide' : 'Show'} Preview
              </Button>
              
              <Button
                variant="secondary"
                size="sm"
                onClick={handleSave}
                isLoading={isSaving}
              >
                <Save className="w-4 h-4 mr-2" />
                Save
              </Button>

              <Button
                size="sm"
                onClick={handleExport}
                isLoading={isExporting}
              >
                <Download className="w-4 h-4 mr-2" />
                Export PDF
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Editor Panel */}
          <div className="bg-white rounded-lg shadow p-6 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 160px)' }}>
            <ResumeEditor />
          </div>

          {/* Preview Panel */}
          {showPreview && (
            <div className="bg-white rounded-lg shadow p-6 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 160px)' }}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Template
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {templates.map((template) => (
                    <button
                      key={template.id}
                      onClick={() => useResumeStore.getState().setTemplateId(template.id)}
                      className={`p-3 border-2 rounded-lg text-left transition-colors ${
                        resume.templateId === template.id
                          ? 'border-primary-600 bg-primary-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <p className="font-medium text-sm">{template.name}</p>
                      <p className="text-xs text-gray-600 mt-1">{template.description}</p>
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-4 flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">Preview Zoom</label>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setPreviewZoom(Math.max(0.3, previewZoom - 0.1))}
                    className="px-2 py-1 text-sm border rounded hover:bg-gray-100"
                  >
                    −
                  </button>
                  <span className="text-sm text-gray-600 w-12 text-center">
                    {Math.round(previewZoom * 100)}%
                  </span>
                  <button
                    onClick={() => setPreviewZoom(Math.min(1, previewZoom + 0.1))}
                    className="px-2 py-1 text-sm border rounded hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="border rounded-lg overflow-auto bg-gray-100 p-4">
                <div
                  style={{
                    transform: `scale(${previewZoom})`,
                    transformOrigin: 'top left',
                    width: `${100 / previewZoom}%`,
                  }}
                >
                  <div ref={previewRef} className="resume-template bg-white shadow-lg">
                    <TemplateComponent resume={resume} />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};