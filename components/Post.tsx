"use client";

import { useEffect, useState } from "react";
import Comment from "./Comment";
import PostBtns from "@/components/PostBtns";

// interface PostData {
//   _id: string;
//   title: string;
//   content: string;
//   author_id: string;
//   author_name: string;
//   created_time: Date;
// }

const Post = (props: any) => {
  console.log("PROPS >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>", props)
  const { postId, session } = props;
  // const [data, setData] = useState<PostData>();
  const [data, setData] = useState<any>();

  useEffect(() => {
    fetch(`/api/post/detail?id=${postId}`)
      .then((res) => {
        res.json();
      })
      .then((res: any) => {
        setData(res);

        console.log("DATA >>>>>>>>>>>>>>>>>>>>>>>>>>> ", data)
      })
      .catch(error => {
        console.error("Error fetching data", error);
      })
  }, []);

  return (
    <div>
      {
        session?.user?.email === data?.author_id ? (<PostBtns postId={postId} />) : null
      }
      <div className='content-box'>
        <h4 className='content-title'>{data?.title}</h4>
        <div className='content-author'>작성자: {data?.author_name}</div>
        <p className='content-text'>{data?.content}</p>
      </div>
      <Comment _parentId={data?._id} />
    </div>
  )
}

export default Post;