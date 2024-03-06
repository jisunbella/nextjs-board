import Post from "@/components/Post";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";


export default async function Detail(props: any) {
  const postId = props.params.id; // string 형태의 id값
  const session = await getServerSession(authOptions); // 서버 컴포넌트, 서버 기능 안에서만 사용 가능
 
  return (
    <div className="container">
      <Post postId={postId} session={session} />
    </div>
  )
}