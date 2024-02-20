"use client";

import { useEffect, useState } from "react";

export default function Comment(props: { _parentId: string }) {
  const [comment, setComment] = useState("");

  useEffect(() => {
    fetch("/api/comment/")
  }, []);

  return (
    <div>
      <div>댓글</div>
      <div>
        {

        }
      </div>
      <hr />
      <input onChange={(e) => { setComment(e.target.value) }} />
      <button onClick={() => {
        fetch("/api/comment/create", {
          method: "POST",
          body: JSON.stringify({
            comment: comment,
            _parentId: props._parentId
          })
        })
      }}>등록</button>
    </div>
  )
}