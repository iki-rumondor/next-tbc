"use client";
import Input from "@/components/Forms/Input";
import LayoutForm from "@/components/Forms/Layout";
import BackArrowIcon from "@/components/Icons/BackArrowIcon";
import DeleteIcon from "@/components/Icons/DeleteIcon";
import Map from "@/components/Leaflet/Map";
import Loader from "@/components/Loader";
import DeleteModal from "@/components/Modal/DeleteModal";
import get_data from "actions/get_data";
import post_data from "actions/post_data";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const defaultValue = {
  name: "",
};

interface Position {
  lat: number;
  lng: number;
}

export default function page({ params }: { params: { uuid: string } }) {
  const config = {
    back_url: "../health-centers",
    back_push: "/admin/master/health-centers",
    default_api: `/health-centers/${params.uuid}`,
    title_form: "Update Data Puskesmas",
  };

  const [open, setOpen] = useState(false);
  const [isCheck, setIsCheck] = useState(false);
  const [values, setValues] = useState(defaultValue);
  const [isLoading, setIsLoading] = useState(false);
  const [position, setPosition] = useState<Position | null>(null);
  const router = useRouter();

  const handleChange = (e: any) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const mapProps = {
    position,
    setPosition,
  };

  const nameProps = {
    handleChange: handleChange,
    label: "Nama Kategori",
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

  const handleLoad = async () => {
    const token = localStorage.getItem("token") || "";
    try {
      setIsLoading(true);
      const resp = await get_data(token, config.default_api);
      setValues({ name: resp.data.name });
      setPosition({ lng: resp.data.longitude, lat: resp.data.latitude });
    } catch (error: any) {
      toast.error(error.message);
      router.push(config.back_push);
    } finally {
      setIsCheck(true);
      setIsLoading(false);
    }
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
      const response = await post_data(token, config.default_api, "PUT", data);
      toast.success(response.message);
      router.push(config.back_push);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    const token = localStorage.getItem("token") || "";
    try {
      setIsLoading(true);
      const response = await post_data(token, config.default_api, "DELETE");
      toast.success(response.message);
      router.push(config.back_push);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteProps = {
    title:
      "Setelah menghapus kategori tersebut, seluruh umkm dengan kategori tersebut akan dihapus juga",
    toggleModal: () => setOpen(!open),
    handleSubmit: handleDelete,
    isLoading: isLoading,
  };

  useEffect(() => {
    handleLoad();
  }, []);

  return !isCheck ? (
    <Loader />
  ) : (
    <>
      <div className="inline-flex gap-2.5">
        <Link
          href={config.back_url}
          className="inline-flex items-center justify-center gap-2.5 bg-primary px-4 py-2 text-center font-medium text-white hover:bg-opacity-90 mb-4"
        >
          <span>
            <BackArrowIcon />
          </span>
          Kembali
        </Link>
        <button
          onClick={() => {
            setOpen(true);
          }}
          className="inline-flex items-center justify-center gap-2.5 bg-rose-600 px-4 py-2 text-center font-medium text-white hover:bg-opacity-90 mb-4"
        >
          <span>
            <DeleteIcon />
          </span>
          Hapus
        </button>
      </div>
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

      {open && <DeleteModal props={deleteProps} />}
    </>
  );
}
