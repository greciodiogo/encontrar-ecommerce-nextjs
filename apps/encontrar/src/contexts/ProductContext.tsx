import { new_categories } from 'fixture/ecommerceData';
import { useRouter } from 'next/router';
import { createContext, useState, useEffect, ReactNode } from 'react';
import { ProductContextType } from 'types/context';
import { CategoriesDTO, ProductDTO } from 'types/product';

export const ProductContext = createContext<ProductContextType | undefined>(undefined);

const BASE_URL = process.env.NEXT_PUBLIC_API_PATH;
export function ProductProvider({ children }: { children: ReactNode }) {
  const [filteredProducts, setFilteredProducts] = useState<Array<ProductDTO>>([]);
  const [selectedCategories, setSelectedCategories] = useState<Array<CategoriesDTO>>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(9999999);
  const [availability, setAvailability] = useState('');
  const [rating, setRating] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [userInteracted, setUserInteracted] = useState(false);

  const router = useRouter();

  const updateQueryParams = async (categories: Array<CategoriesDTO>) => {
    try {
      const query = categories.length ? { categories: categories.map((cat) => cat.name).join(',') } : {};
      await router.push({ pathname: '/products', query }, undefined, { shallow: true });
    } catch (err) {
      console.error('Erro ao atualizar a URL:', err);
    }
  };

  const fetchProductsByCategories = async (categories: Array<CategoriesDTO>) => {
    try {
      const allProducts = await Promise.all(
        categories.map(async (category) => {
          const res = await fetch(`${BASE_URL}/categories/${category.id}/products`);
          const data = await res.json();
          return data;
        }),
      );

      const merged = allProducts.flat();
      const unique = Array.from(new Map(merged.map((p) => [p.id, p])).values());

      const totalPages_ = Math.ceil(unique.length / itemsPerPage);
      setTotalPages(totalPages_);
      return unique;
    } catch (err) {
      console.error('Erro ao buscar produtos:', err);
      return [];
    }
  };

  useEffect(() => {
    if (userInteracted) {
      void updateQueryParams(selectedCategories);
    }
  }, [selectedCategories, userInteracted]);

  useEffect(() => {
    const loadProducts = async () => {
      if (selectedCategories.length === 0) {
        setFilteredProducts([]);
        return;
      }

      const products = await fetchProductsByCategories(selectedCategories);
      let filtered = products.filter((prod) => prod.price >= (minPrice || 0) && prod.price <= (maxPrice || 9999999));

      if (availability) {
        filtered = filtered.filter((prod) => prod.availability === availability);
      }

      if (rating > 0) {
        filtered = filtered.filter((prod) => prod.rating >= rating);
      }

      setFilteredProducts(filtered);
      setCurrentPage(1);
    };

    void loadProducts();
  }, [selectedCategories, minPrice, maxPrice, availability, rating]);

  const toggleSelection = (
    list: Array<CategoriesDTO>,
    setList: (value: Array<CategoriesDTO>) => void,
    item: CategoriesDTO,
  ) => {
    setUserInteracted(true);
    const alreadySelected = list.some((cat) => cat.id === item.id);

    if (alreadySelected) {
      setList(list.filter((cat) => cat.id !== item.id));
    } else {
      setList([item]);
    }
  };

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
        updateQueryParams,
        toggleSelection,
        getCategoryCount: () => 0, // opcional, já que isso dependeria de outro endpoint
        setSelectedCategories,
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
