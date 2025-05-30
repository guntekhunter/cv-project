"use client";
import { getAllData } from "@/app/fetch/get/fetch";
import React, { useEffect, useState } from "react";

export default function FileDisplay(props: any) {
  const [data, setData] = useState([]);
  const [biodata, setBiodata] = useState<any>([]);
  const step = props.step;

  useEffect(() => {
    const getAllTheData = async () => {
      const cvIdString = localStorage.getItem("cv_id");
      const cvId = cvIdString !== null ? parseInt(cvIdString) : 0;
      const personalIdString = localStorage.getItem("personal_id");
      const personalId =
        personalIdString !== null ? parseInt(personalIdString) : 0;
      const res = await getAllData(cvId, personalId);

      console.log("ini hasilnya", res);
      if (res?.data.biodata) {
        setBiodata(res?.data.biodata[0]);
      }
    };
    getAllTheData();
  }, [step]);

  console.log(biodata);

  useEffect(() => {
    const pageHeight = (80 * window.innerHeight) / 100; // 90vh
    const content = document.getElementById("page-content");
    const documentContainer = document.getElementById("document");

    if (!content || !documentContainer) return;

    const nodes = Array.from(content.children);
    let currentPage = createPage();
    documentContainer.appendChild(currentPage);

    let currentHeight = 0;

    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i].cloneNode(true) as HTMLElement;

      // Append temporarily to measure
      currentPage.appendChild(node);
      const nodeHeight = node.offsetHeight;

      // Check if adding this node exceeds the page
      if (currentHeight + nodeHeight > pageHeight) {
        currentPage.removeChild(node); // Remove it
        currentPage = createPage(); // New page
        documentContainer.appendChild(currentPage);
        currentPage.appendChild(node); // Append to new page
        currentHeight = node.offsetHeight; // Reset height
      } else {
        currentHeight += nodeHeight;
      }
    }

    function createPage() {
      const div = document.createElement("div");
      div.className =
        "page bg-white p-[2rem] w-[90%] shadow-md space-y-[1rem] h-[90vh] overflow-hidden";
      return div;
    }
  }, []);
  return (
    <div className="bg-[#F6F6F6] w-full h-[90%] overflow-y-scroll flex p-[2rem] justify-around text-[.5rem]">
      <div id="document" className="w-full space-y-[2rem]"></div>
      <div id="page-content" className="hidden">
        <div className="flex">
          <div className="w-[20%]">photo</div>
          <div className="w-[80%] bg-red-200">
            <h1 className="font-bold text-[.8rem]">Omaygot</h1>
            <div className="text-[.4rem]">
              <div className="flex space-x-1">
                <p>0090808</p>
                <p>|</p>
                <p>kasjkasdasjkd/asdhasdh</p>
              </div>
              <div className="pt-[2rem]">
                <p>{biodata.address}</p>
                <p>{biodata.professional_summary}</p>
              </div>
            </div>
          </div>
        </div>
        {/* skills */}
        <div className="pt-[1rem]">
          <h2 className="font-bold text-[.5rem]">
            Keterampilan Teknis, Keterampilan Non Teknis dan Pencapaian
          </h2>
          <ul className="list-disc pl-5">
            <li>
              <span>type year</span>
              <span>aasdasd</span>
            </li>
          </ul>
        </div>

        {/* experience */}
        <div className="space-y-[.5rem]">
          <h2 className="font-bold text-[.5rem]">Pengalaman Kerja</h2>
          <div className="flex w-full justify-between">
            <div>
              <p className="text-[.5rem]">
                <span className="font-bold">Ommaleka</span>
              </p>
            </div>
            <div>asdasd</div>
          </div>

          <p className="italic">Penuh Waktu</p>

          <p>
            PEVESINDO Merupakan store brand dari PT. Aslastri Teguh
            International merupakan produsen sekaligus distributor plafon PVC,
            lantai SPC, lantai vinyl, dan wallpanel WPC dan berbagai produk PVC
            lainnya.
          </p>
          <ul className="list-disc pl-5">
            <li>
              <span>type year</span>
              <span>aasdasd</span>
            </li>
          </ul>
        </div>

        {/* education */}
        <div className="space-y-[.5rem]">
          <h2 className="font-bold text-[.5rem]">Riwayat Pendidikan</h2>
          <div className="flex w-full justify-between">
            <div>
              <p className="text-[.5rem]">
                <span className="font-bold">Ommaleka</span>
              </p>
            </div>
            <div>asdasd</div>
          </div>

          <p className="italic">Penuh Waktu</p>

          <p>
            PEVESINDO Merupakan store brand dari PT. Aslastri Teguh
            International merupakan produsen sekaligus distributor plafon PVC,
            lantai SPC, lantai vinyl, dan wallpanel WPC dan berbagai produk PVC
            lainnya.
          </p>
          <ul className="list-disc pl-5">
            <li>
              <span>type year</span>
              <span>aasdasd</span>
            </li>
          </ul>
        </div>
        {/* organisation */}
        <div className="space-y-[.5rem]">
          <h2 className="font-bold text-[.5rem]">Pengalaman Berorganisasi</h2>
          <div className="flex w-full justify-between">
            <div>
              <p className="text-[.5rem]">
                <span className="font-bold">Ommaleka</span>
              </p>
            </div>
            <div>asdasd</div>
          </div>

          <p className="italic">Penuh Waktu</p>

          <p>
            PEVESINDO Merupakan store brand dari PT. Aslastri Teguh
            International merupakan produsen sekaligus distributor plafon PVC,
            lantai SPC, lantai vinyl, dan wallpanel WPC dan berbagai produk PVC
            lainnya.
          </p>
          <ul className="list-disc pl-5">
            <li>
              <span>type year</span>
              <span>aasdasd</span>
            </li>
          </ul>
        </div>
        {/* organisation */}
        <div className="space-y-[.5rem]">
          <h2 className="font-bold text-[.5rem]">Pengalaman Berorganisasi</h2>
          <div className="flex w-full justify-between">
            <div>
              <p className="text-[.5rem]">
                <span className="font-bold">Ommaleka</span>
              </p>
            </div>
            <div>asdasd</div>
          </div>

          <p className="italic">Penuh Waktu</p>

          <p>
            PEVESINDO Merupakan store brand dari PT. Aslastri Teguh
            International merupakan produsen sekaligus distributor plafon PVC,
            lantai SPC, lantai vinyl, dan wallpanel WPC dan berbagai produk PVC
            lainnya.
          </p>
          <ul className="list-disc pl-5">
            <li>
              <span>type year</span>
              <span>aasdasd</span>
            </li>
          </ul>
        </div>
        {/* organisation */}
        <div className="space-y-[.5rem]">
          <h2 className="font-bold text-[.5rem]">Pengalaman Berorganisasi</h2>
          <div className="flex w-full justify-between">
            <div>
              <p className="text-[.5rem]">
                <span className="font-bold">Ommaleka</span>
              </p>
            </div>
            <div>asdasd</div>
          </div>

          <p className="italic">Penuh Waktu</p>

          <p>
            PEVESINDO Merupakan store brand dari PT. Aslastri Teguh
            International merupakan produsen sekaligus distributor plafon PVC,
            lantai SPC, lantai vinyl, dan wallpanel WPC dan berbagai produk PVC
            lainnya.
          </p>
          <ul className="list-disc pl-5">
            <li>
              <span>type year</span>
              <span>aasdasd</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
