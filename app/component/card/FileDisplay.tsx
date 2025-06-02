"use client";
import { getAllData } from "@/app/fetch/get/fetch";
import React, { useEffect, useRef, useState } from "react";

export default function FileDisplay(props: any) {
  const [biodata, setBiodata] = useState<any>(null);
  const [socialMedia, setSocialMedia] = useState<any>([]);
  const [skills, setSkills] = useState<any>([]);
  const step = props.step;
  const [cvId, setCvId] = useState<number>(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [sectionHeight, setSectionHeight] = useState<number>(0);

  useEffect(() => {
    if (sectionRef.current) {
      const { height } = sectionRef.current.getBoundingClientRect();
      setSectionHeight(height);
    }
  }, [biodata, socialMedia]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const cvIdString = localStorage.getItem("cv_id");
      const parsedCvId = cvIdString !== null ? parseInt(cvIdString) : 0;
      setCvId(parsedCvId);
    }
  }, []);

  useEffect(() => {
    if (cvId > 0) {
      const getAllTheData = async () => {
        const personalIdString = localStorage.getItem("personal_id");
        const personalId =
          personalIdString !== null ? parseInt(personalIdString) : 0;
        const res = await getAllData(cvId, personalId);
        if (res) {
          setBiodata(res?.data.biodata);
          if (res?.data.socialMedias) {
            setSocialMedia(res?.data.socialMedias);
          }
          setSkills(res?.data.others);
        }
      };
      getAllTheData();
    }
  }, [step, cvId]);

  return (
    <div className="bg-[#F6F6F6] w-full h-[90%] overflow-y-scroll flex p-[2rem] justify-around text-[.5rem]">
      <div
        className="w-full mx-[1rem] my-[1rem] bg-white px-[2rem] py-[2rem]"
        ref={sectionRef}
      >
        <div className="flex bg-white">
          <div className="w-[20%]">photo</div>
          <div className="w-[80%]">
            <h1 className="font-bold text-[.8rem]">{biodata?.name}</h1>
            <div className="text-[.4rem]">
              <div className="flex space-x-1">
                {console.log("socialMedia in JSX:", socialMedia)}
                {socialMedia?.map((item: any, index: number) => (
                  <p key={index}>
                    {item?.link_or_number}
                    {index !== socialMedia.length - 1 && (
                      <span className="mx-1">|</span>
                    )}
                  </p>
                ))}
              </div>
              <div className="pt-[2rem]">
                <p className="italic">{biodata?.address}</p>
                <p>{biodata?.professional_summary}</p>
              </div>
            </div>
          </div>
        </div>
        {/* skills */}
        <div>
          <div className="pt-[1rem]">
            <h2 className="font-bold text-[.5rem]">
              Keterampilan Teknis, Keterampilan Non Teknis dan Pencapaian
            </h2>
            <ul className="list-disc pl-5">
              {skills.map((item: any, index: any) => (
                <li key={index}>
                  <span>{item?.type}</span>
                  <span>{item?.name}</span>
                  <span>{item?.year}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* experience */}
        <div>
          <div className="space-y-[.5rem]">
            <h2 className="font-bold text-[.5rem]">Pengalaman Kerja</h2>
            <div className="flex w-full justify-between">
              <div>
                <p className="text-[.5rem]">
                  <span className="font-bold">Ommaleka</span>
                </p>
              </div>
              <div>asdasd</div>
            </div>

            <p className="italic">Penuh Waktu</p>

            <p>
              PEVESINDO Merupakan store brand dari PT. Aslastri Teguh
              International merupakan produsen sekaligus distributor plafon PVC,
              lantai SPC, lantai vinyl, dan wallpanel WPC dan berbagai produk
              PVC lainnya.
            </p>
            <ul className="list-disc pl-5">
              <li>
                <span>type year</span>
                <span>aasdasd</span>
              </li>
            </ul>
          </div>
          <div className="space-y-[.5rem]">
            <h2 className="font-bold text-[.5rem]">Pengalaman Kerja</h2>
            <div className="flex w-full justify-between">
              <div>
                <p className="text-[.5rem]">
                  <span className="font-bold">Ommaleka</span>
                </p>
              </div>
              <div>asdasd</div>
            </div>

            <p className="italic">Penuh Waktu</p>

            <p>
              PEVESINDO Merupakan store brand dari PT. Aslastri Teguh
              International merupakan produsen sekaligus distributor plafon PVC,
              lantai SPC, lantai vinyl, dan wallpanel WPC dan berbagai produk
              PVC lainnya.
            </p>
            <ul className="list-disc pl-5">
              <li>
                <span>type year</span>
                <span>aasdasd</span>
              </li>
            </ul>
          </div>
        </div>

        {/* education */}
        <div className="space-y-[.5rem]">
          <h2 className="font-bold text-[.5rem]">Riwayat Pendidikan</h2>
          <div className="flex w-full justify-between">
            <div>
              <p className="text-[.5rem]">
                <span className="font-bold">Ommaleka</span>
              </p>
            </div>
            <div>asdasd</div>
          </div>

          <p className="italic">Penuh Waktu</p>

          <p>
            PEVESINDO Merupakan store brand dari PT. Aslastri Teguh
            International merupakan produsen sekaligus distributor plafon PVC,
            lantai SPC, lantai vinyl, dan wallpanel WPC dan berbagai produk PVC
            lainnya.
          </p>
          <ul className="list-disc pl-5">
            <li>
              <span>type year</span>
              <span>aasdasd</span>
            </li>
          </ul>
        </div>
        {/* organisation */}
        <div className="space-y-[.5rem]">
          <h2 className="font-bold text-[.5rem]">Pengalaman Berorganisasi</h2>
          <div className="flex w-full justify-between">
            <div>
              <p className="text-[.5rem]">
                <span className="font-bold">Ommaleka</span>
              </p>
            </div>
            <div>asdasd</div>
          </div>

          <p className="italic">Penuh Waktu</p>

          <p>
            PEVESINDO Merupakan store brand dari PT. Aslastri Teguh
            International merupakan produsen sekaligus distributor plafon PVC,
            lantai SPC, lantai vinyl, dan wallpanel WPC dan berbagai produk PVC
            lainnya.
          </p>
          <ul className="list-disc pl-5">
            <li>
              <span>type year</span>
              <span>aasdasd</span>
            </li>
          </ul>
        </div>
        {/* organisation */}
        <div className="space-y-[.5rem]">
          <h2 className="font-bold text-[.5rem]">Pengalaman Berorganisasi</h2>
          <div className="flex w-full justify-between">
            <div>
              <p className="text-[.5rem]">
                <span className="font-bold">Ommaleka</span>
              </p>
            </div>
            <div>asdasd</div>
          </div>

          <p className="italic">Penuh Waktu</p>

          <p>
            PEVESINDO Merupakan store brand dari PT. Aslastri Teguh
            International merupakan produsen sekaligus distributor plafon PVC,
            lantai SPC, lantai vinyl, dan wallpanel WPC dan berbagai produk PVC
            lainnya.
          </p>
          <ul className="list-disc pl-5">
            <li>
              <span>type year</span>
              <span>aasdasd</span>
            </li>
          </ul>
        </div>
        {/* organisation */}
        <div className="space-y-[.5rem]">
          <h2 className="font-bold text-[.5rem]">Pengalaman Berorganisasi</h2>
          <div className="flex w-full justify-between">
            <div>
              <p className="text-[.5rem]">
                <span className="font-bold">Ommaleka</span>
              </p>
            </div>
            <div>asdasd</div>
          </div>

          <p className="italic">Penuh Waktu</p>

          <p>
            PEVESINDO Merupakan store brand dari PT. Aslastri Teguh
            International merupakan produsen sekaligus distributor plafon PVC,
            lantai SPC, lantai vinyl, dan wallpanel WPC dan berbagai produk PVC
            lainnya.
          </p>
          <ul className="list-disc pl-5">
            <li>
              <span>type year</span>
              <span>aasdasd</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
