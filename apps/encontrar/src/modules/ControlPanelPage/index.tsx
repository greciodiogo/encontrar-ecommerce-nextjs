import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';
import React from 'react';

import { useAuth } from 'hooks/useAuth';

export const ControlPanelPage = () => {
  const router = useRouter();
  const { user } = useAuth();
  const { t } = useTranslation('control-panel'); // Carrega as traduções do namespace controlPanel
  const USERNAME = user?.name ? user.name.split(' ')[0] : 'Guest';

  const handleClick = (routerLink: string) => {
    void router.push(`/control-panel/${routerLink}`);
  };

  const panelItems = [
    {
      icon: 'Stack.png',
      routerLink: 'account-config',
      title: t('accountSettings.title'),
      description: t('accountSettings.description'),
    },
    {
      icon: 'Storefront.png',
      routerLink: 'order-history',
      title: t('orderHistory.title'),
      description: t('orderHistory.description'),
    },
    {
      icon: 'Heart.png',
      routerLink: 'wish-list',
      title: t('wishList.title'),
      description: t('wishList.description'),
    },
    {
      icon: 'Icons - Location.png',
      routerLink: 'address',
      title: t('address.title'),
      description: t('address.description'),
    },
    {
      icon: 'CreditCard-dark.png',
      routerLink: 'credit-card',
      title: t('creditCard.title'),
      description: t('creditCard.description'),
    },
    {
      icon: 'ShoppingCart.png',
      routerLink: 'shopping-cart',
      title: t('shoppingCart.title'),
      description: t('shoppingCart.description'),
    },
  ];

  return (
    <div className="controlPanel">
      <h1>{t('welcome', { name: USERNAME })}</h1>
      <div className="wrapper">
        {panelItems.map((item, index) => (
          <PanelItem
            icon={item.icon}
            title={item.title}
            description={item.description}
            onClick={() => handleClick(item.routerLink)}
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
      <img src={`/assets_ecommerce/svg/${icon}`} alt={title} />
    </i>
    <h5>{title}</h5>
    <p>{description}</p>
  </button>
);
