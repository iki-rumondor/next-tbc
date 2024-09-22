"use client";
import Input from "@/components/Forms/Input";
import LayoutForm from "@/components/Forms/Layout";
import BackArrowIcon from "@/components/Icons/BackArrowIcon";
import Map from "@/components/Leaflet/Map";
import post_data from "actions/post_data";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

const config = {
  back_url: "../health-centers",
  back_push: "/admin/master/health-centers",
  submit_api: "/health-centers",
  title_form: "Tambah Data Puskesmas",
};

const defaultValue = {
  name: "",
};

export default function page() {
  const [isLoading, setIsLoading] = useState(false);
  const [values, setValues] = useState(defaultValue);
  const router = useRouter();

  const [position, setPosition] = useState<{ lat: number; lng: number } | null>(
    null
  );

  const handleChange = (e: any) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const mapProps = {
    position,
    setPosition,
  };

  const nameProps = {
    handleChange: handleChange,
    label: "Nama Puskesmas",
    name: "name",
    type: "text",
    value: values.name,
  };

  const longProps = {
    name: "longitude",
    label: "Longitude",
    noLabel: true,
    disable: true,
    type: "text",
    value: position?.lng,
  };

  const latProps = {
    name: "latitude",
    label: "Latitude",
    disable: true,
    noLabel: true,
    type: "text",
    value: position?.lat,
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const token = localStorage.getItem("token") || "";
    const data = {
      name: values.name,
      longitude: position?.lng,
      latitude: position?.lat,
    };
    try {
      setIsLoading(true);
      const response = await post_data(token, config.submit_api, "POST", data);
      toast.success(response.message);
      router.push(config.back_push);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Link
        href={config.back_url}
        className="inline-flex items-center justify-center gap-2.5 bg-primary px-4 py-2 text-center font-medium text-white hover:bg-opacity-90 mb-4"
      >
        <span>
          <BackArrowIcon />
        </span>
        Kembali
      </Link>
      <LayoutForm
        handleSubmit={handleSubmit}
        isLoading={isLoading}
        title={config.title_form}
      >
        <Input props={nameProps} />
        <div className="w-full mb-5">
          <div className="mb-3 block text-sm font-medium text-black dark:text-white">
            Pilih Lokasi
          </div>
          <Map props={mapProps} />
        </div>
        <div className="grid md:grid-cols-2 md:gap-2">
          <Input props={longProps} />
          <Input props={latProps} />
        </div>
      </LayoutForm>
    </>
  );
}
