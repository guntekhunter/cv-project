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
      <div className="flex-col gap-[3rem] font-poppins text-[1rem] grid grid-cols-2">
        {articles.map((article) => (
          <div className="rounded-md shadow-md p-[2rem]" key={article.id}>
            <Link
              href={`/${article.id}`}
              className="text-neutral-900 hover:text-secondary transition duration-150"
            >
              {article.title}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArticleItemList;
