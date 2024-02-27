import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";
import Comment from "../../../components/Comment";
import PostBtns from "@/components/PostBtns";

export default async function Detail(props: any) {
  const db = (await connectDB).db("myapp");
  const result = await db.collection("board").findOne({ _id: new ObjectId(props.params.id) });

  return (
    <div className="container">
      <PostBtns postId={props.params.id} />
      <div className='content-box'>
        <h4 className='content-title'>{result?.title}</h4>
        <div className='content-author'>작성자: {result?.author_name}</div>
        <p className='content-text'>{result?.content}</p>
      </div>
      <Comment _parentId={result?._id.toString()} />
    </div>
  )
}