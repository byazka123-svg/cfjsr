
import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import type { Product } from '../types';

interface SpecialOfferCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export const SpecialOfferCard: React.FC<SpecialOfferCardProps> = ({ product, onAddToCart }) => {
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
    <Link
      to={`/product/${product.id}`}
      ref={cardRef}
      className="block bg-gradient-to-br from-green-forest/5 via-stone-50 to-terracotta/5 rounded-2xl shadow-lg p-4 border-2 border-green-forest/20 cursor-pointer animate-shimmer"
    >
      <div className="flex flex-col sm:flex-row gap-5">
        <img className="w-full sm:w-2/5 aspect-square object-cover rounded-xl flex-shrink-0" src={product.image} alt={product.name} />
        <div className="flex flex-col flex-grow">
          <div>
            <span className="text-xs font-bold bg-terracotta text-white px-3 py-1 rounded-full uppercase tracking-wide">{product.tag}</span>
            <h3 className="text-2xl font-extrabold text-gray-800 mt-2">{product.name}</h3>
            <p className="text-gray-600 text-sm mt-1">{product.description}</p>
          </div>

          <div className="mt-auto pt-4">
            <div className="flex items-baseline gap-2">
                <p className="text-3xl font-bold text-green-forest">{formatCurrency(product.price)}</p>
                {product.originalPrice && (
                    <p className="text-xl font-medium text-gray-400 line-through">{formatCurrency(product.originalPrice)}</p>
                )}
            </div>
            <button
                onClick={handleAddToCartClick}
                className="mt-3 w-full bg-terracotta hover:bg-terracotta/90 text-white rounded-lg px-4 py-3 font-semibold flex items-center justify-center transition-colors text-base"
                aria-label={`Add ${product.name} to cart`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                   <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
                <span>Pesan Sekarang</span>
              </button>
          </div>
        </div>
      </div>
    </Link>
  );
};