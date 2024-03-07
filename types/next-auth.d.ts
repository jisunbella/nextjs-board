import { DefaultSession } from "next-auth";
import NextAuth from "next-auth/next";

declare module "next-auth" {
  interface Session {
    user: {
      name: string | undefined | null;
      email: string | undefined | null;
    }
  }

  type SessionType = {
    user?: {
      name: string | undefined | null;
      email: string | undefined | null;
    }
  } | null
}