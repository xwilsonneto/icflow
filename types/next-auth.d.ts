import NextAuth from "next-auth";
import { UserDocument } from "./types"; // Ajuste o caminho conforme necessário

declare module "next-auth" {
  interface Session {
    user: UserDocument;
    accessToken?: string; // Adiciona accessToken como uma string
    refreshToken?: string; // Adiciona refreshToken como uma string
  }

  interface User {
    googleToken?: string; // Opcional, se necessário
  }
}
