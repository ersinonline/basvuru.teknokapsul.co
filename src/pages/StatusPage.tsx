import React from 'react';
import { ApplicationStatus } from '../components/ApplicationStatus';

export const StatusPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-[#ffb700] shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <span className="text-white text-xl font-bold">Başvuru Sorgulama</span>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-2xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <ApplicationStatus />
      </main>
    </div>
  );
};