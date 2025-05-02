"use client";

import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "app/_components/common/UI";

import { delete_info_section } from "actions/about";

type DeleteSectionProps = {
  sectionId: string;
};

export function DeleteSection({ sectionId }: DeleteSectionProps) {
  const [isOpen, setIsOpen] = useState(false);

  if (!sectionId) return null;

  async function onSubmit() {
    try {
      await delete_info_section(sectionId);
      toast.success("Section deleted successfully");
      setIsOpen(false);
    } catch (err) {
      if (err instanceof Error) {
        toast.error(`Failed to delete section: ${err.message}`);
      } else {
        toast.error("An unknown error occurred.");
      }
    }
  }

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Delete Section</Button>
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className={"relative z-50"}
      >
        <div
          className={
            "fixed inset-0 flex w-screen items-center justify-center bg-lime-950/15 p-4 backdrop-blur-sm"
          }
        >
          <DialogPanel
            className={
              "flex w-full max-w-md flex-col items-center gap-y-4 rounded-xl bg-ok_main-50 p-8"
            }
          >
            <DialogTitle className={"text-2xl font-semibold text-lime-900"}>
              Are you sure?
            </DialogTitle>
            <div className={"flex gap-x-8"}>
              <form action={onSubmit}>
                <Button type={"submit"} colorVariant={"danger"}>
                  Delete
                </Button>
              </form>
              <Button colorVariant={"cancel"} onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
}
