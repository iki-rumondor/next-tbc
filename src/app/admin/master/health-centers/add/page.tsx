"use client";
import Input from "@/components/Forms/Input";
import LayoutForm from "@/components/Forms/Layout";
import Upload from "@/components/Forms/Upload";
import BackArrowIcon from "@/components/Icons/BackArrowIcon";
import DeleteIcon from "@/components/Icons/DeleteIcon";
import MapWithClickMark from "@/components/Leaflet/MapWithClickMark";
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

const convertToMB = (bytes: number) => {
  const size = (bytes / (1024 * 1024)).toFixed(2);
  return `${size} MB`;
};

export default function page() {
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState<any | null>(null);
  const [values, setValues] = useState(defaultValue);
  const router = useRouter();

  const [position, setPosition] = useState<{ lat: number; lng: number } | null>(
    null
  );

  const handleChange = (e: any) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleChangeFile = (e: any) => {
    e.target.files && setFile(e.target.files[0]);
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

  const uploadProps = {
    primary: "File Harus Dalam Format Gambar",
    secondary: "(Ukuran Max: 1MB)",
    handleChange: handleChangeFile,
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const token = localStorage.getItem("token") || "";
    const data = new FormData();
    data.append("name", values.name);

    if (position) {
      data.append("longitude", position.lng.toString());
      data.append("latitude", position.lat.toString());
    }

    if (!file) {
      toast.error("File gambar belum diupload");
      return;
    }

    data.append("file", file);
    try {
      setIsLoading(true);
      const response = await post_data(
        token,
        config.submit_api,
        "POST",
        data,
        true
      );
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
        {file ? (
          <div className="mb-4.5">
            <p>Nama File : {file.name}</p>
            <p>Ukuran : {convertToMB(file.size)}</p>
            <button
              onClick={() => setFile(null)}
              className="inline-flex items-center justify-center gap-1.5 font-small bg-rose-500 text-white px-2 py-1 rounded-md mt-2 hover:bg-rose-600"
            >
              <span>
                <DeleteIcon />
              </span>
              Hapus
            </button>
          </div>
        ) : (
          <div className="mb-4.5">
            <div className="mb-2 block text-sm font-medium text-black dark:text-white">
              Pilih Gambar
            </div>
            <Upload props={uploadProps} />
          </div>
        )}
        <div className="w-full mb-5">
          <div className="mb-3 block text-sm font-medium text-black dark:text-white">
            Pilih Lokasi
          </div>
          <MapWithClickMark props={mapProps} />
        </div>
        <div className="grid md:grid-cols-2 md:gap-2">
          <Input props={longProps} />
          <Input props={latProps} />
        </div>
      </LayoutForm>
    </>
  );
}
