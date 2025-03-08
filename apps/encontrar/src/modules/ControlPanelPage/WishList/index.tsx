import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';
import React from 'react';

import { Panel } from 'components/ControlPanel';
import { EmptyPanelItem } from 'components/EmptyPanelItem';

export const WishListPage = () => {
  const router = useRouter();
  const { t } = useTranslation('control-panel');

  const handleClick = () => {
    void router.push('/products');
  };

  return (
    <>
      <Panel>
        <Panel.Icon>Heart</Panel.Icon>
        <Panel.Title>{t('wishList.title')}</Panel.Title>
        <Panel.Description>{t('wishList.description')}</Panel.Description>
      </Panel>
      <div className="wishList">
        <EmptyPanelItem title={t('wishList.emptyMessage')} type="wish-list" handleClick={handleClick} />
      </div>
    </>
  );
};
