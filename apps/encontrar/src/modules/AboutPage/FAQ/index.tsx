// components/FAQ.tsx
import { useState } from 'react';

const faqData = [
  {
    question: 'Como comprar na encontrar?',
    answer: 'Para comprar, basta acessar nosso site, escolher seus produtos e finalizar a compra pelo carrinho.',
  },
  {
    question: 'Como obter apoio técnico?',
    answer:
      'Você pode entrar em contato com nosso suporte através do telefone 933000000 ou e-mail suporte@encontrar.com.',
  },
  {
    question: 'Como funcionam as entregas?',
    answer: 'As entregas são feitas via transportadora, com prazos variando conforme a região.',
  },
  {
    question: 'Quais são os métodos de pagamento disponíveis?',
    answer: 'Aceitamos cartões de crédito, débito, boleto bancário e PIX.',
  },
  {
    question: 'Como as empresas podem melhorar a experiência de compra no ecommerce?',
    answer:
      'Oferecendo personalização, avaliações, preços competitivos e um checkout ágil para maior satisfação do usuário.',
  },
];

export const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="faq-container">
      <div className="faq-list">
        {faqData.map((item, index) => (
          <div key={index} className={`faq-item ${openIndex === index ? 'open' : ''}`}>
            <button className="faq-question" onClick={() => toggleFAQ(index)}>
              {item.question}
              <span>{openIndex === index ? '−' : '+'}</span>
            </button>
            <div className="faq-answer">
              <p>{item.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
