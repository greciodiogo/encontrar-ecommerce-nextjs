import { Dispatch, SetStateAction } from 'react';

import { ProductDTO } from './product';

export type AuthContextType = {
  isClient: boolean;
  isAuthenticated: boolean;
  selectedPrice: string;
  setSelectedPrice: React.Dispatch<React.SetStateAction<string>>;
  user: DecodedPayload | null;
  loginGoogle: (idToken: string) => void;
  // login: (data: { username: string; password: string }) => Promise<boolean>;
  logout: () => void;
};

export type DecodedPayload = {
  name: string;
  email: string;
  picture: string;
  exp?: number;
  iat?: number;
  [key: string]: string | number | boolean | undefined;
};

export type ProductContextType = {
  filteredProducts: Array<ProductDTO>;
  selectedCategories: Array<string>;
  minPrice: number;
  maxPrice: number;
  availability: string;
  rating: number;
  currentPage: number;
  itemsPerPage: number;
  totalPages: number;
  setSelectedCategories: Dispatch<SetStateAction<Array<string>>>;
  setMinPrice: (price: number) => void;
  setMaxPrice: (price: number) => void;
  setAvailability: (status: string) => void;
  setRating: (rating: number) => void;
  setCurrentPage: (page: number) => void;
  setItemsPerPage: (count: number) => void;
};
