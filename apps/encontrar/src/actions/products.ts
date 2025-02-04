import { AddToCart, AdjustQty, LoadCurrentItem, RemoveFromCart } from 'constants/products';

export const addToCart = (id: number) => (dispatch: any) => {
  try {
    dispatch({ type: AddToCart, payload: { id } });
  } catch (e) {
    console.log("Can't add to Cart");
  }
};

export const removeFromCart = (id: number) => (dispatch: any) => {
  try {
    dispatch({ type: RemoveFromCart, payload: { id: id } });
  } catch (e) {
    console.log("Can't remove from Cart");
  }
};

export const adjustQty = (id: number, value: number) => (dispatch: any) => {
  try {
    console.log(value);
    dispatch({ type: AdjustQty, payload: { id, qty: value } });
  } catch (e) {
    console.log("Can't Adjust Quantity Cart");
  }
};

export const loadCurrentItem = (item: any) => (dispatch: any) => {
  try {
    dispatch({ type: LoadCurrentItem, payload: item });
  } catch (e) {
    console.log("Can't Adjust Quantity Cart");
  }
};
