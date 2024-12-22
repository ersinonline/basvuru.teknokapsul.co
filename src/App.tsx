import React from 'react';
import { BrandSelection } from './components/BrandSelection';
import { ApplicationStatus } from './components/ApplicationStatus';
import { Link } from 'react-router-dom';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-[#ffb700] shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <span className="text-white text-xl font-bold">Dijital TV & Internet</span>
            </div>
            <div className="flex items-center">
              <Link
                to="/status"
                className="text-white hover:text-gray-100 font-medium transition-colors"
              >
                Başvuru Sorgula
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <BrandSelection />
          <ApplicationStatus />
        </div>
      </main>
    </div>
  );
}

export default App;