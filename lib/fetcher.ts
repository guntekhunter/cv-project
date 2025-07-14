// lib/fetcher.ts
import axios from "axios";

export const postFetcher = async ([url, payload]: [string, any]) => {
  const res = await axios.post(url, payload);
  return res.data;
};
