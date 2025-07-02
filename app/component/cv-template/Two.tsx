import BulletList from "@/app/function/BulletPointFormatter";
import { DateFormater } from "@/app/function/DateFormater";
import Image from "next/image";

export default function Two(props: any) {
  return (
    <div className="min-h-screen h-screen overflow-visible flex">
      <div className="bg-gray-300 min-h-screen h-screen w-[30%] px-[2rem]">
        <div className="w-full flex justify-center pt-[2rem]">
          {props.step === 7 ? (
            <>
              {props.image && (
                <div
                  className="relative z-0 photo-target"
                  style={{
                    width: "113.39px",
                    height: "151.18px",
                    overflow: "hidden",
                  }}
                >
                  <Image
                    src={props.image}
                    alt="ommaleka"
                    fill
                    className="object-contain" // atau object-cover, sesuai kebutuhan
                  />
                </div>
              )}
            </>
          ) : (
            <>
              {props.image && (
                <Image
                  src={props.image}
                  alt="ommaleka"
                  width={500}
                  height={500}
                  className="w-full" // atau object-cover, sesuai kebutuhan
                />
              )}
            </>
          )}
        </div>
        <div className="py-[2rem]">
          <h1>Deskripsi Diri</h1>
          <p className="text-[.5rem]">{props.biodata?.professional_summary}</p>
        </div>
        <div>
          <h1>Kontak</h1>
          <div className="space-y-[.5rem] py-[.5rem]">
            {props.socialMedia?.map((item: any, index: number) => (
              <div key={index}>
                <p className="text-[.7rem] font-medium">{item.name}</p>
                <p className="text-[.5rem]">{item.link_or_number}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="bg-green-500 min-h-screen h-screen w-[70%]">askdjas</div>
    </div>
  );
}
