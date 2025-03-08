import useTranslation from 'next-translate/useTranslation';
import React, { useState } from 'react';

import { Panel } from 'components/ControlPanel';
import { EmptyPanelItem } from 'components/EmptyPanelItem';

import { AddOrEditAddress } from '../AddOrEditAddress';

export const PreviewAddress = () => {
  const [isPreviewAddress, setIsPreviewAddress] = useState(true);
  const { t } = useTranslation('control-panel'); // 👈 Namespace para traduções

  const handleClick = () => {
    setIsPreviewAddress((status) => !status);
  };

  return (
    <>
      <Panel>
        <Panel.Icon>Icons - Location</Panel.Icon>
        <Panel.Title>{t('address.title')}</Panel.Title>
        <Panel.Description>{t('address.description')}</Panel.Description>
      </Panel>
      <div className="addressPreview">
        {isPreviewAddress ? (
          <EmptyPanelItem handleClick={handleClick} title={t('address.emptyMessage')} type="address" />
        ) : (
          <AddOrEditAddress handleClick={handleClick} />
        )}
      </div>
    </>
  );
};
