import Link from 'next/link';

export default async function SignUp() {
  return (
    <div className="container signup">
      <h4 className="signup-title">회원가입</h4>
      <form action="/api/auth/signup" method="POST">
        <div className="signup-input">
          <label
            className="signup-input-label"
            htmlFor="email"
          >이메일: </label>
          <input
            className="signup-input-box"
            id="email"
            name="email"
            type="text"
            placeholder="이메일" />
        </div>
        <div className="signup-input">
          <label
            className="signup-input-label"
            htmlFor="password"
          >비밀번호: </label>
          <input
            className="signup-input-box"
            id="password"
            name="password"
            type="password"
            placeholder="비밀번호"
          />
        </div>
        <div className="signup-input">
          <label
            className="signup-input-label"
            htmlFor="name">이름: </label>
          <input
            className="signup-input-box"
            id="name"
            name="name"
            type="text"
            placeholder="이름"
          />
        </div>

        <div className="below-btn">
          <button type="submit" className="register-btn">가입하기</button>
          <button><Link href="/list" className="cancel-btn">취소</Link></button>
        </div>
      </form>
    </div>
  );
}