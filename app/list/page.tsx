import { connectDB } from "@/util/database";
import Link from "next/link";
import ListItem from "./ListItem";

export const dynamic = "force-dynamic";

export default async function List() {
  const db = (await connectDB).db("myapp");
  const result = await db.collection("board").find().toArray();

  return (
    <div className="container list-bg">
      <div className="list-btn-write">
        <button className="btn-write">
          <Link href="/write">글쓰기</Link>
        </button>
      </div>
      <ListItem result={result} />
    </div>
  )
}