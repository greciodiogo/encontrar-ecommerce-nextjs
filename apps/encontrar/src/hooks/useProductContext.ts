import { useContext } from 'react';

import { ProductContext } from 'contexts/ProductContext';
import { ProductContextType } from 'types/context';

export const useProductContext = (): ProductContextType => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProductContext must be used within an AuthProvider');
  }
  return context;
};
