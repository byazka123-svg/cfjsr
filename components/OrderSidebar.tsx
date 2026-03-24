
import React, { useState } from 'react';
import { motion } from 'motion/react';
import { X, ShoppingBag, Trash2, Plus, Minus } from 'lucide-react';
import type { CartItem, CustomerInfo } from '../types';
import { CustomerForm } from './CustomerForm';

interface OrderSidebarProps {
  cart: CartItem[];
  onClose: () => void;
  onRemoveItem: (productId: number) => void;
  onUpdateQuantity: (productId: number, quantity: number) => void;
  onCheckout: (customerInfo: CustomerInfo) => void;
}

export const OrderSidebar: React.FC<OrderSidebarProps> = ({
  cart,
  onClose,
  onRemoveItem,
  onUpdateQuantity,
  onCheckout,
}) => {
  const [showForm, setShowForm] = useState(false);
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount).replace('IDR', 'Rp');
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-stone-900/40 backdrop-blur-sm z-40"
      />
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-50 flex flex-col"
      >
        <div className="p-6 border-b border-stone-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <ShoppingBag className="w-6 h-6 text-green-forest" />
            <h2 className="text-xl font-bold text-stone-900">Keranjang Belanja</h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-stone-100 rounded-full transition-colors">
            <X className="w-6 h-6 text-stone-400" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center">
              <div className="w-20 h-20 bg-stone-100 rounded-full flex items-center justify-center mb-4">
                <ShoppingBag className="w-10 h-10 text-stone-300" />
              </div>
              <p className="text-stone-500 font-medium">Keranjang Anda masih kosong</p>
            </div>
          ) : (
            <div className="space-y-6">
              {cart.map((item) => (
                <div key={item.id} className="flex gap-4 group">
                  <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 bg-stone-100">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-stone-900 truncate">{item.name}</h3>
                    <p className="text-stone-500 text-sm font-medium">{formatCurrency(item.price)}</p>
                    <div className="flex items-center gap-3 mt-2">
                      <div className="flex items-center bg-stone-100 rounded-lg px-2 py-1">
                        <button 
                          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                          className="p-1 hover:text-green-forest transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-8 text-center text-xs font-bold">{item.quantity}</span>
                        <button 
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          className="p-1 hover:text-green-forest transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <button 
                        onClick={() => onRemoveItem(item.id)}
                        className="text-stone-300 hover:text-terracotta transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-stone-900">{formatCurrency(item.price * item.quantity)}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {cart.length > 0 && (
          <div className="p-6 bg-stone-50 border-t border-stone-100">
            {!showForm ? (
              <>
                <div className="flex justify-between items-center mb-6">
                  <span className="text-stone-500 font-medium">Total Pembayaran</span>
                  <span className="text-2xl font-bold text-stone-900">{formatCurrency(total)}</span>
                </div>
                <button 
                  onClick={() => setShowForm(true)}
                  className="w-full bg-stone-900 text-white py-4 rounded-2xl font-bold hover:bg-stone-800 transition-all shadow-lg shadow-stone-900/20 active:scale-[0.98]"
                >
                  Lanjut ke Pembayaran
                </button>
              </>
            ) : (
              <div className="space-y-4">
                <button 
                  onClick={() => setShowForm(false)}
                  className="text-xs font-bold text-stone-400 uppercase tracking-widest hover:text-stone-900 transition-colors flex items-center gap-2"
                >
                  <Minus className="w-3 h-3" /> Kembali ke Keranjang
                </button>
                <CustomerForm onSubmit={onCheckout} />
              </div>
            )}
          </div>
        )}
      </motion.div>
    </>
  );
};
