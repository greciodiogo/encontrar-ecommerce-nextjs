import useTranslation from 'next-translate/useTranslation';
import { useState } from 'react';

export const FAQ = () => {
  const { t } = useTranslation('common');
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqData = [
    { question: t('faq.questions.how_to_buy'), answer: t('faq.answers.how_to_buy') },
    { question: t('faq.questions.technical_support'), answer: t('faq.answers.technical_support') },
    { question: t('faq.questions.deliveries'), answer: t('faq.answers.deliveries') },
    { question: t('faq.questions.payment_methods'), answer: t('faq.answers.payment_methods') },
    { question: t('faq.questions.ecommerce_experience'), answer: t('faq.answers.ecommerce_experience') },
  ];

  return (
    <div className="faq-container">
      <div className="faq-list">
        {faqData.map((item, index) => (
          <div key={index} className={`faq-item ${openIndex === index ? 'open' : ''}`}>
            <button className="faq-question" onClick={() => toggleFAQ(index)}>
              {item.question}
              <span>{openIndex === index ? '−' : '+'}</span>
            </button>
            {openIndex === index && (
              <div className="faq-answer">
                <p>{item.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
