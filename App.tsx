
import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Routes, Route, useParams, useNavigate } from 'react-router-dom';
import { Header } from './components/Header';
import { ProductList } from './components/ProductList';
import { OrderSidebar } from './components/OrderSidebar';
import { products } from './constants';
import type { Product, CartItem, CustomerInfo } from './types';
import { Modal } from './components/Modal';
import { AddToCartModal } from './components/AddToCartModal';
import { ProductDetailModal } from './components/ProductDetailModal';
import { RamadanPromoBanner } from './components/RamadanPromoBanner';
import { BottomNavBar } from './components/BottomNavBar';
import { Hero } from './components/Hero';
import { Ribbon } from './components/Ribbon';

const MainContent: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    name: '',
    phone: '',
    address: '',
    postalCode: '',
  });
  const [selectedBonus, setSelectedBonus] = useState<string>('');
  
  const [isOrderSuccessModalVisible, setIsOrderSuccessModalVisible] = useState(false);
  const [whatsappUrl, setWhatsappUrl] = useState('');

  const [lastAddedProduct, setLastAddedProduct] = useState<Product | null>(null);
  const [isAddToCartModalVisible, setIsAddToCartModalVisible] = useState(false);
  
  const [activeTab, setActiveTab] = useState('home');
  
  const sidebarRef = useRef<HTMLDivElement>(null);
  const promoRef = useRef<HTMLDivElement>(null);

  const navigate = useNavigate();
  const { id: productId } = useParams<{ id: string }>();

  const selectedProduct = productId ? products.find(p => p.id.toString() === productId) : null;
  const isDetailModalVisible = !!selectedProduct;

  const handleCloseDetail = () => {
    navigate('/');
  };

  useEffect(() => {
    const wedhangQuantity = cartItems
        .filter(item => item.category === 'Wedhang Cafe JSR')
        .reduce((sum, item) => sum + item.quantity, 0);
    const freeGifts = Math.floor(wedhangQuantity / 3);
    if (freeGifts === 0) {
        setSelectedBonus('');
    }
  }, [cartItems]);
  
  const handleContinueToWhatsapp = () => {
    if (whatsappUrl) {
      window.open(whatsappUrl, '_blank');
    }
    setIsOrderSuccessModalVisible(false);
    setWhatsappUrl('');
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
    setActiveTab('cart');
  };

  const handleNavigate = (tab: string) => {
    setActiveTab(tab);
    if (tab === 'promo') {
      promoRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else if (tab === 'cart') {
      sidebarRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else if (tab === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      navigate('/');
    }
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

    setLastAddedProduct(product);
    setIsAddToCartModalVisible(true);

    if (sidebarRef.current) {
      sidebarRef.current.classList.remove('animate-pulse-once');
      void sidebarRef.current.offsetWidth; 
      sidebarRef.current.classList.add('animate-pulse-once');
    }
  }, []);

  const handleAddToCartAndCloseDetail = (product: Product) => {
    handleAddToCart(product);
    handleCloseDetail();
  };

  const handleModalContinueShopping = () => {
    setIsAddToCartModalVisible(false);
  };

  const handleModalCheckout = () => {
    setIsAddToCartModalVisible(false);
    handleScrollToSidebar();
  };

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
    <div className="min-h-screen bg-stone-200 font-sans">
      <div className="min-h-screen bg-stone-100 font-sans pb-24 lg:pb-0 max-w-7xl mx-auto shadow-2xl">
        <Header />
        
        <main className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-12">
            <div className="lg:col-span-2">
              <Hero />
              <Ribbon />
              <div ref={promoRef}>
                <RamadanPromoBanner />
              </div>
              <div className="mt-8">
                <ProductList 
                  products={products} 
                  onAddToCart={handleAddToCart}
                />
              </div>
            </div>
            <div className="lg:col-span-1 mt-8 lg:mt-0" ref={sidebarRef}>
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
        
        <BottomNavBar 
          activeTab={activeTab}
          onNavigate={handleNavigate}
          cartItemCount={totalItems}
        />
        
        <ProductDetailModal 
            isVisible={isDetailModalVisible}
            product={selectedProduct}
            onClose={handleCloseDetail}
            onAddToCart={handleAddToCartAndCloseDetail}
        />
        
        <AddToCartModal 
            isVisible={isAddToCartModalVisible}
            product={lastAddedProduct}
            onClose={handleModalContinueShopping}
            onCheckout={handleModalCheckout}
            cartItems={cartItems}
        />

        <Modal 
          isVisible={isOrderSuccessModalVisible}
          onConfirm={handleContinueToWhatsapp}
          onClose={() => setIsOrderSuccessModalVisible(false)}
          title="Pesanan Berhasil Terkirim!"
          message="Data pesanan Anda telah kami terima. Silakan lanjutkan ke WhatsApp untuk konfirmasi dengan admin kami."
          confirmText="Lanjutkan ke WhatsApp"
        />
      </div>
    </div>
  );
};

const App: React.FC = () => {
    return (
      <Routes>
        <Route path="/" element={<MainContent />} />
        <Route path="/product/:id" element={<MainContent />} />
      </Routes>
    );
};

export default App;