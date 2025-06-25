import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

// Definição de rotas protegidas e públicas
const protectedRoutes = ['/users'];

const middleware = (req: NextRequest) => {
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);

  // Obtém informações da sessão a partir dos cookies
  const cookieStore = cookies();
  const session = cookieStore.get('accessToken');

  // Se o usuário não estiver autenticado e tentar acessar uma rota protegida, redireciona para /auth
  if (isProtectedRoute && !session?.value) {
    return NextResponse.redirect(new URL('/auth', req.nextUrl));
  }

  // Se o usuário estiver autenticado e tentar acessar /auth, redireciona para a página inicial
  if (path === '/auth' && session?.value) {
    return NextResponse.redirect(new URL('/', req.nextUrl));
  }

  return NextResponse.next();
};

// Define as rotas onde o middleware será aplicado
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};

// eslint-disable-next-line import/no-default-export
export default middleware;
