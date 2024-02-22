import { connectDB } from "@/util/database"
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(req: any, res: any) {  
  const session = await getServerSession(req, res, authOptions);

  if (session) {
    req.body.author_id = session.user?.email;
    req.body.author_name = session.user?.name;
  }

  if (req.method === "POST") {
    if (req.body.title.trim() === "") {
      console.log("제목을 입력하세요.")
      return res.status(500).redirect("/list");
    }
    
    try {
      // 글 작성 시간 추가
      req.body.created_time = new Date();

      const db = (await connectDB).db("myapp");
      const result = await db.collection("board").insertOne(req.body);
      
      return res.redirect(302, "/list");
    } catch (error) {
      console.log(error)
    }
  }
}