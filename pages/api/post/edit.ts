import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {    
    const newData = {
      title: req.body.title,
      content: req.body.content
    }
    
    try {
      const db = (await connectDB).db("myapp");
      await db.collection("board").updateOne({
        // 수정할 게시물 정보
        _id: new ObjectId(req.body._id)
      }, {
        $set: newData
      });
  
      res.redirect(302, "/list");

    } catch (error) {
      console.log(error);
    }
  }
}