import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log("req.query._id >>>>>>>>>>>>>>>>>>>>>>>>", req.query._id)
  const db = (await connectDB).db("myapp");
  const data = await db.collection("board").findOne({ _id: new ObjectId(req.query._id?.toString()) });

  console.log("data >>>>>>>>>>>>>>>>>>>>>>>>>", data);

  res.status(200).json({ data });
} 
