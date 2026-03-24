
import React from 'react';
import { Plus, ArrowRight } from 'lucide-react';
import type { Product } from '../types';

interface NewArrivalsProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
  onShowDetail: (product: Product) => void;
}

export const NewArrivals: React.FC<NewArrivalsProps> = ({ products, onAddToCart, onShowDetail }) => {
  // Filter for new arrivals or just take a few
  const newArrivals = products.slice(0, 4);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount).replace('IDR', 'Rp');
  };

  return (
    <section className="my-16">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="text-3xl font-bold text-stone-900">Baru Tiba</h2>
          <p className="text-stone-500 mt-2 font-medium">Rilisan terbaru bulan ini untuk gaya hidup sehat Anda.</p>
        </div>
        <button className="flex items-center gap-2 text-stone-900 font-bold hover:gap-3 transition-all">
          Semua Produk <ArrowRight className="w-5 h-5" />
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {newArrivals.map((product) => (
          <div 
            key={product.id} 
            className="group cursor-pointer"
            onClick={() => onShowDetail(product)}
          >
            <div className="aspect-square bg-stone-100 rounded-3xl overflow-hidden mb-4 relative">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  onAddToCart(product);
                }}
                className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm text-stone-900 p-3 rounded-full shadow-lg opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hover:bg-stone-900 hover:text-white"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>
            <div className="px-2">
              <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-1">{product.category}</p>
              <h3 className="font-bold text-stone-900 group-hover:text-green-forest transition-colors">{product.name}</h3>
              <p className="text-stone-900 font-bold mt-1">{formatCurrency(product.price)}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
