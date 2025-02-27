type TokenResponse = {
  token: string;
};

export const getToken = async () => {
  const response = await fetch('/api/token'); // Chama a API local para obter o token
  const data = (await response.json()) as TokenResponse; // Força a tipagem do retorno

  return data.token;
};
