import axios from "axios";

export const deleteOrganisation = async (data: any) => {
  try {
    const res = await axios.post("/api/delete/delete-organisation", data);
    return res;
  } catch (error) {
    console.log(error);
  }
};
