import Image from "next/image";
import { FaTrash } from "react-icons/fa6";

import { IconButton } from "app/_components/common/UI";

type ImageCardProps = {
  url: string;
  onDelete: () => void;
};

export function ImageCard({ url, onDelete }: ImageCardProps) {
  return (
    <div
      className={
        "relative aspect-square overflow-hidden rounded-xl bg-ok_main-50"
      }
    >
      <Image
        src={url}
        alt={"Image"}
        fill
        className={"object-contain"}
        loading={"lazy"}
      />
      <IconButton
        onClick={onDelete}
        startIcon={
          <FaTrash
            className={
              "size-4 text-red-500 transition-all group-hover:scale-105 group-hover:text-red-400"
            }
          />
        }
        className={{ button: "absolute right-1 top-1" }}
      />
    </div>
  );
}
