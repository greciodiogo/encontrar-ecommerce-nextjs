import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email, subject, message }: { email: string; subject: string; message: string } = req.body;

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'seu-email@gmail.com',
        pass: 'sua-senha',
      },
    });

    const mailOptions = {
      from: 'seu-email@gmail.com',
      to: 'seu-email@gmail.com',
      subject: subject,
      text: `Email de: ${email}\n\nMensagem: ${message}`,
    };

    try {
      await transporter.sendMail(mailOptions);
      res.status(200).json({ message: 'Email enviado com sucesso' });
    } catch (error) {
      res.status(500).json({ message: 'Erro ao enviar email' });
    }
  } else {
    res.status(405).json({ message: 'Método não permitido' });
  }
}
