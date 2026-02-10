
import React from 'react';
import { HomeIcon, TagIcon, ShoppingCartIcon } from './Icons';

interface BottomNavBarProps {
  activeTab: string;
  onNavigate: (tab: string) => void;
  cartItemCount: number;
}

const navItems = [
  { id: 'home', label: 'Beranda', icon: HomeIcon },
  { id: 'promo', label: 'Promo', icon: TagIcon },
  { id: 'cart', label: 'Keranjang', icon: ShoppingCartIcon },
];

export const BottomNavBar: React.FC<BottomNavBarProps> = ({ activeTab, onNavigate, cartItemCount }) => {
  return (
    <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-lg bg-white shadow-[0_-2px_10px_rgba(0,0,0,0.1)] z-20">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex flex-col items-center justify-center w-full h-full transition-colors duration-200 ${
                isActive ? 'text-green-forest' : 'text-gray-500 hover:text-green-forest/80'
              }`}
            >
              <div className="relative">
                <item.icon className="h-6 w-6" />
                {item.id === 'cart' && cartItemCount > 0 && (
                  <span className="absolute -top-2 -right-3 bg-terracotta text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {cartItemCount}
                  </span>
                )}
              </div>
              <span className={`text-xs mt-1 font-semibold ${isActive ? 'font-bold' : ''}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
