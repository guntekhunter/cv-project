"use client";
import { getAllData } from "@/app/fetch/get/fetch";
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
    if (cvId > 0) {
      const getAllTheData = async () => {
        const personalIdString = localStorage.getItem("personal_id");
        const personalId =
          personalIdString !== null ? parseInt(personalIdString) : 0;

        console.log(personalId, "hasil");
        const res = await getAllData(cvId, personalId);

        setType(res?.data.cvData.type);

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

          // Langkah: Proses dan kelompokkan data 'others'
          const data = res?.data.others ?? [];
          const grouped: Record<string, Record<string, string[]>> = {};

          data.forEach(
            ({
              name,
              type,
              year,
            }: {
              name: string;
              type: string;
              year: string;
            }) => {
              if (!grouped[year]) grouped[year] = {};
              if (!grouped[year][type]) grouped[year][type] = [];
              grouped[year][type].push(name);
            }
          );

          const typeLabels: Record<string, string> = {
            hard_skils: "Keahlian Teknis",
            soft_skils: "Keahlian Nonteknis",
            certificate: "Sertifikat",
            hoby: "Hobi",
          };

          const output: string[] = [];

          Object.keys(grouped)
            .sort()
            .forEach((year) => {
              const types = grouped[year];
              Object.entries(types).forEach(([type, names]) => {
                const label = typeLabels[type.toLowerCase()] || type;
                output.push(`${label} (${year}): ${names.join(", ")}`);
              });
            });

          setGroupedSkills(output); // simpan hasilnya

          const outputUi: { title: string; items: string }[] = [];

          Object.keys(grouped)
            .sort()
            .forEach((year) => {
              const types = grouped[year];
              Object.entries(types).forEach(([type, names]) => {
                const label = typeLabels[type.toLowerCase()] || type;
                outputUi.push({
                  title: `${label} (${year})`,
                  items: names.join(", "),
                });
              });
            });

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
  };

  console.log(type, "ini typenya");

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

  console.log(biodata, "ini");

  return (
    <div className="w-full flex justify-center items-center min-h-screen relative pt-[3%] pb-[10%]">
      <div className="md:bg-white md:w-[90%] rounded-[10px] md:p-[3rem] md:border-color-[#F6F6F6] md:border-[1px] text-[#777777]">
        <div className="w-full relative">
          <Button
            loading={loading}
            onClick={handleDownloadPDF}
            className={`top-[5rem] right-4 z-[1] w-auto px-4 py-2 bg-secondary text-accent rounded transition-opacity duration-500 delay-300 opacity-100 hover:bg-secondary hover:opacity-80 shadow-lg text-[.8rem] z-100`}
          >
            Download PDF
          </Button>
        </div>
        <div className="md:bg-[#F6F6F6] w-full min-h-screen flex flex-col items-center justify-center py-[1rem] md:p-8 relative text-black">
          <div
            className="w-[330px] md:w-[794px] bg-white space-y-4"
            style={{
              background: "white",
            }}
            ref={pdfRef}
          >
            {type === 0 ? (
              <One
                biodata={biodata}
                step={7}
                image={image}
                socialMedia={socialMedia}
                groupedSkills={groupedSkillsUi}
                jobs={jobs}
                educations={educations}
                organisations={organisations}
              />
            ) : (
              <Two
                biodata={biodata}
                step={7}
                image={image}
                socialMedia={socialMedia}
                groupedSkills={groupedSkillsUi}
                jobs={jobs}
                educations={educations}
                organisations={organisations}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
