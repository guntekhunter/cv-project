"use client";
import React, { useEffect, useState } from "react";
import InputField from "../input/InputField";
import InputPhoto from "../input/InputPhoto";
import Label from "../input/Label";
import MainButton from "../buttons/MainButton";
import TextArea from "../input/TextArea";

type BiodataType = {
    link: string;
    portfolio: string;
    address: string;
    professional_summary: string;
    photo: string;
    name: string;
    cv_id: number;
};

type BiodataProps = {
    theData: BiodataType;
    onBiodataChange: (updatedBiodata: BiodataType) => void;
};

export default function Biodata({ theData, onBiodataChange }: BiodataProps) {
    const [biodata, setBiodata] = useState<BiodataType>(theData);

    useEffect(() => {
        if (theData) {
            setBiodata(theData);
        }
    }, [theData]);

    const handleChange = (field: string, value: string) => {
        if (!Object.keys(biodata).includes(field)) return; // Mencegah field yang tidak valid

        const updatedBiodata = { ...biodata, [field]: value };
        setBiodata(updatedBiodata);
        onBiodataChange(updatedBiodata);
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
                    <InputField name="name" value={biodata.name ?? ""} onChange={handleChange} />
                </div>
                <div className="space-y-[.5rem]">
                    <Label name="Website/Portofolio" />
                    <InputField name="portfolio" value={biodata.portfolio ?? ""} onChange={handleChange} />
                </div>
                <div className="space-y-[.5rem]">
                    <Label name="Alamat" />
                    <InputField name="address" value={biodata.address ?? ""} onChange={handleChange} />
                </div>
                <div className="space-y-[.5rem]">
                    <Label name="Deskripsi Diri *" />
                    <TextArea name="professional_summary" value={biodata.professional_summary ?? ""} onChange={handleChange} />
                </div>
            </div>
        </div>
    );
}
