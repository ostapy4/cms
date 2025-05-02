"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { FormTextInput } from "app/_components/common/FormInputs";
import { Button } from "app/_components/common/UI";

import { create_review } from "actions/home";
import { UploadButton } from "utils/uploadthing";
import { getDefaults } from "utils/zod";
import { reviewSchema } from "utils/zod-schemas";

type Form = z.infer<typeof reviewSchema>;

export function ReviewForm() {
  const form = useForm({
    resolver: zodResolver(reviewSchema),
    defaultValues: getDefaults(reviewSchema),
  });

  async function onSubmit(data: Form) {
    try {
      const res = await create_review(data);
      if (res) {
        toast.success("Review created successfully");
        form.reset(getDefaults(reviewSchema));
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
              fieldName={"name"}
              label={"Name"}
              placeholder={"Client name"}
              variants={"cms"}
            />
            <FormTextInput
              fieldName={"text"}
              label={"Text"}
              placeholder={"Client text"}
              multiline
              variants={"cms"}
            />

            <div
              className={
                "flex flex-1 flex-col gap-y-4 rounded-lg border border-lime-700 px-4 py-3"
              }
            >
              <label className={"text-sm font-medium text-lime-900"}>
                Avatar
              </label>
              <UploadButton
                endpoint={"avatar"}
                onClientUploadComplete={(res) => {
                  if (!res) return;
                  form.setValue("avatar", res[0].ufsUrl ?? "");
                }}
                onUploadError={(error: Error) => {
                  console.error(`ERROR! ${error.message}`);
                }}
              />
              {form.formState.errors && form.formState.errors.avatar && (
                <p className={"text-center text-sm text-red-500"}>
                  {form.formState.errors.avatar?.message?.toString()}
                </p>
              )}
            </div>
          </div>

          <Button
            type={"submit"}
            loading={form.formState.isSubmitting || form.formState.isLoading}
            colorVariant={"cms"}
            className={{ loadingIcon: "text-lime-300" }}
          >
            Create
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}
