import React from 'react';
import { motion } from 'framer-motion';
import { brands } from '../config/constants';
import { useNavigate } from 'react-router-dom';

export const BrandSelection = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-gray-900">Hizmet Başvurusu</h2>
        <p className="mt-2 text-gray-600">
          Size en uygun dijital TV ve internet paketini seçin
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {Object.entries(brands).map(([key, brand]) => (
          <motion.div
            key={key}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => navigate(`/apply/${key.toLowerCase()}`)}
          >
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900">{brand.name}</h3>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};