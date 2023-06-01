import { HTMLProps } from "react";

export type ButtonProps = HTMLProps<HTMLButtonElement> & {
  children: string;
  type?: "button" | "submit" | "reset"
  isLoading?: boolean;
};
