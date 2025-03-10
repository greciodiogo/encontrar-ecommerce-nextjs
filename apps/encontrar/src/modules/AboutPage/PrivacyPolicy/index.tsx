import React from 'react';

import styles from './../../../styles/about/privacyPolicy.module.css';

export const PrivacyPolicies = () => {
  return (
    <div className={styles.privacyPolicy}>
      <div className={`${styles.privacyPolicy} ${styles.container}`}>
        <h1>Política de Privacidade | Encontrar</h1>

        <h2>1. INTRODUÇÃO</h2>
        <p>
          1.1 Bem-vindo à Encontrar, administrada pela SHPS Tecnologia e Serviços Ltda. A Encontrar respeita as leis de
          privacidade e os direitos dos Usuários da Plataforma...
        </p>

        <h2>2. QUANDO RECOLHEMOS DADOS PESSOAIS?</h2>
        <p>
          2.1 Coletamos dados quando você se registra, envia formulários, interage conosco ou usa nossos serviços...
        </p>

        <h2>3. QUE DADOS COLETAMOS?</h2>
        <p>3.1 Dados pessoais incluem nome, e-mail, data de nascimento, informações de pagamento e localização...</p>

        <h2>4. COLETA DE OUTROS DADOS</h2>
        <p>4.1 Coletamos informações do seu dispositivo, como endereço IP e tipo de navegador...</p>

        <h2>5. COMO USAMOS AS INFORMAÇÕES?</h2>
        <p>
          5.1 Usamos seus dados para processar transações, gerenciar sua conta, responder a solicitações e melhorar
          nossos serviços...
        </p>

        <h2>6. COMO PROTEGEMOS SEUS DADOS?</h2>
        <p>6.1 Implementamos medidas de segurança para proteger seus dados...</p>

        <h2>7. DIVULGAÇÃO DE INFORMAÇÕES</h2>
        <p>7.1 Podemos compartilhar seus dados com fornecedores de serviços e autoridades, conforme necessário...</p>

        <h2>8. INFORMAÇÕES SOBRE CRIANÇAS</h2>
        <p>8.1 Nossos serviços não são destinados a crianças menores de 13 anos...</p>

        <h2>9. COMO RETIRAR O CONSENTIMENTO?</h2>
        <p>
          9.1 Você pode retirar seu consentimento a qualquer momento, enviando um e-mail para{' '}
          <a href="mailto:encontrar55@mail.com">encontrar55@mail.com</a>.
        </p>
      </div>
    </div>
  );
};
