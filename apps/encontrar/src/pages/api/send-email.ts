/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email, subject, message }: { email: string; subject: string; message: string } = req.body;

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false, // true for port 465, false for other ports
      auth: {
        user: 'fonebahia8@gmail.com',
        pass: 'D201702@@',
      },
    });

    const mailOptions = {
      from: email,
      to: 'fonebahia8@gmail.com',
      subject: subject,
      text: `Email de: ${email}\n\nMensagem: ${message}`,
      html: '<b>Hello world?</b>', // html body
    };

    try {
      await transporter.sendMail(mailOptions);
      res.status(200).json({ message: 'Email enviado com sucesso' });
    } catch (error) {
      res.status(500).json({ message: 'Erro ao enviar email', error: error });
    }
  } else {
    res.status(405).json({ message: 'Método não permitido' });
  }
}
