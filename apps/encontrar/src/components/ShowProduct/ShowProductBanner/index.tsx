import React from 'react';

type ShowProductBannerProps = {
  product: { name?: string; banner?: string };
};

export const ShowProductBanner = (props: ShowProductBannerProps) => {
  const url = 'assets_ecommerce';
  const { name, banner } = props.product;

  return (
    <div className="item-picture">
      <img src={`${url}/products/${banner ?? 'macbook.png'}`} alt={name} />
    </div>
  );
};
