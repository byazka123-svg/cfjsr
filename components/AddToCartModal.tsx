
import React from 'react';
import type { Product, CartItem } from '../types';
import { CheckBadgeIcon, GiftIcon } from './Icons';

interface AddToCartModalProps {
  isVisible: boolean;
  product: Product | null;
  onClose: () => void;
  onCheckout: () => void;
  cartItems: CartItem[];
}

export const AddToCartModal: React.FC<AddToCartModalProps> = ({ isVisible, product, onClose, onCheckout, cartItems }) => {
  if (!isVisible || !product) return null;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount).replace('IDR', 'Rp');
  };
  
  const renderPromoMessage = () => {
    if (product.category !== 'Wedhang Cafe JSR') {
      return null;
    }

    const wedhangQuantity = cartItems
      .filter(item => item.category === 'Wedhang Cafe JSR')
      .reduce((sum, item) => sum + item.quantity, 0);

    const remainder = wedhangQuantity % 3;
    let message = null;

    if (remainder === 0) {
      const totalGifts = wedhangQuantity / 3;
      message = (
        <>
          <strong>Selamat!</strong> Anda berhak mendapatkan{' '}
          <strong>{totalGifts} bonus gratis (Teko/Tumbler Rempah).</strong> Jangan lupa pilih di keranjang ya!
        </>
      );
    } else {
      const neededForNextGift = 3 - remainder;
      message = (
        <>
          Tambah <strong>{neededForNextGift} box</strong> Wedhang lagi untuk dapat bonus gratis <strong>Teko/Tumbler Rempah</strong>!
        </>
      );
    }

    return (
      <div className="mt-4 p-3 bg-green-forest/10 border border-green-forest/20 text-green-forest rounded-lg flex items-center gap-3 text-sm">
        <GiftIcon className="h-6 w-6 flex-shrink-0" />
        <p>{message}</p>
      </div>
    );
  };


  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4"
      aria-labelledby="add-to-cart-modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md relative transform transition-all p-6 text-center">
        <button 
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Close modal"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <CheckBadgeIcon className="h-12 w-12 text-green-forest mx-auto" />
        <h3 id="add-to-cart-modal-title" className="text-xl font-bold text-gray-900 mt-2">Berhasil ditambahkan!</h3>
        
        <div className="bg-gray-50 rounded-lg p-4 my-4 flex items-center space-x-4 text-left">
          <img src={product.image} alt={product.name} className="w-16 h-16 object-cover rounded-md flex-shrink-0" />
          <div>
            <p className="font-semibold text-gray-800">{product.name}</p>
            <p className="text-sm text-green-forest font-bold">{formatCurrency(product.price)}</p>
          </div>
        </div>
        
        {renderPromoMessage()}

        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <button
            onClick={onClose}
            className="w-full bg-green-forest text-white py-3 rounded-lg font-semibold hover:bg-green-forest/90 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-forest order-2 sm:order-1"
          >
            Lanjut Belanja
          </button>
          <button
            onClick={onCheckout}
            className="w-full bg-terracotta text-white py-3 rounded-lg font-semibold hover:bg-terracotta/90 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-terracotta order-1 sm:order-2"
          >
            Lanjut Checkout
          </button>
        </div>
      </div>
    </div>
  );
};
