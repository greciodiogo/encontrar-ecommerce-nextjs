import {
  AddToCart,
  AdjustQty,
  GetAllProducts,
  LoadCurrentItem,
  RemoveFromCart,
  SetAddress,
  SetPaymentMethod,
  SetOrder,
  ClearCart,
  GetAllCategories,
} from 'constants/products';
import { CategoriesDTO, OrderType, ProductDTO } from 'types/product';

import { RegisterAddressDTO } from './checkout';

// Definição do tipo de ação
export type Action<T> = {
  type: string;
  payload?: T;
};

export type GetAllProductsAction = {
  type: typeof GetAllProducts;
} & Action<{ products: Array<ProductDTO> }>;

export type GetAllCategoriesAction = {
  type: typeof GetAllCategories;
} & Action<{ categories: Array<CategoriesDTO> }>;

export type AddToCartAction = {
  type: typeof AddToCart;
  payload: {
    id: number;
    qty: number;
  };
};

export type RemoveFromCartAction = {
  type: typeof RemoveFromCart;
  payload: {
    id: number;
  };
};

export type AdjustQtyAction = {
  type: typeof AdjustQty;
  payload: {
    id: number;
    qty: number;
  };
};

export type LoadCurrentItemAction = {
  type: typeof LoadCurrentItem;
  payload: ProductDTO;
};

export type SetAddressAction = {
  type: typeof SetAddress;
  payload: RegisterAddressDTO; // Endereço como string
};

export type SetPaymentMethodAction = {
  type: typeof SetPaymentMethod;
  payload: string; // Método de pagamento como string
};

export type SetOrderAction = {
  type: typeof SetOrder;
  payload: OrderType; // Endereço como string
};

export type ClearCartAction = {
  type: typeof ClearCart;
};

export type ProductAction =
  | GetAllProductsAction
  | GetAllCategoriesAction
  | AddToCartAction
  | RemoveFromCartAction
  | ClearCartAction
  | AdjustQtyAction
  | LoadCurrentItemAction
  | SetAddressAction
  | SetPaymentMethodAction
  | SetOrderAction;
