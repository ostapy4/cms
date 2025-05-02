"use client";

import { ImageCard } from "../Home/ImageCard";
import { DeleteSection } from "./DeleteSection";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import { FaPlus, FaTrash } from "react-icons/fa6";
import { toast } from "sonner";
import { z } from "zod";

import { Title } from "app/_components/common";
import { FormTextInput } from "app/_components/common/FormInputs";
import { Button, IconButton } from "app/_components/common/UI";

import { create_info_section, update_info_section } from "actions/about";
import { UploadButton } from "utils/uploadthing";
import { getDefaults } from "utils/zod";

type SectionFormProps = {
  data?: {
    id: string;
    header: string;
    details: {
      id: string;
      image: string;
      title: string;
      description: string[];
      sectionId: string;
    }[];
  };
};

const detailsSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z
    .array(z.string().min(1, "Description cannot be empty"))
    .default([]),
  image: z.string(),
  sectionId: z.string(),
});

export const sectionSchema = z.object({
  id: z.string(),
  header: z.string().min(1, "header"),
  details: z.array(detailsSchema),
});

type Form = z.infer<typeof sectionSchema>;

export function SectionForm({ data }: SectionFormProps) {
  const form = useForm<Form>({
    resolver: zodResolver(sectionSchema),
    defaultValues: data
      ? {
          id: data.id,
          header: data.header,
          details: data.details.map((detail) => ({
            ...detail,
            description: detail.description || [],
            image: detail.image || "",
          })),
        }
      : getDefaults(sectionSchema),
  });

  async function onSubmit(data: Form) {
    try {
      if (data.id) {
        await update_info_section(data);
        toast.success("Section successfully updated");
      } else {
        await create_info_section(data);
        toast.success("Section successfully created");
      }
    } catch (error) {
      console.error("Error during submission:", error);
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  }
  const { fields, append, remove } = useFieldArray({
    name: "details",
    control: form.control,
  });
  return (
    <div>
      <div className={"flex items-center justify-between"}>
        <Title component={"h4"} size={"4xl"} className={"mb-4 text-lime-900"}>
          Section {form.watch("header")}
        </Title>
        {data?.id && <DeleteSection sectionId={data.id} />}
      </div>
      <FormProvider {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className={"flex flex-col gap-y-5 lg:max-w-screen-sm"}
        >
          <input type={"text"} {...form.register("id")} hidden />
          {/* Header */}
          <FormTextInput
            fieldName={"header"}
            label={"Section Header"}
            placeholder={"Enter section header"}
            variants={"cms"}
          />

          {/* Peroids */}
          <div className={"flex flex-col gap-y-4"}>
            {fields.map((field, index) => (
              <div
                key={field.id}
                className={
                  "flex flex-col gap-y-5 rounded-lg border border-lime-900 p-4"
                }
              >
                <FormTextInput
                  fieldName={`details.${index}.title`}
                  label={`Peroid ${index + 1} Title`}
                  placeholder={"Enter peroids title"}
                  variants={"cms"}
                />

                <div className={"flex flex-col gap-y-2"}>
                  <label className={"text-sm font-medium text-lime-900"}>
                    Features
                  </label>
                  {form
                    .watch(`details.${index}.description`)
                    ?.map((_, descIndex) => (
                      <div
                        key={descIndex}
                        className={"flex items-center gap-x-2"}
                      >
                        <FormTextInput
                          fieldName={`details.${index}.description.${descIndex}`}
                          placeholder={`Feature ${descIndex + 1}`}
                          variants={"cms"}
                          className={{ container: "flex-1" }}
                        />
                        <IconButton
                          startIcon={
                            <FaTrash
                              className={
                                "text-red-500 transition-colors group-hover:text-red-400"
                              }
                            />
                          }
                          onClick={() =>
                            form.setValue(
                              `details.${index}.description`,
                              form
                                .watch(`details.${index}.description`)
                                .filter((_, i) => i !== descIndex),
                            )
                          }
                        />
                      </div>
                    ))}

                  <Button
                    startIcon={<FaPlus />}
                    colorVariant={"cms"}
                    onClick={() =>
                      form.setValue(`details.${index}.description`, [
                        ...(form.watch(`details.${index}.description`) || []),
                        "",
                      ])
                    }
                  >
                    Add feature
                  </Button>
                </div>

                {/* Image */}
                <div className={"grid grid-cols-4 gap-2"}>
                  {form.watch(`details.${index}.image`) && (
                    <ImageCard
                      url={form.watch(`details.${index}.image`)}
                      onDelete={() =>
                        form.setValue(`details.${index}.image`, "")
                      }
                    />
                  )}
                </div>
                <UploadButton<"mainImage">
                  endpoint={"mainImage"}
                  onClientUploadComplete={(res) => {
                    if (res && res[0]) {
                      form.setValue(`details.${index}.image`, res[0].ufsUrl);
                    }
                  }}
                  onUploadError={(error: Error) => {
                    console.error(`Upload error: ${error.message}`);
                  }}
                />

                <Button
                  type={"button"}
                  onClick={() => remove(index)}
                  className={"text-sm text-red-500 hover:underline"}
                >
                  Remove Peroid
                </Button>
              </div>
            ))}
          </div>

          <Button
            colorVariant={"cms"}
            onClick={() =>
              append({ title: "", description: [], image: "", sectionId: "" })
            }
            className={{ button: "self-center" }}
          >
            Add Peroid
          </Button>

          {/* Submit */}
          <Button
            type={"submit"}
            loading={form.formState.isSubmitting}
            colorVariant={"cms"}
            className={{ loadingIcon: "text-lime-300" }}
          >
            Save
          </Button>
        </form>
      </FormProvider>
    </div>
  );
}

// if (!image) {
//   toast.error("Please upload an image");
//   return;
// }
// setIsLoading(true);
// try {
//   const res = await upload_main_image(image);

//   if (res) {
//     toast.success("Main image successfully updated");
//   }

//   setIsLoading(false);
// } catch (err) {
//   if (err instanceof Error) {
//     toast.error(err.message);
//   }
// } finally {
//   setIsLoading(false);
// }
