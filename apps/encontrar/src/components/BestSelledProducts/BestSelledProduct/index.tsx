// import useTranslation from 'next-translate/useTranslation';
import React from 'react';

import { ProductTypeProps } from 'types/product';

export const BestSelledProduct = ({
  product,
  handleAddToCart,
  handlepreviewProduct,
  hasButtons = true,
}: ProductTypeProps) => {
  // const { t } = useTranslation('common'); // Certifique-se de que o namespace está correto

  const { id, image, name, price, about } = product;
  const url = 'assets_ecommerce';

  const handleAddToCartClick = (event: React.MouseEvent<HTMLAnchorElement>, id = 0) => {
    event.preventDefault();
    event.stopPropagation();
    handleAddToCart?.(id);
  };

  return (
    <button className="bestselled_product category-item" onClick={() => handlepreviewProduct(id ?? 0)}>
      <a className="addCartBtn">
        <i>
          <img src={`${url}/svg/Heart.png`} alt="Heart" />
        </i>
      </a>
      <div className="category_picture bestselled">
        <img src={`${url}/products/${image ?? 'macbook.png'}`} alt={name} />
      </div>
      <div className="content">
        <a className="product_name product-description">{name}</a>
        <div className="star_container">
          {[1, 2, 3, 4].map((__, index) => (
            <i key={index}>
              <img src={`${url}/svg/star.png`} alt="star" />
            </i>
          ))}
        </div>
        <p>{price}Kz</p>
        {hasButtons && <span>{about}</span>}
      </div>
      {hasButtons && (
        <a
          className="btn"
          href="#"
          role="button"
          tabIndex={0}
          onClick={(event) => handleAddToCartClick(event, id ?? 0)}
        >
          <i>
            <img src="/assets_ecommerce/svg/cart-2.png" alt="" />
          </i>
          Adicionar ao Carrinho
        </a>
      )}
    </button>
  );
};
