
import React, { useState } from 'react';
import type { CustomerInfo } from '../types';

interface CustomerFormProps {
  onSubmit: (info: CustomerInfo) => void;
}

export const CustomerForm: React.FC<CustomerFormProps> = ({ onSubmit }) => {
  const [info, setInfo] = useState<CustomerInfo>({
    name: '',
    phone: '',
    address: '',
    postalCode: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setInfo(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(info);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-xs font-bold text-stone-400 uppercase tracking-widest mb-1">Nama Lengkap</label>
        <input
          required
          type="text"
          name="name"
          value={info.name}
          onChange={handleChange}
          className="w-full bg-white border border-stone-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-forest/20 focus:border-green-forest transition-all"
          placeholder="Nama Anda"
        />
      </div>
      <div>
        <label className="block text-xs font-bold text-stone-400 uppercase tracking-widest mb-1">Nomor WhatsApp</label>
        <input
          required
          type="tel"
          name="phone"
          value={info.phone}
          onChange={handleChange}
          className="w-full bg-white border border-stone-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-forest/20 focus:border-green-forest transition-all"
          placeholder="0812..."
        />
      </div>
      <div>
        <label className="block text-xs font-bold text-stone-400 uppercase tracking-widest mb-1">Alamat Lengkap</label>
        <textarea
          required
          name="address"
          value={info.address}
          onChange={handleChange}
          rows={3}
          className="w-full bg-white border border-stone-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-forest/20 focus:border-green-forest transition-all resize-none"
          placeholder="Alamat pengiriman"
        />
      </div>
      <div>
        <label className="block text-xs font-bold text-stone-400 uppercase tracking-widest mb-1">Kode Pos</label>
        <input
          required
          type="text"
          name="postalCode"
          value={info.postalCode}
          onChange={handleChange}
          className="w-full bg-white border border-stone-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-forest/20 focus:border-green-forest transition-all"
          placeholder="12345"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-green-forest text-white py-4 rounded-2xl font-bold hover:bg-green-forest/90 transition-all shadow-lg shadow-green-forest/20 active:scale-[0.98]"
      >
        Konfirmasi & Pesan
      </button>
    </form>
  );
};
