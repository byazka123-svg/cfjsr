
import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ProductList } from './components/ProductList';
import { OrderSidebar } from './components/OrderSidebar';
import { products } from './constants';
import type { Product, CartItem, CustomerInfo } from './types';
import { ShoppingCartIcon } from './components/Icons';
import { Toast } from './components/Toast';
import { Modal } from './components/Modal';

const App: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    name: '',
    phone: '',
    address: '',
    postalCode: '',
  });
  const [toastMessage, setToastMessage] = useState<string>('');
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [selectedBonus, setSelectedBonus] = useState<string>('');
  
  const [isOrderSuccessModalVisible, setIsOrderSuccessModalVisible] = useState(false);
  const [whatsappUrl, setWhatsappUrl] = useState('');

  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wedhangQuantity = cartItems
        .filter(item => item.category === 'Wedhang Cafe JSR')
        .reduce((sum, item) => sum + item.quantity, 0);
    const freeGifts = Math.floor(wedhangQuantity / 3);
    if (freeGifts === 0) {
        setSelectedBonus('');
    }
  }, [cartItems]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsSidebarVisible(entry.isIntersecting);
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.1, // Trigger when 10% of the sidebar is visible
      }
    );

    const currentSidebar = sidebarRef.current;
    if (currentSidebar) {
      observer.observe(currentSidebar);
    }

    return () => {
      if (currentSidebar) {
        observer.unobserve(currentSidebar);
      }
    };
  }, []);
  
  const handleContinueToWhatsapp = () => {
    if (whatsappUrl) {
      window.open(whatsappUrl, '_blank');
    }
    setIsOrderSuccessModalVisible(false);
    setWhatsappUrl('');
    // Clear cart and customer info
    setCartItems([]);
    setCustomerInfo({
      name: '',
      phone: '',
      address: '',
      postalCode: '',
    });
  };

  const handleScrollToSidebar = () => {
    sidebarRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleAddToCart = useCallback((product: Product) => {
    setCartItems(prevItems => {
      const exist = prevItems.find(item => item.id === product.id);
      if (exist) {
        return prevItems.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });

    setToastMessage('Produk ditambahkan ke keranjang');

    if (sidebarRef.current) {
      sidebarRef.current.classList.remove('animate-pulse-once');
      // A trick to re-trigger the animation
      void sidebarRef.current.offsetWidth; 
      sidebarRef.current.classList.add('animate-pulse-once');
    }

  }, []);

  const handleUpdateQuantity = useCallback((productId: number, newQuantity: number) => {
    setCartItems(prevItems => {
      if (newQuantity <= 0) {
        return prevItems.filter(item => item.id !== productId);
      }
      return prevItems.map(item =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      );
    });
  }, []);

  const handleRemoveFromCart = useCallback((productId: number) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  }, []);

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-gray-200 font-sans">
      <div className="min-h-screen bg-gray-50 font-sans pb-24 max-w-lg mx-auto shadow-2xl">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <Hero />
          <div className="mt-8 grid grid-cols-1 gap-8">
            <div className="lg:col-span-2">
              <ProductList products={products} onAddToCart={handleAddToCart} />
            </div>
            <div className="mt-8 lg:mt-0" ref={sidebarRef}>
              <OrderSidebar 
                items={cartItems} 
                onUpdateQuantity={handleUpdateQuantity} 
                onRemoveFromCart={handleRemoveFromCart} 
                customerInfo={customerInfo}
                setCustomerInfo={setCustomerInfo}
                selectedBonus={selectedBonus}
                setSelectedBonus={setSelectedBonus}
                setIsOrderSuccessModalVisible={setIsOrderSuccessModalVisible}
                setWhatsappUrl={setWhatsappUrl}
              />
            </div>
          </div>
        </main>
        
        <Toast 
          message={toastMessage} 
          onClose={() => setToastMessage('')} 
        />

        <Modal 
          isVisible={isOrderSuccessModalVisible}
          onConfirm={handleContinueToWhatsapp}
          onClose={() => setIsOrderSuccessModalVisible(false)}
          title="Pesanan Berhasil Terkirim!"
          message="Data pesanan Anda telah kami terima. Silakan lanjutkan ke WhatsApp untuk konfirmasi dengan admin kami."
          confirmText="Lanjutkan ke WhatsApp"
        />

        {cartItems.length > 0 && (
          <div className={`
            fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-lg bg-white p-4 shadow-[0_-2px_10px_rgba(0,0,0,0.1)] z-20 
            transition-transform duration-500 ease-in-out
            ${isSidebarVisible ? 'translate-y-full' : 'translate-y-0'}
          `}>
            <div className="container mx-auto">
              <button
                onClick={handleScrollToSidebar}
                className="w-full bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors text-lg flex items-center justify-center relative animate-bobbing"
              >
                <ShoppingCartIcon className="h-6 w-6 mr-3" />
                <span>Segera Lengkapi Pesanan</span>
                <span className="absolute right-4 top-1/2 -translate-y-1/2 bg-white text-orange-500 text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center">
                  {totalItems}
                </span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
