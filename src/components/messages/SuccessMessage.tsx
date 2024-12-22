import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

interface SuccessMessageProps {
  applicationNumber: string;
  onNewApplication: () => void;
}

export const SuccessMessage: React.FC<SuccessMessageProps> = ({
  applicationNumber,
  onNewApplication
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center space-y-6"
    >
      <div className="relative inline-flex">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <CheckCircle2 className="w-20 h-20 text-green-500" />
        </motion.div>
      </div>
      
      <div className="space-y-2">
        <h3 className="text-2xl font-bold text-gray-900">Başvurunuz Alındı!</h3>
        <p className="text-gray-600">
          Başvurunuz başarıyla alındı ve işleme konuldu.
        </p>
      </div>

      <div className="bg-blue-50 p-6 rounded-xl space-y-2">
        <p className="text-sm text-blue-600 font-medium">Başvuru Numaranız</p>
        <p className="text-3xl font-bold text-blue-700">{applicationNumber}</p>
        <p className="text-sm text-blue-600">
          Lütfen başvuru numaranızı not alın. Başvurunuzun durumunu kontrol etmek için bu numaraya ihtiyacınız olacak.
        </p>
      </div>

      <div className="pt-4">
        <button
          onClick={onNewApplication}
          className="text-blue-600 font-medium hover:text-blue-700 focus:outline-none"
        >
          Yeni Başvuru Yap
        </button>
      </div>
    </motion.div>
  );
};