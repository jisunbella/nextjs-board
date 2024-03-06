"use client"

import LoginBtn from "./LoginBtn";
import SignUpBtn from "./SignUpBtn";
import LogoutBtn from "./LogoutBtn";

import { useSession, getSession } from "next-auth/react"

export default function LoginStatus() {
  const { data: session, status } = useSession();
  
  if (status === "loading") {
    return <p>Loading...</p>
  }

  if (status === "unauthenticated") {
    return <p>Access Denied</p>
  }
  console.log("세션? >>>>>>>>>>>>>>>>>>>>>>>>>>> ", session);

  return (
    <span>
      {
        session
          ? <span>{session.user?.name} <LogoutBtn /></span>
          : <span><LoginBtn /><SignUpBtn /></span>
      }
    </span>
  )
};