"use client";

import get_data from "actions/get_data";
import { ApexOptions } from "apexcharts";
import { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import toast from "react-hot-toast";

const defaultValue = {
  year_cases: [],
  total_cases: [],
};

export default function MainGraph() {
  const [isLoading, setIsLoading] = useState(false);
  const [value, setValue] = useState(defaultValue);

  const options: ApexOptions = {
    chart: {
      type: "line",
      height: 350,
    },
    stroke: {
      curve: "smooth",
    },
    markers: {
      size: 6,
      colors: ["#FF4560"],
      strokeWidth: 3,
      hover: {
        size: 8,
      },
    },
    xaxis: {
      categories: value.year_cases,
    },
    title: {
      text: "Line Chart Cases",
      align: "center",
    },
  };

  const series = [
    {
      name: "Kasus Keseluruhan TBC",
      data: value.total_cases,
    },
  ];

  const handleLoad = async () => {
    const token = localStorage.getItem("token") || "";
    try {
      setIsLoading(true);
      const resp = await get_data(token, "/dashboards/admin");
      setValue(resp.data);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleLoad();
  }, []);

  return (
    <>
      {value.total_cases && (
        <ReactApexChart
          options={options}
          series={series}
          type="line"
          height={350}
          width={"100%"}
        />
      )}
    </>
  );
}
