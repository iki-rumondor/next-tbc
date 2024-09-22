"use client";
import Input from "@/components/Forms/Input";
import LayoutForm from "@/components/Forms/Layout";
import Select from "@/components/Forms/Select";
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

interface RequestData {
  health_center_uid: string;
  year: string;
  child_count: number;
  adult_count: number;
  male_count: number;
  female_count: number;
}

interface Options {
  name: string;
  value: string;
}

export default function page({ params }: { params: { uuid: string } }) {
  const config = {
    back_url: "../cases",
    back_push: "/admin/master/cases",
    default_api: `/cases/${params.uuid}`,
    title_form: "Update Data Kasus",
  };

  const [open, setOpen] = useState(false);
  const [isCheck, setIsCheck] = useState(false);
  const [values, setValues] = useState<RequestData | any>({});
  const [healthCenters, setHealthCenters] = useState<Options[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e: any) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const healthCenterProps = {
    options: healthCenters,
    disable: true,
    handleChange: handleChange,
    label: "Pilih Puskesmas",
    name: "health_center_uuid",
    value: values.health_center_uuid,
    type: "text",
  };

  const yearProps = {
    handleChange: handleChange,
    label: "Tahun",
    placeholder: "Masukkan Tahun",
    name: "year",
    type: "text",
    value: values.year,
  };

  const childProps = {
    handleChange: handleChange,
    label: "Jumlah Kasus Anak-anak",
    name: "child_count",
    type: "number",
    value: values.child_count,
  };

  const adultProps = {
    handleChange: handleChange,
    label: "Jumlah Kasus Dewasa",
    name: "adult_count",
    type: "number",
    value: values.adult_count,
  };

  const maleProps = {
    handleChange: handleChange,
    label: "Jumlah Kasus Laki-laki",
    name: "male_count",
    type: "number",
    value: values.male_count,
  };

  const femaleProps = {
    handleChange: handleChange,
    label: "Jumlah Kasus Perempuan",
    name: "female_count",
    type: "number",
    value: values.female_count,
  };

  const handleLoad = async () => {
    const token = localStorage.getItem("token") || "";
    try {
      setIsLoading(true);
      const resp = await get_data(token, config.default_api);
      setValues({
        ...resp.data,
        health_center_uuid: resp.data.health_center.uuid,
      });

      const resp2 = await get_data(token, "/health-centers");
      if (resp2.data) {
        const result: Options[] = resp2.data.map((item: any) => {
          return { name: item.name, value: item.uuid };
        });
        setHealthCenters(result);
      }
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
    try {
      setIsLoading(true);
      const data = {
        health_center_uuid: values.health_center_uuid,
        year: values.year,
        child_count: parseInt(values.child_count),
        adult_count: parseInt(values.adult_count),
        male_count: parseInt(values.male_count),
        female_count: parseInt(values.female_count),
      };
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
    title: "Apakah yakin anda ingin menghapus kasus tersebut?",
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
        <Select props={healthCenterProps} />
        <Input props={yearProps} />
        <div className="grid md:grid-cols-2 md:gap-2 mb-5">
          <Input props={childProps} />
          <Input props={adultProps} />
          <Input props={maleProps} />
          <Input props={femaleProps} />
        </div>
      </LayoutForm>

      {open && <DeleteModal props={deleteProps} />}
    </>
  );
}
