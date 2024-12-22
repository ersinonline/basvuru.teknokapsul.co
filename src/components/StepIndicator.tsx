import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

interface StepIndicatorProps {
  currentStep: number;
}

export const StepIndicator: React.FC<StepIndicatorProps> = ({ currentStep }) => {
  const steps = [
    { number: 1, label: 'Bilgi Girişi' },
    { number: 2, label: 'Tamamlandı' },
  ];

  return (
    <div className="relative">
      <div className="absolute inset-0 flex items-center" aria-hidden="true">
        <div className="w-full border-t border-gray-200" />
      </div>
      <div className="relative flex justify-between">
        {steps.map((step) => (
          <div
            key={step.number}
            className="flex flex-col items-center"
          >
            <div className="relative flex items-center justify-center">
              {step.number < currentStep ? (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center"
                >
                  <CheckCircle2 className="w-5 h-5 text-white" />
                </motion.div>
              ) : step.number === currentStep ? (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center"
                >
                  <span className="text-white font-medium">{step.number}</span>
                </motion.div>
              ) : (
                <div className="w-8 h-8 rounded-full border-2 border-gray-200 flex items-center justify-center">
                  <span className="text-gray-500 font-medium">{step.number}</span>
                </div>
              )}
            </div>
            <p className="mt-2 text-sm font-medium text-gray-500">{step.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};