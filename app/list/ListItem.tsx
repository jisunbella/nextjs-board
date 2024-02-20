"use client";
import Link from "next/link";

export default function ListItem(props: any) {
  const { result } = props;

  return (
    result?.map((el: any, index: number) => (
      <div className="item list-item" key={index}>
        <Link href={`/detail/${el._id}`}>
          <h4>{el.title}</h4>
        </Link>
        <div className="list-btn">
          <Link href={`/edit/${el._id}`}>✏️</Link>
          <span onClick={(event: any) => {
            fetch(`/api/post/delete/${el._id}`, {
              method: "DELETE"
            }).then((res) => {
              res.json();
            }).then((res) => {
              // location.reload();
              event.target.parentElement.parentElement.style.display = "none";
              // setTimeout(() => {
              // }, 1000)
            }).catch((error) => {
              console.log(error);
            })

            // fetch 사용해서 ajax 통신
            // fetch(`/api/post/delete`, {
            //   method: "DELETE",
            //   body: JSON.stringify({
            //     _id: el._id
            //   })
            // }).then((res) => {
            //   return res.json();
            // }).then((res) => {
            //   e.target.parentElement.parentElement.style.opacity = 0;
            //   setTimeout(() => {
            //     e.target.parentElement.parentElement.style.display = "none";
            //   }, 1000)
            // }).catch((error) => {
            //   console.log(error);
            // })
          }}>🗑️</span>
        </div>
      </div>
    ))
  )
}