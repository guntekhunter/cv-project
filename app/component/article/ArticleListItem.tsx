import Link from "next/link";
import type { ArcticleItem } from "@/types";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface Props {
  category: string;
  articles: ArcticleItem[];
}

const ArticleItemList = ({ category, articles }: Props) => {
  const router = useRouter();
  return (
    <div className="flex flex-col gap-5">
      <h2 className="font-cormorantGaramond text-[2rem]">Blog</h2>
      <div className="flex-col gap-[3rem] font-poppins text-[.8rem] grid md:grid-cols-3">
        {articles.map((article) => (
          <div
            className="rounded-md p-[2rem] space-y-[.5rem] bg-white cursor-pointer border border-[#d4d4d4]"
            key={article.id}
            onClick={() => router.push(`/${article.id}`)}
          >
            <div className="w-full h-[150px] overflow-hidden rounded-md">
              <Image
                src={`${article.image}`}
                alt=""
                width={1000}
                height={1000}
                className="w-full h-full object-cover object-top"
              />
            </div>
            <div>
              <p
                // href={`/${article.id}`}
                className="text-neutral-900 hover:text-secondary transition duration-150 font-bold pb-[.3rem] "
              >
                {article.title}
              </p>
              <p className="text-[.7rem] opacity-30 ">{article.date}</p>
            </div>
            <p className="text-[.7rem]">{article.metadata}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArticleItemList;
