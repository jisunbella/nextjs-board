import { connectDB } from "@/util/database";
import bcrypt from "bcrypt"; // 흠... 왜 밑줄?
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!req.body.email && !req.body.password && !req.body.name) {
    res.status(500).json("내용을 입력하세요.");
  }

  if (req.method === "POST") {
    
    // ⭐ 비밀번호 암호화 
    const hash = await bcrypt.hash(req.body.password, 10);
    req.body.password = hash;

    // 이메일 중복 체크
    // DB에서 이메일 조회
    const db = (await connectDB).db("myapp");
    const result = await db.collection("user_cred").findOne({ email: req.body.email });

    if (result) {
      res.status(500).json("이미 등록된 이메일입니다.");
    }

    // 실행
    await db.collection("user_cred").insertOne(req.body);

    res.status(200).json("가입 성공!");
  }
}