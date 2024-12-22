import React from 'react';
import { motion } from 'framer-motion';

interface BrandCardProps {
  brand: string;
  isSelected: boolean;
  onSelect: (brand: string) => void;
}

export const BrandCard: React.FC<BrandCardProps> = ({ 
  brand, 
  isSelected, 
  onSelect 
}) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`p-4 rounded-xl cursor-pointer transition-colors ${
        isSelected
          ? 'bg-blue-500 text-white'
          : 'bg-white hover:bg-blue-50'
      }`}
      onClick={() => onSelect(brand)}
    >
      <span className="font-medium">{brand}</span>
    </motion.div>
  );
};