import axios from "axios";

export const editJob = async (data: any) => {
  try {
    const res = await axios.post("/api/edit-job", data);
    return res;
  } catch (error) {
    console.log(error);
  }
};
export const editOrganisationDragable = async (data: any) => {
  try {
    const res = await axios.post("/api/edit/edit-dragable/organisation", data);
    return res;
  } catch (error) {
    console.log(error);
  }
};
