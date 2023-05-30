import { ReactElement } from "react";

export type ModalProps = {
  header: string;
  children: ReactElement;
  show: boolean;
  setShow: (value: boolean) => void;
};
