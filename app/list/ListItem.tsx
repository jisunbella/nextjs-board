"use client";

import Link from "next/link";

export default function ListItem(props: any) {
  const { result } = props;

  const getDate = (createdDate: any) => {
    const year = createdDate.getFullYear();
    const month = createdDate.getMonth();
    const date = createdDate.getDate();

    return year + "-" + month + "-" + date
  }

  return (
    <div className="table">
      <div className="table-header">
        <div className="table-num">번호</div>
        <div className="table-title">제목</div>
        <div className="table-author">작성자</div>
        <div className="table-date">작성일</div>
        {/* <div className="table-view">조회수</div> */}
      </div>
      {
        result.length !== 0
          ? result.map((el: any, index: number) => (
            <div className="list-item" key={index}>
              <div className="table-num">{index + 1}</div>
              <div className="table-title">
                <Link href={`/detail/${el._id}`}>{el.title}</Link>
              </div>
              <div className="table-author">{el.author_name}</div>
              <div className="table-date">{getDate(el.created_time)}</div>
            </div>
          ))
        : <div className="no-item">작성된 글이 없습니다.</div>
      }
    </div>
  )
}