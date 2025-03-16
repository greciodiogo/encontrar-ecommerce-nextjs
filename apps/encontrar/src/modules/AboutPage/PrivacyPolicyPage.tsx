import useTranslation from 'next-translate/useTranslation';
import React from 'react';

import { Container } from 'components/Container';

import { ContactSupport } from './ContactSupport';
import { FAQ } from './FAQ';
import { PrivacyPolicies } from './PrivacyPolicy';

export const PrivacyPolicyPage = () => {
  const { t } = useTranslation('common');

  return (
    <Container useStyle={false}>
      <div className="about_policy">
        <div className="about_policy_container">
          <PrivacyPolicies />
        </div>
      </div>
      <div className="about_faq">
        <div className="about_faq_container">
          <div className="about__content">
            <h2>{t('faq.title')}</h2>

            <div className="about__picture__content">
              <img src="/assets_ecommerce/svg/PhoneCall.png" alt={t('faq.imageAlt')} />
              <span>{t('faq.supportMessage')}</span>
            </div>
          </div>
          <FAQ />
        </div>
      </div>
      <div className="about_policy">
        <div className="about_policy_container">
          <ContactSupport />{' '}
        </div>
      </div>
    </Container>
  );
};
