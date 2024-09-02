// app/middleware.ts
import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const token = await getToken({ req });

  // Se não houver token e não estiver tentando acessar a página de login, registro ou recursos estáticos
  if (!token && !['/login', '/register'].includes(req.nextUrl.pathname) &&
      !req.nextUrl.pathname.startsWith('/_next/') && // Ignora caminhos internos do Next.js
      !req.nextUrl.pathname.startsWith('/static/') && // Ignora recursos estáticos personalizados
      !req.nextUrl.pathname.startsWith('/images/') && // Ignora imagens
      !req.nextUrl.pathname.startsWith('/favicon.ico') // Ignora o favicon
  ) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  return NextResponse.next();
}

// Configuração do middleware para aplicar a todas as rotas
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'], // Protege todas as rotas, exceto as da API e assets
};
