import { ApiService } from 'services/apiService';
import { buildQueryString } from 'utils/buildQueryString';
import { FeedbackDto } from 'types/feedback';

import { StorageService } from './storage';

export class CatalogService {
  catalog = new StorageService();

  async fetchProducts(queryString: string) {
    // const response = await ApiService.get(`/products?${queryString}`);
    const response = await ApiService.get(`/products?withVisible=true`);

    return response.data;
  }

  async getProducts(params: URLSearchParams) {
    const queryString = buildQueryString(params);
    return await this.fetchProducts(queryString);
  }

  async fetchProductsPaginated(queryString: string) {
    const response = await ApiService.get(`/products/paginated?${queryString}`);
    return response;
  }

  async getProductsPaginated(params: URLSearchParams) {
    const queryString = buildQueryString(params);
    return await this.fetchProductsPaginated(queryString);
  }

  async fetchOtherProducts(queryString: string) {
    const response = await ApiService.get(`/products/list/others?limit=10?${queryString}`);
    return response.data;
  }

  async getOtherProducts(params: URLSearchParams) {
    const queryString = buildQueryString(params);
    return await this.fetchOtherProducts(queryString);
  }

  async fetchExpensiveProducts(queryString: string) {
    const response = await ApiService.get(`/products/list/expensive?limit=10?${queryString}`);
    return response.data;
  }

  async getExpensiveProducts(params: URLSearchParams) {
    const queryString = buildQueryString(params);
    return await this.fetchExpensiveProducts(queryString);
  }

  async fetchFaqs(queryString: string) {
    const response = await ApiService.get(`/faqs?${queryString}`);
    return response.data;
  }

  async getFaqs(params: URLSearchParams) {
    const queryString = buildQueryString(params);
    return await this.fetchFaqs(queryString);
  }

  async fetchAddress(queryString: string) {
    const response = await ApiService.get(`/address?${queryString}`);
    return response.data;
  }

  async getAddress(params: URLSearchParams) {
    const queryString = buildQueryString(params);
    return await this.fetchAddress(queryString);
  }

  async fetchCategories(queryString: string) {
    const response = await ApiService.get(`/categories?${queryString}`);
    return response.data;
  }

  async getCategories(params: URLSearchParams) {
    const queryString = buildQueryString(params);
    return await this.fetchCategories(queryString);
  }

  async fetchOrderHistory(queryString: string) {
    const response = await ApiService.get(`/orders/by-email?${queryString}`);
    return response.data;
  }

  async getOrderHistory(params: URLSearchParams) {
    const queryString = buildQueryString(params);
    return await this.fetchCategories(queryString);
  }
  async fetchPaymentMethods(queryString: string) {
    const response = await ApiService.get(`/payment-methods`);
    return response.data;
  }

  async getPaymentMethods(params: URLSearchParams) {
    const queryString = buildQueryString(params);
    return await this.fetchPaymentMethods(queryString);
  }

  async fetchOrders(queryString: string) {
    const response = await ApiService.get(`/orders?${queryString}`);
    return response.data;
  }

  async getOrders(params: URLSearchParams) {
    const queryString = buildQueryString(params);
    return await this.fetchOrders(queryString);
  }

  async placeOrder(order: any): Promise<any> {
    const data = await ApiService.post('/orders', order);
    return data;
    // return token;
  }

  async placeFeedback(feedback: FeedbackDto): Promise<any> {
    const data = await ApiService.post('/feedback', feedback);
    return data;
    // return token;
  }

  async getProductRatings(productId: number) {
    const response = await ApiService.get(`/products/${productId}/ratings`);
    return response.data;
  }

  async postProductRating(productId: number, data: { rating: number; comment: string }) {
    const response = await ApiService.post(`/products/${productId}/ratings`, data);
    return response.data;
  }

  async fetchCategoryProductsPaginated(categoryId: number, queryString: string | URLSearchParams) {
    const qs = typeof queryString === 'string' ? queryString : queryString.toString();
    const response = await ApiService.get(`/categories/${categoryId}/products/paginated?${qs}`);
    return response;
  }

  async fetchAllCategoriesWithProducts(params: URLSearchParams) {
    const queryString = buildQueryString(params);
    const response = await ApiService.get(`/categories/with-products?${queryString}`);
    return response;
  }
}
