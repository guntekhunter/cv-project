// /lib/article.ts
import fs from "fs";
import matter from "gray-matter";
import path from "path";
import moment from "moment";
import { remark } from "remark";
import html from "remark-html";

import type { ArcticleItem } from "@/types";
import { title } from "process";
import { metadata } from "@/app/layout";

const articleDirectory = path.join(process.cwd(), "articles");

export const getSortedArticles = (): ArcticleItem[] => {
  const fileNames = fs.readdirSync(articleDirectory);

  const allArticleData = fileNames.map((fileName) => {
    const id = fileName.replace(/\.md$/, "");

    const fullPath = path.join(articleDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf-8");

    const matterResult = matter(fileContents);

    return {
      id,
      title: matterResult.data.title,
      date: matterResult.data.date,
      category: matterResult.data.category,
      metadata: matterResult.data.metadata,
      image: matterResult.data.image,
    };
  });

  return allArticleData.sort((a, b) => {
    const format = "DD-MM-YYYY";
    const dateOne = moment(a.date, format);
    const dateTwo = moment(b.date, format);
    return dateTwo.diff(dateOne); // descending
  });
};

export const getCategorisedArticles = (): Record<string, ArcticleItem[]> => {
  const articles = getSortedArticles();

  const categorisedArticles: Record<string, ArcticleItem[]> = {};

  articles.forEach((article) => {
    if (!categorisedArticles[article.category]) {
      categorisedArticles[article.category] = [];
    }
    categorisedArticles[article.category].push(article);
  });

  return categorisedArticles;
};

export const getArticleData = async (id: string) => {
  const fullPath = path.join(articleDirectory, `${id}.md`);

  const fileContents = fs.readFileSync(fullPath, "utf-8");

  const matterResult = matter(fileContents);

  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);

  const constHtml = processedContent.toString();

  return {
    id,
    constHtml,
    title: matterResult.data.title,
    category: matterResult.data.category,
    metadata: matterResult.data.metadata,
    image: matterResult.data.image,
    date: moment(matterResult.data.date, "DD/MM/YYYY").format("MMMMM Do YYYY"),
  };
};
