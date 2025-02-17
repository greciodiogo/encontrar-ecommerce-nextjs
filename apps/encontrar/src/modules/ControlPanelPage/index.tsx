import { useRouter } from 'next/router';
import React from 'react';

import { useAuth } from 'hooks/useAuth';

const panelItems = [
  {
    icon: 'Stack.png',
    routerLink: 'account-config',
    title: 'Configurações da Conta',
    description: 'Edite seu nome, endereço, email e password',
  },
  {
    icon: 'Storefront.png',
    routerLink: 'order-history',
    title: 'Histórico de Pedidos',
    description: 'Consulte o seu histórico de encomentas',
  },
  {
    icon: 'Heart.png',
    routerLink: 'wish-list',
    title: 'Lista de Desejos',
    description: 'Edite seu nome, endereço, email e password',
  },
  {
    icon: 'Icons - Location.png',
    routerLink: 'address',
    title: 'Endereço',
    description: 'Edite seu nome, endereço, email e password',
  },
  {
    icon: 'CreditCard-dark.png',
    routerLink: 'credit-card',
    title: 'Cartões',
    description: 'Edite seu nome, endereço, email e password',
  },
  {
    icon: 'ShoppingCart.png',
    routerLink: 'shopping-cart',
    title: 'Carrinho de Compras',
    description: 'Edite seu nome, endereço, email e password',
  },
];
export const ControlPanelPage = () => {
  const router = useRouter();
  const { user } = useAuth();
  const USERNAME = user?.name ? user.name.split(' ')[0] : 'Guest'; // Exibe "Guest" se o nome não estiver disponível

  const handleClick = (routerLink: string) => {
    void router.push(`/control-panel/${routerLink}`);
  };

  return (
    <div className="controlPanel">
      <h1>Olá {USERNAME}, seja bem vindo ao Encontrar</h1>
      <div className="wrapper">
        {panelItems.map((item, index) => (
          <PanelItem
            icon={item.icon}
            title={item.title}
            description={item.description}
            onClick={() => handleClick(item.routerLink)} // Corrigido aqui
            key={index}
          />
        ))}
      </div>
    </div>
  );
};

export const PanelItem = ({
  icon,
  title,
  description,
  onClick,
}: {
  icon: string;
  title: string;
  description: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}) => (
  <button className="panelItem" onClick={onClick}>
    <i className="fasmapay">
      <img src={`/assets_ecommerce/svg/${icon}`} alt="" />
    </i>
    <h5>{title}</h5>
    <p>{description}</p>
  </button>
);
