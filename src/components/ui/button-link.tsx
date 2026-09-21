import type { ComponentProps } from "react";

type ButtonLinkProps = ComponentProps<"a"> & {
  variant?: "primary" | "secondary" | "text";
};

export function ButtonLink({
  variant = "primary",
  className = "",
  ...props
}: ButtonLinkProps) {
  return <a className={`button button--${variant} ${className}`} {...props} />;
}
