import { Pagination } from '@mui/material';
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

export const ProductsList = () => {
  const { filteredProducts, currentPage, itemsPerPage, totalPages, setCurrentPage, selectedCategories } =
    useProductContext();
  const productsList = useAppSelector((state: RootState) => state.products.products);

  const displayedProducts = filteredProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
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

  if (selectedCategories.length < 1 && productsList.length > 0) {
    return (
      <div className="productsList">
        <ProductsPageHeader totalProducts={fnService.formatarQuantidade(productsList.length)} />
        <div className="wrapper bestselled">
          {productsList.map((item, itemIndex) => (
            <BestSelledProduct
              product={item}
              key={itemIndex}
              handleAddToCart={handleAddToCart}
              handlepreviewProduct={handlepreviewProduct}
            />
          ))}
        </div>
        <ProductsPagination totalPages={totalPages} currentPage={currentPage} setCurrentPage={setCurrentPage} />
      </div>
    );
  }

  return (
    <>
      <div className="productsList">
        <ProductsPageHeader totalProducts={fnService.formatarQuantidade(displayedProducts.length)} />
        <>
          {displayedProducts.length <= 0 ? (
            <NotFound />
          ) : (
            <div className="wrapper bestselled">
              {displayedProducts.map((item, itemIndex) => (
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
        {displayedProducts.length > 0 && (
          <ProductsPagination totalPages={totalPages} currentPage={currentPage} setCurrentPage={setCurrentPage} />
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
        {t('totalProducts')} {totalProducts}
      </h5>
      <h5>{t('mostRecommended')}</h5>
    </div>
  );
};

const ProductsPagination = ({
  totalPages = 0,
  currentPage = 0,
  setCurrentPage,
}: {
  setCurrentPage(page: number): void;
  totalPages: number;
  currentPage: number;
}) => {
  return (
    <div className="pagination__container">
      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={(event, page) => setCurrentPage(page)}
        color="primary"
      />
    </div>
  );
};
