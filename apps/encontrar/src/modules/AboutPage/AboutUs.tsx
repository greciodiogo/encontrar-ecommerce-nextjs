import useTranslation from 'next-translate/useTranslation';
import React from 'react';

import { Container } from 'components/Container';

import { About_Us } from './About_Us';
import { ContactSupport } from './ContactSupport';
import { FAQ } from './FAQ';
import { Team } from './Team';

export const AboutUs = () => {
  const { t } = useTranslation('common');

  return (
    <Container useStyle={false}>
      <section className="aboutUs">
        <div className="aboutUs__container">
          <About_Us />
          <Team />
        </div>
      </section>

      <section className="about_faq">
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
      </section>

      <section className="about_policy">
        <div className="about_policy_container">
          <ContactSupport />
        </div>
      </section>
    </Container>
  );
};
