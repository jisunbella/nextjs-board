import { connectDB } from "@/util/database";
import Link from "next/link";
import { ObjectId } from "mongodb";

export default async function Edit(props: any) {
  const db = (await connectDB).db("myapp");
  const result = await db.collection("board").findOne({ _id: new ObjectId(props.params.id) });

  return (
    <div className="container">
      <h4>수정하기</h4>
      <form action="/api/post/edit/" method="POST">
        <input name="_id" defaultValue={result?._id.toString()} style={{ display: "none" }} />
        <input name="title" defaultValue={result?.title} />
        <input name="content" defaultValue={result?.content} />
        <button type="submit">수정</button>
        <button><Link href="/list">취소</Link></button>
      </form>
    </div>
  )
}