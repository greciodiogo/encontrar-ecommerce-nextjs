import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const token = req.cookies.accessToken; // Nome do cookie onde o token está armazenado
  const TOKEN_FORMATTED = token?.substring(1, token.length - 1);
  if (!token) {
    res.status(401).json({ message: 'Token não encontrado.' });
    return;
  }

  res.status(200).json({ token: TOKEN_FORMATTED });
}
