
import React from 'react';
import { SparklesIcon, NoSymbolIcon, MinusCircleIcon, CheckBadgeIcon } from './Icons';

const features = [
  {
    icon: SparklesIcon,
    text: '100% Alami',
  },
  {
    icon: NoSymbolIcon,
    text: 'Gluten Free',
  },
  {
    icon: MinusCircleIcon,
    text: 'No-MSG',
  },
  {
    icon: CheckBadgeIcon,
    text: 'Bahan Berkualitas',
  },
];

export const Ribbon: React.FC = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-4 mt-8">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {features.map((feature, index) => (
          <div key={index} className="flex items-center justify-center p-2">
            <feature.icon className="h-6 w-6 text-green-600 mr-2 flex-shrink-0" />
            <span className="text-sm font-semibold text-gray-700 text-center">{feature.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
