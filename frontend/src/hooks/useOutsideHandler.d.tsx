import { RefObject } from "react";

export type UseOutsideHandlerProps = {
  ref: RefObject<HTMLElement>;
  onClickOutside: Function;
};
