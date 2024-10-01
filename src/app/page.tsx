"use client";
import HomeHeader from "./(home_partials)/header";
import { useEffect, useState } from "react";
import get_data from "actions/get_data";
import toast from "react-hot-toast";
import MapAllMarkers from "@/components/Leaflet/MapAllMarkers";
import { HealthCenter } from "@/types/health_center";
import CloseIcon from "@/components/Icons/CloseIcon";
import Select from "@/components/Forms/Select";

export default function Home() {
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [selectID, setSelectID] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [healthCenters, setHealthCenters] = useState<HealthCenter[]>([]);
  const [data, setData] = useState<HealthCenter | null>(null);

  const [category, setCategory] = useState("all");
  const [year, setYear] = useState("2024");

  const active =
    "bg-primary px-4 py-1 text-white rounded-full transition duration-700 ease-in-out";
  const inActive = "px-4 py-1 hover:text-primary";

  const handleOpen = () => {
    setOpen(true);
  };

  const handleOpenModal = (uuid: string) => {
    setOpenModal(true);
    setSelectID(uuid);
  };

  const mapProps = {
    healthCenters,
    handleClick: handleOpenModal,
  };

  const yearProps = {
    options: [
      { value: "2024", name: "2024" },
      { value: "2023", name: "2023" },
    ],
    handleChange: (e: any) => setYear(e.target.value),
    label: "Pilih Tahun",
    value: year,
  };

  const handleLoad = async () => {
    try {
      setIsLoading(true);
      const res1 = await get_data("", "/health-centers");
      res1.data && setHealthCenters(res1.data);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoadDetail = async () => {
    try {
      setIsLoading(true);
      const res1 = await get_data("", `/public/health-centers/${selectID}`);
      res1.data && setHealthCenters(res1.data);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLogin(true);
    }
    handleLoad();
  }, []);

  useEffect(() => {
    selectID && handleLoadDetail();
  }, [selectID]);

  return (
    <div className="bg-white">
      <div className="sticky top-0 z-50">
        <HomeHeader isLogin={isLogin} handleOpen={handleOpen} />
      </div>
      <div className="h-screen flex flex-col">
        <div className="relative flex-grow bg-homepage bg-no-repeat bg-cover bg-center h-full flex justify-center items-center text-white">
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="flex flex-col text-center gap-2 z-10">
            <div className="text-title-xxl2 font-bold">
              Selamat Datang Di Website Resmi P3K Bone Bolango
            </div>
            <div className="text-lg font-medium w-2/3 m-auto">
              Media informasi untuk masyarakat bone bolango dalam mengetahui
              arsip lengkap dan jual beli produk umkm{" "}
            </div>
          </div>
        </div>
      </div>
      <section className="p-10 mt-10">
        <div className="mb-10">
          <div className="inline-block">
            <Select props={yearProps} />
          </div>
          <div className="text-title-lg text-center text-black-2 font-medium">
            Peta Penyebaran Kasus TBC Di Kota Gorontalo {year}
          </div>
          <div className="flex justify-center gap-8 mt-4">
            <button
              onClick={() => setCategory("all")}
              className={category == "all" ? active : inActive}
            >
              Seluruh
            </button>
            <button
              onClick={() => setCategory("child")}
              className={category == "child" ? active : inActive}
            >
              Anak-anak
            </button>
            <button
              onClick={() => setCategory("adult")}
              className={category == "adult" ? active : inActive}
            >
              Dewasa
            </button>
            <button
              onClick={() => setCategory("male")}
              className={category == "male" ? active : inActive}
            >
              Laki-laki
            </button>
            <button
              onClick={() => setCategory("female")}
              className={category == "female" ? active : inActive}
            >
              Perempuan
            </button>
          </div>
        </div>
        <MapAllMarkers props={mapProps} />
      </section>
      {openModal && (
        <div className="fixed w-full top-0 right-0 z-50 min-h-screen grid grid-cols-1 md:grid-cols-2">
          <div className="inset-0 bg-black bg-opacity-50 md:block hidden"></div>
          <div className="bg-white">
            <div className="flex justify-between items-center p-5">
              <div className="text-xl">Nama Puskesmas</div>
              <button onClick={() => setOpenModal(false)}>
                <CloseIcon />
              </button>
            </div>
            <div className="relative w-full h-50 overflow-hidden">
              <img
                className="w-full absolute inset-1/2 -translate-x-1/2 -translate-y-1/2"
                src={"/images/test-img.jpeg"}
                // alt={`${props?.name}`}
              />
            </div>
            <div className="p-5 mb-3">
              <div className="text-lg">
                Cluster:{" "}
                <span className="bg-primary text-white px-3 py-1 text-sm rounded-full">
                  Rendah
                </span>
              </div>
              <small>Clustering Berdasarkan Tahun</small>
            </div>
            <div className="max-h-40 overflow-y-scroll">
              <div className="border-b border-stroke pb-2 flex justify-between px-4 text-black-2 text-sm font-medium">
                <div>Tahun</div>
                <div>Anak-anak</div>
                <div>Dewasa</div>
                <div>Laki-laki</div>
                <div>Perempuan</div>
              </div>
              <div className="border-b border-stroke py-2 flex justify-between px-4 text-sm">
                <div>Tahun</div>
                <div>Anak-anak</div>
                <div>Dewasa</div>
                <div>Laki-laki</div>
                <div>Perempuan</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
