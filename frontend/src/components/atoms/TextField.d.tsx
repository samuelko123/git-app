import { HTMLProps } from "react";

type Override<T1, T2> = Omit<T1, keyof T2> & T2;

export type TextFieldProps = Override<
  HTMLProps<HTMLInputElement>,
  {
    name: string;
    variant?: "folder-picker";
    onChange: (val: string) => void;
    onError: (err: unknown) => void;
  }
>;
