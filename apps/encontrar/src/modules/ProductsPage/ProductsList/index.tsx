import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';
import React, { useEffect } from 'react';

import { addToCart, loadCurrentItem } from 'actions/products';
import { BestSelledProduct } from 'components/BestSelledProducts/BestSelledProduct';
import { useProductContext } from 'hooks/useProductContext';
import { useAppDispatch, useAppSelector } from 'hooks';
import { FnService } from 'shared/utils/FnService';
import { ProductDTO } from 'types/product';
import { RootState } from 'types/product';
import { Pagination, Select, MenuItem, FormControl, InputLabel, SelectChangeEvent } from '@mui/material';
import { fetchAllProducts, fetchCategoryProductsPaginated } from 'actions/products';

export const ProductsList = () => {
  const { currentPage, itemsPerPage, setCurrentPage, setItemsPerPage, selectedCategories } = useProductContext();
  const productsPage = useAppSelector((state: RootState) => state.products.productsPage);
  const productsList = productsPage?.data || [];
  const totalProducts = productsPage?.total || 0;
  // Assume total count is available in Redux, fallback to productsList.length
  // const totalProducts = useAppSelector((state: RootState) => state.products.total) || productsList.data.;

  const fnService = new FnService();
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleAddToCart = (id: number) => {
    dispatch(addToCart(id));
  };

  const handlepreviewProduct = (productDTO: ProductDTO) => {
    dispatch(loadCurrentItem(productDTO));
    void router.push('/preview-product');
  };

  const handlePageChange = (_event: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  };

  const handlePageSizeChange = (event: SelectChangeEvent<string>) => {
    setItemsPerPage(Number(event.target.value));
    setCurrentPage(1);
  };

  // Fetch products when page/size or selected category changes
  useEffect(() => {
    if (selectedCategories && selectedCategories.length > 0) {
      const categoryId = selectedCategories[0].id;
      dispatch(fetchCategoryProductsPaginated(categoryId, { page: currentPage, limit: itemsPerPage }));
    } else {
      dispatch(fetchAllProducts({ page: currentPage, limit: itemsPerPage }));
    }
  }, [dispatch, currentPage, itemsPerPage, selectedCategories]);

  const totalPages = productsPage?.totalPages || Math.max(1, Math.ceil(totalProducts / itemsPerPage));

  return (
    <div className="productsList">
      <ProductsPageHeader totalProducts={totalProducts} />
      <div className="wrapper bestselled">
        {productsList.length === 0 ? (
          <NotFound />
        ) : (
          productsList.map((item, itemIndex) => (
            <BestSelledProduct
              product={item}
              key={itemIndex}
              handleAddToCart={handleAddToCart}
              handlepreviewProduct={handlepreviewProduct}
            />
          ))
        )}
      </div>
      <div className="pagination__container">
        <Pagination count={totalPages} page={currentPage} onChange={handlePageChange} color="primary" />
      </div>
    </div>
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

const ProductsPageHeader = ({ totalProducts }: { totalProducts: number }) => {
  const { t } = useTranslation('common');
  return (
    <div className="productsPage__top">
      <h5>
        {t('totalProducts')}
        {/* {totalProducts} */}
      </h5>
      <h5>{t('mostRecommended')}</h5>
    </div>
  );
};
