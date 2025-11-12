import { RegisterAddressDTO, RegisterPaymentMethodDTO, CheckoutDTO } from './checkout';

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
  is_promotion?: boolean;
  handleAddToCart?: (id: number, product?: ProductDTO) => void;
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

export interface Address {
  id: number;
  name: string;
  slug?: string;
  visible: boolean;
  parentAddress?: Address;
  childAddresses: Array<Address>;
}

// Represents a single product (already defined as ProductDTO)
// export type ProductDTO = { ... }

// Represents the paginated response from the backend
export type PaginatedProducts = {
  data: ProductDTO[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

export type ProductState = {
  products: Array<ProductDTO>; // Flat array for legacy/simple access
  productsPage?: PaginatedProducts; // Full paginated response
  categories: Array<CategoriesDTO>;
  cart: Array<ProductDTO>;
  currentItem: ProductDTO | Record<string, unknown>;
  paymentMethodsList: Array<PaymentMethodList>;
  addresses: Array<Address>;
  address: CheckoutDTO | null;
  paymentMethod: number | null;
  order: OrderType | null;
  ratings?: { [productId: number]: ProductRating[] };
  shippingCost?: number;
  shippingAddressId?: number;
  total?: number;
  page?: number;
  limit?: number;
  totalPages?: number;
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

export interface ProductRating {
  id: number;
  rating: number;
  comment: string;
  user: { name: string };
  created: string;
}

export interface ProductRatingDto {
  rating: number;
  comment: string;
}
