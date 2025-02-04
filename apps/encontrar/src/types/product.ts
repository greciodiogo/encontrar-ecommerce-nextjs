export type ProductProps = {
  cart: ProductDTO;
};

export type ProductDetailProps = {
  product: ProductDTO;
};

export type ProductDTO = {
  name?: string;
  availability?: string;
  category?: string;
  price?: number;
  brand?: string;
  id?: string;
  banner?: string;
  picture?: string;
};

export type CartProps = {
  cart: ProductProps[];
  qtd: number;
  totalItems: number;
  total: number;
  subtotal: number;
};
