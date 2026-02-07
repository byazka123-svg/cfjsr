
import React from 'react';

interface Benefit {
  label: string;
  productId: number;
}

interface BenefitTagsProps {
  benefits: Benefit[];
  onBenefitClick: (productId: number) => void;
}

export const BenefitTags: React.FC<BenefitTagsProps> = ({ benefits, onBenefitClick }) => {
  if (benefits.length === 0) {
    return null;
  }

  return (
    <div className="mt-4">
      <h4 className="text-sm font-bold text-gray-700 mb-2">Cari Berdasarkan Manfaat:</h4>
      <div className="flex flex-wrap gap-2">
        {benefits.map((benefit) => (
          <button
            key={benefit.productId}
            onClick={() => onBenefitClick(benefit.productId)}
            className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-xs font-semibold hover:bg-amber-200 hover:text-amber-900 transition-colors focus:outline-none focus:ring-2 focus:ring-amber-400"
          >
            {benefit.label}
          </button>
        ))}
      </div>
    </div>
  );
};
