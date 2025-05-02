"use client";

import { DndContext, DragEndEvent, closestCenter } from "@dnd-kit/core";
import { SortableContext, arrayMove, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { FaTrash } from "react-icons/fa6";
import { toast } from "sonner";
import { z } from "zod";

import { FormTextInput } from "app/_components/common/FormInputs";
import { Button, IconButton } from "app/_components/common/UI";

import { update_gallery } from "actions/home";
import { UploadDropzone } from "utils/uploadthing";

type ImageItem = { image: string; id?: string; galleryId?: string };

type GalleryProps = {
  data: {
    id: string;
    title: string;
    images?: ImageItem[];
  } | null;
};

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
});

type Form = z.infer<typeof formSchema>;

export function GalleryForm({ data }: GalleryProps) {
  const [images, setImages] = useState<ImageItem[]>(data?.images ?? []);
  const [mount, setMount] = useState<boolean>(false);

  useEffect(() => {
    setMount(true);
  }, []);

  const stableIds = useMemo(() => images.map((i) => i.image), [images]);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: formSchema.parse({ title: data?.title ?? "Gallery" }),
  });

  async function onSubmit(data: Form) {
    const updatedData = {
      title: data.title,
      images,
    };
    try {
      const res = await update_gallery(updatedData);
      if (res) {
        toast.success("Gallery updated");
      }
    } catch (err) {
      console.error("Error during submission:", err);
      if (err instanceof Error) {
        toast.error(err.message);
      }
    }
  }

  function deleteImage(url: string) {
    setImages((prev) => prev.filter((i) => i.image !== url));
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    setImages((prev) => {
      const oldIndex = prev.findIndex((img) => img.image === active.id);
      const newIndex = prev.findIndex((img) => img.image === over.id);
      return arrayMove(prev, oldIndex, newIndex);
    });
  }

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={"lg:max-w-screen-sm"}
      >
        <div className={"flex flex-col gap-y-5"}>
          <div className={"flex flex-col gap-y-3"}>
            <FormTextInput
              fieldName={"title"}
              label={"Title"}
              placeholder={"Gallery title"}
              variants={"cms"}
            />
            {mount && (
              <DndContext
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
              >
                <SortableContext items={stableIds}>
                  <div className={"grid grid-cols-4 gap-2"}>
                    {images.map((i) => (
                      <div key={i.image} className={"relative"}>
                        <SortableImageCard key={i.image} url={i.image} />
                        <IconButton
                          onClick={() => deleteImage(i.image)}
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
                    ))}
                  </div>
                </SortableContext>
              </DndContext>
            )}
            <UploadDropzone
              endpoint={"galleryUploader"}
              onClientUploadComplete={(res) => {
                const files =
                  res?.map((file) => ({
                    image: file.ufsUrl,
                  })) ?? [];
                setImages((prev) => [...prev, ...files]);
              }}
              onUploadError={(error: Error) => {
                console.error(`ERROR! ${error.message}`);
              }}
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
  );
}

function SortableImageCard({ url }: { url: string }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: url });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} {...attributes} {...listeners} style={style}>
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
      </div>
    </div>
  );
}
