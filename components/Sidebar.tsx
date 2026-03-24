
import React from 'react';
import { 
  LayoutGrid, 
  Cookie, 
  Coffee, 
  Clock, 
  ChevronRight 
} from 'lucide-react';

interface SidebarProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeCategory, onCategoryChange }) => {
  const categories = [
    { id: 'Special Offers', icon: LayoutGrid, label: 'Special Offers' },
    { id: 'Snack Plizstop', icon: Cookie, label: 'Snacks' },
    { id: 'Wedhang Cafe JSR', icon: Coffee, label: 'Wedhang' },
    { id: 'Preorders', icon: Clock, label: 'Preorders' },
  ];

  return (
    <aside className="w-64 bg-stone-50/50 border-r border-stone-200 hidden lg:flex flex-col sticky top-0 h-screen p-6">
      <div className="mb-10">
        <h2 className="text-xl font-bold text-stone-900">Cafe JSR</h2>
        <p className="text-xs text-stone-500 font-medium tracking-wider uppercase mt-1">The Organic Atelier</p>
      </div>

      <nav className="flex-1 space-y-2">
        <p className="text-[10px] font-bold text-stone-400 uppercase tracking-[0.2em] mb-4 ml-2">Categories</p>
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => onCategoryChange(cat.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
              activeCategory === cat.id 
                ? 'bg-green-forest text-white shadow-md shadow-green-forest/20' 
                : 'text-stone-600 hover:bg-stone-100'
            }`}
          >
            <cat.icon className={`w-5 h-5 ${activeCategory === cat.id ? 'text-white' : 'text-stone-400 group-hover:text-stone-600'}`} />
            <span className="font-semibold text-sm">{cat.label}</span>
          </button>
        ))}
      </nav>

      <div className="mt-auto pt-6 border-t border-stone-200">
        <button className="w-full bg-stone-900 text-white py-3 px-4 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-stone-800 transition-colors">
          View All Products
        </button>
      </div>
    </aside>
  );
};
