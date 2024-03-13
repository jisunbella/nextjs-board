import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  // console.log(request.nextUrl);
  // console.log(request.cookies);
  // console.log(request.headers);
  // NextResponse.next(); // 통과
  // NextResponse.redirect(""); // 다른 페이지로 강제 이동(주소창도 이동)
  // NextResponse.rewrite(""); // 다른 페이지로 강제 이동(주소창은 그대로)

  // 1. /list 및 하위 페이지 접속시 접속자 헤더 정보 알아오기 
  if (request.nextUrl.pathname.startsWith("/list")) { // 현재 요청중인 url
    console.log(new Date());
    console.log(request.headers.get("sec-ch-ua-platform")); // 현재 유저의 OS 정보
    return NextResponse.next(); // 이상없으니 계속하세요. middleware에서 이거 쓰는거 중요함
  }

  // 2. 미로그인 유저 /write 막아보기
  // env파일에 NEXTAUTH_SECRET 키 있어야 하고
  // JWT 써야 유저정보를 쉽게 출력 가능하다
  // session을 쓸 경우 session 정보에 들어있는 쿠키를 출력하고 DB랑 대조해 봐야함
  const session = await getToken({ req: request });

  if (request.nextUrl.pathname === "/write") {
  // if (request.nextUrl.pathname.startsWith("/write")) {
    if (session === null) { // 로그인 안 한 경우
      return NextResponse.redirect("http://localhost:3000/api/auth/signin");
    }
  }

  // middleware에서 쿠키 다루기
  request.cookies.get("쿠키이름"); // 출력
  request.cookies.has("쿠키이름");  // 존재확인
  request.cookies.delete("쿠키이름"); // 삭제

  // 유저에게 쿠키 생성해서 보내주려면
  // const response = NextResponse.next()
  // response.cookies.set({
  //   name: "mode",
  //   value: "dark",
  //   maxAge: 3600,
  //   httpOnly: true // 유저가 자바스크립트로 쿠키 조작 방지 가능
  // })
  // return response

  // 유저가 /register 페이지 방문시 visited=true라는 쿠키를 생성해주기
  if (request.nextUrl.pathname.startsWith('/register')) {
    if (request.cookies.has('visited') == false) {
      const response = NextResponse.next()
      response.cookies.set({
        name: 'visited',
        value: 'true',
        maxAge: 3600,
      })
      return response
    }
    return NextResponse.next()
  }
}