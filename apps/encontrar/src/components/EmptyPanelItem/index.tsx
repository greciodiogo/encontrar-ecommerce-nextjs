import React from 'react';

export const EmptyPanelItem = ({
  title = 'histórico',
  handleClick,
}: {
  title: string;
  handleClick: React.MouseEventHandler<HTMLButtonElement>;
}) => {
  return (
    <div className="emptyPanelItem">
      <h2>
        <span>{title}</span>
      </h2>
      <span>Clique abaixo para realizar uma compra</span>
      <button onClick={handleClick}>
        Fazer uma Compra
        <i>
          <img src={`/assets_ecommerce/svg/ArrowRight.png`} alt="ArrowRight" />
        </i>
      </button>
    </div>
  );
};
