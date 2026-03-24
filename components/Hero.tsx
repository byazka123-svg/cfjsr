
import React from 'react';
import { DeliveryIcon, SparklesIcon } from './Icons';
import { motion } from 'motion/react';

export const Hero: React.FC = React.memo(() => {
  return (
    <div className="relative w-full bg-emerald-900 text-white overflow-hidden">
      {/* Background Accents */}
      <div className="absolute top-0 right-0 -mt-24 -mr-24 w-96 h-96 bg-emerald-500/20 rounded-full blur-[100px]" />
      <div className="absolute bottom-0 left-0 -mb-24 -ml-24 w-96 h-96 bg-terracotta/10 rounded-full blur-[100px]" />

      <div className="relative container mx-auto px-6 py-16 md:py-24 flex flex-col md:flex-row justify-between items-center gap-12">
        <div className="flex-1 space-y-8 text-center md:text-left">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-4"
          >
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 mb-4">
              <SparklesIcon className="h-4 w-4 text-yellow-300" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em]">Official Store</span>
            </div>
            
            <h2 className="text-6xl md:text-8xl font-black leading-[0.85] tracking-tighter uppercase">
              CAFE JSR <br />
              <span className="text-emerald-400 italic">ONLINE</span>
            </h2>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="space-y-6"
          >
            <p className="text-xl md:text-2xl font-bold tracking-tight text-white/80 max-w-xl">
              KIRIM KE SELURUH INDONESIA
            </p>
            
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="h-0.5 w-12 bg-terracotta hidden md:block" />
              <p className="text-sm md:text-base font-medium italic text-white/60 tracking-wide">
                Officially by dr.Zaidul Akbar
              </p>
            </div>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.8, rotate: 10 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1, delay: 0.5, type: "spring" }}
          className="relative"
        >
          <div className="absolute inset-0 bg-emerald-400/20 blur-3xl rounded-full scale-110" />
          <div className="relative bg-white/5 backdrop-blur-2xl border border-white/10 p-10 rounded-[3rem] shadow-2xl">
            <DeliveryIcon className="h-24 w-24 md:h-32 md:w-32 text-white" />
            <div className="absolute -top-4 -right-4 bg-terracotta text-white px-4 py-2 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl rotate-12">
              Fast Shipping
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom Decorative Line */}
      <div className="h-1 w-full bg-gradient-to-r from-transparent via-terracotta/40 to-transparent" />
    </div>
  );
});
