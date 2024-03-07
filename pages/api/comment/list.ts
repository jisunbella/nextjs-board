import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const _id = req.query.id;

  if (!_id) res.status(500).json("오류가 발생했습니다.");
  
  const db = (await connectDB).db("myapp");
  const result = await db.collection("comment").find({
    parentId: new ObjectId(_id) // todo: 왜 밑줄인지..
  }).toArray();

  if (req.method === "GET") {
    res.status(200).json(result);
  }
}