import React from 'react';

import { Container } from 'components/Container';

import { About_Us } from './About_Us';
import { ContactSupport } from './ContactSupport';
import { FAQ } from './FAQ';
import { Team } from './Team';

export const AboutUs = () => {
  return (
    <Container useStyle={false}>
      <div className="aboutUs">
        <div className="aboutUs__container">
          <About_Us />
          <Team />
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
