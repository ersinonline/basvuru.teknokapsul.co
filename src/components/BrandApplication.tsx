import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { brands, BrandKey } from '../config/constants';
import { PersonalInfoForm } from './forms/PersonalInfoForm';
import { CategorySelection } from './forms/CategorySelection';
import { SuccessMessage } from './messages/SuccessMessage';
import { StepIndicator } from './StepIndicator';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebase';
import { generateApplicationNumber } from '../utils/generateApplicationNumber';
import { sendNotificationEmail } from '../services/email';

export const BrandApplication = () => {
  const { brandKey } = useParams<{ brandKey: string }>();
  const navigate = useNavigate();
  const brand = brands[brandKey?.toUpperCase() as BrandKey];

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    category: '',
  });
  const [applicationNumber, setApplicationNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!brand) {
    navigate('/');
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    const appNumber = generateApplicationNumber();
    const date = new Date().toISOString().split('T')[0];
    
    try {
      await addDoc(collection(db, 'applications'), {
        ...formData,
        brand: brand.name,
        applicationNumber: appNumber,
        date,
        status: 'pending'
      });

      await sendNotificationEmail({
        to_email: 'clk.ersinnn@gmail.com',
        application_number: appNumber,
        customer_name: formData.name,
        customer_email: formData.email,
        customer_phone: formData.phone,
        brand: brand.name,
        category: formData.category
      });

      setApplicationNumber(appNumber);
      setStep(2);
    } catch (error) {
      console.error('Error submitting application:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-[#ffb700] shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <span className="text-white text-xl font-bold">{brand.name} Başvurusu</span>
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

      <main className="max-w-2xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <StepIndicator currentStep={step} />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white shadow-xl rounded-2xl overflow-hidden"
        >
          {step === 1 ? (
            <form onSubmit={handleSubmit} className="p-8 space-y-8">
              <div className="flex items-center space-x-4 mb-8">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{brand.name}</h2>
                  <p className="text-gray-600">Hızlı ve kolay başvuru</p>
                </div>
              </div>

              <PersonalInfoForm
                name={formData.name}
                email={formData.email}
                phone={formData.phone}
                onChange={(field, value) => setFormData(prev => ({ ...prev, [field]: value }))}
              />

              <CategorySelection
                categories={brand.categories}
                selectedCategory={formData.category}
                onSelect={(category) => setFormData(prev => ({ ...prev, category }))}
              />

              <button
                type="submit"
                disabled={isLoading || !formData.name || !formData.email || !formData.phone || !formData.category}
                className="w-full py-3 px-4 bg-[#ffb700] text-white rounded-lg font-medium hover:bg-[#e5a600] focus:outline-none focus:ring-2 focus:ring-[#ffb700] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isLoading ? 'Gönderiliyor...' : 'Başvuruyu Gönder'}
              </button>
            </form>
          ) : (
            <div className="p-8">
              <SuccessMessage
                applicationNumber={applicationNumber}
                onNewApplication={() => navigate('/')}
              />
            </div>
          )}
        </motion.div>
      </main>
    </div>
  );
};