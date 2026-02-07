
import React from 'react';
import type { Product } from '../types';
import { ProductCard } from './ProductCard';
import { HighlightedProductCard } from './HighlightedProductCard';
import { BenefitTags } from './BenefitTags';

interface ProductListProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
  onCardClick: (product: Product) => void;
}

const categoryDescriptions: Record<string, string> = {
    'Snack Plizstop': 'Snack Plizstop adalah snack sehat berbahan dasar tapioka berkualitas Gluten Free dan MSG Free. Rasanya gurih renyah, cocok buat camilan atau topping makanan.',
    'Wedhang Cafe JSR': 'Wedang Cafe JSR adalah minuman rempah asli alami premium yang praktis, tinggal seduh air panas. Tanpa bahan pengawet, InsyaAllah aman untuk ikhtiar kesehatan harian.'
}

const categoryOrder = ['Snack Plizstop', 'Wedhang Cafe JSR'];

export const ProductList: React.FC<ProductListProps> = ({ products, onAddToCart, onCardClick }) => {
  const highlightedProduct = products.find(p => p.isHighlight);
  const regularProducts = products.filter(p => !p.isHighlight);

  const groupedProducts = regularProducts.reduce((acc, product) => {
    (acc[product.category] = acc[product.category] || []).push(product);
    return acc;
  }, {} as Record<string, Product[]>);

  const handleBenefitClick = (productId: number) => {
    const element = document.getElementById(`product-${productId}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      element.classList.add('animate-highlight-scroll');
      setTimeout(() => {
        element.classList.remove('animate-highlight-scroll');
      }, 1000);
    }
  };

  return (
    <div className="space-y-12">
      {highlightedProduct && (
        <section className="mb-12">
          <HighlightedProductCard product={highlightedProduct} onAddToCart={onAddToCart} onCardClick={onCardClick} />
        </section>
      )}

      {categoryOrder.map((category) => {
        const items = groupedProducts[category];
        if (!items || items.length === 0) return null;

        const wedhangBenefits = category === 'Wedhang Cafe JSR' 
            ? items
                .filter(p => p.name.startsWith('Wedhang '))
                .map(p => ({
                    label: p.name.replace('Wedhang ', '').replace(' Hangat Menyapa', ''),
                    productId: p.id
                })) 
            : [];

        return (
          <section key={category}>
            <h2 className="text-3xl font-bold text-gray-800">{category}</h2>
            <p className="mt-2 text-gray-600">{categoryDescriptions[category]}</p>
            
            {category === 'Wedhang Cafe JSR' && (
                <BenefitTags benefits={wedhangBenefits} onBenefitClick={handleBenefitClick} />
            )}

            <div className="mt-4 inline-block">
               <span className="bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full">{items[0].tag}</span>
            </div>
            <div className="mt-6 grid grid-cols-2 gap-4">
              {items.map(product => (
                <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} onCardClick={onCardClick} />
              ))}
            </div>
          </section>
        )
      })}
    </div>
  );
};