
import React from 'react';
import { GiftIcon } from './Icons';

export const RamadanPromoBanner: React.FC = () => {
  return (
    <div className="bg-gradient-to-r from-emerald-700 to-green-600 rounded-xl text-white p-6 my-8 shadow-lg flex flex-col gap-4">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-4 text-center sm:text-left">
          <GiftIcon className="h-12 w-12 text-amber-300 flex-shrink-0" />
          <div>
            <h3 className="text-xl font-extrabold tracking-tight">PROMO SPESIAL RAMADHAN</h3>
            <p className="mt-1 text-sm text-emerald-100">Beli 3 Box Wedhang, GRATIS Tumbler/Teko Rempah Eksklusif!</p>
          </div>
        </div>
        <div className="bg-white/20 text-center rounded-lg px-4 py-2 flex-shrink-0">
          <p className="text-xs font-bold text-amber-200">Periode Terbatas</p>
          <p className="text-sm font-semibold">8 - 18 Februari 2026</p>
        </div>
      </div>
      <div className="border-t border-white/30 pt-3 text-center">
         <p className="text-lg font-semibold">KIRIM KE SELURUH INDONESIA</p>
         <p className="mt-1 text-sm italic text-emerald-200">Officially by dr.Zaidul Akbar</p>
      </div>
    </div>
  );
};
