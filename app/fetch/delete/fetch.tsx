import axios from "axios";

export const deleteOrganisation = async (data: any) => {
  try {
    const res = await axios.post("/api/delete/delete-organisation", data);
    return res;
  } catch (error) {
    console.log(error);
  }
};
export const deleteJob = async (data: any) => {
  try {
    const res = await axios.post("/api/delete/delete-job", data);
    return res;
  } catch (error) {
    console.log(error);
  }
};
export const deleteEducation = async (data: any) => {
  try {
    const res = await axios.post("/api/delete/delete-education", data);
    return res;
  } catch (error) {
    console.log(error);
  }
};
export const deleteSocialMedia = async (data: any) => {
  try {
    const res = await axios.post("/api/delete/delete-social-media", data);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const deleteOther = async (data: any) => {
  try {
    const res = await axios.post("/api/delete/delete-other", data);
    return res;
  } catch (error) {
    console.log(error);
  }
};
export const deleteImage = async (url: any) => {
  try {
    const res = await axios.post("/api/delete/delete-image", url);
    return res;
  } catch (error) {
    console.log(error);
  }
};
