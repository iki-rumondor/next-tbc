import { Result } from "@/types/result";
import React from "react";

interface TableProps {
  data: Result[];
  title: string;
}

const status = [
  { text: "RENDAH", bg: "bg-primary" },
  { text: "SEDANG", bg: "bg-warning" },
  { text: "TINGGI", bg: "bg-danger" },
];

const MainTable: React.FC<TableProps> = ({ data, title }) => {
  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="max-w-full overflow-x-auto">
        <div className="border-b border-stroke pb-4 dark:border-strokedark mb-4">
          <h3 className="font-medium text-black dark:text-white">{title}</h3>
        </div>
        {data.length > 0 && (
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-2 text-left dark:bg-meta-4">
                <th className=" px-4 py-4 font-medium text-black dark:text-white">
                  Puskesmas
                </th>
                <th className=" px-4 py-4 font-medium text-black dark:text-white">
                  Jumlah
                </th>
                <th className=" px-4 py-4 font-medium text-black dark:text-white">
                  Klaster
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, key) => (
                <tr key={key}>
                  <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                    <p className="text-black dark:text-white">
                      {item.case.health_center.name}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                    <p className="text-black dark:text-white">{item.total}</p>
                  </td>
                  <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                    <p className={`${status[item.cluster].bg} inline-block px-4 py-1 rounded-full text-white text-sm font-medium`}>
                      {status[item.cluster].text}
                    </p>
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
