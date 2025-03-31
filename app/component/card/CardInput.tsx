"use client";
import React, { useEffect, useState } from "react";
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

export default function CardInput() {
  const [step, setStep] = useState(1);
  const [status, setStatus] = useState(false);
  const [filteredBiodata, setFilteredBiodata] = useState<any>({});
  const [biodata, setBiodata] = useState<BiodataType>({
    link: "",
    portfolio: "",
    address: "",
    professional_summary: "",
    photo: "",
    name: "",
    cv_id: 1,
  });

  const [organisation, setOrganisation] = useState<Organisation>({
    organisation_name: "",
    address: "",
    division: "",
    type: "",
    responsibility: "",
    start_date: new Date(),
    end_date: new Date(),
    cv_id: 1,
  });

  const [job, setJob] = useState<JobType>({
    company_name: "",
    company_address: "",
    responsibility: "",
    company_description: "",
    job_type: "",
    start_date: new Date(),
    end_date: new Date(),
    cv_id: 1,
  });

  const [education, setEducation] = useState<EducationType>({
    school_name: "",
    major: "",
    ipk: "",
    education_type: "",
    school_address: "",
    start_date: new Date(),
    end_date: new Date(),
    cv_id: 1,
  });

  const [socialMedia, setSocialMedia] = useState<SocialMediaType>({
    name: "",
    link_or_number: "",
    personal_data_id: 55,
  });

  const [other, setOther] = useState<OtherType>({
    type: "",
    name: "",
    year: "",
    cv_id: 1,
  });

  const handleBiodataChange = (updatedBiodata: BiodataType) => {
    setBiodata(updatedBiodata);
  };

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
      if (step === 1) {
        await addPersonalData(biodata);
        // filtered empty biodata
        const filteredBiodata = Object.fromEntries(
          Object.entries(biodata).filter(
            ([key, value]) =>
              key !== "portfolio" && key !== "link" && value === ""
          )
        );

        setFilteredBiodata(filteredBiodata);
        const hasMissingFields = Object.keys(filteredBiodata).length > 0;
        // Use `hasMissingFields` instead of waiting for `isRequired`
        if (!hasMissingFields) {
          setStep((prev) => prev + 1);
        }
      } else if (step === 2) {
        await addOrganisation(organisation);
      } else if (step === 3) {
        await addJob(job);
      } else if (step === 4) {
        await addEducation(education);
      } else if (step === 5) {
        await addSocialMedia(socialMedia);
      } else if (step === 6) {
        await addOther(other);
      }
    } catch (error) {
      console.log("Error mengirim data:", error);
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setStatus(false);
    }, 5000); // 3 detik

    // Cleanup function untuk mencegah memory leak jika komponen unmount sebelum timeout selesai
    return () => clearTimeout(timeout);
  }, []);
  return (
    <div className="space-y-[1rem]">
      <UploadSuccess type={step} success={status} />
      {/* Kirim biodata ke child agar tidak undefined */}
      {step === 1 && (
        <Biodata
          theData={biodata}
          onBiodataChange={handleBiodataChange}
          filtered={filteredBiodata}
        />
      )}
      {step === 2 && (
        <Organisation
          theData={organisation}
          onOrganisationChange={handleOrganisationChange}
        />
      )}
      {step === 3 && <Job theData={job} onJobChange={handleJobChange} />}
      {step === 4 && (
        <Education
          theData={education}
          onEducationChange={handleEducationChange}
        />
      )}
      {step === 5 && (
        <SocialMedia
          theData={socialMedia}
          onSocialMediaChange={handleSocialMedia}
        />
      )}
      {step === 6 && <Other theData={other} onOtherChange={handleOther} />}

      <MainButton onClick={handleButton} />
    </div>
  );
}
