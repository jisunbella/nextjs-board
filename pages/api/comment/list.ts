import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log("comment list req >>>>>>>>>>>>>", req.query);
  const _id = req.query.id;

  const db = (await connectDB).db("myapp");
  const result = await db.collection("comment").find({
    parentId: new ObjectId(_id)
  }).toArray();

  console.log("comment list >>>>>>>>>>>>>>>>>>>", result)

  if (req.method === "GET") {
    res.status(200).json(result);
  }
}