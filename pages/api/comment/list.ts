import { connectDB } from "@/util/database";

export default async function handler(req: any, res: any) {
  const db = (await connectDB).db("myapp");
  const result = await db.collection("comment").find().toArray();
  
  if (req.method === "GET") {
    return res.status(200).json(result);
  }
}