
import React from 'react';
import type { CartItem, CustomerInfo } from '../types';
import { EmptyCartIcon, MinusIcon, PlusIcon, TrashIcon } from './Icons';

interface CartProps {
  items: CartItem[];
  onUpdateQuantity: (productId: number, newQuantity: number) => void;
  onRemoveFromCart: (productId: number) => void;
  customerInfo: CustomerInfo;
}

export const Cart: React.FC<CartProps> = ({ items, onUpdateQuantity, onRemoveFromCart, customerInfo }) => {
    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('id-ID', {
          style: 'currency',
          currency: 'IDR',
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }).format(amount).replace('IDR', 'Rp');
    };

    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const isFormComplete = customerInfo.name && customerInfo.phone && customerInfo.address && customerInfo.postalCode;

    const handleCheckout = () => {
        const WHATSAPP_NUMBER = '6281398898131'; 

        if (items.length === 0) return;

        if (!isFormComplete) {
            alert('Mohon lengkapi data pemesan di bawah terlebih dahulu.');
            return;
        }

        const orderDetails = items.map(item => 
            `- ${item.name} (x${item.quantity})`
        ).join('\n');

        const customerDetails = `
*Data Pemesan:*
Nama: ${customerInfo.name}
No. WA: ${customerInfo.phone}
Alamat: ${customerInfo.address}
Kode Pos: ${customerInfo.postalCode}
        `;

        const message = `Halo Cafe JSR, saya mau pesan:\n\n*Pesanan:*\n${orderDetails}\n\n*Total: ${formatCurrency(total)}*\n\n${customerDetails}\n\nTerima kasih.`;

        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;

        window.open(whatsappUrl, '_blank');
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
            {items.length === 0 ? (
                <div className="text-center py-8">
                    <EmptyCartIcon className="h-16 w-16 mx-auto text-gray-300" />
                    <h3 className="mt-4 text-xl font-bold text-gray-800">Keranjang Anda Kosong</h3>
                    <p className="mt-1 text-gray-500">Silakan pilih produk yang ingin Anda beli.</p>
                </div>
            ) : (
                <>
                    <h3 className="text-xl font-bold text-gray-800 mb-4">Keranjang Belanja</h3>
                    <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
                        {items.map(item => (
                            <div key={item.id} className="flex items-center space-x-4">
                                <div className="flex-1">
                                    <p className="font-semibold text-gray-800">{item.name}</p>
                                    <p className="text-sm text-emerald-800 font-bold">{formatCurrency(item.price)}</p>
                                    <div className="flex items-center mt-2">
                                        <button onClick={() => onUpdateQuantity(item.id, item.quantity - 1)} className="p-1 rounded-full text-gray-500 hover:bg-gray-100"><MinusIcon className="w-4 h-4"/></button>
                                        <span className="px-3 text-sm font-bold">{item.quantity}</span>
                                        <button onClick={() => onUpdateQuantity(item.id, item.quantity + 1)} className="p-1 rounded-full text-gray-500 hover:bg-gray-100"><PlusIcon className="w-4 h-4"/></button>
                                    </div>
                                </div>
                                <button onClick={() => onRemoveFromCart(item.id)} className="text-gray-400 hover:text-red-500">
                                    <TrashIcon className="w-5 h-5"/>
                                </button>
                            </div>
                        ))}
                    </div>
                    <div className="border-t border-gray-200 mt-6 pt-4">
                        <div className="flex justify-between font-bold text-gray-800">
                            <span>Total</span>
                            <span>{formatCurrency(total)}</span>
                        </div>
                        <button 
                            onClick={handleCheckout}
                            className="mt-4 w-full bg-emerald-700 text-white py-3 rounded-lg font-semibold hover:bg-emerald-800 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                            disabled={!isFormComplete}
                        >
                            Pesan via WhatsApp
                        </button>
                        {!isFormComplete && (
                            <p className="text-xs text-red-500 text-center mt-2">
                                *Lengkapi data pemesan di bawah untuk melanjutkan.
                            </p>
                        )}
                    </div>
                </>
            )}
        </div>
    );
};