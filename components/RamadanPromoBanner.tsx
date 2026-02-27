
import React from 'react';
import { GiftIcon, DeliveryIcon, CheckBadgeIcon } from './Icons';

export const RamadanPromoBanner: React.FC = () => {
  return (
    <div 
      className="bg-green-forest/5 border border-green-forest/20 rounded-2xl my-8 shadow-sm overflow-hidden"
    >
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="bg-green-forest p-2 rounded-full">
            <GiftIcon className="h-5 w-5 text-white" />
          </div>
          <h3 className="text-lg font-bold text-green-forest tracking-tight">
            Promo Spesial Ramadhan
          </h3>
        </div>
        
        {/* Main Offer */}
        <div className="mt-4 space-y-3">
          <p className="text-2xl font-extrabold text-gray-800 leading-tight">
            Beli 3 Box Wedhang, <span className="text-green-forest">GRATIS</span> Tumbler/Teko Rempah Eksklusif!
          </p>
          <div className="flex items-center gap-2 bg-terracotta/5 border border-terracotta/10 p-3 rounded-xl">
            <div className="bg-terracotta p-1.5 rounded-lg shrink-0">
              <GiftIcon className="h-4 w-4 text-white" />
            </div>
            <p className="text-sm font-bold text-gray-700">
              <span className="text-terracotta">BUNDLING HEMAT:</span> 2 Paket Buket Hamper hanya <span className="text-terracotta">Rp 350.000</span>
            </p>
          </div>
        </div>

        {/* Promo Period */}
        <div className="mt-4 bg-terracotta/10 border border-terracotta/20 text-terracotta rounded-lg px-3 py-1.5 text-center w-fit">
          <p className="text-xs font-bold uppercase tracking-wider">
            Periode: <span className="font-black">19 FEB - 1 MARET 2026</span>
          </p>
        </div>
      </div>
      
      {/* Footer Section */}
      <div className="bg-green-forest/10 border-t border-green-forest/20 p-4">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-3 text-sm text-green-forest">
          <div className="flex items-center gap-2">
            <DeliveryIcon className="h-5 w-5" />
            <span className="font-semibold">KIRIM KE SELURUH INDONESIA</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckBadgeIcon className="h-5 w-5" />
            <span className="font-semibold italic">Officially by dr.Zaidul Akbar</span>
          </div>
        </div>
      </div>
    </div>
  );
};
