import Link from "next/link";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import { getArticleData, getSortedArticles } from "@/lib/article";

type PageProps = {
  params: {
    slug: string;
  };
};

export async function generateStaticParams() {
  const articles = await getSortedArticles();
  return articles.map((article) => ({
    slug: article.id,
  }));
}

const Article = async ({ params }: PageProps) => {
  const articleData = await getArticleData(params.slug);

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
        <p className="text-[.8rem] text-gray-500 italic">
          {articleData.date.toString()}
        </p>
        <article
          className="prose prose-zinc max-w-none text-[.7rem] md:text-base"
          dangerouslySetInnerHTML={{ __html: articleData.constHtml }}
        />
      </div>
    </section>
  );
};

export default Article;
