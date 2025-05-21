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

export default function CardInput() {
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
    personal_data_id: 174,
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
      if (step === 1) {
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
          await addPersonalData(biodata);
          setStep((prev) => prev + 1);
          setStatus(true);
        } else {
          setRequired(true);
        }
      } else if (step === 2) {
        const filteredOrganisation = Object.fromEntries(
          Object.entries(organisation).filter(
            ([key, value]) =>
              key !== "portfolio" && key !== "link" && value === ""
          )
        );

        setFilteredOrganisation(filteredOrganisation);
        const hasMissingFields = Object.keys(filteredOrganisation).length > 0;
        // Use `hasMissingFields` instead of waiting for `isRequired`
        if (!hasMissingFields) {
          const res = await addOrganisation(organisation);
          setOrganisations(res?.data.organisations);
          // setStep((prev) => prev + 1);
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
      } else if (step === 3) {
        const filteredJob = Object.fromEntries(
          Object.entries(job).filter(
            ([key, value]) =>
              key !== "portfolio" && key !== "link" && value === ""
          )
        );

        setFilteredJob(filteredJob);
        const hasMissingFields = Object.keys(filteredJob).length > 0;
        // Use `hasMissingFields` instead of waiting for `isRequired`
        if (!hasMissingFields) {
          const res = await addJob(job);
          setJobs(res?.data.jobs);
          // setStep((prev) => prev + 1);
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
      } else if (step === 4) {
        const filteredEducation = Object.fromEntries(
          Object.entries(education).filter(
            ([key, value]) =>
              key !== "portfolio" && key !== "link" && value === ""
          )
        );

        setFilteredEducation(filteredEducation);
        const hasMissingFields = Object.keys(filteredEducation).length > 0;
        // Use `hasMissingFields` instead of waiting for `isRequired`
        if (!hasMissingFields) {
          const res = await addEducation(education);
          setEducations(res?.data.educations);
          // setStep((prev) => prev + 1);
          setStatus(true);
        } else {
          // CHECK THIS OUT, THIS IS THE COUSE OF BUTTON CAN STILL GO TO THE NEXT CARD WHEN ITS EMPTY
          if (Object.keys(filteredEducation).length >= 5) {
            setStatus(true);
            setRequired(false);
            setStep((prev) => prev + 1);
          } else {
            setRequired(true);
          }
        }
      } else if (step === 5) {
        console.log("ini ges", socialMedia);
        const filteredSocialMedia = Object.fromEntries(
          Object.entries(socialMedia).filter(
            ([key, value]) =>
              key !== "portfolio" && key !== "link" && value === ""
          )
        );

        setFilteredSocialMedia(filteredSocialMedia);
        const hasMissingFields = Object.keys(filteredSocialMedia).length > 0;
        // Use `hasMissingFields` instead of waiting for `isRequired`
        if (!hasMissingFields) {
          const res = await addSocialMedia(socialMedia);
          setSocialMedia(res?.data.socialMedia);
          // setStep((prev) => prev + 1);
          setStatus(true);
        } else {
          // CHECK THIS OUT, THIS IS THE COUSE OF BUTTON CAN STILL GO TO THE NEXT CARD WHEN ITS EMPTY
          if (Object.keys(filteredSocialMedia).length >= 2) {
            setStatus(true);
            setRequired(false);
            setStep((prev) => prev + 1);
          } else {
            setRequired(true);
          }
        }
      } else if (step === 6) {
        await addOther(other);
      }

      refMyWork.current?.scrollIntoView({ behavior: "smooth" });
    } catch (error) {
      console.log("Error mengirim data:", error);
    }
    console.log(step);
  };

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
  console.log("ini hasil tambahannnya", added);

  return (
    <div className="space-y-[1rem]" ref={refMyWork}>
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
      {step === 2 && (
        <Organisation
          adding={added}
          onAddedChange={setAdded}
          theData={organisation}
          onOrganisationChange={handleOrganisationChange}
          filtered={filteredOrganisation}
        />
      )}
      {step === 3 && (
        <Job
          adding={added}
          onAddedChange={setAdded}
          theData={job}
          onJobChange={handleJobChange}
          filtered={filteredJob}
        />
      )}
      {step === 4 && (
        <Education
          adding={added}
          onAddedChange={setAdded}
          theData={education}
          onEducationChange={handleEducationChange}
          filtered={filteredEducation}
        />
      )}
      {step === 5 && (
        <SocialMedia
          theData={socialMedia}
          onSocialMediaChange={handleSocialMedia}
          adding={added}
          onAddedChange={setAdded}
        />
      )}
      {step === 6 && (
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
