import axios from "axios";

export const addJob = async (data: any) => {
    try {
        const res = await axios.post("/api/add-job", data);
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const addEducation = async (data: any) => {
    try {
        const res = await axios.post("/api/add-education", data);
        return res;
    } catch (error) {
        console.log(error);
    }
};