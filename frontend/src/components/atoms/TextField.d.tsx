import { HTMLProps } from "react";

type Override<T1, T2> = Omit<T1, keyof T2> & T2;

export type TextFieldProps = Override<
  HTMLProps<HTMLInputElement>,
  {
    name: string;
    onChange?: (val: string) => void;
  }
>;
