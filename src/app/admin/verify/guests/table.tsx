import EyeIcon from "@/components/Icons/EyeIcon";
import { Guest } from "@/types/guest";
import moment from "moment";
import Link from "next/link";
import React from "react";

interface TableProps {
  data: Guest[];
}

const MainTable: React.FC<TableProps> = ({ data }) => {
  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="max-w-full overflow-x-auto">
        <div className="border-b border-stroke pb-4 dark:border-strokedark mb-4">
          <h3 className="font-medium text-black dark:text-white">
            Verifikasi Akun Pembeli
          </h3>
        </div>
        {data.length > 0 && (
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-2 text-left dark:bg-meta-4">
                <th className=" px-4 py-4 font-medium text-black dark:text-white">
                  Nama Lengkap
                </th>
                <th className=" px-4 py-4 font-medium text-black dark:text-white">
                  Waktu Mendaftar
                </th>
                <th className=" px-4 py-4 font-medium text-black dark:text-white">
                  Status
                </th>
                <th className="px-4 py-4 font-medium text-black dark:text-white">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, key) => (
                <tr key={key}>
                  <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                    <p className="text-black dark:text-white">{item.name}</p>
                  </td>
                  <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                    <p className="text-black dark:text-white">
                      {moment.unix(item.created_at / 1000).fromNow()}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                    <p
                      className={`inline-block rounded px-2 py-1 text-sm font-medium text-white ${
                        item.user.is_active ? "bg-success" : "bg-warning"
                      }`}
                    >
                      {item.user.is_active ? "Aktif" : "Belum Aktif"}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                    <div className="flex items-center space-x-3.5">
                      <Link
                        href={`guests/${item.uuid}`}
                        className="hover:text-primary"
                      >
                        <EyeIcon />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default MainTable;