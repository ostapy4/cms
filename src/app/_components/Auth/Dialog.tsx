"use client";

import { DialogPanel, Dialog as HuiDialog } from "@headlessui/react";

import { Title } from "app/_components/common";

type DialogProps = {
  children: React.ReactNode;
  isOpen: boolean;
};

export function Dialog({ isOpen, children }: DialogProps) {
  return (
    <HuiDialog open={isOpen} onClose={() => {}} className={"relative z-50"}>
      <div
        className={
          "fixed inset-0 flex w-screen items-center justify-center bg-lime-100 p-3 backdrop-blur"
        }
      >
        <DialogPanel
          className={
            "max-h-full max-w-lg space-y-4 overflow-y-auto overflow-x-hidden rounded-2xl bg-white p-6 sm:p-12"
          }
        >
          <Title className={"text-center text-lime-900"}>Welcome Ostap</Title>
          <p className={"text-center text-lime-700"}>
            Just confirm your credentials and feel free to update your website
            content
          </p>
          {children}
        </DialogPanel>
      </div>
    </HuiDialog>
  );
}
