import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { generateApplicationNumber } from '../utils/generateApplicationNumber';
import { sendNotificationEmail } from '../services/email';
import { TvIcon, ArrowRight, Loader2, CheckCircle2 } from 'lucide-react';
import { StepIndicator } from './StepIndicator';
import { CategoryCard } from './cards/CategoryCard';
import { BrandCard } from './cards/BrandCard';
import { PersonalInfoForm } from './forms/PersonalInfoForm';
import { brands, categories } from '../config/constants';
import { SuccessMessage } from './messages/SuccessMessage';

export const ApplicationForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    category: '',
    brand: '',
  });
  const [applicationNumber, setApplicationNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    const appNumber = generateApplicationNumber();
    const date = new Date().toISOString().split('T')[0];
    
    try {
      await addDoc(collection(db, 'applications'), {
        ...formData,
        applicationNumber: appNumber,
        date,
        status: 'pending'
      });

      await sendNotificationEmail({
        to_email: 'clk.ersinnn@gmail.com',
        application_number: appNumber,
        customer_name: formData.name,
        customer_email: formData.email,
        brand: formData.brand,
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

  const handleFieldChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const renderStep1 = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      <PersonalInfoForm
        name={formData.name}
        email={formData.email}
        onChange={handleFieldChange}
      />

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Hizmet Kategorisi</h3>
        <div className="grid gap-3">
          {categories.map((category) => (
            <CategoryCard
              key={category}
              category={category}
              isSelected={formData.category === category}
              onSelect={(category) => handleFieldChange('category', category)}
            />
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Tercih Ettiğiniz Marka</h3>
        <div className="grid grid-cols-2 gap-3">
          {brands.map((brand) => (
            <BrandCard
              key={brand}
              brand={brand}
              isSelected={formData.brand === brand}
              onSelect={(brand) => handleFieldChange('brand', brand)}
            />
          ))}
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading || !formData.name || !formData.email || !formData.category || !formData.brand}
        className="w-full flex items-center justify-center space-x-2 py-3 px-4 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {isLoading ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : (
          <>
            <span>Başvuruyu Gönder</span>
            <ArrowRight className="w-5 h-5" />
          </>
        )}
      </button>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-12">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <TvIcon className="w-12 h-12 text-blue-600 mx-auto" />
          <h2 className="mt-4 text-3xl font-bold text-gray-900">
            TV Abonelik Başvurusu
          </h2>
          <p className="mt-2 text-gray-600">
            Hızlı ve kolay başvuru ile dijital yayın dünyasına adım atın
          </p>
        </div>

        <StepIndicator currentStep={step} />

        <div className="mt-8 bg-white shadow-lg rounded-2xl p-6 md:p-8">
          <form onSubmit={handleSubmit}>
            <AnimatePresence mode="wait">
              {step === 1 ? renderStep1() : (
                <SuccessMessage
                  applicationNumber={applicationNumber}
                  onNewApplication={() => window.location.reload()}
                />
              )}
            </AnimatePresence>
          </form>
        </div>
      </div>
    </div>
  );
};