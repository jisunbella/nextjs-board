export default async function SignUp() {
  return (
    <div className="container">
      <h4>회원가입</h4>
      <form action="/api/auth/signup" method="POST">
        <label htmlFor="email">이메일: </label>
        <input id="email" name="email" type="text" placeholder="아이디" />
        <label htmlFor="password">비밀번호: </label>
        <input id="password" name="password" type="password" placeholder="비밀번호" />
        <label htmlFor="name">이름: </label>
        <input id="name" name="name" type="text" placeholder="이름" />

        <button type="submit">가입하기</button>
      </form>
    </div>
  );
}