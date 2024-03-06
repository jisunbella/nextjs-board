"use client"
import Link from "next/link";
import { useRouter } from "next/navigation";

const PostBtns = (props: any) => {
  const { postId } = props;
  const router = useRouter();

  const deletePost = () => {
    const answer = window.confirm("삭제하시겠습니까?");
    if (answer) {
      fetch(`/api/post/delete/${postId}`, {
        method: "DELETE"
      }).then((res) => {
        res.json();
      }).then((res) => {
        router.push("/list");
      }).catch ((error) => {
        console.log(error);
      })
    }
  }

  return (
    <div className="postbtns">
      <span className="postbtns-edit"><Link href={`/edit/${postId}`}>수정</Link></span>
      <span className="postbtns-delete" onClick={deletePost}>삭제</span>
    </div>
  )
}

export default PostBtns;