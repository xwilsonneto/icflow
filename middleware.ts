import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const token = await getToken({ req });

  // Permite acesso a arquivos estáticos e recursos essenciais
  const url = req.nextUrl.clone();
  if (
    url.pathname.startsWith('/_next/') ||
    url.pathname.startsWith('/static/') ||
    url.pathname.startsWith('/public/') ||
    url.pathname === '/favicon.ico' ||
    url.pathname === '/' || // Permite acesso à página de login
    url.pathname === '/register' // Permite acesso à página de registro
  ) {
    return NextResponse.next();
  }

  // Redireciona para a página de login se não houver token
  if (!token) {
    return NextResponse.redirect(new URL('/', req.url)); // Redireciona para a página de login
  }

  return NextResponse.next();
}

// Configuração do middleware para aplicar a todas as rotas
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
