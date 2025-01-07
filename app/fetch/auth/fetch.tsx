import axios from "axios";

export const register = async (data: any) => {
    try {
        const res = await axios.post("/api/register", data);
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const login = async (data: any) => {
    try {
        const res = await axios.post("/api/login", data);
        return res;
    } catch (error) {
        console.log(error);
    }
};