"use client";

import { ImageCard } from "./ImageCard";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "app/_components/common/UI";

import { upload_main_image } from "actions/home";
import { UploadButton } from "utils/uploadthing";

type MainImageFormProps = {
  data: {
    id: string;
    image: string;
  } | null;
};

export function MainImageForm({ data }: MainImageFormProps) {
  const [image, setImage] = useState<string>(data?.image ?? "");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function onSubmit() {
    if (!image) {
      toast.error("Please upload an image");
      return;
    }
    setIsLoading(true);
    try {
      const res = await upload_main_image(image);

      if (res) {
        toast.success("Main image successfully updated");
      }

      setIsLoading(false);
    } catch (err) {
      console.error("Error during submission:", err);

      if (err instanceof Error) {
        toast.error(err.message);
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form action={onSubmit} className={"lg:max-w-screen-sm"}>
      <div className={"flex flex-col gap-y-5"}>
        <div className={"flex flex-col gap-y-3"}>
          <div className={"max-w-md"}>
            {image && <ImageCard url={image} onDelete={() => setImage("")} />}
          </div>
          <UploadButton<"mainImage">
            endpoint={"mainImage"}
            onClientUploadComplete={(res) => {
              setImage(res[0].ufsUrl ?? "");
            }}
            onUploadError={(error: Error) => {
              console.error(`ERROR! ${error.message}`);
            }}
          />
        </div>
        <Button
          type={"submit"}
          loading={isLoading}
          colorVariant={"cms"}
          className={{ loadingIcon: "text-lime-300" }}
        >
          Save
        </Button>
      </div>
    </form>
  );
}
