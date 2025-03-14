import { Pagination } from '@mui/material';
import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';
import React from 'react';

import { addToCart, loadCurrentItem } from 'actions/products';
import { BestSelledProduct } from 'components/BestSelledProducts/BestSelledProduct';
import { useProductContext } from 'hooks/useProductContext';
import { FnService } from 'shared/utils/FnService';
import { ProductDTO } from 'types/product';

import { useAppDispatch } from '../../../hooks';

export const ProductsList = () => {
  const { t } = useTranslation('common');
  const { filteredProducts, currentPage, itemsPerPage, totalPages, setCurrentPage } = useProductContext();
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

  return (
    <>
      <div className="productsList">
        <div className="productsPage__top">
          <h5>
            {t('totalProducts')} ({fnService.formatarQuantidade(filteredProducts.length)})
          </h5>
          <h5>{t('mostRecommended')}</h5>
        </div>
        <>
          {displayedProducts.length < 1 ? (
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
        {displayedProducts.length > 1 && (
          <div className="pagination__container">
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={(event, page) => setCurrentPage(page)}
              color="primary"
            />
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
