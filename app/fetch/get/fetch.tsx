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
