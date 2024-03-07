import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const paramId = req.query._id as string;

  if (!paramId) {
    return res.status(400).json({ error: "Parameter _id is required." });
  }
  
  const db = (await connectDB).db("myapp");

  try {
    const result = await db.collection("board").findOne({ _id: new ObjectId(paramId) });
    
    res.status(200).json(result);
  } catch (error) {
    console.error("Error fetching post details:", error);
    return res.status(500).json({ error: "An error occurred while fetching post details." });
  }
} 
