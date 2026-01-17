import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { resumeService, ResumeRecord } from '@/services/pocketbase';
import { useAuthStore } from '@/store/authStore';
import { useResumeStore } from '@/store/resumeStore';
import { createEmptyResume } from '@/types/resume';
import { Button } from '@/components/ui/Button';
import { FileText, Plus, Trash2, LogOut, Edit } from 'lucide-react';

export const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const { setResume } = useResumeStore();
  const [resumes, setResumes] = useState<ResumeRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadResumes();
  }, []);

  const loadResumes = async () => {
    try {
      const data = await resumeService.getResumes();
      setResumes(data);
    } catch (error) {
      console.error('Failed to load resumes:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateNew = async () => {
    try {
      const newResume = createEmptyResume();
      const record = await resumeService.createResume('Untitled Resume', newResume);
      setResume({ ...newResume, id: record.id });
      navigate(`/builder/${record.id}`);
    } catch (error) {
      console.error('Failed to create resume:', error);
    }
  };

  const handleEdit = async (record: ResumeRecord) => {
    setResume({ ...record.data, id: record.id });
    navigate(`/builder/${record.id}`);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this resume?')) return;
    
    try {
      await resumeService.deleteResume(id);
      setResumes(resumes.filter((r) => r.id !== id));
    } catch (error) {
      console.error('Failed to delete resume:', error);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-primary-600 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your resumes...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <FileText className="w-8 h-8 text-primary-600" />
              <h1 className="text-2xl font-bold text-gray-900">Resume Builder</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">{user?.email}</span>
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">My Resumes</h2>
            <p className="text-gray-600 mt-1">Create and manage your professional resumes</p>
          </div>
          <Button onClick={handleCreateNew}>
            <Plus className="w-5 h-5 mr-2" />
            New Resume
          </Button>
        </div>

        {resumes.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-lg shadow">
            <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No resumes yet</h3>
            <p className="text-gray-600 mb-6">Get started by creating your first resume</p>
            <Button onClick={handleCreateNew}>
              <Plus className="w-5 h-5 mr-2" />
              Create Your First Resume
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resumes.map((resume) => (
              <div
                key={resume.id}
                className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow p-6"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">{resume.name}</h3>
                    <p className="text-sm text-gray-500">
                      Updated {new Date(resume.updated).toLocaleDateString()}
                    </p>
                  </div>
                  <FileText className="w-8 h-8 text-primary-600" />
                </div>

                <div className="space-y-2">
                  <Button
                    onClick={() => handleEdit(resume)}
                    className="w-full"
                    variant="secondary"
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Edit Resume
                  </Button>
                  <Button
                    onClick={() => handleDelete(resume.id)}
                    className="w-full"
                    variant="danger"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};