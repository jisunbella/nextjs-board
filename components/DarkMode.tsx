"use client"

import { useRouter } from "next/navigation";
import { useEffect } from "react";

const DarkMode = () => {
  const router = useRouter();

  useEffect(() => {
    if (!document.cookie) {
      return;
    }
    
    const cookieValue = ('; ' + document.cookie)?.split(`; mode=`)?.pop()?.split(';')[0];
    if (cookieValue) {
      document.cookie = "mode=light; max-age=" + (2600 * 24 * 400)
    }

  }, []);

  const changeMode = () => {
    const cookieValue = ('; ' + document.cookie)?.split(`; mode=`)?.pop()?.split(';')[0];

    if (cookieValue === "light") {
      document.cookie = 'mode=dark; max-age=' + (3600 * 24 * 400);
      router.refresh(); // 쿠키 바꾸고 새로고침 해야 적용됨
    } else {
      document.cookie = 'mode=light; max-age=' + (3600 * 24 * 400);
      router.refresh();
    }
  }

  return (
    <span onClick={changeMode}>🌙</span>
  )
}

export default DarkMode;