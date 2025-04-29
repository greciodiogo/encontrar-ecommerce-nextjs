import { Dispatch } from 'redux';

import {
  AddToCart,
  AdjustQty,
  LoadCurrentItem,
  RemoveFromCart,
  SetAddress,
  SetOrder,
  SetPaymentMethod,
} from 'constants/products';
import { CatalogService } from 'lib/catalog';
import { CheckoutDTO } from 'types/checkout';
import { CategoriesDTO, OrderType, ProductDTO } from 'types/product';
import { SetAddressAction, SetOrderAction, SetPaymentMethodAction } from 'types/store';

import { GetAllProducts, GetAllCategories } from './../constants/products';

type CartAction = {
  type: string;
  payload: unknown;
};
const catalog = new CatalogService();

export const fetchAllProducts = () => async (dispatch: Dispatch<CartAction>) => {
  try {
    const params = new URLSearchParams({
      page: String(0), // Conversão para string
      perPage: String(6),
    });

    const productsResponse = await catalog.getProducts(params);
    const products_ = productsResponse as Array<ProductDTO>;

    dispatch({ type: GetAllProducts, payload: { products: products_ } });
  } catch (error) {
    console.error("Can't add to Cart", error);
  }
};

export const fetchAllCategories = () => async (dispatch: Dispatch<CartAction>) => {
  try {
    const params = new URLSearchParams({
      // page: String(0), 
      // perPage: String(6),
    });

    const categoriesResponse = await catalog.getCategories(params);
    const categories_ = categoriesResponse as Array<CategoriesDTO>;

    dispatch({ type: GetAllCategories, payload: { categories: categories_ } });
  } catch (error) {
    console.error("Can't add to Cart", error);
  }
};

export const addToCart =
  (id: number, qty = 1) =>
  (dispatch: Dispatch<CartAction>) => {
    try {
      dispatch({ type: AddToCart, payload: { id, qty } });
    } catch (error) {
      console.error("Can't add to Cart", error);
    }
  };

export const removeFromCart = (id: number) => (dispatch: Dispatch<CartAction>) => {
  try {
    dispatch({ type: RemoveFromCart, payload: { id } });
  } catch (error) {
    console.error("Can't remove from Cart", error);
  }
};

export const adjustQty = (id: number, value: number) => (dispatch: Dispatch<CartAction>) => {
  try {
    dispatch({ type: AdjustQty, payload: { id, qty: value } });
  } catch (error) {
    console.error("Can't Adjust Quantity in Cart", error);
  }
};

export const loadCurrentItem = (item: ProductDTO) => (dispatch: Dispatch<CartAction>) => {
  try {
    dispatch({ type: LoadCurrentItem, payload: item });
  } catch (error) {
    console.error("Can't load current item", error);
  }
};

export const setAddress = (checkoutData: CheckoutDTO) => (dispatch: Dispatch<SetAddressAction>) => {
  try {
    delete checkoutData.paymentMethod;
    dispatch({ type: SetAddress, payload: checkoutData });
  } catch (error) {
    console.error("Can't Set Address", error);
  }
};

export const setPaymentMethod = (method: string) => (dispatch: Dispatch<SetPaymentMethodAction>) => {
  try {
    dispatch({ type: SetPaymentMethod, payload: method });
  } catch (error) {
    console.error("Can't Set Payment Method", error);
  }
};

export const setOrder = (order: OrderType) => (dispatch: Dispatch<SetOrderAction>) => {
  try {
    dispatch({ type: SetOrder, payload: order });
  } catch (error) {
    console.error("Can't Set Payment Method", error);
  }
};
