"use client";

import { useEffect, useState } from "react";

export default function Comment(props: { _parentId: string }) {
  const [comment, setComment] = useState("");
  const [commentList, setCommentList] = useState<any[]>([]);

  useEffect(() => {
    fetch(`/api/comment/list?id=${props._parentId}`)
      .then(res => res.json())
      .then((data: any) => {
        setCommentList(data);
      })
  }, []);

  const handleInput = () => {
    fetch("/api/comment/create", {
      method: "POST",
      body: JSON.stringify({
        comment: comment,
        _parentId: props._parentId
      })
    })
      .then((res) => res.json())
      .then((data) => {
        fetch(`/api/comment/list?id=${props._parentId}`)
          .then(res => res.json())
          .then((data: any) => {
            setCommentList(data);
            setComment("");
          })
      });
  };

  const handleOnKeyUp = (e: any) => {
    e.preventDefault();
    if (e.key === "Enter") {
      handleInput();
    };
  };

  return (
    <div className='comment-box'>
      <h4 className='comment-title'>댓글</h4>
      <div>
        {
          commentList.length > 0
            ? commentList.map((el: any, index: number) => (
              <div key={index}>
                <span>{el.content}</span> -
                <span>{el.author_name}</span>
                <button>🩷</button><span>0</span>
              </div>
            ))
            : <div>댓글이 없습니다.</div>
        }
      </div>
      <hr />
      <div className='comment-register'>
        <input
          onChange={(e) => {
            setComment(e.target.value)
          }}
          value={comment}
          onKeyUp={handleOnKeyUp}
          className="comment-input"
        />
        <button
          onClick={handleInput}
          className="comment-btn"
        >등록</button>
      </div>
    </div>
  )
}