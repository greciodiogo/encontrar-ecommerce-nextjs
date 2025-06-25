import useTranslation from 'next-translate/useTranslation';
import React, { useState } from 'react';
import { HiOutlineArrowRight } from 'react-icons/hi';
import { CatalogService } from 'lib/catalog';
import { showToast } from 'shared/hooks/showToast';

export const ContactSupport = () => {
  const { t } = useTranslation('common');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [status, setStatus] = useState('');
  const catalogService = new CatalogService();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus(t('contact_support.sending'));

    try {
      await catalogService.placeFeedback({ email, subject, body });
      showToast({
        title: 'Sucesso',
        message: 'Feedback enviado com sucesso',
        isSuccessType: true,
      });
      setStatus(t('contact_support.success'));
      setEmail('');
      setSubject('');
      setBody('');
    } catch (error) {
      showToast({
        title: 'Erro',
        message: 'Ocorreu um erro ao enviar o feedback',
        isSuccessType: false,
      });
      setStatus(t('contact_support.general_error'));
    }
  };

  return (
    <div className="contact-form">
      <h2>{t('contact_support.title')}</h2>
      <p>{t('contact_support.description')}</p>
      <form onSubmit={(event) => void handleSubmit(event)}>
        <div className="form-group">
          <label htmlFor="email">{t('contact_support.email_label')}</label>
          <input type="email" id="email" value={email} onChange={(event) => setEmail(event.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="subject">{t('contact_support.subject_label')}</label>
          <input
            type="text"
            id="subject"
            value={subject}
            onChange={(event) => setSubject(event.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="message">{t('contact_support.message_label')}</label>
          <textarea id="message" value={body} onChange={(event) => setBody(event.target.value)} />
        </div>
        <button type="submit">
          {t('contact_support.send_message')} <HiOutlineArrowRight size={18} color="white" />
        </button>
        {status && <p>{status}</p>}
      </form>
    </div>
  );
};
