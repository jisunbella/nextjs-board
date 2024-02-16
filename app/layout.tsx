import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";
import LoginBtn from "./LoginBtn";
import LogoutBtn from "./LogoutBtn";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";


export const metadata: Metadata = {
  title: "게시판",
  description: "by 지선",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let session = await getServerSession(authOptions); // 서버 컴포넌트, 서버 기능 안에서만 사용 가능

  return (
    <html lang="en">
      <body>
        <div className="navbar"> 
          <Link href="/" className="logo">🍥</Link> 
          <Link href="/list">게시판</Link> 
          {
            session
              ? <span>{session.user?.name} <LogoutBtn /></span>
              : <span><LoginBtn /></span>
          }
        </div>
        {children}
      </body>
    </html>
  );
}
