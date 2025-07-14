// hook/useCvs.ts
import useSWR from "swr";
import { postFetcher } from "@/lib/fetcher";

export function useCv(user_id: number | null, page: number) {
  const shouldFetch = typeof user_id === "number";

  const payload = {
    user_id,
    page,
    limit: 5,
  };

  const { data, error, isLoading, mutate } = useSWR(
    shouldFetch ? ["/api/get/get-all-data", payload] : null,
    postFetcher,
    {
      keepPreviousData: true,
      revalidateOnFocus: false,
    }
  );

  return {
    data, // ✅ <--- ADD THIS
    cvs: data?.cv || [],
    pagination: data?.pagination || { totalPages: 1 },
    isLoading,
    error,
    mutate,
  };
}
