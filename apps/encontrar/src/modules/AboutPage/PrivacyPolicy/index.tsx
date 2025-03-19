import useTranslation from 'next-translate/useTranslation';
import React from 'react';

import styles from './../../../styles/about/privacyPolicy.module.css';

export const PrivacyPolicies = () => {
  const { t } = useTranslation('common');

  // Garantindo que o retorno seja um objeto, e tratando casos onde não exista a estrutura esperada.
  const sections: Record<string, { title: string; content: string }> = t(
    'privacy_policy.sections',
    {},
    { returnObjects: true },
  );

  return (
    <div className={styles.privacyPolicy}>
      <div className={`${styles.privacyPolicy} ${styles.container}`}>
        <h1>{t('privacy_policy.title')}</h1>

        {Object.entries(sections).map(([key, section]) => {
          if (typeof section !== 'object') return null; // Evita erro se a estrutura for inesperada

          return (
            <div key={key}>
              <h2>{section.title}</h2>
              <p
                dangerouslySetInnerHTML={{
                  __html: section.content.replace(
                    '{{email}}',
                    '<a href="mailto:encontrar55@mail.com">encontrar55@mail.com</a>',
                  ),
                }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
