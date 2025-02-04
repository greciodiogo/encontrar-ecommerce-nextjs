import { AddToCart, AdjustQty, GetAllProducts, LoadCurrentItem, RemoveFromCart } from 'constants/products';
import { products } from 'fixture/ecommerceData';

const INITIALSTATE = {
  products: products,

  cart: [],

  currentItem: {},
};

function ProductsReducer(state: any = INITIALSTATE, action: any) {
  switch (action.type) {
    case GetAllProducts: {
      return {
        ...state,

        products: action.payload.products,
      };
    }

    case AddToCart: {
      // Cat the items data from the products array

      const item = state.products.find((prod: { id: number }) => prod.id === action.payload.id);

      // check if the item is already in the cart

      const inCart = state.cart.find((item: { id: number }) => item.id === action.payload.id);

      return {
        ...state,

        cart: inCart
          ? state.cart.map((item: { id: number; qty: number }) =>
              item.id === action.payload.id ? { ...item, qty: item.qty + 1 } : item,
            )
          : [...state.cart, { ...item, qty: 1 }],
      };
    }

    case RemoveFromCart: {
      return {
        ...state,

        cart: state.cart.filter((item: { id: number }) => item.id !== action.payload.id),
      };
    }

    case AdjustQty: {
      return {
        ...state,

        cart: state.cart.map((item: { id: number }) =>
          item.id === action.payload.id ? { ...item, qty: action.payload.qty } : item,
        ),
      };
    }
    case LoadCurrentItem: {
      return {
        ...state,

        currentItem: action.payload,
      };
    }

    default:
      return state;
  }
}

export default ProductsReducer;
