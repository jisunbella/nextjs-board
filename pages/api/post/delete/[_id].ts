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
      const data = await db.collection("board").findOne({ _id: new ObjectId(request.query._id) });

      console.log("삭제할 데이터 >>>>>>>>>>>>>>>>>>>>> ", data);

      if (session.user?.email === data?.author_id) {
        const result = await db.collection("board").deleteOne({
          _id: new ObjectId(request.query._id)
        });

        console.log("글쓴이가 유저가 맞음...");

        if (result.deletedCount === 1) {
          console.log("삭제성공");
          return response.status(200).json("성공");
        } else if (result.deletedCount === 0) {
          console.log("삭제실패");
          return response.status(500).json("실패");
        }
      } else {
        console.log("글쓴이가 유저가 아님...")
      }
    } catch (error) {
      console.log(error);
    }
  }
}

