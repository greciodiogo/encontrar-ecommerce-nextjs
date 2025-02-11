import React from 'react';

type ShowProductBannerProps = {
  product: { name?: string; image?: string };
};

export const ShowProductBanner = (props: ShowProductBannerProps) => {
  const url = 'assets_ecommerce';
  const { name, image } = props.product;

  return (
    <div className="item-picture">
      <img src={`${url}/products/${image ?? 'macbook.png'}`} alt={name} />
    </div>
  );
};
