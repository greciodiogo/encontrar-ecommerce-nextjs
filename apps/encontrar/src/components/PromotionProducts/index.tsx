/* eslint-disable @typescript-eslint/no-unnecessary-condition */
import EastIcon from '@mui/icons-material/East';
import { useRouter } from 'next/router';
// import useTranslation from 'next-translate/useTranslation';
import useTranslation from 'next-translate/useTranslation';
import React from 'react';

import { addToCart, loadCurrentItem } from 'actions/products';
import { BestSelledProduct } from 'components/BestSelledProducts/BestSelledProduct';
import { useProductContext } from 'hooks/useProductContext';
import { ProductDTO } from 'types/product';

import { useAppDispatch } from '../../hooks';

export const PromotionProducts = ({
  products,
  hasButtons = true,
}: {
  bannerText?: string;
  hasButtons?: boolean;
  products: Array<ProductDTO>;
}) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation('home'); // Certifique-se de que o namespace está correto
  const { selectedCategories, setSelectedCategories, toggleSelection } = useProductContext();

  const router = useRouter();

  const handleAddToCart = (id: number) => {
    dispatch(addToCart(id));
    //
  };

  const goToCategories = (categorySlug: string) => {
    setSelectedCategories([]);
    toggleSelection(selectedCategories, setSelectedCategories, categorySlug);
    // void router.push(`/products`);
  };

  const handlepreviewProduct = (productDTO: ProductDTO) => {
    dispatch(loadCurrentItem(productDTO));
    // router.push('/preview-product').catch((err) => console.error('Erro ao redirecionar:', err));
    void router.push('/preview-product');
  };

  return (
    <div className="promotion_products products">
      <div className="products_container">
        <div className="promotion_product_top">
          <div className="promotion_product_content">
            <h2>Promoções</h2>
            <p>Aproveita +10% desconto em talão nas tuas categorias favoritas!</p>
          </div>
          <button className="more_categories" onClick={() => goToCategories('Promoções')}>
            {t('products.search_products')}

            <i>
              <EastIcon fontSize="small" fill="#BD7B2D" />
            </i>
          </button>
        </div>
        {products && products.length > 0 ? (
          <ul className="wrapper">
            {products
              .map((product, itemIndex) => (
                <BestSelledProduct
                  product={product}
                  hasStars={false}
                  hasButtons={hasButtons}
                  handleAddToCart={handleAddToCart}
                  handlepreviewProduct={handlepreviewProduct}
                  key={itemIndex}
                />
              ))
              .slice(0, 10)}
          </ul>
        ) : (
          <p>Carregando produtos...</p> // ou um spinner de loading
        )}
      </div>
    </div>
  );
};
