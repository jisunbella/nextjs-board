import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";

export default async function handler(req: any, res: any) {
  if (req.method === "DELETE") {

    try {
      const db = (await connectDB).db("myapp");
      const result = await db.collection("board").deleteOne({
        _id: new ObjectId(JSON.parse(req.body)._id)
      })
  
      if (result.deletedCount === 1) {
        res.status(200).json("성공");
      } else if (result.deletedCount === 0) {
        res.status(500).json("실패");
      }
    } catch (error) {
      console.log(error);
    }
  }
}