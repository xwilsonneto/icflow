// app/middleware.ts
import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const token = await getToken({ req });

  // Permite acesso a arquivos estáticos e outros recursos
  const url = req.nextUrl.clone();
  if (url.pathname.startsWith('/_next/') || url.pathname.startsWith('/static/') || url.pathname.startsWith('/public/') || url.pathname === '/favicon.ico') {
    return NextResponse.next();
  }

  // Redireciona para a página de login se não houver token e o caminho não for /login ou /register
  if (!token && !['/login', '/register'].includes(req.nextUrl.pathname)) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  return NextResponse.next();
}

// Configuração do middleware para aplicar a todas as rotas
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
