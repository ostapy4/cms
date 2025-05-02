import { ButtonBase, ButtonBaseProps } from "./ButtonBase";

import { cn } from "utils/cn";

export type ButtonProps<T> = {
  size?: "small" | "normal" | "large" | "super-large";
  colorVariant?: "primary" | "cms" | "danger" | "cancel";
  fullWidth?: boolean;
} & ButtonBaseProps<T>;

export function Button<T>(props: ButtonProps<T>) {
  const {
    size = "normal",
    colorVariant = "primary",
    fullWidth = false,
    children,
    className,
    loading = false,
    ...buttonBaseProps
  } = props;

  return (
    <ButtonBase
      loading={loading}
      className={{
        button: cn(
          "flex cursor-pointer justify-center whitespace-nowrap rounded-lg text-center font-bold transition-all disabled:cursor-not-allowed disabled:select-none",
          {
            "disabled:opacity-50": !loading,
          },
          {
            "opacity-90": loading,
          },
          {
            // Primary
            "bg-gradient-to-br from-ok_orange-300 to-ok_orange-400 text-white":
              colorVariant === "primary",
            "hover:opacity-90 disabled:hover:opacity-50 disabled:active:scale-100 sm:active:scale-95":
              colorVariant === "primary" && !loading,
          },
          {
            // CMS
            "bg-gradient-to-br from-lime-600 to-lime-800 text-white":
              colorVariant === "cms",
            "hover:opacity-90 disabled:hover:opacity-50 disabled:active:scale-100 sm:active:scale-95":
              colorVariant === "cms" && !loading,
          },
          {
            // Danger
            "bg-gradient-to-br from-red-500 to-red-600 text-white":
              colorVariant === "danger",
            "hover:opacity-90 disabled:hover:opacity-50 disabled:active:scale-100 sm:active:scale-95":
              colorVariant === "danger" && !loading,
          },
          {
            // Cancel
            "bg-gray-400 text-white": colorVariant === "cancel",
            "hover:bg-gray-500 disabled:hover:bg-gray-400 disabled:active:scale-100 sm:active:scale-95":
              colorVariant === "cancel" && !loading,
          },
          {
            "w-full": fullWidth,
            "px-3 py-1.5 text-sm": size === "small",
            "px-6 py-2": size === "normal",
            "px-8 py-2.5": size === "large",
            "px-20 py-10": size === "super-large",
          },
          className?.button,
        ),
        loadingIcon: className?.loadingIcon,
      }}
      {...buttonBaseProps}
    >
      {children}
    </ButtonBase>
  );
}
