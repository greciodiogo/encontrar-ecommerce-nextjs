import { Dispatch } from 'redux';

import {
  AddToCart,
  AdjustQty,
  LoadCurrentItem,
  RemoveFromCart,
  SetAddress,
  SetOrder,
  ClearCart,
  SetPaymentMethod,
} from 'constants/products';
import { CatalogService } from 'lib/catalog';
import { CheckoutDTO } from 'types/checkout';
import { Address, CategoriesDTO, OrderType, PaymentMethodList, ProductDTO } from 'types/product';
import { SetAddressAction, SetOrderAction, SetPaymentMethodAction } from 'types/store';

import { GetAllProducts, GetAllCategories, GetAllPaymentMethods, GetAllAddresses } from './../constants/products';

type CartAction = {
  type: string;
  payload?: unknown;
};
const catalog = new CatalogService();

export const fetchAllProducts =
  (filters: Record<string, any> = {}) =>
  async (dispatch: Dispatch<CartAction>) => {
    try {
      const params = new URLSearchParams();
      // Add all filters to params
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          params.set(key, String(value));
        }
      });

      const productsResponse = (await catalog.getProductsPaginated(params)) as any;
      const paginated = productsResponse.data; // Axios wraps the real data here
      const products_ = paginated.data || [];
      const total_ = paginated.total || products_.length;
      const page_ = paginated.page;
      const limit_ = paginated.limit;
      const totalPages_ = paginated.totalPages;

      dispatch({
        type: GetAllProducts,
        payload: { products: products_, total: total_, page: page_, limit: limit_, totalPages: totalPages_ },
      });
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
    console.error("Can't fetch all categories to Cart", error);
  }
};

export const getPaymentMethods = () => async (dispatch: Dispatch<CartAction>) => {
  try {
    const params = new URLSearchParams({
      // page: String(0),
      // perPage: String(6),
    });

    const paymentMethodsResponse = await catalog.getPaymentMethods(params);
    const paymentMethods_ = paymentMethodsResponse as Array<PaymentMethodList>;
    dispatch({ type: GetAllPaymentMethods, payload: { paymentMethodsList: paymentMethods_ } });
  } catch (error) {
    console.error("Can't fetch all payment methods", error);
  }
};

export const getAddresses = () => async (dispatch: Dispatch<CartAction>) => {
  try {
    const params = new URLSearchParams();
    const addressesResponse = await catalog.getAddress(params);
    const addresses = addressesResponse as Array<Address>;
    dispatch({ type: GetAllAddresses, payload: { addresses } });
  } catch (error) {
    console.error("Can't fetch all addresses", error);
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

export const setPaymentMethod = (method: number) => (dispatch: Dispatch<SetPaymentMethodAction>) => {
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

export const clearCart = () => (dispatch: Dispatch<CartAction>) => {
  try {
    dispatch({ type: ClearCart });
  } catch (error) {
    console.error("Can't Clear Cart", error);
  }
};

export const fetchProductRatings = (productId: number) => async (dispatch: Dispatch<CartAction>) => {
  try {
    const ratings = await catalog.getProductRatings(productId);
    dispatch({ type: 'SET_PRODUCT_RATINGS', payload: { productId, ratings } });
  } catch (error) {
    console.error("Can't fetch product ratings", error);
  }
};

export const postProductRating =
  (productId: number, data: { rating: number; comment: string }) => async (dispatch: Dispatch<CartAction>) => {
    try {
      await catalog.postProductRating(productId, data);
      dispatch(fetchProductRatings(productId));
    } catch (error) {
      console.error("Can't post product rating", error);
    }
  };
