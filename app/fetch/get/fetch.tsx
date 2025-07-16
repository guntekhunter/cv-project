import useSWR from "swr";
import axios from "axios";

export const getOrganisations = async (cv_id: number) => {
  try {
    const res = await axios.post("/api/get/get-organisation", { cv_id });
    return res;
  } catch (error) {
    console.log("Failed to fetch organisations", error);
  }
};

export const getJobs = async (cv_id: number) => {
  try {
    const res = await axios.post("/api/get/get-job", { cv_id });
    return res;
  } catch (error) {
    console.log("Failed to fetch organisations", error);
  }
};
export const getEducations = async (cv_id: number) => {
  try {
    const res = await axios.post("/api/get/get-education", { cv_id });
    return res;
  } catch (error) {
    console.log("Failed to fetch organisations", error);
  }
};
export const getSocialMedias = async (personal_id: number) => {
  try {
    const res = await axios.post("/api/get/get-social-media", { personal_id });
    return res;
  } catch (error) {
    console.log("Failed to fetch organisations", error);
  }
};
export const getOthers = async (cv_id: number) => {
  try {
    const res = await axios.post("/api/get/get-other", { cv_id });
    return res;
  } catch (error) {
    console.log("Failed to fetch organisations", error);
  }
};
export const getAllData = async (cv_id: number, user_id: number) => {
  try {
    const res = await axios.post("/api/get/get-all-data", { cv_id, user_id });
    return res;
  } catch (error) {
    console.log("Failed to fetch organisations", error);
  }
};

export const getBiodata = async (cv_id: number) => {
  try {
    const res = await axios.post("/api/get/get-biodata", cv_id);
    return res;
  } catch (error) {
    console.log("Failed to fetch organisations", error);
  }
};

export const getCvs = async (payload: any) => {
  try {
    const res = await axios.post("/api/get/get-cvs", payload);
    return res;
  } catch (error) {
    console.log("Failed to fetch organisations", error);
  }
};

export const getUser = async (id: any) => {
  try {
    const res = await axios.post("/api/get/get-user", { id });
    return res;
  } catch (error) {
    console.log("Failed to fetch organisations", error);
  }
};
export const getUserModal = async (id: any) => {
  try {
    const res = await axios.post("/api/get/get-user-modal", { id });
    return res;
  } catch (error) {
    console.log("Failed to fetch organisations", error);
  }
};

export const getCv = async (id: number) => {
  try {
    const res = await axios.post("/api/get/get-cv", { id });
    return res;
  } catch (error) {
    console.log("Failed to fetch organisations", error);
  }
};
