/* eslint-disable @typescript-eslint/no-unnecessary-condition */
import EastIcon from '@mui/icons-material/East';
import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';
import React from 'react';

import { addToCart, loadCurrentItem } from 'actions/products';
import { BestSelledProduct } from 'components/BestSelledProducts/BestSelledProduct';
import { ProductDTO } from 'types/product';

import { useAppDispatch } from '../../hooks';

export const CheapestProducts = ({
  bannerText = 'Melhores Negócios em Eletrônicos.',
  products,
  hasDescription = false,
  hasButtons = true,
}: {
  bannerText?: string;
  hasDescription?: boolean;
  hasButtons?: boolean;
  products: Array<ProductDTO>;
}) => {
  const { t } = useTranslation('home'); // Certifique-se de que o namespace está correto
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleAddToCart = (id: number) => {
    dispatch(addToCart(id));
    //
  };

  const handlepreviewProduct = (productDTO: ProductDTO) => {
    dispatch(loadCurrentItem(productDTO));
    // router.push('/preview-product').catch((err) => console.error('Erro ao redirecionar:', err));
    void router.push('/preview-product');
  };

  const handleSeeMoreBtnClick = () => {
    // router.push('/products-').catch((err) => console.error('Erro ao redirecionar:', err));
    void router.push('/products');
  };

  return (
    <div className="products">
      <div className="products_container">
        <div className="products_container_top">
          <h4>{bannerText}</h4>
          <button className="more_categories" onClick={handleSeeMoreBtnClick}>
            {t('products.search_products')}

            <i>
              <EastIcon fontSize="small" fill="#BD7B2D" />
            </i>
          </button>
        </div>
        <div className="wrapper">
          <div className="wrapper_list">
            {products && products.length > 0 ? (
              <ul className="subcategories cheapest">
                {products
                  ?.map((product, itemIndex) => (
                    <BestSelledProduct
                      product={product}
                      hasButtons={hasButtons}
                      hasDescription={hasDescription}
                      handleAddToCart={handleAddToCart}
                      handlepreviewProduct={handlepreviewProduct}
                      key={itemIndex}
                    />
                  ))
                  .slice(0, 8)}
              </ul>
            ) : (
              <p>{t('products.loading_products')}</p> // ou um spinner de loading
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
