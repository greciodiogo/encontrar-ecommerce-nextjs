import useTranslation from 'next-translate/useTranslation';
import React, { useState } from 'react';
import { HiOutlineArrowRight } from 'react-icons/hi';

export const ContactSupport = () => {
  const { t } = useTranslation('common');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus(t('contact_support.sending'));

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, subject, message }),
      });

      if (response.ok) {
        setStatus(t('contact_support.success'));
        setEmail('');
        setSubject('');
        setMessage('');
      } else {
        setStatus(t('contact_support.error'));
      }
    } catch (error) {
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
          <textarea id="message" value={message} onChange={(event) => setMessage(event.target.value)} />
        </div>
        <button type="submit">
          {t('contact_support.send_message')} <HiOutlineArrowRight size={18} color="white" />
        </button>
        {status && <p>{status}</p>}
      </form>
    </div>
  );
};
