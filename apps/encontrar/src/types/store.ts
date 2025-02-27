import {
  AddToCart,
  AdjustQty,
  GetAllProducts,
  LoadCurrentItem,
  RemoveFromCart,
  SetAddress,
  SetPaymentMethod,
  SetOrder,
} from 'constants/products';
import { OrderType, ProductDTO } from 'types/product';

import { RegisterAddressDTO } from './checkout';

// Definição do tipo de ação
export type Action<T> = {
  type: string;
  payload?: T;
};

export type GetAllProductsAction = {
  type: typeof GetAllProducts;
} & Action<{ products: Array<ProductDTO> }>;

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

export type ProductAction =
  | GetAllProductsAction
  | AddToCartAction
  | RemoveFromCartAction
  | AdjustQtyAction
  | LoadCurrentItemAction
  | SetAddressAction
  | SetPaymentMethodAction
  | SetOrderAction;
