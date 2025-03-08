import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';
import React from 'react';

import { Panel } from 'components/ControlPanel';
import { EmptyPanelItem } from 'components/EmptyPanelItem';

export const ShoppingCartPage = () => {
  const router = useRouter();
  const { t } = useTranslation('control-panel'); // 👈 Namespace para traduções

  const handleClick = () => {
    void router.push('/products');
  };

  return (
    <>
      <Panel>
        <Panel.Icon>ShoppingCart</Panel.Icon>
        <Panel.Title>{t('shoppingCart.title')}</Panel.Title>
        <Panel.Description>{t('shoppingCart.description')}</Panel.Description>
      </Panel>
      <div className="shoppingCart">
        <EmptyPanelItem title={t('shoppingCart.emptyMessage')} type="shopping-cart" handleClick={handleClick} />
      </div>
    </>
  );
};
