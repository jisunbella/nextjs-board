import { connectDB } from "@/util/database";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const db = (await connectDB).db("myapp");
  const result = await db.collection("board").find().toArray();

  if (req.method === "GET") {
    res.status(200).json(result);
  }
}