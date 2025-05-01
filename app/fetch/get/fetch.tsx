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
