"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { SheetMusic } from "@prisma/client";
import { CATEGORIES, GENRES, GRIFFES, LEVELS } from "consts";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import {
  FormNumberInput,
  FormSelectInput,
  FormTextInput,
} from "app/_components/common/FormInputs";
import { Button } from "app/_components/common/UI";

import { update_sheet, upload_sheets } from "actions/sheet-music";
import { UploadButton } from "utils/uploadthing";
import { getDefaults } from "utils/zod";
import { sheetsSchema } from "utils/zod-schemas";

type Form = z.infer<typeof sheetsSchema>;

type UploadSheetFormProps = {
  data?: SheetMusic | null;
  resetSheetState: () => void;
};

export function UploadSheetForm({
  data,
  resetSheetState,
}: UploadSheetFormProps) {
  const form = useForm({
    resolver: zodResolver(sheetsSchema),
    defaultValues: getDefaults(sheetsSchema),
  });

  useEffect(() => {
    if (data) {
      form.reset({
        id: data.id,
        author: data.author,
        title: data.title,
        category: data.category,
        level: data.level,
        genre: data.genre,
        description: data.description,
        pdfUrl: data.pdfUrl,
        preview: data.preview,
        price: data.price,
        griffType: data?.griffType,
      });
    }
  }, [data, form]);

  async function onSubmit(data: Form) {
    try {
      if (data.id) {
        const res = await update_sheet(data);
        if (res) {
          toast.success("Sheet was updated successfully");
          form.reset(getDefaults(sheetsSchema));
          resetSheetState();
        }
      } else {
        const res = await upload_sheets(data);
        if (res) {
          toast.success("Sheet music uploaded successfully");
          form.reset(getDefaults(sheetsSchema));
        }
      }
    } catch (err) {
      console.error("Error during submission:", err);
      toast.error(err instanceof Error ? err.message : "An error occurred");
    }
  }

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={"mb-8 lg:max-w-screen-sm"}
      >
        <div className={"flex flex-col gap-y-5"}>
          <div className={"flex flex-col gap-y-3"}>
            <FormTextInput
              fieldName={"author"}
              label={"Author"}
              placeholder={"Author name"}
              variants={"cms"}
            />
            <FormTextInput
              fieldName={"title"}
              label={"Title"}
              placeholder={"Sheet title"}
              variants={"cms"}
            />
            <FormSelectInput
              fieldName={"category"}
              label={"Category"}
              display={"Choose a category"}
              options={CATEGORIES}
              variant={"cms"}
            />
            <FormSelectInput
              fieldName={"level"}
              label={"Level"}
              display={"Choose a level"}
              options={LEVELS}
              variant={"cms"}
            />
            <FormSelectInput
              fieldName={"genre"}
              label={"Genre"}
              display={"Choose a genre"}
              options={GENRES}
              variant={"cms"}
            />
            <FormSelectInput
              fieldName={"griffType"}
              label={"Griff Type"}
              display={" - "}
              options={GRIFFES}
              variant={"cms"}
            />
            <FormNumberInput
              fieldName={"price"}
              label={"Price"}
              placeholder={"Price"}
              variants={"cms"}
            />
            <FormTextInput
              fieldName={"description"}
              label={"Description"}
              placeholder={"Sheet description"}
              multiline
              variants={"cms"}
            />
            <div className={"flex w-full flex-col gap-3 sm:flex-row"}>
              <div
                className={
                  "flex flex-1 flex-col gap-y-4 rounded-lg border border-lime-700 px-4 py-3"
                }
              >
                <label className={"text-sm font-medium text-lime-900"}>
                  PDF
                </label>
                <UploadButton
                  endpoint={"pdfUploader"}
                  onClientUploadComplete={(res) => {
                    if (!res) return;
                    form.setValue("pdfUrl", res[0].ufsUrl ?? "");
                  }}
                  onUploadError={(error: Error) => {
                    console.error(`ERROR! ${error.message}`);
                  }}
                />
                {form.formState.errors && form.formState.errors.pdfUrl && (
                  <p className={"text-center text-sm text-red-500"}>
                    {form.formState.errors.pdfUrl?.message?.toString()}
                  </p>
                )}
              </div>
              <div
                className={
                  "flex flex-1 flex-col gap-y-4 rounded-lg border border-lime-700 px-4 py-3"
                }
              >
                <label className={"text-sm font-medium text-lime-900"}>
                  Preview
                </label>
                <UploadButton
                  endpoint={"preview"}
                  onClientUploadComplete={(res) => {
                    if (!res) return;
                    form.setValue("preview", res[0].ufsUrl ?? "");
                  }}
                  onUploadError={(error: Error) => {
                    console.error(`ERROR! ${error.message}`);
                  }}
                />
                {form.formState.errors && form.formState.errors.pdfUrl && (
                  <p className={"text-center text-sm text-red-500"}>
                    {form.formState.errors.preview?.message?.toString()}
                  </p>
                )}
              </div>
            </div>
          </div>
          {form.watch("id") && (
            <Button
              colorVariant={"danger"}
              onClick={() => {
                resetSheetState();
                form.reset(getDefaults(sheetsSchema));
              }}
            >
              Reset Form
            </Button>
          )}
          <Button
            type={"submit"}
            loading={form.formState.isSubmitting || form.formState.isLoading}
            colorVariant={"cms"}
            className={{ loadingIcon: "text-lime-300" }}
          >
            {form.watch("id") ? "Update" : "Save"}
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}
