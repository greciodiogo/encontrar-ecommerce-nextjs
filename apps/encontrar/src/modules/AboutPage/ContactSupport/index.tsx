import React, { useState } from 'react';
import { HiOutlineArrowRight } from 'react-icons/hi';

export const ContactSupport = () => {
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:3001/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, subject, message }),
      });

      if (response.ok) {
        alert('Mensagem enviada com sucesso!');
        setEmail('');
        setSubject('');
        setMessage('');
      } else {
        alert('Erro ao enviar mensagem. Tente novamente.');
      }
    } catch (error) {
      console.error('Erro:', error);
      alert('Erro ao enviar mensagem. Tente novamente.');
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
        </button>
      </form>
    </div>
  );
};
