import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const db = (await connectDB).db("myapp");
    const result = await db.collection("board").findOne({ _id: new ObjectId(req.query._id?.toString()) });
    
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
} 
