import { AddToCart, AdjustQty, GetAllProducts, LoadCurrentItem, RemoveFromCart } from 'constants/products';
import { products } from 'fixture/ecommerceData';
import { ProductDTO } from 'types/product';

// Definição do estado inicial
type ProductState = {
  products: Array<ProductDTO>;
  cart: Array<ProductDTO>;
  currentItem: ProductDTO | null;
};

// Definição do tipo de ação
type Action<T> = {
  type: string;
  payload?: T;
};

const INITIALSTATE: ProductState = {
  products: products,
  cart: [],
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

type ProductAction = GetAllProductsAction | AddToCartAction;

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

      return {
        ...state,
        cart: inCart
          ? state.cart.map((cartItem) =>
              cartItem.id === action.payload.id ? { ...cartItem, qty: cartItem.qty + 1 } : cartItem,
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

// eslint-disable-next-line import/no-default-export
export default ProductsReducer;
