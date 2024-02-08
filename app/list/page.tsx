import { connectDB } from "@/util/database";
import Link from "next/link";
import ListItem from "./ListItem";

export default async function List() {
  const db = (await connectDB).db("myapp");
  const result = await db.collection("board").find().toArray();

  return (
    <div className="list-bg">
      <button>
        <Link href="/write">글쓰기</Link>
      </button>
      <ListItem result={result} />
    </div>
  )
}