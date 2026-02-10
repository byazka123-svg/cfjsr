
import React from 'react';
import { DeliveryIcon } from './Icons';

export const Hero: React.FC = () => {
  return (
    <div className="bg-emerald-800 rounded-xl text-white p-8 flex justify-between items-center">
      <div>
        <h2 className="text-3xl font-extrabold tracking-tight">CAFE JSR ONLINE</h2>
        <p className="mt-2 text-lg font-semibold">KIRIM KE SELURUH INDONESIA</p>
        <p className="mt-4 text-sm italic">Officially by dr.Zaidul Akbar</p>
      </div>
      <DeliveryIcon className="h-16 w-16 text-white/80" />
    </div>
  );
};