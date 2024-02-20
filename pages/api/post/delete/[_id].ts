import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]";

export default async function handler(request: any, response: any) {
  const session = await getServerSession(request, response, authOptions);

  if (!session) {
    return;
  }

  if (request.method === "DELETE") {
    try {
      const db = (await connectDB).db("myapp");
      const data = await db.collection("board").findOne({ _id: new ObjectId(request.query._id)})

      if (session.user?.email === data?.author) {
        const result = await db.collection("board").deleteOne({
          _id: new ObjectId(request.query._id)
        });

        if (result.deletedCount === 1) {
          return response.status(200).json("성공");
        } else if (result.deletedCount === 0) {
          return response.status(500).json("실패");
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
}

