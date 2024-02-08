export default async function SignUp() {
  return (
    <div className="p-20">
      <h4>회원가입</h4>
      <form action="/api/sign-up" method="POST">
        <label htmlFor="id">아이디: </label>
        <input id="id" name="id" />
        <label htmlFor="password">비밀번호: </label>
        <input id="password" name="password" />
        <label htmlFor="username">이름: </label>
        <input id="username" name="username" />

        <button type="submit">가입</button>
      </form>
    </div>
  );
}