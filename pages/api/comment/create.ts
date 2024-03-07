import { SessionType, getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { ObjectId } from "mongodb";
import { connectDB } from "@/util/database";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // session으로 회원 정보 가져오기
  const session: SessionType = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(400).json({ error: "session is null." });
  }

  if (req.method == "POST") {
    const params = JSON.parse(req.body);
    
    if (!params) {
      return res.status(400).json({ error: "Parameter is required." });
    }

    const newComment = {
      content: params.comment,
      parentId: new ObjectId(params._parentId),
      author: session.user?.email,
      author_name: session.user?.name
    }
    
    const db = (await connectDB).db("myapp");
    
    try {
      await db.collection("comment").insertOne(newComment);
      
      res.status(200).json("Your comment saved successfully.");

    } catch (error) {
      console.error("Error saving comments:", error);
      return res.status(500).json({ error: "An error occurred while saving comments." });
    }
  }
}