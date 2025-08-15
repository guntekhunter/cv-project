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

export const addSocialMedia = async (data: any, userId: any) => {
  try {
    const res = await axios.post("/api/add/add-social-media", { data, userId });
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const addOther = async (data: any) => {
  try {
    const res = await axios.post("/api/add/add-other", data);
    return res;
  } catch (error) {
    console.log(error);
  }
};
export const addCv = async (data: any) => {
  try {
    const res = await axios.post("/api/add/create-cv", data);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const addNewCv = async (data: any) => {
  try {
    const res = await axios.post("/api/add/create-new-cv", data);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const addUserEmail = async (data: { email: string }) => {
  try {
    const baseUrl =
      typeof window === "undefined"
        ? process.env.NEXT_PUBLIC_BASE_URL // server-side
        : ""; // client-side

    const res = await axios.post(
      `http://localhost:3000/api/add/create-new-user-email`,
      data
    );
    return res;
  } catch (error) {
    console.log(error);
  }
};
