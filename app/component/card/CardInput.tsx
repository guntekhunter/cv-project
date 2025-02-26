"use client";
import React, { useState } from "react";
import Biodata from "./Biodata";
import MainButton from "../buttons/MainButton";
import {
  addJob,
  addOrganisation,
  addPersonalData,
} from "@/app/fetch/add/fetch";
import Organisation from "./Organisation";
import Job from "./Job";

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

  const handleBiodataChange = (updatedBiodata: BiodataType) => {
    setBiodata(updatedBiodata);
  };

  const handleOrganisationChange = (updatedOrganisation: Organisation) => {
    setOrganisation(updatedOrganisation);
  };
  const handleJobChange = (updatedJob: JobType) => {
    setJob(updatedJob);
  };

  const handleButton = async () => {
    try {
      if (step === 1) {
        await addPersonalData(biodata);
      } else if (step === 2) {
        await addOrganisation(organisation);
      } else if (step === 3) {
        await addJob(job);
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

      <MainButton onClick={handleButton} />
    </div>
  );
}
