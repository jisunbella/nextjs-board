import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { ObjectId } from "mongodb";
import { connectDB } from "@/util/database";

export default async function handler(req: any, res: any) {
  // session으로 회원 정보 가져오기
  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    return;
  }

  if (req.method == "POST") {
    req.body = JSON.parse(req.body);

    /** comment document 형태
     {
        id: new ObjectId(),
        content: string,
        author: string,
        parent: ObjectId(parent의 id)
      }
    */
    const newComment = {
      content: req.body.comment,
      parentId: new ObjectId(req.body._parentId),
      author: session.user?.email,
      author_name: session.user?.name
    }
    
    const db = (await connectDB).db("myapp");
    const result = await db.collection("comment").insertOne(newComment);
    
    res.status(200).json("저장완료")
  }

}