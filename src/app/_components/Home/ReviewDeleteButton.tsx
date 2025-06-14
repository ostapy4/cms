"use client";

import { FaTrash } from "react-icons/fa6";
import { toast } from "sonner";

import { IconButton } from "app/_components/common/UI";

import { delete_review } from "actions/home";

export const ReviewDeleteButton = ({ id }: { id: string }) => {
  async function onSubmit() {
    try {
      const res = await delete_review(id);
      if (res) {
        toast.success("Video deleted");
      }
    } catch (err) {
      console.error("Error during deletion:", err);
      if (err instanceof Error) {
        toast.error(err.message);
      }
    }
  }
  return (
    <form
      action={onSubmit}
      className={
        "absolute right-1 top-1/2 -translate-y-1/2 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      }
    >
      <IconButton
        type={"submit"}
        startIcon={<FaTrash className={"text-red-500"} />}
      />
    </form>
  );
};
