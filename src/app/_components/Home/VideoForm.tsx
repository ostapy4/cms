"use client";

import { VideoCard } from "./VideoCard";
import { zodResolver } from "@hookform/resolvers/zod";
import { YoutubeVideo } from "@prisma/client";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { FormTextInput } from "app/_components/common/FormInputs";
import { Button } from "app/_components/common/UI";

import { create_youtube_video } from "actions/home";
import { getDefaults } from "utils/zod";
import { youtubeVideoSchema } from "utils/zod-schemas";

// const VideoCard = dynamic(() => import("app/_components/Home/VideoCard"), {
//   ssr: false,
// });

type VideoProps = {
  data: YoutubeVideo[];
};

type Form = z.infer<typeof youtubeVideoSchema>;

export function VideoForm({ data }: VideoProps) {
  const form = useForm({
    resolver: zodResolver(youtubeVideoSchema),
    defaultValues: getDefaults(youtubeVideoSchema),
  });

  async function onSubmit(data: Form) {
    try {
      const res = await create_youtube_video(data.url);
      if (res) {
        toast.success("Video created");
        form.reset(getDefaults(youtubeVideoSchema));
      }
    } catch (err) {
      console.error("Error during submission:", err);
      if (err instanceof Error) {
        toast.error(err.message);
      }
    }
  }

  return (
    <>
      <div className={"mb-4 grid grid-cols-3 gap-3"}>
        {data.map((v) => (
          <VideoCard key={v.id} data={v} />
        ))}
      </div>
      <FormProvider {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className={"lg:max-w-screen-sm"}
        >
          <div className={"flex flex-col gap-y-5"}>
            <div className={"flex flex-col gap-y-3"}>
              <FormTextInput
                fieldName={"url"}
                label={"Url"}
                placeholder={"Video url"}
                variants={"cms"}
              />
            </div>
            <Button
              type={"submit"}
              loading={form.formState.isSubmitting}
              colorVariant={"cms"}
              className={{ loadingIcon: "text-lime-300" }}
            >
              Save
            </Button>
          </div>
        </form>
      </FormProvider>
    </>
  );
}
