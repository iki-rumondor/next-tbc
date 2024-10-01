"use client";
import HomeHeader from "./(home_partials)/header";
import { useEffect, useState } from "react";
import get_data from "actions/get_data";
import toast from "react-hot-toast";
import MapAllMarkers from "@/components/Leaflet/MapAllMarkers";
import CloseIcon from "@/components/Icons/CloseIcon";
import Select from "@/components/Forms/Select";
import { Result } from "@/types/result";

const status = [
  { text: "RENDAH", bg: "bg-primary" },
  { text: "SEDANG", bg: "bg-warning" },
  { text: "TINGGI", bg: "bg-danger" },
];

const baseAPIUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL;
export default function Home() {
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [selectID, setSelectID] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [results, setResults] = useState<Result[]>([]);
  const [yearSelected, setYearSelected] = useState("");
  const [years, setYears] = useState([]);
  const [result, setResult] = useState<any>();

  const [category, setCategory] = useState("total");

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
    results,
    handleClick: handleOpenModal,
  };

  const yearProps = {
    options: years,
    handleChange: (e: any) => setYearSelected(e.target.value),
    label: "Pilih Tahun",
    value: yearSelected,
  };

  const handleLoad = async () => {
    try {
      setIsLoading(true);
      const resp = await get_data("", "/years/cases");
      resp.data &&
        setYears(
          resp.data.map((item: number) => {
            return {
              name: item,
              value: item,
            };
          })
        );
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoadData = async () => {
    try {
      setIsLoading(true);
      const res1 = await get_data(
        "",
        `/results/categories/${category}/years/${yearSelected}`
      );
      setResults(res1.data);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoadDetail = async () => {
    try {
      setIsLoading(true);
      const res1 = await get_data("", `/results/${selectID}`);
      res1.data && setResult(res1.data);
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
    yearSelected && handleLoadData();
  }, [yearSelected, category]);

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
            Peta Penyebaran Kasus TBC Di Kota Gorontalo {yearSelected}
          </div>
          <div className="flex justify-center gap-8 mt-4">
            <button
              onClick={() => setCategory("total")}
              className={category == "total" ? active : inActive}
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
              <div className="text-xl">
                Puskesmas {result?.case?.health_center?.name}
              </div>
              <button onClick={() => setOpenModal(false)}>
                <CloseIcon />
              </button>
            </div>
            <div className="relative w-full h-50 overflow-hidden">
              <img
                className="w-full absolute inset-1/2 -translate-x-1/2 -translate-y-1/2"
                src={`${baseAPIUrl}/files/health-centers/${result?.case?.health_center?.image_name}`}
                alt={`${result?.case?.health_center?.name}`}
              />
            </div>
            <div className="p-5 mb-3">
              <div className="text-lg">
                Cluster:{" "}
                <span
                  className={`${
                    status[result?.cluster]?.bg
                  } text-white px-3 py-1 text-sm rounded-full`}
                >
                  {status[result?.cluster]?.text}
                </span>
              </div>
              <small>
                Clustering Berdasarkan
                <span> {result?.type == "total" && "Keseluruhan"} </span>
                <span> {result?.type == "adult" && "Orang Dewasa"} </span>
                <span> {result?.type == "child" && "Anak-anak"} </span>
                <span> {result?.type == "male" && "Laki-laki"} </span>
                <span> {result?.type == "female" && "Perempuan"} </span>
              </small>
            </div>
            <div className="max-h-40 overflow-y-scroll">
              <div className="border-b border-stroke pb-2 grid grid-cols-5 px-4 text-black-2 text-sm font-medium">
                <div>Tahun</div>
                <div>Anak-anak</div>
                <div>Dewasa</div>
                <div>Laki-laki</div>
                <div>Perempuan</div>
              </div>
              {result?.case?.health_center?.cases &&
                result?.case?.health_center?.cases.map((item: any) => (
                  <div className="border-b border-stroke py-2 grid grid-cols-5 px-4 text-sm">
                    <div>{item.year}</div>
                    <div>{item.child_count}</div>
                    <div>{item.adult_count}</div>
                    <div>{item.male_count}</div>
                    <div>{item.female_count}</div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
