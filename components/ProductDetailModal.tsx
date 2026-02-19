
import React, { useState } from 'react';
import type { Product } from '../types';
import { ShoppingCartIcon, ClipboardIcon } from './Icons';

interface ProductDetailModalProps {
  isVisible: boolean;
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
}

const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount).replace('IDR', 'Rp');
};

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({ isVisible, product, onClose, onAddToCart }) => {
  const [isCopied, setIsCopied] = useState(false);
  
  if (!isVisible || !product) return null;

  const handleAddToCartClick = () => {
    onAddToCart(product);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000); // Reset after 2 seconds
    }, (err) => {
      console.error('Gagal menyalin tautan: ', err);
    });
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-60 z-40 flex justify-center items-center p-4"
      aria-labelledby="product-detail-modal-title"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-2xl shadow-xl w-full max-w-4xl relative transform transition-all p-0 overflow-hidden"
        onClick={e => e.stopPropagation()} // Prevent closing modal when clicking inside
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors z-10 bg-white/50 rounded-full p-1"
          aria-label="Close modal"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
          <div className="w-full h-64 md:h-auto">
            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
          </div>
          <div className="flex flex-col p-6 md:p-8">
            <div>
              <span className="bg-green-forest/10 text-green-forest text-sm font-medium px-3 py-1 rounded-full">{product.tag}</span>
              <h1 id="product-detail-modal-title" className="text-3xl lg:text-4xl font-extrabold text-gray-900 mt-3">{product.name}</h1>
              <p className="text-gray-700 mt-4 text-base leading-relaxed">{product.description}</p>
            </div>
            <div className="mt-auto pt-8">
               <div className="bg-gray-50 rounded-lg p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                 <div className="flex items-baseline gap-2 flex-shrink-0">
                  <p className="text-2xl lg:text-3xl font-bold text-green-forest">{formatCurrency(product.price)}</p>
                  {product.originalPrice && (
                    <p className="text-lg lg:text-xl font-medium text-gray-500 line-through">{formatCurrency(product.originalPrice)}</p>
                  )}
                 </div>
                 <div className="w-full sm:w-auto flex items-center gap-3">
                    <button
                      onClick={handleCopyLink}
                      className="w-full bg-gray-200 text-gray-800 py-3 px-4 rounded-lg font-semibold hover:bg-gray-300 transition-colors flex items-center justify-center gap-2 text-lg"
                      aria-label="Salin tautan produk"
                      disabled={isCopied}
                    >
                      <ClipboardIcon className="h-5 w-5"/>
                      <span>{isCopied ? 'Tersalin!' : 'Salin Link'}</span>
                    </button>
                    <button
                      onClick={handleAddToCartClick}
                      className="w-full bg-terracotta text-white py-3 px-6 rounded-lg font-semibold hover:bg-terracotta/90 transition-colors flex items-center justify-center gap-2 text-lg"
                      aria-label={`Tambah ${product.name} ke keranjang`}
                    >
                      <ShoppingCartIcon className="h-5 w-5"/>
                      <span>Tambah</span>
                    </button>
                 </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};