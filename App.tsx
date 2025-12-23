
import React, { useState, useMemo } from 'react';
import Navbar from './components/Navbar';
import ProductCard from './components/ProductCard';
import CartSidebar from './components/CartSidebar';
import GeminiAssistant from './components/GeminiAssistant';
import { PRODUCTS } from './constants';
import { Product, CartItem } from './types';
import { Filter, Cat, Dog, Heart, Star, Sparkles } from 'lucide-react';

const App: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');

  const filteredProducts = useMemo(() => {
    if (selectedCategory === 'Todos') return PRODUCTS;
    return PRODUCTS.filter(p => p.category === selectedCategory);
  }, [selectedCategory]);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item => 
      item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
    ));
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const categories = ['Todos', 'Cães', 'Gatos', 'Acessórios', 'Conforto'];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar 
        cartCount={cart.reduce((acc, curr) => acc + curr.quantity, 0)} 
        onOpenCart={() => setIsCartOpen(true)} 
      />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-orange-50 overflow-hidden py-12 sm:py-20 px-4">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="md:w-1/2 text-center md:text-left space-y-6">
              <div className="inline-flex items-center gap-2 bg-orange-100 px-4 py-2 rounded-full text-orange-700 font-bold text-sm tracking-wide">
                <Sparkles className="w-4 h-4" />
                COLEÇÃO 2024 JÁ DISPONÍVEL
              </div>
              <h1 className="text-4xl sm:text-6xl font-extrabold text-gray-900 leading-tight">
                Estilo e Conforto para o seu <span className="text-orange-600">Melhor Amigo</span>
              </h1>
              <p className="text-lg text-gray-600 max-w-lg">
                Descubra coleções exclusivas de acessórios feitos com amor e design premium. Porque seu pet merece brilhar em cada passeio.
              </p>
              <div className="flex flex-wrap justify-center md:justify-start gap-4 pt-4">
                <button 
                  onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
                  className="bg-orange-600 hover:bg-orange-700 text-white font-bold px-8 py-4 rounded-2xl shadow-xl shadow-orange-600/30 transition-all hover:-translate-y-1"
                >
                  Ver Coleção
                </button>
                <div className="flex items-center gap-4 text-sm font-bold text-gray-700">
                  <div className="flex -space-x-2">
                    <img src="https://picsum.photos/seed/u1/40/40" className="w-10 h-10 rounded-full border-2 border-white" alt="" />
                    <img src="https://picsum.photos/seed/u2/40/40" className="w-10 h-10 rounded-full border-2 border-white" alt="" />
                    <img src="https://picsum.photos/seed/u3/40/40" className="w-10 h-10 rounded-full border-2 border-white" alt="" />
                  </div>
                  <span>+10k Clientes Felizes</span>
                </div>
              </div>
            </div>
            <div className="md:w-1/2 relative">
              <div className="absolute -inset-4 bg-orange-200/50 blur-3xl rounded-full animate-pulse"></div>
              <img 
                src="https://picsum.photos/seed/pet-hero/800/600" 
                alt="Pet Hero" 
                className="relative z-10 w-full rounded-[40px] shadow-2xl object-cover border-8 border-white"
              />
            </div>
          </div>
        </section>

        {/* Features Bar */}
        <section className="bg-white py-8 border-y border-gray-100">
          <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="flex items-center gap-4">
              <div className="bg-blue-50 p-3 rounded-2xl text-blue-600">
                <Star className="w-6 h-6 fill-current" />
              </div>
              <div className="text-sm">
                <p className="font-bold">Alta Qualidade</p>
                <p className="text-gray-500">Materiais Premium</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-pink-50 p-3 rounded-2xl text-pink-600">
                <Heart className="w-6 h-6 fill-current" />
              </div>
              <div className="text-sm">
                <p className="font-bold">Feito com Amor</p>
                <p className="text-gray-500">Design Exclusivo</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-orange-50 p-3 rounded-2xl text-orange-600">
                <Dog className="w-6 h-6" />
              </div>
              <div className="text-sm">
                <p className="font-bold">Todos os Portes</p>
                <p className="text-gray-500">De PP a GGG</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-teal-50 p-3 rounded-2xl text-teal-600">
                <Cat className="w-6 h-6" />
              </div>
              <div className="text-sm">
                <p className="font-bold">Entrega Rápida</p>
                <p className="text-gray-500">Brasil Inteiro</p>
              </div>
            </div>
          </div>
        </section>

        {/* Product Section */}
        <section id="products" className="max-w-7xl mx-auto px-4 py-16">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Acessórios em Destaque</h2>
              <p className="text-gray-500">Encontre o melhor para o seu pet</p>
            </div>
            
            {/* Filter */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
              <div className="flex items-center gap-2 bg-white p-1 rounded-2xl border shadow-sm">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${
                      selectedCategory === cat 
                        ? 'bg-orange-600 text-white shadow-lg shadow-orange-600/20' 
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
              <button className="bg-white p-3 rounded-2xl border shadow-sm hover:bg-gray-50">
                <Filter className="w-5 h-5 text-gray-500" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onAddToCart={addToCart}
              />
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-400 text-lg">Nenhum produto encontrado nesta categoria.</p>
            </div>
          )}
        </section>
      </main>

      <footer className="bg-gray-900 text-white pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <div className="bg-orange-600 p-2 rounded-xl">
                <Dog className="text-white w-6 h-6" />
              </div>
              <span className="text-2xl font-bold">PetVibe</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Mais do que uma loja, somos apaixonados pelo bem-estar animal. Oferecemos apenas o melhor em design e conforto.
            </p>
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-orange-600 transition-colors cursor-pointer">
                <Star className="w-5 h-5" />
              </div>
              <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-orange-600 transition-colors cursor-pointer">
                <Heart className="w-5 h-5" />
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="font-bold mb-6">Categorias</h4>
            <ul className="space-y-4 text-gray-400 text-sm">
              <li className="hover:text-white cursor-pointer transition-colors">Para Cães</li>
              <li className="hover:text-white cursor-pointer transition-colors">Para Gatos</li>
              <li className="hover:text-white cursor-pointer transition-colors">Camas & Conforto</li>
              <li className="hover:text-white cursor-pointer transition-colors">Acessórios Premium</li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6">Suporte</h4>
            <ul className="space-y-4 text-gray-400 text-sm">
              <li className="hover:text-white cursor-pointer transition-colors">Rastrear Pedido</li>
              <li className="hover:text-white cursor-pointer transition-colors">Política de Troca</li>
              <li className="hover:text-white cursor-pointer transition-colors">Guia de Tamanhos</li>
              <li className="hover:text-white cursor-pointer transition-colors">Fale Conosco</li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6">Novidades</h4>
            <p className="text-gray-400 text-sm mb-4">Receba ofertas exclusivas por e-mail.</p>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="Seu e-mail" 
                className="bg-white/10 border border-white/20 rounded-xl px-4 py-2 flex-1 focus:outline-none focus:border-orange-500"
              />
              <button className="bg-orange-600 px-4 py-2 rounded-xl font-bold hover:bg-orange-700 transition-colors">
                OK
              </button>
            </div>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 border-t border-white/10 mt-16 pt-10 text-center text-gray-500 text-xs">
          <p>© 2024 PetVibe Boutique. Todos os direitos reservados. Feito com amor por amantes de pets.</p>
        </div>
      </footer>

      <CartSidebar 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={updateQuantity}
        onRemove={removeFromCart}
      />

      <GeminiAssistant />
    </div>
  );
};

export default App;
