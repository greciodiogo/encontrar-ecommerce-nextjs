import { Pagination } from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react';

import { addToCart, loadCurrentItem } from 'actions/products';
import { BestSelledProduct } from 'components/BestSelledProducts/BestSelledProduct';
import { useProductContext } from 'hooks/useProductContext';

import { useAppDispatch } from '../../../hooks';

export const ProductsList = () => {
  const { filteredProducts, currentPage, itemsPerPage, totalPages, setCurrentPage } = useProductContext();
  const displayedProducts = filteredProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleAddToCart = (id: number) => {
    dispatch(addToCart(id));
    //
  };

  const handlepreviewProduct = (id: number) => {
    dispatch(loadCurrentItem(displayedProducts[id - 1]));
    void router.push('/preview-product');
  };
  return (
    <div className="productsList">
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
      {displayedProducts.length > 1 && (
        <div className="pagintation__container">
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={(event, page) => setCurrentPage(page)}
            color="primary"
          />
        </div>
      )}
    </div>
  );
};
