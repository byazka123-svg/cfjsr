
import React from 'react';
import { WhatsAppIcon } from './Icons';

export const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-10">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-2">
          <div className="flex items-center">
            <img src="https://ik.imagekit.io/hrctvvb3m/Untitled%20design.jpg" alt="Cafe JSR Logo" className="h-12 w-12 rounded-full object-cover mr-3" />
            <h1 className="text-xl font-bold text-gray-800">Katalog Cafe JSR</h1>
          </div>
          <a 
            href="https://wa.me/6281398898131" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center space-x-2 text-gray-600 hover:text-green-700"
          >
            <WhatsAppIcon className="h-5 w-5"/>
            <span className="text-sm font-medium">Hubungi Kami</span>
          </a>
        </div>
      </div>
    </header>
  );
};