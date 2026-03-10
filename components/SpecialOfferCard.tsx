
import React, { useRef } from 'react';
import type { Product } from '../types';

interface SpecialOfferCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onShowDetail: (product: Product) => void;
}

export const SpecialOfferCard: React.FC<SpecialOfferCardProps> = ({ product, onAddToCart, onShowDetail }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount).replace('IDR', 'Rp');
  };

  const handleAddToCartClick = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent Link navigation
    e.stopPropagation();
    onAddToCart(product);
    if (cardRef.current) {
        cardRef.current.classList.remove('animate-add-to-cart');
        void cardRef.current.offsetWidth;
        cardRef.current.classList.add('animate-add-to-cart');
      }
  };

  return (
    <div
      onClick={() => onShowDetail(product)}
      ref={cardRef}
      className="block bg-gradient-to-br from-green-forest/5 via-stone-50 to-terracotta/5 rounded-2xl shadow-lg p-4 border-2 border-green-forest/20 cursor-pointer animate-shimmer"
    >
      <div className="flex flex-col sm:flex-row gap-5">
        <img className="w-full sm:w-2/5 aspect-square object-cover rounded-xl flex-shrink-0" src={product.image} alt={product.name} />
        <div className="flex flex-col flex-grow">
          <div>
            <span className="text-xs font-bold bg-terracotta text-white px-3 py-1 rounded-full uppercase tracking-wide">{product.tag}</span>
            <h3 className="text-lg sm:text-2xl font-extrabold text-gray-800 mt-2">{product.name}</h3>
            <p className="text-gray-600 text-xs sm:text-sm mt-1">{product.description}</p>
            
            {product.category === 'Wedhang Cafe JSR' && (
              <div className="mt-2 bg-amber-50 border border-amber-200 rounded-lg px-2 py-1 inline-block">
                <p className="text-[10px] font-bold text-amber-700 uppercase">
                  Ready kembali setelah lebaran
                </p>
              </div>
            )}
          </div>

          <div className="mt-auto pt-4">
            <div className="flex flex-wrap items-baseline gap-2">
                <p className="text-xl sm:text-3xl font-bold text-green-forest">{formatCurrency(product.price)}</p>
                {product.originalPrice && (
                    <p className="text-sm sm:text-xl font-medium text-gray-400 line-through">{formatCurrency(product.originalPrice)}</p>
                )}
            </div>
            <button
                onClick={handleAddToCartClick}
                className={`mt-3 w-full ${product.category === 'Wedhang Cafe JSR' ? 'bg-amber-600 hover:bg-amber-700' : 'bg-terracotta hover:bg-terracotta/90'} text-white rounded-lg px-3 sm:px-4 py-2 sm:py-3 font-semibold flex items-center justify-center transition-colors text-sm sm:text-base`}
                aria-label={product.category === 'Wedhang Cafe JSR' ? `Preorder ${product.name}` : `Pesan ${product.name}`}
              >
                {product.category === 'Wedhang Cafe JSR' ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                  </svg>
                )}
                <span>{product.category === 'Wedhang Cafe JSR' ? 'Preorder' : 'Pesan'}</span>
              </button>
          </div>
        </div>
      </div>
    </div>
  );
};