import { ReactElement } from "react";

export type DialogProps = {
  header: string;
  children: ReactElement;
  triggerButton: ReactElement;
};
