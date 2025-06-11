"use client";
import React, { useEffect, useRef, useState } from "react";
import Biodata from "./Biodata";
import MainButton from "../buttons/MainButton";
import {
  addEducation,
  addJob,
  addOrganisation,
  addOther,
  addPersonalData,
  addSocialMedia,
} from "@/app/fetch/add/fetch";
import Organisation from "./Organisation";
import Job from "./Job";
import Education from "./Education";
import SocialMedia from "./SocialMedia";
import Other from "./Other";
import UploadSuccess from "../modal/UploadSuccess";
import UploadRequired from "../modal/UploadRequired";

type BiodataType = {
  link: string;
  portfolio: string;
  address: string;
  professional_summary: string;
  photo: string;
  name: string;
  cv_id: number;
};

type Organisation = {
  organisation_name: string;
  address: string;
  division: string;
  type: string;
  responsibility: string;
  start_date: Date;
  end_date: Date;
  cv_id: number;
};

type JobType = {
  company_name: string;
  company_address: string;
  responsibility: string;
  company_description: string;
  job_type: string;
  start_date: Date;
  end_date: Date;
  cv_id: number;
};

type EducationType = {
  school_name: string;
  major: string;
  ipk: string;
  education_type: string;
  school_address: string;
  start_date: Date;
  end_date: Date;
  cv_id: number;
};

type OtherType = {
  type: string;
  name: string;
  year: string;
  cv_id: number;
};

type SocialMediaType = {
  name: string;
  link_or_number: string;
  personal_data_id: number;
};

type CardInputProps = {
  onChangeStep: (val: number) => void;
};

export default function CardInput({ onChangeStep }: CardInputProps) {
  const [step, setStep] = useState(1);
  const [status, setStatus] = useState(false);
  const [required, setRequired] = useState(false);
  const [filteredBiodata, setFilteredBiodata] = useState<any>({});
  const [filteredOrganisation, setFilteredOrganisation] = useState<any>({});
  const [filteredEducation, setFilteredEducation] = useState<any>({});
  const [filteredJob, setFilteredJob] = useState<any>({});
  const [filteredSocialMedia, setFilteredSocialMedia] = useState<any>({});
  const refMyWork = useRef<HTMLDivElement | null>(null);
  const [add, setAdd] = useState(false);

  const [organisations, setOrganisations] = useState([]);
  const [educations, setEducations] = useState([]);
  const [jobs, setJobs] = useState([]);
  // button add status
  const [added, setAdded] = useState(false);
  const [cvId, setCvId] = useState<number>(0);
  const [userId, setUserId] = useState<number>();
  const [biodata, setBiodata] = useState<BiodataType>({
    link: "",
    portfolio: "",
    address: "",
    professional_summary: "",
    photo: "",
    name: "",
    cv_id: 0,
  });

  const [organisation, setOrganisation] = useState<Organisation>({
    organisation_name: "",
    address: "",
    division: "",
    type: "",
    responsibility: "",
    start_date: new Date(),
    end_date: new Date(),
    cv_id: cvId,
  });

  const [job, setJob] = useState<JobType>({
    company_name: "",
    company_address: "",
    responsibility: "",
    company_description: "",
    job_type: "",
    start_date: new Date(),
    end_date: new Date(),
    cv_id: cvId,
  });

  const [education, setEducation] = useState<EducationType>({
    school_name: "",
    major: "",
    ipk: "",
    education_type: "",
    school_address: "",
    start_date: new Date(),
    end_date: new Date(),
    cv_id: cvId,
  });

  const [socialMedia, setSocialMedia] = useState<SocialMediaType>({
    name: "",
    link_or_number: "",
    personal_data_id: userId || 0,
  });

  const [other, setOther] = useState<OtherType>({
    type: "",
    name: "",
    year: "",
    cv_id: cvId,
  });

  const handleBiodataChange = (updatedBiodata: BiodataType) => {
    setBiodata(updatedBiodata);
  };

  useEffect(() => {
    const cvIdString = localStorage.getItem("cv_id");
    if (cvIdString) {
      setCvId(parseInt(cvIdString));
    }
  }, []);
  // the add button on organisation

  const handleOrganisationChange = (updatedOrganisation: Organisation) => {
    setOrganisation(updatedOrganisation);
  };

  const handleJobChange = (updatedJob: JobType) => {
    setJob(updatedJob);
  };

  const handleEducationChange = (updatedEducation: EducationType) => {
    setEducation(updatedEducation);
  };

  const handleSocialMedia = (updatedSocialMedia: SocialMediaType) => {
    setSocialMedia(updatedSocialMedia);
  };

  const handleOther = (updatedOther: OtherType) => {
    setOther(updatedOther);
  };

  const handleButton = async () => {
    try {
      if (typeof window !== "undefined") {
        localStorage.setItem("step", step.toString());
      }

      if (step === 1) {
        const filteredBiodata = Object.fromEntries(
          Object.entries(biodata).filter(
            ([key, value]) =>
              key !== "portfolio" && key !== "link" && value === ""
          )
        );

        setFilteredBiodata(filteredBiodata);
        const hasMissingFields = Object.keys(filteredBiodata).length > 0;

        if (!hasMissingFields) {
          const res = await addPersonalData({ ...biodata, cv_id: cvId });

          if (typeof window !== "undefined") {
            // localStorage.setItem("cv_id", res?.data.data.cv_id.toString());
            localStorage.setItem("personal_id", res?.data.data.id.toString());
          }

          setUserId(res?.data.data.id);
          setStep((prev) => prev + 1);
          setStatus(true);
        } else {
          setRequired(true);
        }
      } else if (step === 2) {
        const filteredSocialMedia = Object.fromEntries(
          Object.entries(socialMedia).filter(
            ([key, value]) =>
              key !== "portfolio" && key !== "link" && value === ""
          )
        );

        setFilteredSocialMedia(filteredSocialMedia);
        const hasMissingFields = Object.keys(filteredSocialMedia).length > 0;

        if (!hasMissingFields) {
          const res = await addSocialMedia(socialMedia, userId);
          setSocialMedia(res?.data.socialMedia);
          setStatus(true);
        } else {
          if (Object.keys(filteredSocialMedia).length >= 2) {
            setStatus(true);
            setRequired(false);
            setStep((prev) => prev + 1);
          } else {
            setRequired(true);
          }
        }
      } else if (step === 3) {
        await addOther({ ...other, cv_id: cvId });
        setStep((prev) => prev + 1);
        setStatus(true);
      } else if (step === 4) {
        const filteredJob = Object.fromEntries(
          Object.entries(job).filter(
            ([key, value]) =>
              key !== "portfolio" && key !== "link" && value === ""
          )
        );

        setFilteredJob(filteredJob);
        const hasMissingFields = Object.keys(filteredJob).length > 0;

        if (!hasMissingFields) {
          console.log("cv id job", cvId);
          const res = await addJob({ ...job, cv_id: cvId });
          setJobs(res?.data.jobs);
          setStatus(true);
        } else {
          if (Object.keys(filteredJob).length >= 5) {
            setStatus(true);
            setRequired(false);
            setStep((prev) => prev + 1);
          } else {
            setRequired(true);
          }
        }
      } else if (step === 5) {
        const filteredEducation = Object.fromEntries(
          Object.entries(education).filter(
            ([key, value]) =>
              key !== "portfolio" && key !== "link" && value === ""
          )
        );

        setFilteredEducation(filteredEducation);
        const hasMissingFields = Object.keys(filteredEducation).length > 0;

        if (!hasMissingFields) {
          const res = await addEducation(education);
          setEducations(res?.data.educations);
          setStatus(true);
        } else {
          if (Object.keys(filteredEducation).length >= 5) {
            setStatus(true);
            setRequired(false);
            setStep((prev) => prev + 1);
          } else {
            setRequired(true);
          }
        }
      } else if (step === 6) {
        const filteredOrganisation = Object.fromEntries(
          Object.entries(organisation).filter(
            ([key, value]) =>
              key !== "portfolio" && key !== "link" && value === ""
          )
        );

        setFilteredOrganisation(filteredOrganisation);
        const hasMissingFields = Object.keys(filteredOrganisation).length > 0;

        if (!hasMissingFields) {
          const res = await addOrganisation(organisation);
          setOrganisations(res?.data.organisations);
          setStatus(true);
        } else {
          if (Object.keys(filteredOrganisation).length >= 5) {
            setStatus(true);
            setRequired(false);
            setStep((prev) => prev + 1);
          } else {
            setRequired(true);
          }
        }
      }
      window.scrollTo({ top: 0, behavior: "smooth" });
      refMyWork.current?.scrollIntoView({ behavior: "smooth" });
    } catch (error) {
      console.log("Error mengirim data:", error);
    }
  };

  console.log(cvId);

  useEffect(() => {
    onChangeStep(step);
  }, [step]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setStatus(false);
    }, 5000); // 3 detik

    // Cleanup function untuk mencegah memory leak jika komponen unmount sebelum timeout selesai
    return () => clearTimeout(timeout);
  }, [status]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setRequired(false);
    }, 3000); // 3 detik

    // Cleanup function untuk mencegah memory leak jika komponen unmount sebelum timeout selesai
    return () => clearTimeout(timeout);
  }, [required]);

  return (
    <div
      className={`${step !== 7 ? "block space-y-[1rem]" : "hidden"}`}
      ref={refMyWork}
    >
      <UploadSuccess type={step} success={status} />
      <UploadRequired type={step} show={required} />
      {/* Kirim biodata ke child agar tidak undefined */}
      {step === 1 && (
        <Biodata
          theData={biodata}
          onBiodataChange={handleBiodataChange}
          filtered={filteredBiodata}
        />
      )}
      {step === 6 && (
        <Organisation
          adding={added}
          onAddedChange={setAdded}
          theData={organisation}
          onOrganisationChange={handleOrganisationChange}
          filtered={filteredOrganisation}
        />
      )}
      {step === 4 && (
        <Job
          adding={added}
          onAddedChange={setAdded}
          theData={job}
          onJobChange={handleJobChange}
          filtered={filteredJob}
        />
      )}
      {step === 5 && (
        <Education
          adding={added}
          onAddedChange={setAdded}
          theData={education}
          onEducationChange={handleEducationChange}
          filtered={filteredEducation}
        />
      )}
      {step === 2 && (
        <SocialMedia
          theData={socialMedia}
          onSocialMediaChange={handleSocialMedia}
          adding={added}
          onAddedChange={setAdded}
        />
      )}
      {step === 3 && (
        <Other
          theData={other}
          onOtherChange={handleOther}
          onAddedChange={setAdded}
        />
      )}

      <MainButton onClick={handleButton} />
    </div>
  );
}
