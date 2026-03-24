
import React from 'react';
import { Leaf, Star, ShoppingBag, ArrowRight, Gift } from 'lucide-react';
import type { Product } from '../types';

interface CuratedCollectionProps {
  onAddToCart: (product: Product) => void;
  onShowDetail: (product: Product) => void;
  products: Product[];
}

export const CuratedCollection: React.FC<CuratedCollectionProps> = ({ onAddToCart, onShowDetail, products }) => {
  const signatureProduct = products.find(p => p.id === 3) || products[0];
  const snackProduct = products.find(p => p.category === 'Snack Plizstop') || products[0];
  const hamperProduct = products.find(p => p.category === 'Paket Spesial') || products[0];

  return (
    <section className="my-16">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-stone-900">Koleksi Terkurasi</h2>
        <p className="text-stone-500 mt-2 font-medium">Hanya yang terbaik dari alam untuk keseharian Anda.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Featured Card */}
        <div className="lg:col-span-2 bg-[#F5F4F0] rounded-[2rem] p-10 flex flex-col md:flex-row items-center gap-10 relative overflow-hidden group">
          <div className="flex-1 z-10">
            <div className="flex gap-2 mb-6">
              <span className="bg-stone-800 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1">
                <Leaf className="w-3 h-3" /> Organic
              </span>
              <span className="bg-stone-800 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1">
                <Star className="w-3 h-3" /> Best Seller
              </span>
            </div>
            <h3 className="text-4xl font-extrabold text-stone-900 leading-tight mb-4">
              Wedhang Cafe JSR Signature
            </h3>
            <p className="text-stone-600 mb-8 max-w-md leading-relaxed">
              Campuran eksklusif jahe merah, kunyit, dan serai organik. Tanpa gula tambahan, murni dari tanah Jawa.
            </p>
            <div className="flex items-center gap-6">
              <span className="text-3xl font-bold text-stone-900">Rp 45.000</span>
              <button 
                onClick={() => onAddToCart(signatureProduct)}
                className="bg-stone-900 text-white p-4 rounded-full hover:bg-stone-800 transition-all hover:scale-110 active:scale-95 shadow-lg shadow-stone-900/20"
              >
                <ShoppingBag className="w-6 h-6" />
              </button>
            </div>
          </div>
          <div className="flex-1 relative">
            <div className="absolute inset-0 bg-stone-400/10 blur-3xl rounded-full scale-150"></div>
            <img 
              src="https://ik.imagekit.io/hrctvvb3m/2.png" 
              alt="Signature Wedhang" 
              className="w-full h-auto object-contain relative z-10 drop-shadow-2xl transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        </div>

        {/* Side Cards */}
        <div className="flex flex-col gap-6">
          {/* Snack Card */}
          <div className="bg-[#EBEBEB] rounded-[2rem] p-8 flex flex-col h-full group cursor-pointer" onClick={() => onShowDetail(snackProduct)}>
            <div className="mb-4">
              <h4 className="text-xl font-bold text-stone-900">Snack Plizstop</h4>
              <p className="text-stone-500 text-sm mt-1">Camilan sehat tanpa rasa bersalah.</p>
            </div>
            <div className="mt-auto relative">
               <img 
                src="https://ik.imagekit.io/hrctvvb3m/Untitled%20design%20(1).png" 
                alt="Snack" 
                className="w-full h-40 object-cover rounded-2xl shadow-lg transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          </div>

          {/* Hampers Card */}
          <div className="bg-[#FDE2D2] rounded-[2rem] p-8 flex flex-col h-full group cursor-pointer" onClick={() => onShowDetail(hamperProduct)}>
            <div className="bg-stone-900 w-10 h-10 rounded-xl flex items-center justify-center mb-6">
              <Gift className="text-white w-6 h-6" />
            </div>
            <h4 className="text-xl font-bold text-stone-900">Paket Hampers Sehat</h4>
            <p className="text-stone-600 text-sm mt-2 leading-relaxed">Kirimkan kehangatan untuk orang tersayang.</p>
            <button className="mt-8 flex items-center gap-2 text-stone-900 font-bold text-sm border-b-2 border-stone-900 w-fit pb-1 group-hover:gap-3 transition-all">
              Pelajari Selengkapnya <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
