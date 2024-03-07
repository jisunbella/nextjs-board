import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";
import { SessionType, getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session: SessionType = await getServerSession(req, res, authOptions);  
  
  if (!session) return;
  
  const _id = typeof req.query._id === "string" ? req.query._id : "";

  if (req.method === "DELETE") {
    try {
      const db = (await connectDB).db("myapp");
      const data = await db.collection("board").findOne({ _id: new ObjectId(_id) });

      if (session.user?.email === data?.author_id) {
        const result = await db.collection("board").deleteOne({
          _id: new ObjectId(_id)
        });

        if (result.deletedCount === 1) {
          res.status(200).json("성공");
        } else if (result.deletedCount === 0) {
          res.status(500).json("실패");
        }
      } else {
        res.status(500).json("실패");
      }
    } catch (error) {
      console.log(error);
    }
  }
}

