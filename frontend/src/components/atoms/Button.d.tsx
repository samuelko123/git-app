import { HTMLProps } from "react";

export type ButtonProps = HTMLProps<HTMLButtonElement> & {
  type?: "button" | "submit" | "reset"
  isLoading?: boolean;
};
