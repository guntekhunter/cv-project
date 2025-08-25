"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useCvs } from "@/hook/useCvs";
import { deleteCv } from "../fetch/delete/fetch";
import isEqual from "lodash.isequal";
import CvCards from "../component/card/cardsComponent/CvCards";
import dynamic from "next/dynamic";

const AddCv = dynamic(() => import("../component/modal/AddCvModal"), {
  ssr: false,
});
type PaginationType = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

export default function Page() {
  const [token, setToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<number | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [cv, setCv] = useState<any[]>([]);
  const [loadingIdDelete, setLoadingIdDelete] = useState<number | null>(null);
  const [loadingId, setLoadingId] = useState<number | null>(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pagination, setPagination] = useState<PaginationType | null>(null);

  const route = useRouter();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (storedToken) setToken(storedToken);

    if (storedUser) {
      try {
        const userObj = JSON.parse(storedUser);
        console.log("objnya", userObj);
        setUserId(userObj || null);
        setUserEmail(userObj?.email || null);
      } catch (e) {
        console.error("Invalid user data in localStorage:", e);
      }
    }
  }, []);
  const { cvs, paginations, isLoading, mutate } = useCvs(userId, page);
  console.log(paginations, "paginasinya");

  useEffect(() => {
    if (Array.isArray(cvs) && !isEqual(cvs, cv)) {
      setCv(cvs);
    }

    if (
      paginations &&
      typeof paginations.totalPages === "number" &&
      !isEqual(paginations, pagination)
    ) {
      setPagination(paginations);
      setTotalPages(paginations.totalPages);
    }
  }, [cvs, paginations]);

  const handleDetail = async (id: number) => {
    setLoadingId(id);
    try {
      // simulate loading
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // once you're ready to navigate:
      route.push(`/preview/${id}`);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingId(null); // reset when done
    }
  };

  const handleDelete = async (e: any) => {
    setLoadingId(e);
    try {
      const id = parseInt(e);
      const payload = {
        id,
        user_id: userId,
        page,
      };
      const res = await deleteCv(payload);

      const updatedData = res?.data.updatedData;
      const updatedPaginations = res?.data.paginations;

      // If page needs to be adjusted (e.g., after deletion current page becomes invalid)
      if (updatedPaginations?.page && updatedPaginations.page !== page) {
        setPage(updatedPaginations.page); // This will trigger useCvs to fetch new page data
      } else {
        // Otherwise just update state manually
        setCv(updatedData);
        setPagination(updatedPaginations);
        setTotalPages(updatedPaginations?.totalPages || 1);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingId(null);
    }
  };

  const addCv = () => {
    console.log("teklik");
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div className="w-full flex flex-col items-center min-h-screen bg-gray-50 py-[6rem]">
      Ai Interview
    </div>
  );
}
