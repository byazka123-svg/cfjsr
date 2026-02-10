
import React, { useRef } from 'react';
import type { Product } from '../types';
import { StarIcon } from './Icons';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onCardClick: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart, onCardClick }) => {
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
    e.stopPropagation(); // Mencegah event klik menyebar ke kartu
    onAddToCart(product);
    if (cardRef.current) {
      cardRef.current.classList.remove('animate-add-to-cart');
      void cardRef.current.offsetWidth;
      cardRef.current.classList.add('animate-add-to-cart');
    }
  };

  return (
    <div 
      ref={cardRef} 
      id={`product-${product.id}`}
      className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105 flex flex-col cursor-pointer"
      onClick={() => onCardClick(product)}
    >
      <img className="w-full h-40 object-cover" src={product.image} alt={product.name} />
      <div className="p-4 flex flex-col flex-grow">
        {product.isBestSeller && (
          <div className="flex items-center text-yellow-500 mb-2">
            <StarIcon className="w-4 h-4 mr-1" />
            <span className="text-xs font-semibold">Best Seller!</span>
          </div>
        )}
        <h3 className="text-lg font-bold text-gray-800">{product.name}</h3>
        <p className="text-gray-600 text-sm mt-1 flex-grow">{product.description}</p>
        <div className="mt-4 flex justify-between items-center">
          <p className="text-lg font-bold text-green-forest">{formatCurrency(product.price)}</p>
          <button
            onClick={handleAddToCartClick}
            className="bg-green-forest hover:bg-green-forest/90 text-white rounded-full w-9 h-9 flex items-center justify-center transition-colors"
            aria-label={`Add ${product.name} to cart`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};
