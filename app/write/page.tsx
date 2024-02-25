import Link from "next/link";

export default function Write() {
  return (
    <div className="container">
      {/* <h4>글작성</h4> */}
      <div className='content-box'>
        <form action="/api/post/new" method="POST">
          <input name="title" placeholder="제목" className="content-title content-title-write" />
          <input name="content" placeholder="내용" className='content-text content-text-write' />
          <div className="below-btn">
            <button type="submit" className="register-btn">등록</button>
            <button><Link href="/list" className="cancel-btn">취소</Link></button>
          </div>
        </form>
      </div>
    </div>
  )
}