
import React from 'react';
import type { Product } from '../types';
import { ProductCard } from './ProductCard';
import { HighlightedProductCard } from './HighlightedProductCard';

interface ProductListProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
}

const categoryDescriptions: Record<string, string> = {
    'Snack Plizstop': 'Snack Plizstop adalah snack sehat berbahan dasar tapioka berkualitas Gluten Free dan MSG Free. Rasanya gurih renyah, cocok buat camilan atau topping makanan.',
    'Wedhang Cafe JSR': 'Wedang Cafe JSR adalah minuman rempah asli alami premium yang praktis, tinggal seduh air panas. Tanpa bahan pengawet, InsyaAllah aman untuk ikhtiar kesehatan harian.'
}

export const ProductList: React.FC<ProductListProps> = ({ products, onAddToCart }) => {
  const highlightedProduct = products.find(p => p.isHighlight);
  const regularProducts = products.filter(p => !p.isHighlight);

  const groupedProducts = regularProducts.reduce((acc, product) => {
    (acc[product.category] = acc[product.category] || []).push(product);
    return acc;
  }, {} as Record<string, Product[]>);

  return (
    <div className="space-y-12">
      {highlightedProduct && (
        <section className="mb-12">
          <HighlightedProductCard product={highlightedProduct} onAddToCart={onAddToCart} />
        </section>
      )}

      {Object.keys(groupedProducts).map((category) => {
        const items = groupedProducts[category];
        if (items.length === 0) return null;
        return (
          <section key={category}>
            <h2 className="text-3xl font-bold text-gray-800">{category}</h2>
            <p className="mt-2 text-gray-600">{categoryDescriptions[category]}</p>
            <div className="mt-4 inline-block">
               <span className="bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full">{items[0].tag}</span>
            </div>
            <div className="mt-6 grid grid-cols-2 gap-4">
              {items.map(product => (
                <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
              ))}
            </div>
          </section>
        )
      })}
    </div>
  );
};