import React from 'react';

export const EmptyPanelItem = ({
  title = 'histórico',
  type,
  handleClick,
}: {
  title: string;
  type?: string;
  handleClick: React.MouseEventHandler<HTMLButtonElement>;
}) => {
  return (
    <div className="emptyPanelItem">
      <h2>
        <span>{title}</span>
      </h2>
      {type === 'address' && <span>Clique abaixo para definir o Endereço</span>}
      {type === 'credit-card' && <span>Clique abaixo para Adicionar Cartões</span>}
      {type === 'wish-list' && <span>Clique abaixo para Adicionar Preferências</span>}
      {type === 'order-history' && <span>Clique abaixo para Realizar Compra</span>}
      {type === 'shopping-cart' && <span>Clique abaixo para ver o seu Carrinho</span>}

      <button onClick={handleClick}>
        {type === 'address' && 'Definir Endereço'}
        {type === 'credit-card' && 'Adicionar Cartões'}
        {type === 'wish-list' && 'Adicionar Cartões'}
        {type === 'order-history' && 'Realizar compra'}
        {type === 'shopping-cart' && 'Realizar compra'}
        <i>
          <img src={`/assets_ecommerce/svg/ArrowRight.png`} alt="ArrowRight" />
        </i>
      </button>
    </div>
  );
};
