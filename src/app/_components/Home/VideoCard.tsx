"use client";

import { YoutubeVideo } from "@prisma/client";
import { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa6";
import ReactPlayer from "react-player";
import { toast } from "sonner";

import { IconButton } from "app/_components/common/UI";

import { delete_youtube_video } from "actions/home";

type VideoCardProps = {
  data: YoutubeVideo;
};

export const VideoCard: React.FC<VideoCardProps> = ({ data }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => {
      setMounted(false);
    };
  }, [mounted]);

  async function onSubmit() {
    try {
      const res = await delete_youtube_video(data.id);
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

  if (!data.url) return null;

  return (
    <div className={"relative aspect-video overflow-hidden rounded-lg"}>
      <form action={onSubmit}>
        <IconButton
          type={"submit"}
          startIcon={<FaTrash className={"text-red-500"} />}
          className={{ button: "absolute right-4 top-4" }}
        />
      </form>
      {mounted && (
        <ReactPlayer
          playsinline={true}
          url={data.url}
          width={"auto"}
          height={"100%"}
          className={"overflow-hidden rounded-lg"}
        />
      )}
    </div>
  );
};
