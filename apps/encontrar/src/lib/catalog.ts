import { ApiService } from 'services/apiService';
import { buildQueryString } from 'utils/buildQueryString';

import { StorageService } from './storage';

export class CatalogService {
  catalog = new StorageService();

  async fetchProducts(queryString: string) {
    // const response = await ApiService.get(`/products?${queryString}`);
    const response = await ApiService.get(`/products`);

    return response.data;
  }

  async getProducts(params: URLSearchParams) {
    const queryString = buildQueryString(params);
    return await this.fetchProducts(queryString);
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

  async fetchCategories(queryString: string) {
    const response = await ApiService.get(`/categories?${queryString}`);
    return response.data;
  }

  async getCategories(params: URLSearchParams) {
    const queryString = buildQueryString(params);
    return await this.fetchCategories(queryString);
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
}
