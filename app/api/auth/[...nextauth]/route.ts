import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import User from "@/models/User"; // Ajuste o caminho conforme necessário
import { connectDB } from "@/lib/mongodb"; // Ajuste o caminho conforme necessário

interface Token {
  accessToken?: string;
  refreshToken?: string;
  [key: string]: any; // Permite propriedades adicionais
}

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          scope: 'openid profile email',
        },
      },
    }),
  ],
  pages: {
    signIn: '/login', // Página de login personalizada
  },
  secret: process.env.NEXTAUTH_SECRET, // Adicione o secret aqui
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        (token as Token).accessToken = account.access_token;
        (token as Token).refreshToken = account.refresh_token;
      }
      return token;
    },
    async session({ session, token }) {
      const tokenData = token as Token;
      if (tokenData.accessToken) {
        session.accessToken = tokenData.accessToken;
      }
      if (tokenData.refreshToken) {
        session.refreshToken = tokenData.refreshToken;
      }
      return session;
    },
    async signIn({ user, account }) {
      await connectDB(); // Conectar ao banco de dados

      if (account?.access_token) {
        const existingUser = await User.findOne({ email: user.email });

        if (!existingUser) {
          await User.create({
            email: user.email,
            name: user.name,
            password: '', // Deixe em branco se não usar senha
            image: user.image || '',
            phone: '', // Defina um valor padrão ou ajuste conforme necessário
            googleToken: account.access_token,
          });
        } else {
          existingUser.googleToken = account.access_token;
          await existingUser.save();
        }
      }

      return true;
    },
  },
  debug: true,
});

export { handler as GET, handler as POST };
