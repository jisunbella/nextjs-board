import Link from "next/link";

export default function Write() {
  return (
    <div className="container">
      <h4>글작성</h4>
      <form action="/api/post/new" method="POST">
        <input name="title" placeholder="제목" />
        
        <input name="content" placeholder="내용" />
        <button type="submit">등록</button>
        <button><Link href="/list">취소</Link></button>
      </form>
    </div>
  )
}