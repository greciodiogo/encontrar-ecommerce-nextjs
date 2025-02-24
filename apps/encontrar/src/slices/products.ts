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
import { products } from 'fixture/ecommerceData';
import { ProductState } from 'types/product';
import { ProductAction } from 'types/store';

// Funções de persistência no localStorage
const saveStateToLocalStorage = (state: ProductState) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('ecommerceState', JSON.stringify(state));
  }
};

const loadStateFromLocalStorage = (): ProductState => {
  if (typeof window === 'undefined') {
    return {
      products: products,
      cart: [],
      currentItem: {},
      address: null,
      paymentMethod: null,
      order: null,
    }; // Estado padrão para o lado do servidor
  }

  const savedState = localStorage.getItem('ecommerceState');
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return savedState
    ? JSON.parse(savedState)
    : {
        products: products,
        cart: [],
        currentItem: {},
        address: null,
        paymentMethod: null,
        order: null,
      };
};

const INITIALSTATE: ProductState = loadStateFromLocalStorage();

function ProductsReducer(state: ProductState = INITIALSTATE, action: ProductAction): ProductState {
  switch (action.type) {
    case GetAllProducts: {
      return {
        ...state,

        products: action.payload?.products ?? [],
      };
    }

    case AddToCart: {
      // Cat the items data from the products array

      const item = state.products.find((prod) => prod.id === action.payload.id);

      // check if the item is already in the cart

      const inCart = state.cart.find((item) => item.id === action.payload.id);

      const updatedCart = inCart
        ? state.cart.map((cartItem) =>
            cartItem.id === action.payload.id ? { ...cartItem, qty: (cartItem.qty ?? 0) + 1 } : cartItem,
          )
        : [...state.cart, { ...item, qty: 1 }];

      const newState = { ...state, cart: updatedCart };
      saveStateToLocalStorage(newState);
      return newState;
    }

    case RemoveFromCart: {
      const updatedCart = state.cart.filter((item) => item.id !== undefined && item.id !== action.payload.id);

      const newState = { ...state, cart: updatedCart };
      saveStateToLocalStorage(newState); // Salva no localStorage

      return newState;
    }

    case AdjustQty: {
      const updatedCart = state.cart.map((item) =>
        item.id !== undefined && item.id === action.payload.id ? { ...item, qty: action.payload.qty } : item,
      );

      const newState = { ...state, cart: updatedCart };
      saveStateToLocalStorage(newState);
      return newState;
    }

    case LoadCurrentItem: {
      return {
        ...state,
        currentItem: action.payload,
      };
    }

    case SetAddress: {
      const newState = { ...state, address: action.payload };
      saveStateToLocalStorage(newState);
      return newState;
    }

    case SetPaymentMethod: {
      const newState = { ...state, paymentMethod: action.payload };
      saveStateToLocalStorage(newState);
      return newState;
    }

    case SetOrder: {
      const newState = { ...state, order: action.payload };
      saveStateToLocalStorage(newState);
      return newState;
    }

    default:
      return state;
  }
}

// eslint-disable-next-line import/no-default-export
export default ProductsReducer;
