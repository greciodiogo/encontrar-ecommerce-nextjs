export class StorageService {
  public currentToken = 'connect.sid';
  public refreshToken = '_refreshToken';

  public setItemLocalStorage<T extends { last_access: string }>(data: T): void {
    localStorage.setItem('screen', '0');
    localStorage.setItem('last_access', data.last_access);
    localStorage.setItem(this.currentToken, JSON.stringify(data));
  }

  get getItemLocalStorage(): Record<string, unknown> | null {
    const item = localStorage.getItem(this.currentToken);
    if (!item) {
      return null; // Retorna null se o item não for encontrado
    }
    try {
      return JSON.parse(item) as Record<string, unknown>; // Declara o tipo esperad
    } catch (error) {
      console.error('Erro ao parsear o item do localStorage:', error);
      return null; // Retorna null se ocorrer um erro ao parsear o JSON
    }
  }

  get last_access(): string | null {
    return localStorage.getItem('last_access');
  }

  public get isLoggedIn(): boolean {
    return !!this.getItemLocalStorage;
  }
}
