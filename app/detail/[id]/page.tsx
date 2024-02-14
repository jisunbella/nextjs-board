import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";

export default async function Detail(props: any) {
  const db = (await connectDB).db("myapp");
  const result = await db.collection("board").findOne({ _id: new ObjectId(props.params.id) });
  console.log(props);

  return (
    <div className="p-20">
      <h4>상세페이지</h4>
      <h4>제목: { result?.title }</h4>
      <p>내용: { result?.content }</p>
    </div>
  )
}