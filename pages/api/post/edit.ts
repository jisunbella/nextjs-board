import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const paramId = req.body._id;

  if (!paramId) {
    return res.status(400).json({ error: "Parameter _id is required." });
  }

  if (req.method === "POST") {    
    const newData = {
      title: req.body.title,
      content: req.body.content
    }
    
    try {
      const db = (await connectDB).db("myapp");
      await db.collection("board").updateOne({
        // 수정할 게시물 정보
        _id: new ObjectId(paramId)
      }, {
        $set: newData
      });
  
      res.redirect(302, "/list");
    } catch (error) {
      console.error("Error editing the post:", error);
      return res.status(500).json({ error: "An error occurred while editing the post." });
    }
  }
}