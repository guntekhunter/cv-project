"use client";
import React, { useState } from "react";
import Biodata from "./Biodata";
import MainButton from "../buttons/MainButton";
import { addOrganisation, addPersonalData } from "@/app/fetch/add/fetch";
import Organisation from "./Organisation";

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

  const handleBiodataChange = (updatedBiodata: BiodataType) => {
    setBiodata(updatedBiodata);
  };

  const handleOrganisationChange = (updatedOrganisation: Organisation) => {
    setOrganisation(updatedOrganisation);
  };

  const handleButton = async () => {
    try {
      if (step === 1) {
        await addPersonalData(biodata);
      } else if (step === 2) {
        await addOrganisation(organisation);
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
      <MainButton onClick={handleButton} />
    </div>
  );
}
