import React from 'react';

import { Container } from 'components/Container';

import { FAQ } from './FAQ';
import { PrivacyPolicy } from './PrivacyPolicy';

export const AboutPage = () => {
  return (
    <Container useStyle={false}>
      <PrivacyPolicy />
      <FAQ />
    </Container>
  );
};
