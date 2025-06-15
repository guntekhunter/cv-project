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

export const uploadPhoto = async (file: File): Promise<string | null> => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("folderName", "cv-app");

  const res = await fetch("/api/image-upload", {
    method: "POST",
    body: formData,
  });

  const data = await res.json();
  return data?.res?.secure_url || null;
};
