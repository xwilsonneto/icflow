// app/middleware.ts
import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const token = await getToken({ req });

  if (!token && !['/login', '/register'].includes(req.nextUrl.pathname) &&
      !req.nextUrl.pathname.startsWith('/_next/') &&
      !req.nextUrl.pathname.startsWith('/static/')
  ) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
