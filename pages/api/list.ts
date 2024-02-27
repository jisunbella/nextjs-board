import { connectDB } from "@/util/database";

export default async function handler(request: any, response: any) {
  const db = (await connectDB).db("myapp");
  const result = await db
    .collection("board")
    .find()
    .sort({ created_time: -1 }) // 날짜 내림차순인데 흠....
    .toArray();
  

  if (request.method === "GET") {
    return response.status(200).json(result);
  }
}