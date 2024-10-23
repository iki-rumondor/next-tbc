"use client";
import { Case } from "@/types/case";
import get_data from "actions/get_data";
import moment from "moment";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function CasesReportTable() {
  const searchParams = useSearchParams();
  let puskesID = searchParams.get("puskes_id");
  let puskesName = searchParams.get("puskes_name");
  if (puskesID == null) {
    puskesID = "";
  }

  const [data, setData] = useState<Case[]>([]);

  const handleLoad = async () => {
    const token = localStorage.getItem("token") || "";
    try {
      const resp = await get_data(token, `/cases?health_center=${puskesID}`);
      setData(resp.data);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    handleLoad();
  }, []);

  return (
    <>
      <div className="font-semibold text-title-lg mb-3 text-black-2">
        Laporan Kasus Puskesmas {puskesName}
      </div>

      <table className="w-full table-auto">
        <thead>
          <tr className="text-left">
            <th className="border px-2 py-1 font-medium text-black">Tahun</th>
            <th className="border px-2 py-1 font-medium text-black">
              Anak-anak
            </th>
            <th className="border px-2 py-1 font-medium text-black">Dewasa</th>
            <th className="border px-2 py-1 font-medium text-black">
              Laki-laki
            </th>
            <th className="border px-2 py-1 font-medium text-black">
              Perempuan
            </th>
            <th className="border px-2 py-1 font-medium text-black">Total</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map((item, key) => (
              <tr key={key}>
                <td className="border px-2 py-1">
                  <p className="text-black">{item.year}</p>
                </td>
                <td className="border px-2 py-1">
                  <p className="text-black">{item.child_count}</p>
                </td>
                <td className="border px-2 py-1">
                  <p className="text-black">{item.adult_count}</p>
                </td>
                <td className="border px-2 py-1">
                  <p className="text-black">{item.male_count}</p>
                </td>
                <td className="border px-2 py-1">
                  <p className="text-black">{item.female_count}</p>
                </td>
                <td className="border px-2 py-1">
                  <p className="text-black">{item.total}</p>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
}
