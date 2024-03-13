import { connectDB } from "@/util/database"
import { revalidateTag } from "next/cache";

export default async function Write2() {
  const db = (await connectDB).db("myapp")
  const result = db.collection("post_test").find().toArray();
  console.log("result", result);

  // Next.js의 Server action
  // 한 페이지 안에서 모든 것이 다 가능하므로 서버 api 만들 필요 없다
  async function handleSubmit(formData: any) {
    "use server" // 자동으로 서버 api가 됨
    
    const db = (await connectDB).db("myapp")
    db.collection("post_test").insertOne({
      title: formData.get("title")
    });
    revalidateTag("/write2"); // 새로고침 - revalidateTag, revalidatePath
  }

  return (
    <div>
      <form action={handleSubmit}>
        <input name="title"></input>
        <button type="submit">버튼</button>
      </form>
      
      {
        result
          ? (await result).map((a) => (
            <p>글 제목: {a.title}</p>
          ))
          : null
      }
    </div>
  )
}

// client component 에서 쓰려면
// use server하는 메소드를 따로 파일을 빼서 만들어서 import해서 사용해야함