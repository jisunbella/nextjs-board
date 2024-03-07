import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const _id = req.query.id as string;

  if (!_id) {
    return res.status(400).json({ error: "Parameter _id is required." });
  }
  
  const db = (await connectDB).db("myapp");

  try {
    const result = await db.collection("comment").find({
      parentId: new ObjectId(_id)
    }).toArray();

    res.status(200).json(result);
  } catch (error) {
    console.error("Error fetching comments:", error);
    return res.status(500).json({ error: "An error occurred while fetching comments." });
  }
}