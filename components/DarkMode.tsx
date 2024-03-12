"use client"

import { useEffect } from "react";

const DarkMode = () => {
  useEffect(() => {
    if (!document.cookie) {
      return;
    }

    const cookieValue = ('; '+document.cookie)?.split(`; mode=`)?.pop()?.split(';')[0]

    if (cookieValue) {
      document.cookie = "mode=light; max-age=" + (2600 * 24 * 400)
    }

  }, []);

  return (
    <span>🌙</span>
  )
}

export default DarkMode;