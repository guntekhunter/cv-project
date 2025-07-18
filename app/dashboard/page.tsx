"use client";

import { useEffect, useState } from "react";
import Button from "../component/buttons/Button";
import { getCvs } from "../fetch/get/fetch";
import { useRouter } from "next/navigation";
import AddCv from "../component/modal/AddCvModal";
import EditableCvId from "../component/input/EditableCvId";
import useSWR from "swr";
import { useCvs } from "@/hook/useCvs";

export default function Page() {
  const [token, setToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<number | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [cv, setCv] = useState<any[]>([]);
  const [loadingId, setLoadingId] = useState<number | null>(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

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

  const { cvs, pagination, isLoading, mutate } = useCvs(userId, page);

  useEffect(() => {
    if (cvs && pagination) {
      setTotalPages(pagination.totalPages || 1);
      console.log("uhhuy", cvs);
    }
  }, [cvs, pagination]); // 👈 trigger fetch on page change

  const handleDetail = async (id: number) => {
    console.log("idnya", id);
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

  const addCv = () => {
    console.log("teklik");
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  console.log(cvs, "modal cv");

  return (
    <div className="w-full flex flex-col items-center min-h-screen bg-gray-50 py-8">
      {/* Modal */}
      {modalIsOpen && <AddCv onClose={closeModal} cv={cvs} />}

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
          {cvs?.length > 0 ? (
            cvs.map((item: any) => (
              <div
                key={item.id}
                className="relative rounded-lg border border-gray-200 shadow-sm p-4 flex flex-col justify-between bg-white"
              >
                {loadingId === item.id && (
                  <div className="absolute inset-0 bg-white/70 flex items-center justify-center z-10 rounded-lg">
                    <span className="text-sm text-gray-700">Loading...</span>
                  </div>
                )}

                <EditableCvId
                  initialId={item.cv_name}
                  cvRowId={item.id}
                  idCv={item.id}
                  onSuccess={(newId) => {
                    setCv((prev) =>
                      prev.map((cvItem) =>
                        cvItem.id === item.id
                          ? { ...cvItem, cv_id: newId }
                          : cvItem
                      )
                    );
                  }}
                />

                <div className="text-xs text-gray-500">
                  {item.PersonalData?.name || "Tanpa Nama"}
                </div>
                <div className="text-xs text-gray-500">
                  Dibuat pada:{" "}
                  {new Date(item.createdAt).toLocaleDateString("id-ID")}
                </div>

                <div className="mt-4 space-y-2">
                  <Button
                    onClick={() => handleDetail(item.id)}
                    className="w-full"
                  >
                    Lihat CV
                  </Button>
                  {/* <Button disabled={loadingId === item.id}>Download</Button> */}
                </div>
              </div>
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
