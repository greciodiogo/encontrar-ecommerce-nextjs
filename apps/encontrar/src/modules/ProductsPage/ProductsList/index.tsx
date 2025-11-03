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

export const ProductsList = () => {
  const { itemsPerPage } = useProductContext();
  const categories = useAppSelector((state: RootState) => state.products.categories);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  const handleAddToCart = (id: number) => {
    dispatch(addToCart(id));
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

  return (
    <div className="productsList">
      {categories.map((category, index) => (
        <CategorySection
          key={category.id}
          category={category}
          itemsPerPage={itemsPerPage}
          handleAddToCart={handleAddToCart}
          handlepreviewProduct={handlepreviewProduct}
          onPageChange={handleCategoryPageChange}
          isLast={index === categories.length - 1}
        />
      ))}
    </div>
  );
};

type CategorySectionProps = {
  category: CategoriesDTO;
  itemsPerPage: number;
  handleAddToCart: (id: number) => void;
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
