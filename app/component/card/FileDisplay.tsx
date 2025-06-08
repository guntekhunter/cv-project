"use client";
import { getAllData } from "@/app/fetch/get/fetch";
import BulletList from "@/app/function/BulletPointFormatter";
import { DateFormater } from "@/app/function/DateFormater";
import React, { useEffect, useRef, useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

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

  const handleDownloadPDF = async () => {
    const element = pdfRef.current;
    if (!element) return;

    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
    });

    const imgData = canvas.toDataURL("image/png");

    // PDF settings
    const pdf = new jsPDF("p", "mm", "a4");
    const pageWidth = pdf.internal.pageSize.getWidth(); // 210mm
    const pageHeight = pdf.internal.pageSize.getHeight(); // 297mm
    const margin = 10;

    const imgWidth = pageWidth - margin * 2;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    let heightLeft = imgHeight;
    let position = margin;

    // First page
    pdf.addImage(imgData, "PNG", margin, position, imgWidth, imgHeight);
    heightLeft -= pageHeight - margin * 2; // Adjust for top/bottom margin

    // Additional pages
    while (heightLeft > 0) {
      position -= pageHeight - margin * 2;
      pdf.addPage();
      pdf.addImage(imgData, "PNG", margin, position, imgWidth, imgHeight);
      heightLeft -= pageHeight - margin * 2;
    }

    pdf.save("resume.pdf");
  };

  return (
    <div className="bg-[#F6F6F6] w-full h-[90%] overflow-y-scroll flex p-[2rem] justify-around text-[.5rem] relative">
      <div
        className="w-full mx-[1rem] my-[1rem] bg-white px-[2rem] py-[2rem] space-y-[1rem] h-auto overflow-visible"
        style={{ minHeight: "1000px" }}
        ref={pdfRef}
      >
        <div className="flex bg-white overflow-visible">
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
            <h2 className="font-bold text-[.5rem] pb-[.5rem]">
              Keterampilan Teknis, Keterampilan Non Teknis dan Pencapaian
            </h2>
            <ul className="list-disc pl-5">
              {groupedSkills.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* experience */}
        <div>
          <div className="space-y-[.5rem]">
            <h2 className="font-bold text-[.5rem] pb-[.5rem]">
              Pengalaman Kerja
            </h2>
            {jobs.map((item: any, index: any) => (
              <div className="space-y-[.5rem]" key={index}>
                <div className="flex w-full justify-between">
                  <div>
                    <p className="text-[.5rem]">
                      <span className="font-bold">{item.company_name}</span>
                    </p>
                  </div>
                  <div>
                    {DateFormater(item.start_date)} -{" "}
                    {DateFormater(item.end_date)}
                  </div>
                </div>

                <p className="italic">{item.job_type}</p>

                <p>{item.company_description}</p>
                <BulletList text={item.responsibility} />
              </div>
            ))}
          </div>
        </div>

        {/* education */}
        <div className="space-y-[.5rem]">
          <h2 className="font-bold text-[.5rem] pb-[.5rem]">
            Riwayat Pendidikan
          </h2>
          {educations.map((item: any, index: any) => (
            <div className="space-y-[.5rem]" key={index}>
              <div className="flex w-full justify-between">
                <div className="w-[90%]">
                  <p className="text-[.5rem]">
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
        {/* organisation */}
        <div className="space-y-[.5rem]">
          <h2 className="font-bold text-[.5rem] pb-[.5rem]">
            Pengalaman Berorganisasi
          </h2>
          {organisations.map((item: any, index: any) => (
            <div key={index}>
              <div className="flex w-full justify-between">
                <div className="w-[90%]">
                  <p className="text-[.5rem]">
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
      <button
        onClick={handleDownloadPDF}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded absolute bottom-0"
      >
        Download as PDF
      </button>
    </div>
  );
}
