"use client";
import BasicCard from "@/components/Card/BasicCard";
import Select from "@/components/Forms/Select";
import { HealthCenter } from "@/types/health_center";
import get_data from "actions/get_data";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function Page() {
  const [healthCenters, setHealthCenters] = useState([]);
  const [select, setSelect] = useState("");

  const healthCenterProps = {
    value: select,
    options: healthCenters,
    name: "select",
    label: "Pilih Puskesmas",
    handleChange: (e: any) => setSelect(e.target.value),
  };

  const handleClick = () => {
    const url = `/reports/cases/?puskes_id=${select}`;
    window.open(url, "_blank");
  };

  const defaultButtonClass = "text-white px-3 py-1.5 inline-block";

  const handleLoad = async () => {
    const token = localStorage.getItem("token") || "";
    try {
      const response = await get_data(token, "/health-centers");
      if (response.data) {
        const options = response.data.map((item: HealthCenter) => {
          return {
            name: item.name,
            value: item.uuid,
          };
        });
        setHealthCenters(options);
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    handleLoad();
  }, []);

  return (
    <BasicCard title="Laporan Akun Marketplace">
      <div className="p-5">
        <Select props={healthCenterProps} />
        <button
          onClick={handleClick}
          disabled={select == ""}
          className={`${defaultButtonClass} ${
            select ? "bg-primary hover:bg-blue-800" : "bg-slate-300"
          }`}
        >
          Lihat Laporan
        </button>
      </div>
    </BasicCard>
  );
}
