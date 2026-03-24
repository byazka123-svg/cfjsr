
import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section className="relative h-[400px] md:h-[500px] rounded-[2rem] overflow-hidden mb-12">
      <img 
        src="https://images.unsplash.com/photo-1540331547168-8b63109225b7?auto=format&fit=crop&q=80&w=2000" 
        alt="Hero Background" 
        className="absolute inset-0 w-full h-full object-cover"
        referrerPolicy="no-referrer"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-stone-900/80 via-stone-900/40 to-transparent" />
      
      <div className="relative h-full flex flex-col justify-center px-8 md:px-16 max-w-2xl">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <span className="inline-block px-4 py-1 bg-green-forest text-white text-xs font-bold rounded-full mb-6 tracking-widest uppercase">
            Special Collection: 22 - 30 Maret
          </span>
          <h1 className="text-5xl md:text-7xl font-display font-bold text-white leading-[0.9] mb-6 tracking-tight">
            Sehat Alami <br />
            <span className="text-green-forest">Mulai Dari Sini.</span>
          </h1>
          <p className="text-stone-200 text-lg mb-8 max-w-md font-medium leading-relaxed">
            Temukan koleksi produk JSR terbaik untuk menemani perjalanan sehat Anda setiap hari.
          </p>
          
          <div className="flex flex-wrap gap-4">
            <button className="bg-white text-stone-900 px-8 py-4 rounded-2xl font-bold flex items-center gap-2 hover:bg-stone-100 transition-all active:scale-95">
              Belanja Sekarang <ArrowRight className="w-5 h-5" />
            </button>
            <button className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-8 py-4 rounded-2xl font-bold hover:bg-white/20 transition-all active:scale-95">
              Lihat Katalog
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
