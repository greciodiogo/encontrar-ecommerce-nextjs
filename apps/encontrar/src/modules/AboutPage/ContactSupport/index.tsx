import React, { useState } from 'react';
import { HiOutlineArrowRight } from 'react-icons/hi';

export const ContactSupport = () => {
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus('Sending...');

    try {
      // Here you would integrate with an email service like SendGrid or Nodemailer
      // For example, using fetch to call an API endpoint that sends the email
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, name, subject, message }),
      });

      if (response.ok) {
        setStatus('Email sent successfully!');
        setEmail('');
        setSubject('');
        setMessage('');
      } else {
        setStatus('Failed to send email. Please try again later.');
      }
    } catch (error) {
      setStatus('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="contact-form">
      <h2>Não procure a sua resposta, peça apoio.</h2>
      <p>Nossa linha de email encontrar-se disponível para ajuda-lo.</p>
      <form onSubmit={(event) => void handleSubmit(event)}>
        <div className="form-group">
          <label htmlFor="email">Endereço de email</label>
          <input type="email" id="email" value={email} onChange={(event) => setEmail(event.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="subject">Assunto</label>
          <input
            type="text"
            id="subject"
            value={subject}
            onChange={(event) => setSubject(event.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="message">Mensagem (Opcional)</label>
          <textarea id="message" value={message} onChange={(event) => setMessage(event.target.value)} />
        </div>
        <button type="submit">
          Mandar Mensagem <HiOutlineArrowRight size={18} color="white" />
          <p>{status}</p>
        </button>
      </form>
    </div>
  );
};
