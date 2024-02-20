import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";
import Comment from "../../../components/Comment";

export default async function Detail(props: any) {
  const db = (await connectDB).db("myapp");
  const result = await db.collection("board").findOne({ _id: new ObjectId(props.params.id) });

  return (
    <div className="container">
      <h4>상세페이지</h4>
      <h4>제목: {result?.title}</h4>
      <span>작성자: </span>
      <p>내용: {result?.content}</p>
      <hr />
      <Comment _parentId={result?._id.toString()} />
    </div>
  )
}