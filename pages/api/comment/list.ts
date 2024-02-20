import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";

export default async function handler(req: any, res: any) {
  const db = (await connectDB).db("myapp");
  const result = await db.collection("comment").find({
    parentId: new ObjectId(req.query.id)
  }).toArray();

  if (req.method === "GET") {
    console.log(result);
    res.status(200).json(result);
  }
}