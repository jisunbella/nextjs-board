import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";
import LoginBtn from "../components/LoginBtn";
import LogoutBtn from "../components/LogoutBtn";
import SignUpBtn from "../components/SignUpBtn";
import { SessionType, getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { cookies } from "next/headers";
import DarkMode from "@/components/DarkMode";

export const metadata: Metadata = {
  title: "게시판",
  description: "by 지선",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let session: SessionType = await getServerSession(authOptions); // 서버 컴포넌트, 서버 기능 안에서만 사용 가능

  let cookie = cookies().get("mode");
  console.log(cookie);

  return (
    <html lang="en">
      <body className={
        cookie != undefined && cookie.value == "dark"
          ? "dark-mode"
          : ""
      }>
        <div className="navbar container"> 
          <div className="navbar-logo">
            {/* <Link href="/" className="logo">게시판</Link>  */}
          </div>
          <span>
            <Link href="/list">게시판</Link> 
          </span>
          <span>
            {
              session
                ? <span>{session.user?.name} <LogoutBtn /></span>
                : <span><LoginBtn /><SignUpBtn /></span>
            }
            <DarkMode />
          </span>
        </div>
        {children}
      </body>
    </html>
  );
}
