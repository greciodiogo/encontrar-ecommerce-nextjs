export type ProductProps = {
  cart: ProductDTO;
};

export type ProductDetailProps = {
  product: ProductDTO;
};

export type ProductDTO = {
  name?: string;
  image?: string;
  about?: string;
  availability?: string;
  category?: string;
  price?: number;
  brand?: string;
  id?: number;
  qty?: number;
  banner?: string;
  picture?: string;
};

export type ProductTypeProps = {
  product: ProductDTO;
  handlepreviewProduct: (id: number) => void;
};

export type CartProps = {
  cart: Array<ProductProps>;
  qtd: number;
  totalItems: number;
  total: number;
  subtotal: number;
};

// export type RootState = {
//   products: {
//     currentItem: ProductDTO | null;
//   };
// };

export type ProductsState = {
  cart: Array<ProductDTO>;
};

export type RootState = {
  products: ProductsState;
};
