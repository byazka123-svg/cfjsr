
import React from 'react';
import { SparklesIcon, NoSymbolIcon, MinusCircleIcon, CheckBadgeIcon } from './Icons';
import { motion } from 'motion/react';

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

export const Ribbon: React.FC = React.memo(() => {
  // Duplicate features for seamless scrolling
  const marqueeItems = [...features, ...features, ...features];

  return (
    <div className="w-full bg-stone-900 overflow-hidden py-4 border-y border-white/5">
      <motion.div 
        animate={{ x: [0, -1000] }}
        transition={{ 
          duration: 30, 
          repeat: Infinity, 
          ease: "linear" 
        }}
        className="flex whitespace-nowrap items-center gap-12 md:gap-24"
      >
        {marqueeItems.map((feature, index) => (
          <div key={index} className="flex items-center gap-4">
            <feature.icon className="h-5 w-5 text-terracotta flex-shrink-0" />
            <span className="text-xs md:text-sm font-black text-white uppercase tracking-[0.3em]">
              {feature.text}
            </span>
            <div className="h-1 w-1 bg-white/20 rounded-full ml-8 md:ml-16" />
          </div>
        ))}
      </motion.div>
    </div>
  );
});
