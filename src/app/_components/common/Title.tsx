import { cn } from "utils/cn";

export type TitleProps = {
  children: React.ReactNode;
  component?: React.ElementType;
  className?: string;
  size?: "base" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl";
};

export function Title(props: TitleProps) {
  const {
    children,
    component: Component = "h2",
    className,
    size = "5xl",
  } = props;

  return (
    <Component
      className={cn(
        "font-cormorant font-bold italic text-ok_main-600",
        {
          "text-sm lg:text-base": size === "base",
          "text-base lg:text-lg": size === "lg",
          "text-lg lg:text-xl": size === "xl",
          "text-xl lg:text-2xl": size === "2xl",
          "text-2xl lg:text-3xl": size === "3xl",
          "text-3xl lg:text-4xl": size === "4xl",
          "text-4xl lg:text-5xl": size === "5xl",
          "text-5xl lg:text-6xl": size === "6xl",
        },
        className,
      )}
    >
      {children}
    </Component>
  );
}
