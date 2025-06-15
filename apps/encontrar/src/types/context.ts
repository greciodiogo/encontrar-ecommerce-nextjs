import { Dispatch, SetStateAction } from 'react';

import { CategoriesDTO, PaymentMethodList, ProductDTO } from './product';

export type AuthContextType = {
  isClient: boolean;
  isAuthenticated: boolean;
  selectedPrice: PaymentMethodList | null;
  setSelectedPrice: React.Dispatch<React.SetStateAction<PaymentMethodList | null>>;
  user: DecodedPayload | null;
  login: (data: { email: string; password: string }) => Promise<boolean>;
  signup: (data: { firstName: string; email: string; password: string }) => Promise<boolean>;
  loginGoogle: (idToken: string) => void;
  // login: (data: { username: string; password: string }) => Promise<boolean>;
  logout: () => void;
};

export type LoggedUserDto = {
  id: number;
  firstName?: string;
  lastName?: string;
  email: string;
  role: string;
  registered?: string;
};

export type DecodedPayload = {
  // Comuns
  id?: number; // para login local
  email: string;
  name?: string; // Google ou nome completo local
  picture?: string; // Google
  role?: string; // login local
  registered?: string; // login local

  // JWT padrão do Google
  exp?: number;
  iat?: number;

  [key: string]: string | number | boolean | undefined;
};

export type ProductContextType = {
  filteredProducts: Array<ProductDTO>;
  selectedCategories: Array<CategoriesDTO>;
  minPrice: number;
  maxPrice: number;
  availability: string;
  rating: number;
  currentPage: number;
  itemsPerPage: number;
  totalPages: number;
  updateQueryParams: (categories: Array<CategoriesDTO>) => void;
  toggleSelection: (
    list: Array<CategoriesDTO>,
    setList: (value: Array<CategoriesDTO>) => void,
    item: CategoriesDTO,
  ) => void;
  setSelectedCategories: Dispatch<SetStateAction<Array<CategoriesDTO>>>;
  getCategoryCount: (categoryName: string) => number;
  setMinPrice: (price: number) => void;
  setMaxPrice: (price: number) => void;
  setAvailability: (status: string) => void;
  setRating: (rating: number) => void;
  setCurrentPage: (page: number) => void;
  setItemsPerPage: (count: number) => void;
};
