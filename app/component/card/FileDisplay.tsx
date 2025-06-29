"use client";
import { getAllData } from "@/app/fetch/get/fetch";
import BulletList from "@/app/function/BulletPointFormatter";
import { DateFormater } from "@/app/function/DateFormater";
import React, { useEffect, useRef, useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import Button from "../buttons/Button";
import JSConfetti from "js-confetti";
import Image from "next/image";
import LoginModal from "../modal/LoginModal";
import { usePathname } from "next/navigation";
import One from "../cv-template/One";

export default function FileDisplay(props: any) {
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
  const [sectionHeight, setSectionHeight] = useState<number>(0);
  const pdfRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const [token, setToken] = useState<string | null>(null);

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
    console.log("ini", token);
    setLoading(true);
    if (!token) {
      setOpenModal(true);
      return;
    }

    const element = pdfRef.current;
    if (!element) return;

    const canvas = await html2canvas(element, {
      scale: 2, // higher = better quality
      useCORS: true,
    });

    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const margin = 10;
    const usablePageHeight = pageHeight - margin * 2;

    const imgProps = {
      width: canvas.width,
      height: canvas.height,
      ratio: canvas.width / (pageWidth - margin * 2),
    };

    const scaledImgHeight = canvas.height / imgProps.ratio;

    let remainingHeight = scaledImgHeight;
    let positionY = 0;

    while (remainingHeight > 0) {
      if (positionY > 0) pdf.addPage();

      const cropHeight = Math.min(usablePageHeight, remainingHeight);

      const tempCanvas = document.createElement("canvas");
      const context = tempCanvas.getContext("2d")!;
      tempCanvas.width = canvas.width;
      tempCanvas.height = cropHeight * imgProps.ratio;

      context.drawImage(
        canvas,
        0,
        positionY * imgProps.ratio,
        canvas.width,
        cropHeight * imgProps.ratio,
        0,
        0,
        canvas.width,
        cropHeight * imgProps.ratio
      );

      const tempData = tempCanvas.toDataURL("image/png");

      pdf.addImage(
        tempData,
        "PNG",
        margin,
        margin,
        pageWidth - margin * 2,
        cropHeight
      );

      remainingHeight -= cropHeight;
      positionY += cropHeight;
    }

    pdf.save("resume.pdf");
    setLoading(false);
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

      <div
        className="w-full mx-[1rem] my-[1rem] bg-white px-[2rem] py-[2rem] space-y-[1rem] h-auto overflow-visible"
        style={{
          minHeight: "100vh", // allow full height
          height: "auto",
          overflow: "visible",
        }}
        ref={pdfRef}
      >
        <One
          biodata={biodata}
          step={step}
          image={image}
          socialMedia={socialMedia}
          groupedSkills={groupedSkills}
          jobs={jobs}
          educations={educations}
          organisations={organisations}
        />
      </div>
    </div>
  );
}
