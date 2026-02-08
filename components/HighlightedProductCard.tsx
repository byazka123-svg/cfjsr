
import React, { useState, useEffect, useRef } from 'react';
import type { Product } from '../types';

interface TimeLeft {
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
}

interface HighlightedProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onCardClick: (product: Product) => void;
}

export const HighlightedProductCard: React.FC<HighlightedProductCardProps> = ({ product, onAddToCart, onCardClick }) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Promo ends on February 18, 2026, at 23:59:59
    const countdownEndTime = new Date('2026-02-18T23:59:59').getTime();

    const interval = setInterval(() => {
      const currentTime = new Date().getTime();
      const distance = countdownEndTime - currentTime;

      if (distance < 0) {
        clearInterval(interval);
        setTimeLeft(null);
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft({
        days: String(days).padStart(2, '0'),
        hours: String(hours).padStart(2, '0'),
        minutes: String(minutes).padStart(2, '0'),
        seconds: String(seconds).padStart(2, '0'),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount).replace('IDR', 'Rp');
  };

  const handleAddToCartClick = (e: React.MouseEvent) => {
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
      ref={cardRef} 
      className="bg-amber-50 border-2 border-dashed border-amber-400 rounded-xl shadow-lg p-4 overflow-hidden cursor-pointer"
      onClick={() => onCardClick(product)}
    >
      <div className="flex gap-4">
        <img className="w-1/3 aspect-square object-cover rounded-lg flex-shrink-0" src={product.image} alt={product.name} />
        <div className="flex flex-col flex-grow">
          <div>
            <div className="flex flex-wrap gap-2 mb-2">
              <span className="text-xs font-bold bg-red-500 text-white px-3 py-1 rounded-full">PROMO RAMADHAN</span>
              <span className="text-xs font-bold bg-gray-700 text-white px-3 py-1 rounded-full">8-18 FEB 2026</span>
            </div>
            <h3 className="text-xl font-extrabold text-gray-800">{product.name}</h3>
            <p className="text-gray-600 text-sm mt-1">{product.description}</p>
          </div>

          <div className="mt-auto pt-4">
            <div className="bg-white rounded-lg p-3">
                <p className="text-xs text-center text-gray-700 font-semibold mb-1">Promo Berakhir Dalam:</p>
                {timeLeft ? (
                    <div className="flex justify-center items-start gap-2 text-center text-red-600">
                        <div className="flex flex-col items-center">
                            <span className="text-2xl font-bold tracking-wider tabular-nums">{timeLeft.days}</span>
                            <span className="text-xs font-medium text-gray-600">Hari</span>
                        </div>
                        <span className="text-2xl font-bold pt-1">:</span>
                        <div className="flex flex-col items-center">
                            <span className="text-2xl font-bold tracking-wider tabular-nums">{timeLeft.hours}</span>
                            <span className="text-xs font-medium text-gray-600">Jam</span>
                        </div>
                        <span className="text-2xl font-bold pt-1">:</span>
                        <div className="flex flex-col items-center">
                            <span className="text-2xl font-bold tracking-wider tabular-nums">{timeLeft.minutes}</span>
                            <span className="text-xs font-medium text-gray-600">Menit</span>
                        </div>
                        <span className="text-2xl font-bold pt-1">:</span>
                        <div className="flex flex-col items-center">
                            <span className="text-2xl font-bold tracking-wider tabular-nums">{timeLeft.seconds}</span>
                            <span className="text-xs font-medium text-gray-600">Detik</span>
                        </div>
                    </div>
                ) : (
                    <p className="text-2xl font-bold text-center text-red-600">Promo Berakhir!</p>
                )}
            </div>

            <div className="mt-3 flex justify-between items-center gap-2">
              <p className="text-2xl font-bold text-green-700">{formatCurrency(product.price)}</p>
              <button
                onClick={handleAddToCartClick}
                className="bg-green-600 hover:bg-green-700 text-white rounded-lg px-4 py-2 font-semibold flex items-center justify-center transition-colors text-sm flex-shrink-0"
                aria-label={`Add ${product.name} to cart`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
                <span>Order</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};