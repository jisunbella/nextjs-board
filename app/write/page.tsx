"use client"

import Link from "next/link";

export default function Write() {
  return (
    <div className="container">
      {/* <h4>글작성</h4> */}
      <div className='content-box'>
        <form action="/api/post/new" method="POST">
          <input
            name="title"
            placeholder="제목"
            className="content-title content-title-write" />
          <input
            name="content"
            placeholder="내용"
            className="content-text content-text-write" />
          <input
            type="file"
            accept="image/*"
            onChange={async (e) => {
              if (e.target.files) {
                const file = e.target.files[0]
                const fileName = encodeURIComponent(file.name) // 한글 파일 명 깨지는거 대비
                let res: any = await fetch("/api/post/image?file=" + fileName)
                res = await res.json()
                console.log("res", res)
                const formData = new FormData() // form 태그랑 똑같이 동작함
                Object.entries({ ...res.fields, file }).forEach(([key, value]) => {
                  console.log("key, value: ", key, value);
                  formData.append(key, value as string | File)
                })

                const uploadRes = await fetch(res.url, {
                  method: "POST",
                  body: formData,
                })
                console.log("응답:",uploadRes)
              }
            }}
          />
          <img src="" />
          <div className="below-btn">
            <button type="submit" className="register-btn">등록</button>
            <button><Link href="/list" className="cancel-btn">취소</Link></button>
          </div>
        </form>
      </div>
    </div>
  )
}