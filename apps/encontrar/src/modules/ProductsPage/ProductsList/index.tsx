import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';
import React from 'react';

import { addToCart, loadCurrentItem } from 'actions/products';
import { BestSelledProduct } from 'components/BestSelledProducts/BestSelledProduct';
import { useProductContext } from 'hooks/useProductContext';
import { useAppDispatch, useAppSelector } from 'hooks';
import { FnService } from 'shared/utils/FnService';
import { ProductDTO } from 'types/product';
import { RootState } from 'types/product';
import { Pagination, Select, MenuItem, FormControl, InputLabel, SelectChangeEvent } from '@mui/material';

export const ProductsList = ({ products }: { products?: ProductDTO[] }) => {
  const {
    filteredProducts,
    selectedCategories,
    currentPage,
    itemsPerPage,
    totalPages,
    setCurrentPage,
    setItemsPerPage,
  } = useProductContext();
  const productsList = useAppSelector((state: RootState) => state.products.products);

  const productsToDisplay = products || filteredProducts;
  const paginatedProducts = productsToDisplay.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
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

  if (products) {
    return (
      <div className="productsList">
        <div className="wrapper bestselled">
          {products.map((item, itemIndex) => (
            <BestSelledProduct
              product={item}
              key={itemIndex}
              handleAddToCart={handleAddToCart}
              handlepreviewProduct={handlepreviewProduct}
            />
          ))}
        </div>
      </div>
    );
  }

  if (selectedCategories.length < 1 && productsList.length > 0) {
    const paginatedAllProducts = productsList.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
    const totalAllPages = Math.max(1, Math.ceil(productsList.length / itemsPerPage));
    return (
      <div className="productsList">
        <ProductsPageHeader totalProducts={fnService.formatarQuantidade(productsList.length)} />
        <div className="wrapper bestselled">
          {paginatedAllProducts.map((item, itemIndex) => (
            <BestSelledProduct
              product={item}
              key={itemIndex}
              handleAddToCart={handleAddToCart}
              handlepreviewProduct={handlepreviewProduct}
            />
          ))}
        </div>
        <div className="pagination__container">
          <Pagination count={totalAllPages} page={currentPage} onChange={handlePageChange} color="primary" />
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="productsList">
        <ProductsPageHeader totalProducts={fnService.formatarQuantidade(productsToDisplay.length)} />
        <>
          {paginatedProducts.length <= 0 ? (
            <NotFound />
          ) : (
            <div className="wrapper bestselled">
              {paginatedProducts.map((item, itemIndex) => (
                <BestSelledProduct
                  product={item}
                  key={itemIndex}
                  handleAddToCart={handleAddToCart}
                  handlepreviewProduct={handlepreviewProduct}
                />
              ))}
            </div>
          )}
        </>
        {productsToDisplay.length > 0 && (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 20 }}>
            <div className="pagination__container">
              <Pagination
                count={Math.max(1, Math.ceil(productsToDisplay.length / itemsPerPage))}
                page={currentPage}
                onChange={handlePageChange}
                color="primary"
              />
            </div>
          </div>
        )}
      </div>
    </>
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

const ProductsPageHeader = ({ totalProducts = '0' }) => {
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
