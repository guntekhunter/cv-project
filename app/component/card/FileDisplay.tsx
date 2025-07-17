"use client";
import { getAllData, getCv } from "@/app/fetch/get/fetch";
import BulletList from "@/app/function/BulletPointFormatter";
import { DateFormater } from "@/app/function/DateFormater";
import React, { useEffect, useRef, useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import JSConfetti from "js-confetti";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Button from "@/app/component/buttons/Button";
import LoginModal from "@/app/component/modal/LoginModal";
import One from "@/app/component/cv-template/One";
import Two from "@/app/component/cv-template/Two";
import { useParams } from "next/navigation";
import { generatePdfTextBased } from "@/app/function/template/generatePdfTextBased";
import { generatePdfTextBased2 } from "@/app/function/template/generatePdfTextBased2";

export default function Page(props: any) {
  const [biodata, setBiodata] = useState<any>(null);
  const [socialMedia, setSocialMedia] = useState<any>([]);
  const [skills, setSkills] = useState<any>([]);
  const [jobs, setJobs] = useState<any>([]);
  const [educations, setEducation] = useState<any>([]);
  const [organisations, setOrganisations] = useState<any>([]);
  const step = props.step;
  const [cvId, setCvId] = useState<number>(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [groupedSkills, setGroupedSkills] = useState<string[]>([]);
  const [groupedSkillsUi, setGroupedSkillsUi] = useState<
    { title: string; items: string }[]
  >([]);
  const [sectionHeight, setSectionHeight] = useState<number>(0);
  const pdfRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [type, setType] = useState(0 || null);
  const params = useParams(); // from `next/navigation`
  const userId = params.id;

  const pathname = usePathname();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) setToken(storedToken);
  }, [pathname]);

  useEffect(() => {
    if (sectionRef.current) {
      const { height } = sectionRef.current.getBoundingClientRect();
      setSectionHeight(height);
    }
  }, [biodata, socialMedia]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      let id = 0;

      if (typeof userId === "string") {
        id = parseInt(userId);
      } else {
        const cvIdString = localStorage.getItem("cv_id");
        id = cvIdString !== null ? parseInt(cvIdString) : 0;
      }

      setCvId(id);
    }
  }, [userId]);

  useEffect(() => {
    const fetchCv = async () => {
      try {
        const res = await getCv(cvId);
        setType(res?.data.cv.type);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCv();
  }, [cvId]);

  useEffect(() => {
    if (cvId > 0) {
      const getAllTheData = async () => {
        const personalIdString = localStorage.getItem("personal_id");
        const personalId =
          personalIdString !== null ? parseInt(personalIdString) : 0;

        const res = await getAllData(cvId, personalId);

        if (res?.data?.biodata?.photo) {
          setImage(res?.data.biodata.photo ?? "");
        }

        if (res) {
          setBiodata(res?.data.biodata);
          if (res?.data.socialMedias) {
            setSocialMedia(res?.data.socialMedias);
          }
          setSkills(res?.data.others);
          setJobs(res?.data.jobs);
          setEducation(res?.data.educations);
          setOrganisations(res?.data.organisations);

          const data = res?.data.others ?? [];

          // Grouping by year → provider → type
          const grouped: Record<
            string,
            Record<string, Record<string, string[]>>
          > = {};

          data.forEach(
            ({
              name,
              type,
              year,
              profider,
            }: {
              name: string;
              type: string;
              year: string;
              profider?: string;
            }) => {
              const safeProfider = profider?.trim() || ""; // handle undefined/null

              if (!grouped[year]) grouped[year] = {};
              if (!grouped[year][safeProfider])
                grouped[year][safeProfider] = {};
              if (!grouped[year][safeProfider][type])
                grouped[year][safeProfider][type] = [];
              grouped[year][safeProfider][type].push(name);
            }
          );

          const typeLabels: Record<string, string> = {
            hard_skils: "Keahlian Teknis",
            soft_skils: "Keahlian Nonteknis",
            certificate: "Sertifikat",
            hoby: "Hobi",
          };

          // Generate summary string output
          const output: string[] = [];
          const outputUi: { title: string; items: string }[] = [];

          Object.keys(grouped)
            .sort()
            .forEach((year) => {
              const profiders = grouped[year];
              Object.keys(profiders).forEach((profider) => {
                const types = profiders[profider];
                Object.entries(types).forEach(([type, names]) => {
                  const label = typeLabels[type.toLowerCase()] || type;

                  const profiderLabel = profider ? ` dari ${profider}` : "";
                  const profiderYear = year ? `(${year})` : "";

                  output.push(
                    `${label}${profiderLabel} (${year}): ${names.join(", ")}`
                  );

                  outputUi.push({
                    title: `${label}${profiderLabel} ${profiderYear}`,
                    items: names.join(", "),
                  });
                });
              });
            });

          setGroupedSkills(output);
          setGroupedSkillsUi(outputUi);
        }
      };

      getAllTheData();
    }
  }, [step, cvId]);

  useEffect(() => {
    return () => {
      if (image) URL.revokeObjectURL(image);
    };
  }, [image]);

  const handleDownloadPDF = async () => {
    if (!token) {
      setOpenModal(true);
      return;
    }

    if (!token) {
      setOpenModal(true);
      return;
    }

    const getBase64FromUrl = async (url: string): Promise<string> => {
      const res = await fetch(url);
      const blob = await res.blob();

      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = () => {
          resolve(reader.result as string);
        };
        reader.onerror = reject;
      });
    };

    if (image) {
      const base64Image = await getBase64FromUrl(image); // ✅ image is guaranteed string here

      if (type === 0) {
        generatePdfTextBased({
          biodata: { ...biodata, photo: base64Image },
          socialMedia,
          groupedSkills,
          jobs,
          educations,
          organisations,
        });
      } else if (type === 1) {
        generatePdfTextBased2({
          biodata: { ...biodata, photo: base64Image },
          socialMedia,
          groupedSkills,
          jobs,
          educations,
          organisations,
        });
      }
    }
    setLoading(false);
    localStorage.setItem("id_cv", `${cvId}`);
  };

  useEffect(() => {
    const fetch = () => {
      const jsConfetti = new JSConfetti();
      jsConfetti.addConfetti({
        confettiColors: ["#1FC578", "#00371A", "#00FF89", "#338F64"],
      });
    };
    if (step === 7) {
      fetch();
    }
  }, [step]);

  return (
    <div
      className={`bg-[#F6F6F6] w-full min-h-screen flex flex-col p-[2rem] justify-around relative ${
        step !== 7 ? "text-[.5rem]" : "text-[1rem]"
      }  relative text-black`}
    >
      <div className="w-full relative">
        <Button
          loading={loading}
          onClick={handleDownloadPDF}
          className={`top-[5rem] right-4 z-[1] w-auto px-4 py-2 bg-secondary text-accent rounded transition-opacity duration-500 delay-300 opacity-100 hover:bg-secondary hover:opacity-80 shadow-lg text-[.8rem] ${
            step !== 7 ? "hidden" : "block"
          } z-100`}
        >
          Download PDF
        </Button>
      </div>
      <LoginModal step={step} isOpen={openModal} setOpenModal={setOpenModal} />

      {/* <div className="bg-[#F6F6F6] w-full min-h-screen flex flex-col items-center justify-center p-[2rem] relative text-black"> */}
      <div
        // className="w-full mx-[1rem] my-[1rem] bg-white px-[2rem] py-[2rem] space-y-[1rem] h-auto overflow-visible"
        className="w-full md:mx-[1rem] md:my-[1rem] bg-white space-y-[1rem]"
        style={{
          minHeight: "100vh", // allow full height
          height: "auto",
          overflow: "visible",
        }}
        ref={pdfRef}
      >
        {type === 0 ? (
          <One
            biodata={biodata}
            step={step}
            image={image}
            socialMedia={socialMedia}
            groupedSkills={groupedSkillsUi}
            jobs={jobs}
            educations={educations}
            organisations={organisations}
          />
        ) : type === 1 ? (
          <Two
            biodata={biodata}
            step={step}
            image={image}
            socialMedia={socialMedia}
            groupedSkills={groupedSkillsUi}
            jobs={jobs}
            educations={educations}
            organisations={organisations}
          />
        ) : (
          <>"error</>
        )}
      </div>
    </div>
    // </div>
  );
}
