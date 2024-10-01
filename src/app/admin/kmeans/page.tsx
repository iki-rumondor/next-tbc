"use client";
import React, { useEffect, useState } from "react";
import MainTable from "./table";
import get_data from "actions/get_data";
import { Result } from "@/types/result";
import toast from "react-hot-toast";
import post_data from "actions/post_data";
import Select from "@/components/Forms/Select";

interface Response {
  male: Result[];
  female: Result[];
  adult: Result[];
  child: Result[];
  total: Result[];
}

const defaultValue = {
  male: [],
  female: [],
  adult: [],
  child: [],
  total: [],
};

export default function page() {
  const [data, setData] = useState<Response>(defaultValue);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [years, setYears] = useState([]);
  const [yearSelect, setYearSelect] = useState("");

  const yearProps = {
    options: years,
    handleChange: (e: any) => setYearSelect(e.target.value),
    label: "Pilih Tahun",
    value: yearSelect,
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem("token") || "";
    try {
      setIsLoading(true);
      setIsSuccess(false);
      const response = await post_data(token, "/clustering", "POST", {
        year: yearSelect,
      });
      toast.success(response.message);
      setIsSuccess(true);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoad = async () => {
    const token = localStorage.getItem("token") || "";
    try {
      const resp2 = await get_data(token, "/years/cases");
      resp2.data &&
        setYears(
          resp2.data.map((item: number) => {
            return {
              name: item,
              value: item,
            };
          })
        );
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleLoadData = async () => {
    const token = localStorage.getItem("token") || "";
    try {
      const response = await get_data(token, `/results/years/${yearSelect}`);
      response.data && setData(response.data);
      // console.log(data);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    handleLoad();
  }, [isSuccess]);

  useEffect(() => {
    yearSelect && handleLoadData();
  }, [yearSelect, isSuccess]);

  return (
    <>
      <div className="bg-white p-5 shadow-md mb-5">
        <div className="font-bold mb-5">
          Klik tombol Mulai untuk melakukan proses clustering pada jumlah kasus
          TBC di Kota Gorontalo
        </div>
        <Select props={yearProps} />
        <button
          disabled={isLoading || yearSelect == ""}
          onClick={handleSubmit}
          className="bg-primary hover:bg-blue-800 px-4 py-1 text-white font-medium"
        >
          {isLoading ? "Loading..." : "Mulai"}
        </button>
      </div>
      {data.total && yearSelect && (
        <div className="flex flex-col gap-6">
          <MainTable
            title="Hasil Clustering Keseluruhan Kasus"
            data={data.total}
          />
          <MainTable title="Hasil Clustering Anak-anak" data={data.child} />
          <MainTable title="Hasil Clustering Dewasa" data={data.adult} />
          <MainTable title="Hasil Clustering Laki-laki" data={data.male} />
          <MainTable title="Hasil Clustering Perempuan" data={data.female} />
        </div>
      )}
    </>
  );
}
