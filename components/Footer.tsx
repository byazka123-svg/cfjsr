
import React from 'react';
import { Instagram, Twitter, Facebook, Mail, Share2 } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="pt-16 pb-8 border-t border-stone-200">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-12">
        <div>
          <h3 className="text-2xl font-bold text-stone-900">Cafe JSR</h3>
          <p className="text-stone-500 text-xs mt-2 font-medium uppercase tracking-widest">
            © 2024 CAFE JSR. BOTANICAL JOURNAL AESTHETIC.
          </p>
        </div>

        <nav className="flex flex-wrap gap-8">
          {['SOURCING', 'NUTRITIONAL INFO', 'PRIVACY', 'TERMS'].map((link) => (
            <a key={link} href="#" className="text-[10px] font-bold text-stone-400 hover:text-stone-900 transition-colors tracking-widest">
              {link}
            </a>
          ))}
        </nav>

        <div className="flex gap-4">
          <button className="p-3 bg-stone-100 rounded-full text-stone-600 hover:bg-stone-900 hover:text-white transition-all">
            <Share2 className="w-5 h-5" />
          </button>
          <button className="p-3 bg-stone-100 rounded-full text-stone-600 hover:bg-stone-900 hover:text-white transition-all">
            <Mail className="w-5 h-5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
