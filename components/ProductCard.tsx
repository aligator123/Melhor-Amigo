
import React from 'react';
import { Product } from '../types';
import { Plus, ShoppingBag } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col">
      <div className="relative aspect-square overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3 flex flex-wrap gap-1">
          <span className="bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider text-orange-600">
            {product.category}
          </span>
        </div>
      </div>
      
      <div className="p-4 flex flex-col flex-1">
        <h3 className="text-lg font-bold text-gray-800 mb-1 group-hover:text-orange-600 transition-colors">
          {product.name}
        </h3>
        <p className="text-sm text-gray-500 mb-4 line-clamp-2 leading-relaxed">
          {product.description}
        </p>
        
        <div className="mt-auto flex items-center justify-between">
          <span className="text-xl font-bold text-gray-900">
            R$ {product.price.toFixed(2).replace('.', ',')}
          </span>
          <button 
            onClick={() => onAddToCart(product)}
            className="bg-orange-500 hover:bg-orange-600 text-white p-2.5 rounded-xl transition-all active:scale-95 shadow-lg shadow-orange-500/20 flex items-center gap-2 group/btn"
          >
            <Plus className="w-5 h-5" />
            <span className="hidden sm:inline text-sm font-semibold">Adicionar</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
