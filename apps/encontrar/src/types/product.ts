import { RegisterAddressDTO, RegisterPaymentMethodDTO } from './checkout';

export type ProductProps = {
  cart: ProductDTO;
  setTotal?: React.Dispatch<React.SetStateAction<number>>;
};
export type CartItemProps = {
  cart: ProductDTO;
  setSubtotal: React.Dispatch<React.SetStateAction<number>>;
  setTotal: React.Dispatch<React.SetStateAction<number>>;
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
  handleAddToCart?: (id: number) => void;
  handlepreviewProduct: (id: number) => void;
};

export type CartProps = {
  cart: Array<ProductProps>;
  qtd: number;
  totalItems: number;
  total: number;
  subtotal: number;
};

export type ReviewDataProps = {
  cart: Array<ProductDTO>;
  address: string;
  paymentMethod: string;
};

export type ProductState = {
  products: Array<ProductDTO>;
  cart: Array<ProductDTO>;
  currentItem: ProductDTO | null;
  address: RegisterAddressDTO | null; // Novo campo para endereço
  paymentMethod: RegisterPaymentMethodDTO | null; // Novo campo para método de pagamento
};

export type RootState = {
  products: ProductState;
};
