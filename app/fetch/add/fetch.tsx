import axios from "axios";

export const addJob = async (data: any) => {
    try {
        const res = await axios.post("/api/add/add-job", data);
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const addEducation = async (data: any) => {
    try {
        const res = await axios.post("/api/add/add-education", data);
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const addPersonalData = async (data: any) => {
    try {
        const res = await axios.post("/api/add/add-personal-data", data);
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const addOrganisation = async (data: any) => {
    try {
        const res = await axios.post("/api/add/add-organisation", data);
        return res;
    } catch (error) {
        console.log(error);
    }
};