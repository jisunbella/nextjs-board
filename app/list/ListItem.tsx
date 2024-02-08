"use client";
import Link from "next/link";

export default function ListItem(props: any) {
  const { result } = props;

  return (
    result?.map((el: any, index: number) => (
      <div className="list-item" key={index}>
        <Link href={`/detail/${el._id}`}>
          <h4>{el.title}</h4>
        </Link>
        <Link href={`/edit/${el._id}`}>✏️</Link>
        <span onClick={() => {
          fetch(`/api/post/delete`, {
            method: "DELETE",
            body: JSON.stringify({
              _id: el._id
            })
          }).then((res) => {
            return res.json();
          }).then((res) => {
            console.log(res);
          }).catch((error) => {
            console.log(error);
          })
        }}>🗑️</span>
        <p>1월 1일</p>
      </div>
    ))
  )
}