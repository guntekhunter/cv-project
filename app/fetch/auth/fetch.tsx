import axios from "axios";

export const register = async (data: any) => {
  try {
    const res = await axios.post("/api/auth/register", data);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const login = async (data: any) => {
  try {
    const res = await axios.post("/api/auth/login", data);
    return res;
  } catch (error: any) {
    return error?.response;
  }
};
