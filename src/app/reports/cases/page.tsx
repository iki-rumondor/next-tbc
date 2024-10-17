import React from "react";
import PrintButton from "./_internal/print_button";
import CasesReportTable from "./_internal/table";
import moment from "moment";

export default function Page() {
  return (
    <div className="bg-white p-3 min-h-screen">
      <CasesReportTable />
      <div className="my-3 flex justify-between">
        <div>Dicetak tanggal: {moment().format("DD/MM/YYYY")}</div>
      </div>
      <PrintButton />
    </div>
  );
}
