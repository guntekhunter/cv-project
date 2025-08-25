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

export const getTextCv = async (formData: FormData) => {
  try {
    const res = await axios.post("/api/extract-text", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  } catch (error) {
    console.log("Failed to extract text", error);
    throw error;
  }
};
export const getAllArticles = async (payload: any) => {
  try {
    const res = await axios.post("/api/get/get-articles", { payload });
    return res;
  } catch (error) {
    console.log("Failed to fetch organisations", error);
  }
};

export const getArticles = async (slug: any) => {
  try {
    const res = await axios.post("/api/get/get-article-detail", { slug });
    return res;
  } catch (error) {
    console.log("Failed to fetch organisations", error);
  }
};

//AI Streaming
export const getAiStreaming = async (
  pdfString: string,
  required: string,
  onChunk: (chunk: string) => void
) => {
  const res = await fetch("/api/chat-gpt", {
    method: "POST",
    body: JSON.stringify({ data: { pdfs: pdfString, required } }),
  });

  const reader = res.body!.getReader();
  const decoder = new TextDecoder("utf-8");

  let full = "";

  while (true) {
    const { value, done } = await reader.read();
    if (done) break;

    const chunk = decoder.decode(value, { stream: true });
    full += chunk;
    onChunk(chunk); // optional: for showing loading text
  }

  return full;
};

export const generateSummary = async (
  personal: string,
  requirenment?: string, // <-- jadikan optional
  onChunk?: (chunk: string) => void // <-- juga optional biar fleksibel
) => {
  const res = await fetch("/api/chat-gpt/generate-summary", {
    method: "POST",
    body: JSON.stringify({ data: { personal, requirenment } }),
  });

  const reader = res.body!.getReader();
  const decoder = new TextDecoder("utf-8");

  let full = "";

  while (true) {
    const { value, done } = await reader.read();
    if (done) break;

    const chunk = decoder.decode(value, { stream: true });
    full += chunk;
    onChunk?.(chunk); // <-- panggil kalau ada
  }

  return full;
};
export const generateJobDescription = async (
  jobTitle: string,
  company: string,
  role: string,
  jobDescription: string,
  beforeGenerate: string,
  onChunk?: (chunk: string) => void // opsional biar fleksibel
) => {
  const res = await fetch("/api/chat-gpt/generate-job-description", {
    method: "POST",
    body: JSON.stringify({
      data: { jobTitle, company, role, jobDescription, beforeGenerate },
    }),
  });

  if (!res.body) throw new Error("No response body from API");

  const reader = res.body.getReader();
  const decoder = new TextDecoder("utf-8");

  let full = "";

  while (true) {
    const { value, done } = await reader.read();
    if (done) break;

    const chunk = decoder.decode(value, { stream: true });
    full += chunk;
    onChunk?.(chunk); // panggil kalau callback disediakan
  }

  return full;
};

export const generateOrganisationResponsibility = async (
  role: string,
  organisationName: string,
  division: string,
  beforeGenerate: string,
  onChunk?: (chunk: string) => void // opsional biar bisa live streaming
) => {
  const res = await fetch("/api/chat-gpt/generate-organisation-description", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      data: { role, organisationName, division, beforeGenerate },
    }),
  });

  if (!res.body) throw new Error("No response body from API");

  const reader = res.body.getReader();
  const decoder = new TextDecoder("utf-8");

  let full = "";

  while (true) {
    const { value, done } = await reader.read();
    if (done) break;

    const chunk = decoder.decode(value, { stream: true });
    full += chunk;
    onChunk?.(chunk); // callback real-time
  }

  return full;
};
export const streamGenerateScore = async (
  cvText: string,
  onChunk?: (chunk: any) => void
) => {
  const res = await fetch("/api/chat-gpt/generate-score", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ cvText }),
  });

  if (!res.body) throw new Error("No response body from API");

  const reader = res.body.getReader();
  const decoder = new TextDecoder("utf-8");

  let buffer = ""; // keep partial data

  while (true) {
    const { value, done } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });

    // Split by newline (JSONL format)
    const lines = buffer.split("\n");

    // Keep last incomplete line in buffer
    buffer = lines.pop() || "";

    for (const line of lines) {
      try {
        const parsed = JSON.parse(line.trim());
        onChunk?.(parsed);
      } catch (err) {
        console.error("Skipping invalid JSON line:", line);
      }
    }
  }

  // Handle leftover (in case last line is valid JSON)
  if (buffer.trim()) {
    try {
      const parsed = JSON.parse(buffer.trim());
      onChunk?.(parsed);
    } catch {
      console.error("Invalid leftover JSON:", buffer);
    }
  }
};
