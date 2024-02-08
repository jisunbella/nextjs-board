import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";

export default async function handler(req: any, res: any) {
  if (req.method === "POST") {    
    const newData = {
      title: req.body.title,
      content: req.body.content
    }
    
    try {
      const db = (await connectDB).db("myapp");
      const result = await db.collection("board").updateOne({
        // 수정할 게시물 정보
        _id: new ObjectId(req.body._id)
      }, {
        $set: newData
      });
  
      return res.redirect(302, "/list");
    } catch (error) {
      console.log(error);
    }
  }
}