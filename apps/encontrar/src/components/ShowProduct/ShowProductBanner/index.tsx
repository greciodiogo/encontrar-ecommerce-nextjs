import React from 'react';

type ShowProductBannerProps = {
  product: { name?: string; picture?: string };
};

export const ShowProductBanner = (props: ShowProductBannerProps) => {
  const url = 'assets_ecommerce';
  const { name, picture } = props.product;

  return (
    <div className="item-picture">
      <img src={`${url}/products/${picture}`} alt={name} />
    </div>
  );
};
