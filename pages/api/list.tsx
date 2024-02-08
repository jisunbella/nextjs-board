import { connectDB } from "@/util/database";

export default async function handler(request: any, response: any) {
  const db = (await connectDB).db("myapp");
  const result = await db.collection("board").find().toArray();

  if (request.method === "GET") {
    return response.status(200).json(result);
  }
}