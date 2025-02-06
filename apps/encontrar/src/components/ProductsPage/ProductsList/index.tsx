import { useRouter } from 'next/router';
import React from 'react';

import { loadCurrentItem } from 'actions/products';
import { ProductDTO } from 'types/product';

import { useAppDispatch } from '../../../hooks';

import { BestSelledProduct } from './../../BestSelledProducts/BestSelledProduct';

export const ProductsList = ({ products }: { products: Array<ProductDTO> }) => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handlepreviewProduct = (id: number) => {
    dispatch(loadCurrentItem(products[id - 1]));
    // router.push('/preview-product').catch((err) => console.error('Erro ao redirecionar:', err));
    void router.push('/preview-product');
  };
  return (
    <div className="productsList">
      <div className="wrapper bestselled">
        {products.map((item, itemIndex) => (
          <BestSelledProduct product={item} key={itemIndex} handlepreviewProduct={handlepreviewProduct} />
        ))}
      </div>
      pagination
    </div>
  );
};
