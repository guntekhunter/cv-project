"use client";

import { useEffect, useState } from "react";
import { getAllArticles } from "../fetch/get/fetch";
import ArticleItemList from "../component/article/ArticleListItem";

export default function Page() {
  const [articles, setArticles] = useState([]);
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await getAllArticles("agung");
        setArticles(res?.data.data);
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    };
    fetchArticles();
  }, []);
  return (
    <div className="w-full flex justify-center md:py-[7rem]">
      <div className="w-[80%]">
        {articles !== null &&
          Object.keys(articles).map((article: any) => (
            <ArticleItemList
              category={article}
              articles={articles[article]}
              key={article}
            />
          ))}
      </div>
    </div>
  );
}
