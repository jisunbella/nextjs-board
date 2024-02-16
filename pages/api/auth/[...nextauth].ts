import { connectDB } from "@/util/database";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";

export const authOptions = {
  providers: [
    // 원하는 로그인 방식 Provider 추가
    GithubProvider({
      clientId: '8c26edada639e426c679',
      clientSecret: '96fb0e77cea885780d8608b0bcb3db78b1c3d8bf',
    }),
  ],
  secret: 'qwer1234', // jwt생성시쓰는암호
  adapter: MongoDBAdapter(connectDB) // DB adapter setting
};
export default NextAuth(authOptions); 