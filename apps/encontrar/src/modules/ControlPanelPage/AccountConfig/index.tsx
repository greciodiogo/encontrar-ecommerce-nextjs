import useTranslation from 'next-translate/useTranslation';
import React from 'react';
import { FaArrowRight } from 'react-icons/fa';

import { Panel } from 'components/ControlPanel';
import { useAuth } from 'hooks/useAuth';

export const AccountConfigPage = () => {
  const { user } = useAuth();
  const { t } = useTranslation('control-panel'); // 👈 Namespace para traduções

  return (
    <>
      <Panel>
        <Panel.Icon>Stack</Panel.Icon>
        <Panel.Title>{t('accountSettings.title')}</Panel.Title>
        <Panel.Description>{t('accountSettings.description')}</Panel.Description>
      </Panel>
      <div className="accountConfig">
        <div className="group">
          <h4>{t('accountSettings.name')}</h4>
          <p>{user?.name}</p>
        </div>
        <div className="group">
          <h4>{t('accountSettings.email')}</h4>
          <p>{user?.email}</p>
        </div>
        <div className="group">
          <h4>{t('accountSettings.password')}</h4>
          <p>***************</p>
        </div>
        <button>
          {t('accountSettings.editDetails')}
          <i>
            <FaArrowRight size={12} fill="black" />
          </i>
        </button>
      </div>
    </>
  );
};
