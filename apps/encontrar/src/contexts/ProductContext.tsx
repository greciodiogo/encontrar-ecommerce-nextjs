import { createContext, useState, useEffect, ReactNode } from 'react';

import { products } from 'fixture/ecommerceData';
import { ProductContextType } from 'types/context';

// Criando o contexto
export const ProductContext = createContext<ProductContextType | undefined>(undefined);

// Criando o Provider
export function ProductProvider({ children }: { children: ReactNode }) {
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [selectedCategories, setSelectedCategories] = useState<Array<string>>([]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(500000);
  const [availability, setAvailability] = useState('');
  const [rating, setRating] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);

  useEffect(() => {
    let filtered = products;

    // Filtro por múltiplas categorias
    if (selectedCategories.length > 0) {
      filtered = filtered.filter((prod) => selectedCategories.some((cat) => prod.categories.includes(cat)));
    }

    if (availability) {
      filtered = filtered.filter((prod) => prod.availability === availability);
    }

    if (rating > 0) {
      filtered = filtered.filter((prod) => prod.rating >= rating);
    }

    // Ajuste para evitar valores NaN ou undefined nos preços
    const min = minPrice || 0;
    const max = maxPrice || 500000;

    filtered = filtered.filter((prod) => prod.price >= min && prod.price <= max);

    setFilteredProducts(filtered);
    setCurrentPage(1); // Resetar para a primeira página quando os filtros mudarem
  }, [selectedCategories, minPrice, maxPrice, availability, rating]);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  return (
    <ProductContext.Provider
      value={{
        filteredProducts,
        selectedCategories,
        minPrice,
        maxPrice,
        availability,
        rating,
        currentPage,
        itemsPerPage,
        totalPages,
        setSelectedCategories, // Atualizado para múltiplas categorias
        setMinPrice,
        setMaxPrice,
        setAvailability,
        setRating,
        setCurrentPage,
        setItemsPerPage,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}
