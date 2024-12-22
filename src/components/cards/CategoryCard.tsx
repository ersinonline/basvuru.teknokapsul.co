import React from 'react';
import { motion } from 'framer-motion';
import { TvIcon, Wifi, Package } from 'lucide-react';

interface CategoryCardProps {
  category: string;
  isSelected: boolean;
  onSelect: (category: string) => void;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({ 
  category, 
  isSelected, 
  onSelect 
}) => {
  const icons = {
    'TV': <TvIcon className="w-6 h-6" />,
    'Internet': <Wifi className="w-6 h-6" />,
    'TV + Internet': <Package className="w-6 h-6" />
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`p-4 rounded-xl cursor-pointer transition-colors ${
        isSelected
          ? 'bg-blue-500 text-white'
          : 'bg-white hover:bg-blue-50'
      }`}
      onClick={() => onSelect(category)}
    >
      <div className="flex items-center space-x-3">
        {icons[category as keyof typeof icons]}
        <span className="font-medium">{category}</span>
      </div>
    </motion.div>
  );
};