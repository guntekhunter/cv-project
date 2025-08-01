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
      {/* Modal */}
      {modalIsOpen && <AddCv onClose={closeModal} cv={cv} />}

      {/* CV Cards Grid */}
      <div className="w-full max-w-[80%] bg-white rounded-lg shadow-sm p-6">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {/* Add CV Button */}
          <div
            className="cursor-pointer border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center p-4 hover:bg-red-50 transition-all"
            onClick={addCv}
          >
            <img src="/plus.png" alt="Add CV" className="w-6 h-6" />
          </div>

          {/* CV Items */}
          {cv?.length > 0 ? (
            cv.map((item: any) => (
              <CvCards
                key={item.id}
                item={item}
                loadingId={loadingId}
                setCv={setCv}
                handleDetail={handleDetail}
                handleDelete={handleDelete}
              />
            ))
          ) : (
            <div className="text-center col-span-full text-gray-500 text-sm">
              <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-green-500" />
            </div>
          )}
        </div>
      </div>

      {/* Pagination */}
      <div className="mt-6 flex items-center space-x-2">
        <button
          className="px-4 py-2 border border-gray-300 rounded-md bg-white hover:bg-gray-100 disabled:opacity-50"
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
        >
          {"<"}
        </button>
        <span className="text-sm text-gray-700">
          Page {page} of {totalPages}
        </span>
        <button
          className="px-4 py-2 border border-gray-300 rounded-md bg-white hover:bg-gray-100 disabled:opacity-50"
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
        >
          {">"}
        </button>
      </div>
    </div>
  );
}
