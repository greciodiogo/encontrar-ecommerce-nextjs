import { Dispatch } from 'redux';

import { AddToCart, AdjustQty, LoadCurrentItem, RemoveFromCart } from 'constants/products';
import { ProductDTO } from 'types/product';

type CartAction = {
  type: string;
  payload: unknown;
};

export const addToCart = (id: number) => (dispatch: Dispatch<CartAction>) => {
  try {
    dispatch({ type: AddToCart, payload: { id } });
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
