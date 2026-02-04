
import React from 'react';
import type { CustomerInfo } from '../types';

interface CustomerFormProps {
  customerInfo: CustomerInfo;
  setCustomerInfo: React.Dispatch<React.SetStateAction<CustomerInfo>>;
}

export const CustomerForm: React.FC<CustomerFormProps> = ({ customerInfo, setCustomerInfo }) => {
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCustomerInfo(prevInfo => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-bold text-gray-800 mb-4">Lengkapi Data Pemesan</h3>
      <form className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nama Lengkap</label>
          <input
            type="text"
            id="name"
            name="name"
            value={customerInfo.name}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
            placeholder="Masukkan nama lengkap Anda"
            required
          />
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">No. WhatsApp</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={customerInfo.phone}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
            placeholder="Contoh: 081234567890"
            required
          />
        </div>
        <div>
          <label htmlFor="address" className="block text-sm font-medium text-gray-700">Alamat Lengkap</label>
          <textarea
            id="address"
            name="address"
            rows={3}
            value={customerInfo.address}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
            placeholder="Masukkan nama jalan, nomor rumah, RT/RW, kelurahan, kecamatan, dan kota/kabupaten"
            required
          />
        </div>
        <div>
          <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700">Kode Pos</label>
          <input
            type="text"
            id="postalCode"
            name="postalCode"
            value={customerInfo.postalCode}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
            placeholder="Masukkan kode pos"
            required
          />
        </div>
      </form>
    </div>
  );
};
