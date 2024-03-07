"use client";

import Link from "next/link";
import { useState } from "react";

type PostForm = {
  title: string;
  content: string;
}

const WritePostForm = () => {
  const [formData, setFormData] = useState<PostForm>({
    title: "",
    content: "",
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formData) {
      submitForm(formData);
    } else {
      alert("제목 또는 내용을 입력하세요.");
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  const submitForm = async (data: PostForm) => {
    try {
      const res = await fetch("/api/post/new", {
        method: "POST",
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message);
      }
    } catch (error: any) {
      alert(error.message);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="title"
        placeholder="제목"
        className="content-title content-title-write"
        value={formData?.title}
        onChange={handleChange}
      />
      <input
        name="content"
        placeholder="내용"
        className="content-text content-text-write" />
      <div className="below-btn">
        <button type="submit" className="register-btn">등록</button>
        <button><Link href="/list" className="cancel-btn">취소</Link></button>
      </div>
    </form>
  )
}

export default WritePostForm;