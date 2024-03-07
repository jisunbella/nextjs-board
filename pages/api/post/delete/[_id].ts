import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";
import { SessionType, getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session: SessionType = await getServerSession(req, res, authOptions);  
  
  if (!session) {
    return res.status(400).json({ error: "session is null." });
  }

  const paramId = req.query._id as string;

  if (!paramId) {
    return res.status(400).json({ error: "Parameter _id is required." });
  }

  if (req.method === "DELETE") {
    const db = (await connectDB).db("myapp");
    
    try {
      const data = await db.collection("board").findOne({ _id: new ObjectId(paramId) });

      if (session.user?.email === data?.author_id) {
        const result = await db.collection("board").deleteOne({
          _id: new ObjectId(paramId)
        });

        if (result.deletedCount === 1) {
          res.status(200).json("Deleted successfully.");
        } else if (result.deletedCount === 0) {
          res.status(500).json("Fail to delete this post.");
        }
      } else {
        res.status(500).json({ error: "An error occurred because user doesn't allow to delete this post." });
      }
    } catch (error) {
      console.error("Error deleting the post:", error);
      return res.status(500).json({ error: "An error occurred while deleting the post." });
    }
  }
}

