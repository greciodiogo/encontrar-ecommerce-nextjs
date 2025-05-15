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
// import { products } from 'fixture/ecommerceData';
import { ProductState } from 'types/product';
import { ProductAction } from 'types/store';

const STORAGE_KEY = 'ecommerceState';
const STORAGE_VERSION_KEY = 'ecommerceStateVersion';
const STORAGE_VERSION = 'v2';

const defaultState: ProductState = {
  products: [],
  categories: [],
  cart: [],
  currentItem: {},
  address: null,
  paymentMethod: null,
  order: null,
};

const saveStateToLocalStorage = (state: ProductState) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    localStorage.setItem(STORAGE_VERSION_KEY, STORAGE_VERSION);
  }
};

// Função para carregar o estado do localStorage
const loadStateFromLocalStorage = (): ProductState => {
  if (typeof window === 'undefined') return defaultState;

  const savedVersion = localStorage.getItem(STORAGE_VERSION_KEY);
  if (savedVersion !== STORAGE_VERSION) {
    localStorage.clear();
    localStorage.setItem(STORAGE_VERSION_KEY, STORAGE_VERSION);
    return defaultState;
  }

  const savedState = localStorage.getItem(STORAGE_KEY);
  return savedState ? JSON.parse(savedState) : defaultState;
};

const INITIALSTATE: ProductState = loadStateFromLocalStorage();

function ProductsReducer(state: ProductState = INITIALSTATE, action: ProductAction): ProductState {
  switch (action.type) {
    case GetAllProducts: {
      const productsFromServer = action.payload?.products ?? [];

      // Verifica se há itens no carrinho que não existem mais no servidor
      const filteredCart = state.cart.filter((cartItem) => productsFromServer.some((prod) => prod.id === cartItem.id));

      const newState = {
        ...state,
        products: productsFromServer,
        cart: filteredCart, // limpa os itens inválidos
      };

      saveStateToLocalStorage(newState);
      return newState;
    }

    case GetAllCategories: {
      const newState = {
        ...state,

        categories: action.payload?.categories ?? [],
      };

      saveStateToLocalStorage(newState);
      return newState;
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
        : [...state.cart, { ...item, qty: action.payload.qty }];

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
      const newState = { ...state, currentItem: action.payload };
      saveStateToLocalStorage(newState);
      return newState;
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

    case ClearCart: {
      const newState = { ...state, cart: [] };
      saveStateToLocalStorage(newState);
      return newState;
    }

    default:
      return state;
  }
}

// eslint-disable-next-line import/no-default-export
export default ProductsReducer;
