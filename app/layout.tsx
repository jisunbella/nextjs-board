import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "게시판",
  description: "by 지선",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="navbar"> 
          <Link href="/" className="logo">🍥</Link> 
          <Link href="/list">게시판</Link> 
          <Link href="/sign-up">회원가입</Link>
        </div>
        {children}
      </body>
    </html>
  );
}
