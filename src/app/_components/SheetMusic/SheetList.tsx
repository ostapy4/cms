"use client";

import { ApplicantsTable } from "./Table/ApplicantsTable";
import { COLUMNS } from "./Table/columns";
import { UploadSheetForm } from "./UploadSheetForm";
import { SheetMusic } from "@prisma/client";
import { useEffect, useState } from "react";

import { delete_sheet } from "actions/sheet-music";

type SheetListProps = {
  sheets: SheetMusic[];
};
export function SheetList({ sheets }: SheetListProps) {
  const [activeSheet, setActiveSheet] = useState<SheetMusic | null>(null);
  const [sheetID, setSheetID] = useState<string | null>();

  useEffect(() => {
    const sheet = sheets.find((s) => s.id === sheetID);

    if (sheet) {
      setActiveSheet(sheet);
    }
  }, [sheetID, sheets]);
  return (
    <>
      <UploadSheetForm
        data={activeSheet}
        resetSheetState={() => {
          setActiveSheet(null);
          setSheetID(null);
        }}
      />
      <ApplicantsTable<SheetMusic>
        data={sheets}
        columns={COLUMNS}
        deleteSheet={delete_sheet}
        setID={setSheetID}
      />
    </>
  );
}
