import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";
import Comment from "../../../components/Comment";

export default async function Detail(props: any) {
  const db = (await connectDB).db("myapp");
  const result = await db.collection("board").findOne({ _id: new ObjectId(props.params.id) });

  return (
    <div className="container">
      <div className='content-box'>
        <h4 className='content-title'>{result?.title}</h4>
        <div className='content-author'>{result?.author_name}</div>
        <p className='content-text'>{result?.content}</p>
      </div>
      <hr />
      <Comment _parentId={result?._id.toString()} />
    </div>
  )
}