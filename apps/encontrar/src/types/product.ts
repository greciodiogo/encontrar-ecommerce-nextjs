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
  images?: Array<string>;
  description?: string;
  availability?: string;
  is_promotion?: boolean;
  categories?: Array<string>;
  promotional_price?: number;
  price?: number;
  service_fee?: number;
  stock?: number;
  brand?: string;
  comission?: string;
  photos?: Array<PhotoProps>;
  id?: number;
  qty?: number;
  banner?: string;
  photosOrder?: string;
  picture?: string;
};

export type CategoriesDTO = {
  id: number;
  name: string;
  description?: string;
  groups?: Array<String>;
  parentCategory?: CategoriesDTO | null;
  childCategories: CategoriesDTO[];
  slug: string;
};

export type PaymentMethodList = {
  id: number;
  name: string;
  description?: string;
  price?: number;
};

export type PhotoProps = {
  id: number;
  path: string;
  mimeType: string;
  thumbnailPath: string;
  placeholderBase64: string;
};

export type ProductTypeProps = {
  product: ProductDTO;
  hasButtons?: boolean;
  hasDescription?: boolean;
  hasStars?: boolean;
  handleAddToCart?: (id: number) => void;
  handlepreviewProduct: (ProductDTO: ProductDTO) => void;
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
  products: Array<ProductDTO> | [];
  categories: Array<CategoriesDTO>;
  paymentMethodsList: Array<PaymentMethodList>;
  cart: Array<ProductDTO>;
  currentItem: ProductDTO | null;
  address: RegisterAddressDTO | null; // Novo campo para endereço
  paymentMethod: RegisterPaymentMethodDTO | null; // Novo campo para método de pagamento
  order: OrderType | null;
};

export type RootState = {
  products: ProductState;
};

export type OrderType = {
  order_id: string;
  created_at: Date;
  estado: 'ANDAMENTO' | 'FINALIZADO' | 'CANCELADO';
  // order: CartProps;
  // address: RegisterAddressDTO | null; // Novo campo para endereço
  // paymentMethod: RegisterPaymentMethodDTO | null;
};
