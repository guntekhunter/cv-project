import BulletList from "@/app/function/BulletPointFormatter";
import { DateFormater } from "@/app/function/DateFormater";
import Image from "next/image";

export default function One(props: any) {
  console.log(props.step);
  return (
    <div className="p-[2rem]">
      <div
        className={`flex bg-white overflow-visible space-x-[1rem] ${
          props.biodata ? "" : "hidden"
        }`}
      >
        <div className="md:w-[20%]">
          {props.step === 7 ? (
            <>
              {props.image && (
                <div
                  className="relative z-0 photo-target md:w-[113.39px] md:h-[151.18px] overflow-hidden 
             sm:w-[113.39px] sm:h-[151.18px] 
             w-[75px] h-[95px]" // fallback mobile size
                >
                  <Image
                    src={props.image}
                    alt="ommaleka"
                    fill
                    className="object-contain"
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
        <div className="w-[80%]">
          <h1
            className={`font-bold ${
              props.step !== 7
                ? "md:text-[.9rem] text-[.7rem]"
                : "md:text-[1.9rem] text-[1.7rem]"
            } `}
          >
            {props.biodata?.name}
          </h1>
          <div
            className={`${props.step !== 7 ? "md:text-[.3rem] text-[.2rem]" : "md:text-[.6rem] text-[.3rem]"} `}
          >
            <div className="flex md:space-x-1 space-x-[.1rem]">
              {console.log("socialMedia in JSX:", props.socialMedia)}
              {props.socialMedia?.map((item: any, index: number) => (
                <p key={index}>
                  {item?.link_or_number}
                  {index !== props.socialMedia.length - 1 && (
                    <span className="mx-1">|</span>
                  )}
                </p>
              ))}
            </div>
            <div className="md:pt-[2rem] pt-[1rem]">
              <p className="italic">{props.biodata?.address}</p>
              <p>{props.biodata?.professional_summary}</p>
            </div>
          </div>
        </div>
      </div>
      {/* skills */}
      <div
        className={`${Array.isArray(props.groupedSkills) && props.groupedSkills.length > 0 ? "" : "hidden"} md:pt-[1.5rem] pt-[.9rem]`}
      >
        <div className="md:pt-[1rem] pt-[.5rem]">
          <h2
            className={`font-bold ${
              props.step !== 7
                ? "md:text-[.4rem] text-[.5rem]"
                : "md:text-[.8rem] text-[.5rem]"
            }`}
          >
            Keterampilan Teknis, Keterampilan Non Teknis dan Pencapaian
          </h2>
          <div className="border md:border-b-[1.2px] border-b-[.5px] border-gray-950 md:my-[.5rem] my-[.2rem]" />
          <ul
            className={`list-disc md:pl-5 pl-[.5rem] ${
              props.step !== 7
                ? "md:text-[.3rem] text-[.2rem]"
                : "md:text-[.6rem] text-[.3rem]"
            }`}
          >
            {props.groupedSkills.map((group: any, index: any) => (
              <li key={index}>
                <strong>
                  {group.title}: {group.profider}
                </strong>{" "}
                {group.items}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* experience */}
      <div
        className={`${Array.isArray(props.jobs) && props.jobs.length > 0 ? "" : "hidden"} md:pt-[1.5rem] pt-[.9rem]`}
      >
        <div className="md:space-y-[.5rem] space-y-[.2rem]">
          <h2
            className={`font-bold ${
              props.step !== 7
                ? "md:text-[.4rem] text-[.5rem]"
                : "md:text-[.8rem] text-[.5rem]"
            }`}
          >
            Pengalaman Kerja
          </h2>
          <div className="border md:border-b-[1.2px] border-b-[.5px] border-gray-950 md:my-[.5rem] my-[.2rem]" />
          <div className="md:space-y-[1rem] space-y-[.5rem]">
            {props?.jobs?.map((item: any, index: any) => (
              <div
                className={`md:space-y-[.5rem] space-y-[.1rem] ${
                  props.step !== 7
                    ? "md:text-[.3rem] text-[.2rem]"
                    : "md:text-[.6rem] text-[.3rem]"
                } `}
                key={index}
              >
                <div className="flex w-full justify-between">
                  <div>
                    <p className="">
                      <span className="font-bold">{item.company_name}</span>
                      <span className="font-bold"> - </span>
                      <span className="text-gray-500">
                        {" "}
                        {item.company_address}
                      </span>
                    </p>
                  </div>
                  <div>
                    {DateFormater(item.start_date)} -{" "}
                    {DateFormater(item.end_date)}
                  </div>
                </div>

                <p className="italic">{`${item.job_name} ${item.job_type}`}</p>

                <p>{item.company_description}</p>
                <BulletList text={item.responsibility} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* education */}
      <div
        className={`${Array.isArray(props.educations) && props.educations.length > 0 ? "" : "hidden"} md:pt-[1.5rem] pt-[.9rem]`}
      >
        <h2
          className={`font-bold ${
            props.step !== 7
              ? "md:text-[.4rem] text-[.2rem]"
              : "md:text-[.8rem] text-[.4rem]"
          }`}
        >
          Riwayat Pendidikan
        </h2>
        <div className="border md:border-b-[1.2px] border-b-[.5px] border-gray-950 md:my-[.5rem] my-[.2rem]" />
        <div className="md:space-y-[1rem] space-y-[.2rem]">
          {props?.educations?.map((item: any, index: any) => (
            <div
              className={`md:space-y-[.1rem] space-y-[.1rem] ${
                props.step !== 7
                  ? "md:text-[.3rem] text-[.2rem]"
                  : "md:text-[.6rem] text-[.3rem]"
              } `}
              key={index}
            >
              <div className="flex w-full justify-between">
                <div className="w-[60%] space-y-0">
                  <p className="">
                    <span className="font-bold">{item.school_name}</span>
                    <span className="font-bold"> - </span>
                    <span className="text-gray-500">
                      {" "}
                      {item.school_address}
                    </span>
                  </p>
                </div>
                <div>
                  {DateFormater(item.start_date)} -{" "}
                  {DateFormater(item.end_date)}
                </div>
              </div>
              {item.education_type === "universitas" && (
                <p className="italic">{`${item?.major}, IPK ${item.ipk}`}</p>
              )}
            </div>
          ))}
        </div>
      </div>
      {/* organisation */}
      <div
        className={`${Array.isArray(props.organisations) && props.organisations.length > 0 ? "" : "hidden"} md:pt-[1.5rem] pt-[.9rem]`}
      >
        <h2
          className={`font-bold ${
            props.step !== 7
              ? "md:text-[.4rem] text-[.5rem]"
              : "md:text-[.8rem] text-[.5rem]"
          }`}
        >
          Pengalaman Berorganisasi
        </h2>
        <div className="border md:border-b-[1.2px] border-b-[.5px] border-gray-950 md:my-[.5rem] my-[.2rem]" />
        <div className="space-y-[1rem]">
          {props?.organisations?.map((item: any, index: any) => (
            <div
              key={index}
              className={`${props.step !== 7 ? "md:text-[.3rem] text-[.2rem]" : "md:text-[.6rem] text-[.3rem]"}`}
            >
              <div className="flex w-full justify-between ">
                <div className="w-[60%]">
                  <p>
                    <span className="font-bold">{item.organisation_name}</span>
                    <span className="font-bold"> - </span>
                    <span className="text-gray-500"> {item.address}</span>
                  </p>
                </div>
                <div>
                  {DateFormater(item.start_date)} -{" "}
                  {DateFormater(item.end_date)}
                </div>
              </div>
              <p className="italic">{item.division}</p>
              <BulletList text={item.responsibility} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
