
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'Cães' | 'Gatos' | 'Acessórios' | 'Conforto';
  image: string;
  tags: string[];
}

export interface CartItem extends Product {
  quantity: number;
}

export interface ChatMessage {
  role: 'user' | 'model';
  content: string;
}
