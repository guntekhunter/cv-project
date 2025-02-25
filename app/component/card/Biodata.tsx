"use client";
import React, { useState } from "react";
import InputField from "../input/InputField";
import InputPhoto from "../input/InputPhoto";
import Label from "../input/Label";
import MainButton from "../buttons/MainButton";
import TextArea from "../input/TextArea";
import { addPersonalData } from "@/app/fetch/add/fetch";

type Biodata = {
    link: string;
    portfolio: string;
    address: string;
    professional_summary: string;
    photo: string;
    name: string;
    cv_id: number;
};

export default function Biodata(props: any) {
    const [biodata, setBiodata] = useState<Biodata>({
        link: "",
        portfolio: "",
        address: "",
        professional_summary: "",
        photo: "",
        name: "",
        cv_id: 1,
    });

    const handleChange = (field: string, value: string | number) => {
        if (field in biodata) {
            setBiodata((prev) => ({
                ...prev,
                [field]: value,
            }));
        }
    };

    const handleButton = async () => {
        try {
            const res = await addPersonalData(biodata)
        } catch (error) {
            console.log(error)
        }
        // Send biodata to API or process it
    };

    return (
        <div className="space-y-[1rem]">
            <h1 className="font-bold text-[1.5rem]">Isi Biodata</h1>
            <div className="py-[2rem] text-[.9rem] space-y-[1rem]">
                <div className="space-y-[.5rem]">
                    <Label name="Foto" />
                    <InputPhoto name="photo" onChange={handleChange} />
                </div>
                <div className="space-y-[.5rem]">
                    <Label name="Nama" />
                    <InputField name="name" value={biodata.name} onChange={handleChange} />
                </div>
                <div className="space-y-[.5rem]">
                    <Label name="Website/Portofolio" />
                    <InputField name="portfolio" value={biodata.portfolio} onChange={handleChange} />
                </div>
                <div className="space-y-[.5rem]">
                    <Label name="Alamat" />
                    <InputField name="address" value={biodata.address} onChange={handleChange} />
                </div>
                <div className="space-y-[.5rem]">
                    <Label name="Deskripsi Diri *" />
                    <TextArea name="professional_summary" value={biodata.professional_summary} onChange={handleChange} />
                </div>
            </div>
            <MainButton onClick={handleButton} />
        </div>
    );
}
