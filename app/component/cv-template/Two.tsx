import BulletList from "@/app/function/BulletPointFormatter";
import { DateFormater } from "@/app/function/DateFormater";
import Image from "next/image";

export default function Two(props: any) {
  return (
    <div className="min-h-screen overflow-visible flex shadow-md">
      <div className="bg-[#F3F4F6] min-h-screen w-[33%] flex md:pb-[2rem]">
        <div className="w-full md:px-[2rem] px-[.7rem]">
          <div className="w-full flex justify-left md:pt-[2rem] pt-[0rem]">
            {props.step === 7 ? (
              <>
                {props.image && (
                  <div className="relative z-0 photo-target md:w-[113.39px] md:h-[151.18px] overflow-hidden w-[50px] h-[100px]">
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
          <div className="md:pt-[1rem] md:space-y-[1rem]">
            <div>
              <h2
                className={`${
                  props.step !== 7
                    ? "md:text-[.4rem] text-[.5rem]"
                    : "md:text-[.7rem] text-[.5rem]"
                } font-bold`}
              >
                Alamat
              </h2>
              <p
                className={`${
                  props.step !== 7
                    ? "md:text-[.3rem] text-[.25rem]"
                    : "md:text-[.6rem] text-[.25rem]"
                }`}
              >
                {props?.biodata?.address}
              </p>
            </div>
            <div
              className={`${!props?.socialMedia.length ? "hidden" : ""} md:pt-0 pt-[.5rem]`}
            >
              <h2
                className={`${
                  props.step !== 7
                    ? "md:text-[.4rem] text-[.4rem]"
                    : "md:text-[.7rem] text-[.4rem]"
                } font-bold`}
              >
                Kontak
              </h2>
              <div className="md:pb-[.2rem] pb-[.2rem] w-full">
                {props?.socialMedia?.map((item: any, index: number) => (
                  <div
                    key={index}
                    className={`grid grid-cols-[30%_5%_auto] items-start ${
                      props.step !== 7
                        ? "md:text-[.3rem] text-[.25rem]"
                        : "md:text-[.5rem] text-[.25rem]"
                    }`}
                  >
                    <p className="whitespace-nowrap">{item.name}</p>
                    <p className="whitespace-nowrap">:</p>
                    <p className="break-all w-full">{item.link_or_number}</p>
                  </div>
                ))}
                <div
                  className={`grid grid-cols-[30%_5%_auto] items-start md:pb-[.2rem] pb-[.2rem] ${
                    props.step !== 7
                      ? "md:text-[.3rem] text-[.25rem]"
                      : "md:text-[.5rem] text-[.25rem]"
                  }`}
                >
                  <p className="whitespace-nowrap">Email</p>
                  <p className="whitespace-nowrap">:</p>
                  <p className="break-words">{props.biodata?.myemail}</p>
                </div>
                <div
                  className={`grid grid-cols-[30%_5%_auto] items-start ${
                    props.step !== 7
                      ? "md:text-[.3rem] text-[.25rem]"
                      : "md:text-[.5rem] text-[.25rem]"
                  }`}
                >
                  <p className="whitespace-nowrap">No Hp</p>
                  <p className="whitespace-nowrap">:</p>
                  <p className="break-words">{props.biodata?.no_hp}</p>
                </div>
              </div>
            </div>
          </div>
          {/* skills */}
          <div
            className={`${Array.isArray(props.groupedSkills) && props.groupedSkills.length > 0 ? "" : "hidden"} md:pt-[1.5rem]`}
          >
            <div className="pt-[1rem]">
              <h2
                className={`font-bold ${
                  props.step !== 7
                    ? "md:text-[.4rem] text-[.5rem]"
                    : "md:text-[.8rem] text-[.5rem]"
                }`}
              >
                Keterampilan dan Pencapaian
              </h2>
              <hr className="my-1 border-t border-black" />
              <ul
                className={`list-disc pl-[.5rem] space-y-1 ${
                  props.step !== 7
                    ? "md:text-[.3rem] text-[.25rem]"
                    : "md:text-[.6rem] text-[.25rem]"
                }`}
              >
                {props.groupedSkills?.map((group: any, index: any) => (
                  <li key={index}>
                    <strong>{group.title}:</strong> {group.items}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          {/* Education */}
          <div
            className={`${Array.isArray(props.educations) && props.educations.length > 0 ? "" : "hidden"} md:pt-[1.5rem]`}
          >
            <h2
              className={`font-bold ${
                props.step !== 7
                  ? "md:text-[.4rem] text-[.5rem]"
                  : "md:text-[.8rem] text-[.5rem]"
              }`}
            >
              Riwayat Pendidikan
            </h2>
            <hr className="my-1 border-t border-black" />
            <div className="md:space-y-[.2rem] space-y-[.3rem]">
              {props.educations?.map((item: any, index: any) => (
                <div
                  className={`md:space-y-[.1rem] ${
                    props.step !== 7
                      ? "md:text-[.3rem] text-[.25rem]"
                      : "md:text-[.6rem] text-[.25rem]"
                  } `}
                  key={index}
                >
                  <p className="">
                    <span className="font-bold">{item.school_name}</span>
                    <span className="font-bold"> - </span>
                    <span className="text-gray-500">
                      {" "}
                      {item.school_address}
                    </span>
                  </p>
                  <div>
                    {DateFormater(item.start_date)} -{" "}
                    {DateFormater(item.end_date)}
                  </div>
                  {item.education_type === "universitas" && (
                    <p className="italic">{`${item?.major}, IPK ${item.ipk}`}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* right side */}
      <div className="min-h-screen w-[70%] md:p-[2rem] p-[1rem]">
        <div>
          <h1
            className={`font-bold ${
              props.step !== 7
                ? "md:text-[.9rem] text-[1rem]"
                : "md:text-[1.9rem] text-[1rem]"
            } `}
          >
            {props.biodata?.name}
          </h1>
        </div>
        <div>
          <p
            className={`${props.step !== 7 ? "text-[.3rem]" : "md:text-[.5rem] text-[.25rem]"}`}
          >
            {props.biodata?.professional_summary}
          </p>
        </div>

        {/* jobs experience */}
        <div
          className={`${Array.isArray(props.jobs) && props.jobs.length > 0 ? "" : "hidden"} md:pt-[1.5rem] pt-[.5rem]`}
        >
          <div className="md:space-y-[.5rem] space-y-[.3rem]">
            <h2
              className={`font-bold ${
                props.step !== 7
                  ? "md:text-[.4rem] text-[.4rem]"
                  : "md:text-[.8rem] text-[.4rem]"
              }`}
            >
              Pengalaman Kerja
            </h2>
            <hr className="md:my-1 border-t border-black" />
            {props.jobs?.map((item: any, index: any) => (
              <div
                className={`space-y-[.5rem] ${
                  props.step !== 7
                    ? "md:text-[.3rem] text-[.25rem]"
                    : "md:text-[.6rem] text-[.25rem]"
                } `}
                key={index}
              >
                <div className="w-full grid grid-cols-[30%_auto] gap-[1rem] relative">
                  <div className="">
                    <p
                      className={`font-bold ${
                        props.step !== 7
                          ? "md:text-[.4rem] text-[.4rem]"
                          : "md:text-[.8rem] text-[.4rem]"
                      }`}
                    >
                      {item.company_name}
                    </p>
                    <div>
                      {DateFormater(item.start_date)} -{" "}
                      {DateFormater(item.end_date)}
                    </div>
                    <p className="text-gray-500">{item.company_address}</p>
                  </div>
                  <div className="w-full">
                    <p className="italic">{item.job_type}</p>

                    <p>{item.company_description}</p>
                    <BulletList text={item.responsibility} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* organisation */}
        <div
          className={`${Array.isArray(props.organisations) && props.organisations.length > 0 ? "" : "hidden"} pt-[1.5rem]`}
        >
          <h2
            className={`font-bold ${
              props.step !== 7
                ? "md:text-[.4rem] text-[.4rem]"
                : "md:text-[.8rem] text-[.4rem]"
            }`}
          >
            Pengalaman Berorganisasi
          </h2>
          <hr className="my-1 border-t border-black" />
          <div className="space-y-[1rem]">
            {props.organisations?.map((item: any, index: any) => (
              <div
                className={`space-y-[.5rem] ${
                  props.step !== 7
                    ? "md:text-[.3rem] text-[.25rem]"
                    : "md:text-[.6rem] text-[.25rem]"
                } `}
                key={index}
              >
                <div className="w-full grid grid-cols-[30%_auto] gap-[1rem] relative">
                  <div className="">
                    <p
                      className={`font-bold ${
                        props.step !== 7
                          ? "md:text-[.4rem] text-[.4rem]"
                          : "md:text-[.8rem] text-[.4rem]"
                      }`}
                    >
                      {item.organisation_name}
                    </p>
                    <div>
                      {DateFormater(item.start_date)} -{" "}
                      {DateFormater(item.end_date)}
                    </div>
                    <p className="text-gray-500">{item.address}</p>
                  </div>
                  <div className="w-full">
                    <p className="italic">{item.job_type}</p>

                    <p>
                      {item.type} divisi {item.division}
                    </p>
                    <BulletList text={item.responsibility} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
