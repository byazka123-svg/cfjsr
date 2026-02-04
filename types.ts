
export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  tag: string;
  isBestSeller?: boolean;
  isHighlight?: boolean;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface CustomerInfo {
  name: string;
  phone: string;
  address: string;
  postalCode: string;
}