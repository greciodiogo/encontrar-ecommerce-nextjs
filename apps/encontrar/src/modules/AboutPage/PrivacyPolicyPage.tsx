import React from 'react';

import { Container } from 'components/Container';

import { ContactSupport } from './ContactSupport';
import { FAQ } from './FAQ';
import { PrivacyPolicies } from './PrivacyPolicy';

export const PrivacyPolicyPage = () => {
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
            <h2>Perguntas Frequentes</h2>
            <div className="about__picture__content">
              <img src="/assets_ecommerce/svg/PhoneCall.png" alt="" />
              <span>Para mais informações ou apoio técnico, ligue 933000000</span>
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
