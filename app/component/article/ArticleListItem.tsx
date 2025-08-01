import Link from "next/link";
import type { ArcticleItem } from "@/types";

interface Props {
  category: string;
  articles: ArcticleItem[];
}

const ArticleItemList = ({ category, articles }: Props) => {
  return (
    <div className="flex flex-col gap-5">
      <h2 className="font-cormorantGaramond text-[2rem]">{category}</h2>
      <div className="flex-col gap-[3rem] font-poppins text-[1rem] grid md:grid-cols-3">
        {articles.map((article) => (
          <div
            className="rounded-md shadow-md p-[2rem] space-y-[.5rem] max-w-full"
            key={article.id}
          >
            <div>
              <Link
                href={`/${article.id}`}
                className="truncate block text-sm text-neutral-900 hover:text-secondary transition duration-150 font-medium max-w-full"
              >
                {article.title}
              </Link>
              <p className="text-[.8rem] opacity-30">{article.date}</p>
            </div>

            <p className="text-[.8rem] text-neutral-700 line-clamp-2">
              {article.metadesctiption}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArticleItemList;
