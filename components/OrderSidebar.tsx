
import React, { useState } from 'react';
import type { CartItem, CustomerInfo } from '../types';
import { EmptyCartIcon, GiftIcon, MinusIcon, PlusIcon, TrashIcon, SpinnerIcon } from './Icons';

interface OrderSidebarProps {
  items: CartItem[];
  customerInfo: CustomerInfo;
  onUpdateQuantity: (productId: number, newQuantity: number) => void;
  onRemoveFromCart: (productId: number) => void;
  setCustomerInfo: React.Dispatch<React.SetStateAction<CustomerInfo>>;
  selectedBonus: string;
  setSelectedBonus: (bonus: string) => void;
  setIsOrderSuccessModalVisible: (isVisible: boolean) => void;
  setWhatsappUrl: (url: string) => void;
}

// TODO: Ganti dengan URL Web App dari Google Apps Script Anda
const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwzxt-XUxIW5-7c_34Hc8KvK3tgxqKZe4wx-pcBgw5rpxRQZMo84o_YnSZY_cH5MkKR/exec'; 

async function sendDataToGoogleSheet(data: object) {
  try {
    const response = await fetch(SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors', // Penting untuk menghindari error CORS saat mengirim ke Apps Script
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    console.log('Successfully sent data to Google Sheet');
  } catch (error) {
    console.error('Error sending data to Google Sheet:', error);
    // Re-throw the error to be caught by the caller
    throw error;
  }
}


export const OrderSidebar: React.FC<OrderSidebarProps> = ({ 
    items, 
    customerInfo, 
    onUpdateQuantity, 
    onRemoveFromCart, 
    setCustomerInfo,
    selectedBonus,
    setSelectedBonus,
    setIsOrderSuccessModalVisible,
    setWhatsappUrl
}) => {
    const [isLoading, setIsLoading] = useState(false);

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

    const wedhangItems = items.filter(item => item.category === 'Wedhang Cafe JSR');
    const wedhangQuantity = wedhangItems.reduce((sum, item) => sum + item.quantity, 0);
    const freeGifts = Math.floor(wedhangQuantity / 3);
    const neededForNextGift = 3 - (wedhangQuantity % 3);
    
    const isBonusSelectionMissing = freeGifts > 0 && !selectedBonus;


    const handleCheckout = async () => {
        const WHATSAPP_NUMBER = '6281398898131'; 

        if (items.length === 0 || isLoading) return;

        if (!isFormComplete) {
            alert('Mohon lengkapi data pemesan terlebih dahulu.');
            return;
        }

        if (isBonusSelectionMissing) {
            alert('Mohon pilih bonus Anda terlebih dahulu.');
            return;
        }
        
        setIsLoading(true);
        try {
            const orderDetailsText = items.map(item => 
                `- ${item.name} (x${item.quantity})`
            ).join('\n');
            
            const promoDetailsText = freeGifts > 0 ? `${freeGifts}x ${selectedBonus} Rempah` : 'Tidak ada';
    
            // Kirim data ke Google Sheet
            const sheetData = {
              ...customerInfo,
              orderDetails: orderDetailsText,
              total: formatCurrency(total),
              promoDetails: promoDetailsText,
            };
            
            await sendDataToGoogleSheet(sheetData);
    
            const customerDetails = `
*Data Pemesan:*
Nama: ${customerInfo.name}
No. WA: ${customerInfo.phone}
Alamat: ${customerInfo.address}
Kode Pos: ${customerInfo.postalCode}
            `;
    
            const message = `Halo Cafe JSR, saya mau pesan:\n\n*Pesanan:*\n${orderDetailsText}\n\n*Total: ${formatCurrency(total)}* (belum termasuk ongkir)\n*Bonus:* ${promoDetailsText}\n\n${customerDetails}\n\nTerima kasih.`;
    
            const encodedMessage = encodeURIComponent(message);
            const finalWhatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
    
            setWhatsappUrl(finalWhatsappUrl);
            setIsOrderSuccessModalVisible(true);
        } catch (error) {
            console.error("Checkout process failed:", error);
            alert("Terjadi kesalahan saat memproses pesanan. Silakan coba lagi.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setCustomerInfo(prevInfo => ({
          ...prevInfo,
          [name]: value,
        }));
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
                    {/* Cart Section */}
                    <h3 className="text-xl font-bold text-gray-800 mb-4">Keranjang Belanja</h3>
                    <div className="space-y-4">
                        {items.map(item => (
                            <div key={item.id} className="flex items-center space-x-4">
                                <div className="flex-1">
                                    <p className="font-semibold text-gray-800">{item.name}</p>
                                    <div className="flex items-baseline gap-2">
                                        <p className="text-sm text-green-forest font-bold">{formatCurrency(item.price)}</p>
                                        {item.originalPrice && (
                                            <p className="text-xs text-gray-400 line-through">{formatCurrency(item.originalPrice)}</p>
                                        )}
                                    </div>
                                    <div className="flex items-center mt-2 border border-gray-200 rounded-full w-fit">
                                        <button onClick={() => onUpdateQuantity(item.id, item.quantity - 1)} className="p-1.5 text-gray-600 hover:text-red-500 rounded-l-full hover:bg-gray-50" aria-label="Kurangi jumlah">
                                            <MinusIcon className="w-4 h-4"/>
                                        </button>
                                        <span className="px-4 text-sm font-bold text-gray-800 tabular-nums w-10 text-center">{item.quantity}</span>
                                        <button onClick={() => onUpdateQuantity(item.id, item.quantity + 1)} className="p-1.5 text-gray-600 hover:text-green-forest rounded-r-full hover:bg-gray-50" aria-label="Tambah jumlah">
                                            <PlusIcon className="w-4 h-4"/>
                                        </button>
                                    </div>
                                </div>
                                <button onClick={() => onRemoveFromCart(item.id)} className="text-gray-400 hover:text-red-500">
                                    <TrashIcon className="w-5 h-5"/>
                                </button>
                            </div>
                        ))}
                    </div>
                    
                    <div className="border-t border-gray-200 mt-6 pt-4">
                        {/* Promo section */}
                        {wedhangQuantity > 0 && (
                            <div className="bg-green-forest/10 border border-green-forest/20 text-green-forest/90 rounded-lg p-3 text-sm mb-4">
                                <div className="flex items-start">
                                    <GiftIcon className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                                    <div>
                                        <p className="font-bold">Promo Spesial Wedhang!</p>
                                        <p>Beli 3 box gratis 1 teko/tumbler (berlaku kelipatan).</p>
                                        {freeGifts > 0 && <p className="mt-1 font-semibold">Anda akan mendapatkan <span className="underline">{freeGifts} bonus</span>!</p>}
                                        {neededForNextGift !== 3 && <p className="mt-1 font-semibold text-terracotta">Tambah {neededForNextGift} box lagi untuk dapat bonus berikutnya!</p>}
                                        <p className="text-xs mt-2 text-green-forest/80">(Bonus dikirim random jika tidak dipilih)</p>

                                        {freeGifts > 0 && (
                                            <div className="mt-3">
                                                <p className="font-bold mb-2">Pilih bonus Anda:</p>
                                                <div className="flex flex-col sm:flex-row gap-2">
                                                    <button 
                                                        onClick={() => setSelectedBonus('Teko')}
                                                        className={`w-full text-left p-2 rounded-md border text-xs transition-colors ${selectedBonus === 'Teko' ? 'bg-green-forest text-white border-green-forest font-bold' : 'bg-white hover:bg-green-forest/10 border-green-forest/30'}`}
                                                    >
                                                        Teko Rempah
                                                    </button>
                                                    <button 
                                                        onClick={() => setSelectedBonus('Tumbler')}
                                                        className={`w-full text-left p-2 rounded-md border text-xs transition-colors ${selectedBonus === 'Tumbler' ? 'bg-green-forest text-white border-green-forest font-bold' : 'bg-white hover:bg-green-forest/10 border-green-forest/30'}`}
                                                    >
                                                        Tumbler Rempah
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}
                        <div className="flex justify-between font-bold text-gray-800">
                            <span>Total</span>
                            <span>{formatCurrency(total)}</span>
                        </div>
                         <p className="text-xs text-gray-500 text-right mt-1">Belum termasuk ongkir</p>
                    </div>

                    {/* Form Section */}
                    <div className="border-t border-gray-200 mt-6 pt-4">
                        <h3 className="text-xl font-bold text-gray-800 mb-4">Lengkapi Data Pemesan</h3>
                        <form className="space-y-4">
                            <div>
                              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nama Lengkap</label>
                              <input
                                type="text"
                                id="name"
                                name="name"
                                value={customerInfo.name}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-forest focus:border-green-forest sm:text-sm text-gray-900"
                                placeholder="Masukkan nama lengkap Anda"
                                required
                              />
                            </div>
                            <div>
                              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">No. WhatsApp</label>
                              <input
                                type="tel"
                                id="phone"
                                name="phone"
                                value={customerInfo.phone}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-forest focus:border-green-forest sm:text-sm text-gray-900"
                                placeholder="Contoh: 081234567890"
                                required
                              />
                            </div>
                            <div>
                              <label htmlFor="address" className="block text-sm font-medium text-gray-700">Alamat Lengkap</label>
                              <textarea
                                id="address"
                                name="address"
                                rows={3}
                                value={customerInfo.address}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-forest focus:border-green-forest sm:text-sm text-gray-900"
                                placeholder="Masukkan nama jalan, nomor rumah, RT/RW, kelurahan, kecamatan, dan kota/kabupaten"
                                required
                              />
                            </div>
                            <div>
                              <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700">Kode Pos</label>
                              <input
                                type="text"
                                id="postalCode"
                                name="postalCode"
                                value={customerInfo.postalCode}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-forest focus:border-green-forest sm:text-sm text-gray-900"
                                placeholder="Masukkan kode pos"
                                required
                              />
                            </div>
                        </form>
                    </div>

                    {/* Checkout Button Section */}
                    <div className="mt-6">
                         <button 
                            onClick={handleCheckout}
                            className="w-full bg-green-forest text-white py-3 rounded-lg font-semibold hover:bg-green-forest/90 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center"
                            disabled={!isFormComplete || isBonusSelectionMissing || isLoading}
                        >
                            {isLoading ? (
                                <>
                                    <SpinnerIcon className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
                                    <span>Memproses...</span>
                                </>
                            ) : (
                                <span>Pesan via WhatsApp</span>
                            )}
                        </button>
                        {!isFormComplete && (
                            <p className="text-xs text-red-500 text-center mt-2">
                                *Lengkapi data pemesan untuk melanjutkan.
                            </p>
                        )}
                        {isBonusSelectionMissing && (
                            <p className="text-xs text-red-500 text-center mt-2">
                                *Silakan pilih bonus Anda untuk melanjutkan.
                            </p>
                        )}
                    </div>
                </>
            )}
        </div>
    );
};
