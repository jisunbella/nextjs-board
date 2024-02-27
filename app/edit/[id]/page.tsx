import { connectDB } from "@/util/database";
import Link from "next/link";
import { ObjectId } from "mongodb";

export default async function Edit(props: any) {
  const db = (await connectDB).db("myapp");
  const result = await db.collection("board").findOne({ _id: new ObjectId(props.params.id) });

  return (
    <div className="container">
      <form action="/api/post/edit/" method="POST">
        <input
          name="_id"
          defaultValue={result?._id.toString()}
          style={{ display: "none" }} />
        <input
          className="content-title content-title-write"
          name="title"
          defaultValue={result?.title} />
        <input
          className="content-text content-text-write"
          name="content"
          defaultValue={result?.content} />
        <div className="below-btn">
          <button type="submit" className="register-btn">수정</button>
          <button><Link href="/list" className="cancel-btn">취소</Link></button>
        </div>
      </form>
    </div>
  )
}