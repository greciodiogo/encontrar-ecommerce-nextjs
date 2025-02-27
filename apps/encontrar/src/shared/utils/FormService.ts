import { ApiService } from 'services/apiService';
import { buildQueryString } from 'utils/buildQueryString';

export class FormService {
  private route = 'form';
  async fetchData(url: string, params: URLSearchParams) {
    const queryString = buildQueryString(params);
    const response = await ApiService.get(`${this.route}/${url}?${queryString}`);
    return response.data;
  }

  async getLojas(params: URLSearchParams) {
    return this.fetchData('getLojas', params);
  }

  async getRoles(params: URLSearchParams) {
    return this.fetchData('getRoles', params);
  }
}
