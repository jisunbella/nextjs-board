"use client";

import { useEffect, useState } from "react";

export default function Comment(props: any) {
  const { _parentId } = props;
  const [comment, setComment] = useState("");
  const [commentList, setCommentList] = useState<any[]>([]);

  
  useEffect(() => {
    console.log("_parentId", _parentId)
    fetch(`/api/comment/list?id=${_parentId}`)
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
        _parentId: _parentId
      })
    })
      .then((res) => res.json())
      .then((data) => {
        fetch(`/api/comment/list?id=${_parentId}`)
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
              <div key={index} className="comment-content">
                <div className='comment-author'>{el.author_name}</div>
                <div className='comment-text'>{el.content}</div>
              </div>
            ))
            : <div>댓글이 없습니다.</div>
        }
      </div>
      <div className='comment-register'>
        <input
          onChange={(e) => {
            setComment(e.target.value)
          }}
          value={comment}
          onKeyUp={handleOnKeyUp}
          className="comment-input"
          placeholder='댓글을 입력해 주세요.'
        />
        <button
          onClick={handleInput}
          className="comment-btn"
        >등록</button>
      </div>
    </div>
  )
}