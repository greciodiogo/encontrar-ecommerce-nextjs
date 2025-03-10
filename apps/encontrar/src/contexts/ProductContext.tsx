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
  const [maxPrice, setMaxPrice] = useState(9999999);
  const [availability, setAvailability] = useState('');
  const [rating, setRating] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(9);

  const categoryMappings: Record<string, Array<string>> = {
    'Bebidas e Alimentação': ['Bebidas', 'Alimentação'],
  };
  const getCategoryCount = (categoryName: string) => {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    const mappedCategories = categoryMappings[categoryName] || [categoryName];

    return products.filter((product) => product.categories.some((cat) => mappedCategories.includes(cat))).length;
  };

  const toggleSelection = (list: Array<string>, setList: (value: Array<string>) => void, item: string) => {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    const mappedCategories = categoryMappings[item] || [item];

    if (mappedCategories.every((cat) => list.includes(cat))) {
      setList(list.filter((cat) => !mappedCategories.includes(cat)));
    } else {
      setList([...new Set([...list, ...mappedCategories])]);
    }
  };

  useEffect(() => {
    let filtered = products;

    filtered = filtered.filter((prod) => prod.price >= minPrice && prod.price <= maxPrice);

    // Expandir categorias antes do filtro
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    const expandedCategories = selectedCategories.flatMap((category) => categoryMappings[category] || category);

    // Verifica se a categoria selecionada é "promotions"
    if (expandedCategories.includes('Promoções')) {
      filtered = filtered.filter((prod) => prod.is_promotion && prod.promotional_price > 0);
    } else if (expandedCategories.length > 0) {
      filtered = filtered.filter((prod) => expandedCategories.some((cat) => prod.categories.includes(cat)));
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        toggleSelection,
        getCategoryCount,
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
