
import React from 'react';
import type { Product } from '../types';
import { ShoppingCartIcon } from './Icons';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({ product, onClose, onAddToCart }) => {
  if (!product) return null;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount).replace('IDR', 'Rp');
  };

  const handleBackgroundClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-70 z-50 flex justify-center items-center p-4"
      onClick={handleBackgroundClick}
      aria-labelledby="product-detail-modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg relative transform transition-all max-h-[90vh] flex flex-col">
        <div className="p-4 border-b flex justify-between items-center">
            <h3 id="product-detail-modal-title" className="text-lg font-bold text-gray-900">Detail Produk</h3>
            <button 
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Close modal"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
        </div>
        
        <div className="overflow-y-auto p-6">
            <img src={product.image} alt={product.name} className="w-full h-64 object-cover rounded-lg mb-4" />
            
            <span className="bg-green-forest/10 text-green-forest text-xs font-medium px-2.5 py-0.5 rounded-full">{product.tag}</span>
            <h2 className="text-3xl font-extrabold text-gray-900 mt-2">{product.name}</h2>
            <p className="text-gray-600 mt-2 text-base">{product.description}</p>
        </div>

        <div className="p-6 mt-auto bg-gray-50 border-t rounded-b-2xl flex items-center justify-between gap-4">
            <div className="flex items-baseline gap-2">
                <p className="text-3xl font-bold text-green-forest">{formatCurrency(product.price)}</p>
                {product.originalPrice && (
                    <p className="text-xl font-medium text-gray-500 line-through">{formatCurrency(product.originalPrice)}</p>
                )}
            </div>
            <button
              onClick={() => onAddToCart(product)}
              className="bg-terracotta text-white py-3 px-6 rounded-lg font-semibold hover:bg-terracotta/90 transition-colors flex items-center gap-2 text-lg flex-shrink-0"
            >
              <ShoppingCartIcon className="h-5 w-5"/>
              <span>Tambah</span>
            </button>
        </div>

      </div>
    </div>
  );
};
