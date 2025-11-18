import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';
import React, { useEffect, useState } from 'react';

import { addToCart, loadCurrentItem, fetchAllCategories } from 'actions/products';
import { BestSelledProduct } from 'components/BestSelledProducts/BestSelledProduct';
import { useProductContext } from 'hooks/useProductContext';
import { useAppDispatch, useAppSelector } from 'hooks';
import { ProductDTO, CategoriesDTO, PaginatedProducts } from 'types/product';
import { RootState } from 'types/product';
import { Pagination, Box, Typography, Divider } from '@mui/material';
import { sortCategoriesWithDrinkFoodsLast } from 'utils/categorySort';

export const ProductsList = () => {
  const { itemsPerPage, selectedCategories } = useProductContext();
  const categories = useAppSelector((state: RootState) => state.products.categories);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  const handleAddToCart = (id: number, product?: ProductDTO) => {
    dispatch(addToCart(id, 1, product));
  };

  const handlepreviewProduct = (productDTO: ProductDTO) => {
    dispatch(loadCurrentItem(productDTO));
    void router.push('/preview-product');
  };

  // Fetch all categories on mount
  useEffect(() => {
    dispatch(fetchAllCategories());
  }, [dispatch]);

  // Wait for categories to load
  useEffect(() => {
    if (categories.length > 0) {
      setIsLoading(false);
    }
  }, [categories]);

  const handleCategoryPageChange = (categoryId: number, page: number) => {
    // This is handled by CategorySection internally
    console.log(`Category ${categoryId} changed to page ${page}`);
  };

  if (isLoading) {
    return (
      <div className="productsList">
        <Box sx={{ p: 4, textAlign: 'center' }}>
          <Typography>Carregando categorias...</Typography>
        </Box>
      </div>
    );
  }

  if (categories.length === 0) {
    return (
      <div className="productsList">
        <NotFound />
      </div>
    );
  }

  // Determine which categories to display
  let categoriesToDisplay: CategoriesDTO[] = [];

  if (selectedCategories.length > 0) {
    // Check if any selected category is a subcategory (has a parent)
    const hasSubcategoriesSelected = selectedCategories.some((c) => {
      const catFromStore = categories.find((cat) => cat.id === c.id);
      return catFromStore && catFromStore.parentCategory && catFromStore.parentCategory.id;
    });

    if (hasSubcategoriesSelected) {
      // If subcategories are selected, show only those subcategories
      categoriesToDisplay = selectedCategories.filter((c) => {
        const catFromStore = categories.find((cat) => cat.id === c.id);
        return catFromStore && catFromStore.parentCategory && catFromStore.parentCategory.id;
      });
    } else {
      // If only top-level categories are selected, show their subcategories
      const selectedCategory = selectedCategories[0];
      const categoryFromStore = categories.find((c) => c.id === selectedCategory.id);

      if (categoryFromStore) {
        // Get direct children from the category object
        const directChildren = categoryFromStore.childCategories || [];

        // Also find children by checking parentCategory relationship
        const linkedChildren = categories.filter(
          (c) => c.parentCategory && c.parentCategory.id === categoryFromStore.id,
        );

        // Combine both sources and remove duplicates
        const allChildren = [...directChildren, ...linkedChildren];
        const uniqueChildren = Array.from(new Map(allChildren.map((c) => [c.id, c])).values());

        if (uniqueChildren.length > 0) {
          // Show subcategories
          categoriesToDisplay = uniqueChildren;
        } else {
          // No subcategories, show the selected category itself
          categoriesToDisplay = [categoryFromStore];
        }
      }
    }
  } else {
    // No category selected, show top-level categories (categories without parent)
    categoriesToDisplay = categories.filter((c) => !c.parentCategory || !c.parentCategory.id);
  }

  const sortedCategories = sortCategoriesWithDrinkFoodsLast(categoriesToDisplay);

  return (
    <div className="productsList">
      {selectedCategories.length > 0 && categoriesToDisplay.length > 1 && (
        <Box sx={{ mb: 3, p: 2, bgcolor: '#f5f5f5', borderRadius: 1 }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            {selectedCategories[0].name}
          </Typography>
          <Typography color="text.secondary" sx={{ fontSize: '0.875rem' }}>
            Exibindo subcategorias
          </Typography>
        </Box>
      )}
      {sortedCategories.map((category, index) => (
        <CategorySection
          key={category.id}
          category={category}
          itemsPerPage={itemsPerPage}
          handleAddToCart={handleAddToCart}
          handlepreviewProduct={handlepreviewProduct}
          onPageChange={handleCategoryPageChange}
          isLast={index === sortedCategories.length - 1}
        />
      ))}
    </div>
  );
};

type CategorySectionProps = {
  category: CategoriesDTO;
  itemsPerPage: number;
  handleAddToCart: (id: number, product?: ProductDTO) => void;
  handlepreviewProduct: (product: ProductDTO) => void;
  onPageChange: (categoryId: number, page: number) => void;
  isLast: boolean;
};

const CategorySection = ({
  category,
  itemsPerPage,
  handleAddToCart,
  handlepreviewProduct,
  onPageChange,
  isLast,
}: CategorySectionProps) => {
  const { t } = useTranslation('common');
  const dispatch = useAppDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [productsData, setProductsData] = useState<PaginatedProducts | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        // Fetch products for this category
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_PATH}/categories/${category.id}/products/paginated?page=${currentPage}&limit=${itemsPerPage}`,
        );
        const data = await response.json();
        setProductsData(data);
      } catch (error) {
        console.error(`Error fetching products for category ${category.name}:`, error);
        setProductsData(null);
      } finally {
        setIsLoading(false);
      }
    };

    void fetchProducts();
  }, [category.id, currentPage, itemsPerPage, category.name]);

  const handlePageChange = (_event: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
    onPageChange(category.id, page);
  };

  const products = productsData?.data || [];
  const totalPages = productsData?.totalPages || 1;
  const totalProducts = productsData?.total || 0;

  if (isLoading) {
    return (
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" sx={{ mb: 2, ml: 2, fontWeight: 'bold' }}>
          {category.name}
        </Typography>
        <Box sx={{ p: 2, textAlign: 'center' }}>
          <Typography>Carregando produtos...</Typography>
        </Box>
        {!isLast && <Divider sx={{ mt: 4 }} />}
      </Box>
    );
  }

  if (products.length === 0) {
    return (
      <></>
      // <Box sx={{ mb: 4 }}>
      //   <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold' }}>
      //     {category.name}
      //   </Typography>
      //   <Box sx={{ p: 2, textAlign: 'center' }}>
      //     <Typography color="text.secondary">Nenhum produto disponível nesta categoria</Typography>
      //   </Box>
      //   {!isLast && <Divider sx={{ mt: 4 }} />}
      // </Box>
    );
  }

  return (
    <Box sx={{ mb: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h5" sx={{ ml: 3, fontWeight: 'bold' }}>
          {category.name}
        </Typography>
        <Typography color="text.secondary">
          {totalProducts} {totalProducts === 1 ? 'produto' : 'produtos'}
        </Typography>
      </Box>

      <div className="wrapper bestselled">
        {products.map((item, itemIndex) => (
          <BestSelledProduct
            product={item}
            key={`${category.id}-${item.id}-${itemIndex}`}
            handleAddToCart={handleAddToCart}
            handlepreviewProduct={handlepreviewProduct}
          />
        ))}
      </div>

      {totalPages > 1 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
          <Pagination count={totalPages} page={currentPage} onChange={handlePageChange} color="primary" />
        </Box>
      )}

      {!isLast && <Divider sx={{ mt: 4 }} />}
    </Box>
  );
};

const NotFound = () => {
  const { t } = useTranslation('common');
  return (
    <div className="notFound">
      <h3>{t('noProducts')}</h3>
      <p>{t('noResults')}</p>
    </div>
  );
};
