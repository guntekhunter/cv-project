"use client";
import React, { useState } from "react";
import Biodata from "./Biodata";
import MainButton from "../buttons/MainButton";
import {
  addEducation,
  addJob,
  addOrganisation,
  addPersonalData,
  addSocialMedia,
} from "@/app/fetch/add/fetch";
import Organisation from "./Organisation";
import Job from "./Job";
import Education from "./Education";
import SocialMedia from "./SocialMedia";

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

type MediaSocialType = {
  name: string;
  link_or_number: string;
  personal_data_id: number;
};

export default function CardInput() {
  const [step, setStep] = useState(1);
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

  const [mediaSocial, setMediaSocial] = useState<MediaSocialType>({
    name: "",
    link_or_number: "",
    personal_data_id: 12,
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

  const handleSocialMedia = (updatedSocialMedia: MediaSocialType) => {
    setMediaSocial(updatedSocialMedia);
  };

  const handleButton = async () => {
    try {
      if (step === 1) {
        await addPersonalData(biodata);
      } else if (step === 2) {
        await addOrganisation(organisation);
      } else if (step === 3) {
        await addJob(job);
      } else if (step === 4) {
        await addEducation(education);
      } else if (step === 5) {
        await addSocialMedia(SocialMedia);
      }
      setStep((prev) => prev + 1);
    } catch (error) {
      console.log("Error mengirim data:", error);
    }
  };

  return (
    <div className="space-y-[1rem]">
      {/* Kirim biodata ke child agar tidak undefined */}
      {step === 1 && (
        <Biodata theData={biodata} onBiodataChange={handleBiodataChange} />
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
          theData={mediaSocial}
          onSocialMediaChange={handleSocialMedia}
        />
      )}

      <MainButton onClick={handleButton} />
    </div>
  );
}
