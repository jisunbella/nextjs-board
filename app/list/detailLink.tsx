"use client"

import { usePathname, useRouter } from "next/navigation"

export default function DetailLink() {
  const router = useRouter();
  const a = usePathname();

  return (
    <button onClick={() => { router.push("/") }}>버튼</button>
  )
}