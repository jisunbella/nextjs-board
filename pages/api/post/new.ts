import { connectDB } from "@/util/database"
import { SessionType, getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {  
  const session: SessionType = await getServerSession(req, res, authOptions);

  // if (session) {
  //   req.body.author_id = session.user?.email;
  //   req.body.author_name = session.user?.name;
  // }
  if (!session) return;

  req.body.author_id = session.user?.email;
  req.body.author_name = session.user?.name;
  
  if (req.method === "POST") {
    if (req.body.title.trim() === "") {
      console.log("제목 없음");
      return res.status(500).redirect("/list");
    }

    // 글 작성 시간 추가
    req.body.created_time = new Date();
    
    try {
      const db = (await connectDB).db("myapp");
      await db.collection("board").insertOne(req.body);

      res.redirect(302, "/list");

    } catch (error) {
      console.log(error)
    }
  }
}