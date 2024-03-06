import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);  
  
  if (!session) return;
  
  const _id = typeof req.query._id === "string" ? req.query._id : "";

  if (req.method === "DELETE") {
    try {
      const db = (await connectDB).db("myapp");
      const data = await db.collection("board").findOne({ _id: new ObjectId(_id) });
      console.log("삭제할 데이터: ", data);

      if (session.user?.email === data?.author_id) {
        console.log("글쓴이 == 로그인 한 유저");

        const result = await db.collection("board").deleteOne({
          _id: new ObjectId(_id)
        });

        if (result.deletedCount === 1) {
          res.status(200).json("성공");
        } else if (result.deletedCount === 0) {
          res.status(500).json("실패");
        }
      } else {
        console.log("글쓴이 != 로그인 한 유저");
        res.status(500).json("실패");
      }
    } catch (error) {
      console.log(error);
    }
  }
}

