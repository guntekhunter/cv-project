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
export const deleteImage = async (publicId: any) => {
  try {
    const res = await axios.post(
      "/api/delete/delete-image",
      publicId // ✅ wrap in object
    );
    return res;
  } catch (error) {
    console.error("Delete failed:", error);
  }
};
export const deleteCv = async (id: any) => {
  try {
    const res = await axios.post(
      "/api/delete/delete-cv",
      id // ✅ wrap in object
    );
    return res;
  } catch (error) {
    console.error("Delete failed:", error);
  }
};
