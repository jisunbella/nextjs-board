import { DefaultSession } from "next-auth";
import NextAuth from "next-auth/next";

declare module "next-auth" {
  interface Session {
    user: {
      name: string | undefined | null;
      email: string | undefined | null;
    }
      // username?: string | undefined | null;
      // uid?: string | undefined | null;
    // } & DefaultSession["user"];
  }
}