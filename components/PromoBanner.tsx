
import React from 'react';
import { GiftIcon, DeliveryIcon, CheckBadgeIcon, SparklesIcon } from './Icons';
import { motion } from 'motion/react';

export const PromoBanner: React.FC = React.memo(() => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative bg-green-forest text-white overflow-hidden border-y border-white/5"
    >
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 -mt-20 -mr-20 w-64 h-64 bg-white/10 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-64 h-64 bg-terracotta/20 rounded-full blur-[80px] pointer-events-none" />

      <div className="relative container mx-auto px-6 py-16 md:py-24">
        {/* Header Badge */}
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 mb-8">
          <SparklesIcon className="h-4 w-4 text-yellow-300 animate-pulse" />
          <span className="text-[10px] font-black uppercase tracking-[0.25em]">Penawaran Terbatas</span>
        </div>
        
        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="space-y-8">
            <div className="space-y-2">
              <h3 className="text-5xl md:text-6xl font-black leading-[0.85] tracking-tighter uppercase">
                Beli 3 Box <br />
                <span className="text-terracotta italic">Gratis</span> <br />
                Teko Rempah
              </h3>
              <div className="h-1.5 w-24 bg-terracotta rounded-full" />
            </div>
            
            <p className="text-lg text-white/70 font-medium max-w-md leading-relaxed">
              Dapatkan Tumbler atau Teko Rempah Eksklusif setiap pembelian minimal 3 box Wedhang Cafe JSR. Berlaku kelipatan!
            </p>
          </div>

          <div className="relative flex justify-center lg:justify-end">
            <motion.div 
              whileHover={{ scale: 1.02, rotate: 0 }}
              className="bg-white/5 backdrop-blur-2xl border border-white/10 p-8 rounded-[2rem] rotate-2 transition-all duration-500 shadow-2xl max-w-sm w-full"
            >
              <div className="flex items-center gap-5 mb-6">
                <div className="bg-terracotta p-4 rounded-2xl shadow-lg shadow-terracotta/20">
                  <GiftIcon className="h-8 w-8 text-white" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-white/40 uppercase tracking-[0.2em] mb-1">Berakhir Pada</p>
                  <p className="text-2xl font-black tracking-tight">30 MARET 2026</p>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-end">
                  <p className="text-[10px] font-bold text-white/60 uppercase tracking-widest">Klaim Promo</p>
                  <p className="text-xs font-black text-terracotta">70% TERKLAIM</p>
                </div>
                <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: "70%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, delay: 0.8, ease: "circOut" }}
                    className="h-full bg-gradient-to-r from-terracotta to-orange-400" 
                  />
                </div>
              </div>
              
              <div className="mt-8 pt-6 border-t border-white/10">
                <p className="text-[10px] font-medium text-white/40 leading-tight">
                  *Syarat & ketentuan berlaku. Selama persediaan masih ada. Bonus dikirim bersama pesanan utama.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      
      {/* Footer Strip */}
      <div className="bg-black/20 backdrop-blur-md border-t border-white/5 p-6">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-6 text-[10px] font-black tracking-[0.2em] uppercase">
          <div className="flex items-center gap-3 text-white/60 hover:text-white transition-colors">
            <DeliveryIcon className="h-5 w-5 text-terracotta" />
            <span>Pengiriman Seluruh Indonesia</span>
          </div>
          <div className="flex items-center gap-3 text-white/60 hover:text-white transition-colors">
            <CheckBadgeIcon className="h-5 w-5 text-terracotta" />
            <span className="italic">Officially by dr.Zaidul Akbar</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
});
