"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import { getArticles } from "../fetch/get/fetch";

type ArticleData = {
  title: string;
  date: string;
  constHtml: string;
};

export default function Article() {
  const { slug } = useParams();
  const [articleData, setArticleData] = useState<ArticleData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    const fetchData = async () => {
      const res = await getArticles(slug);
setArticleData(res?.data.data);      
      setLoading(false);
    };
    fetchData();
  }, [slug]);

  if (loading || !articleData) return <div className="p-10">Loading...</div>;

  return (
    <section className="w-full flex justify-center md:py-[7rem] py-[5rem]">
      <div className="md:w-[60%] w-[80%] flex flex-col gap-5">
        <div className="flex justify-between font-poppins">
          <Link href="/blog" className="flex flex-row gap-1 place-items-center">
            <ArrowLeftIcon width={20} />
            <p>back to home</p>
          </Link>
        </div>
        <h1 className="font-bold md:text-[3rem] text-[1.6rem]">
          {articleData.title}
        </h1>
        <p className="text-[.8rem] text-gray-500 italic">{articleData.date}</p>
        <article
          className="prose prose-zinc max-w-none text-[.7rem] md:text-base"
          dangerouslySetInnerHTML={{ __html: articleData.constHtml }}
        />
      </div>
    </section>
  );
}
