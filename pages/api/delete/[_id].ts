import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";

export default async function handler(request: any, response: any) {
  console.log(request.query._id);
  console.log(request.method);

  if (request.method === "GET") {
    try {
      console.log(request.query._id);
      console.log(typeof request.query._id)
      const db = (await connectDB).db("myapp");
      const result = await db.collection("board").deleteOne({
        _id: new ObjectId(request.query._id)
      });

      console.log(result);
  
      if (result.deletedCount === 1) {
        return response.status(200).json("성공");
      } else if (result.deletedCount === 0) {
        return response.status(500).json("실패");
      }
    } catch (error) {
      console.log(error);
    }
  }
}