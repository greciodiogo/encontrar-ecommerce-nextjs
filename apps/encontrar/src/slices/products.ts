import { AddToCart, AdjustQty, GetAllProducts, LoadCurrentItem, RemoveFromCart } from 'constants/products';
import { products } from 'fixture/ecommerceData';
import { ProductDTO, ProductState } from 'types/product';

// Definição do tipo de ação
type Action<T> = {
  type: string;
  payload?: T;
};

// Funções de persistência no localStorage
const saveCartToLocalStorage = (cart: any) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('cart', JSON.stringify(cart));
  }
};

export const loadCartFromLocalStorage = (): any => {
  if (typeof window === 'undefined') {
    return []; // Retorna um estado vazio no lado do servidor
  }

  const savedCart = localStorage.getItem('cart');
  return savedCart ? JSON.parse(savedCart) : [];
};

// Inicializa o estado do carrinho com os dados do localStorage
// export const initializeCart = (): any => {
//   return loadCartFromLocalStorage();
//   cart: typeof window !== 'undefined' ? loadCartFromLocalStorage() : [],
// };

const INITIALSTATE: ProductState = {
  products: products,
  cart: typeof window !== 'undefined' ? loadCartFromLocalStorage() : [],
  currentItem: {},
};

type GetAllProductsAction = {
  type: typeof GetAllProducts;
} & Action<{ products: Array<ProductDTO> }>;

export type AddToCartAction = {
  type: typeof AddToCart;
  payload: {
    id: number;
    qty: number;
  };
};

export type RemoveFromCart = {
  type: typeof RemoveFromCart;
  payload: {
    id: number;
  };
};

export type AdjustQty = {
  type: typeof AdjustQty;
  payload: {
    id: number;
    qty: number;
  };
};

export type LoadCurrentItem = {
  type: typeof LoadCurrentItem;
  payload: ProductDTO;
};

type ProductAction = GetAllProductsAction | AddToCartAction | RemoveFromCart | AdjustQty | LoadCurrentItem;

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

      saveCartToLocalStorage(updatedCart); // Salva no localStorage

      return {
        ...state,
        cart: updatedCart,
      };
    }

    case RemoveFromCart: {
      const updatedCart = state.cart.filter((item) => item.id !== undefined && item.id !== action.payload.id);

      saveCartToLocalStorage(updatedCart); // Salva no localStorage

      return {
        ...state,
        cart: updatedCart,
      };
    }

    case AdjustQty: {
      const updatedCart = state.cart.map((item) =>
        item.id !== undefined && item.id === action.payload.id ? { ...item, qty: action.payload.qty } : item,
      );

      saveCartToLocalStorage(updatedCart); // Salva no localStorage

      return {
        ...state,
        cart: updatedCart,
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

// eslint-disable-next-line import/no-default-export
export default ProductsReducer;
