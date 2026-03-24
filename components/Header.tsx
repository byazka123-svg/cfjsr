
import React from 'react';
import { Search, ShoppingBag, User } from 'lucide-react';

interface HeaderProps {
  cartCount: number;
  onCartClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ cartCount, onCartClick }) => {
  return (
    <header className="flex items-center justify-between py-6 mb-8 sticky top-0 bg-[#FDFCF9]/80 backdrop-blur-md z-30">
      <nav className="hidden md:flex items-center gap-8">
        {['Special Offers', 'Snacks', 'Wedhang', 'New Arrivals'].map((item) => (
          <a 
            key={item} 
            href="#" 
            className={`text-xs font-bold uppercase tracking-widest transition-colors ${
              item === 'Special Offers' ? 'text-stone-900 border-b-2 border-green-forest pb-1' : 'text-stone-400 hover:text-stone-900'
            }`}
          >
            {item}
          </a>
        ))}
      </nav>

      <div className="flex items-center gap-4 flex-1 max-w-md mx-8">
        <div className="relative w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
          <input 
            type="text" 
            placeholder="Cari resep sehat..." 
            className="w-full bg-stone-100 border-none rounded-full py-2.5 pl-12 pr-4 text-sm focus:ring-2 focus:ring-green-forest outline-none transition-all"
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button 
          onClick={onCartClick}
          className="relative p-2.5 bg-stone-100 rounded-full text-stone-900 hover:bg-stone-200 transition-all"
        >
          <ShoppingBag className="w-5 h-5" />
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-terracotta text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-[#FDFCF9]">
              {cartCount}
            </span>
          )}
        </button>
        <button className="p-2.5 bg-stone-100 rounded-full text-stone-900 hover:bg-stone-200 transition-all">
          <User className="w-5 h-5" />
        </button>
      </div>
    </header>
  );
};
