"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { FormTextInput } from "app/_components/common/FormInputs";
import { Button } from "app/_components/common/UI";

import { check_credentials } from "actions/auth";
import { getDefaults } from "utils/zod";
import { authSchema } from "utils/zod-schemas";

type Form = z.infer<typeof authSchema>;

export function AuthForm() {
  const form = useForm<Form>({
    resolver: zodResolver(authSchema),
    defaultValues: getDefaults(authSchema),
  });

  const router = useRouter();

  async function onSubmit(data: Form) {
    try {
      const res = await check_credentials(data);
      if (!res.success) {
        toast.error(res.error);
        form.reset();
        form.setFocus("email");
        return;
      }
      toast.success(res.message);
      router.refresh();
    } catch (error) {
      console.error("Error during submission:", error);
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  }

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={"flex flex-col gap-y-5 lg:max-w-screen-sm"}
      >
        <FormTextInput fieldName={"email"} label={"Login"} variants={"cms"} />
        <FormTextInput
          fieldName={"password"}
          label={"Password"}
          variants={"cms"}
        />

        <Button
          type={"submit"}
          loading={form.formState.isSubmitting}
          colorVariant={"cms"}
          className={{ loadingIcon: "text-lime-300" }}
        >
          Log In
        </Button>
      </form>
    </FormProvider>
  );
}
