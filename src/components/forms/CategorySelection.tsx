import React from 'react';
import { motion } from 'framer-motion';
import { Tv, Wifi, Package } from 'lucide-react';

interface CategorySelectionProps {
  categories: string[];
  selectedCategory: string;
  onSelect: (category: string) => void;
}

export const CategorySelection: React.FC<CategorySelectionProps> = ({
  categories,
  selectedCategory,
  onSelect
}) => {
  const icons = {
    'TV': <Tv className="w-6 h-6" />,
    'Internet': <Wifi className="w-6 h-6" />,
    'TV + Internet': <Package className="w-6 h-6" />
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-900">Hizmet Kategorisi</h3>
      <div className="grid gap-3">
        {categories.map((category) => (
          <motion.div
            key={category}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`p-4 rounded-xl cursor-pointer transition-colors ${
              selectedCategory === category
                ? 'bg-[#ffb700] text-white'
                : 'bg-white border border-gray-200 hover:border-[#ffb700]'
            }`}
            onClick={() => onSelect(category)}
          >
            <div className="flex items-center space-x-3">
              {icons[category as keyof typeof icons]}
              <span className="font-medium">{category}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};