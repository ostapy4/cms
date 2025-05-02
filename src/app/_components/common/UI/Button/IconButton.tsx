import { ButtonBase, ButtonBaseProps } from "./ButtonBase";

import { cn } from "utils/cn";

export type IconButtonProps<T> = {
  size?: "small" | "normal" | "large";
  colorVariant?: "default" | "ghost";
} & Omit<ButtonBaseProps<T>, "children" | "endIcon">;

export function IconButton<T>(props: IconButtonProps<T>) {
  const {
    size = "normal",
    colorVariant = "default",
    className,
    loading = false,
    ...buttonBaseProps
  } = props;

  return (
    <ButtonBase
      loading={loading}
      className={{
        button: cn(
          "group cursor-pointer justify-center overflow-hidden rounded-full transition-all disabled:cursor-not-allowed",
          {
            "disabled:opacity-50": !loading,
          },
          {
            "opacity-90": loading,
          },
          // Default
          {
            "bg-transparent": colorVariant === "default",
          },
          // Ghost
          {
            "bg-white/[0.01] backdrop-blur": colorVariant === "ghost",
            "disabled:hover:bg-white/[0.01]":
              colorVariant === "ghost" && !loading,
          },
          {
            "size-8 p-1": size === "small",
            "size-10 p-1": size === "normal",
            "size-12 p-1": size === "large",
          },
          className?.button,
        ),
        loadingIcon: className?.loadingIcon,
      }}
      {...buttonBaseProps}
    ></ButtonBase>
  );
}
