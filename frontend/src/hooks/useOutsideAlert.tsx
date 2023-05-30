import { useEffect } from "react";
import { UseOutsideHandlerProps } from "./useOutsideHandler.d";

export const useOutsideHandler = ({
  ref,
  onClickOutside,
}: UseOutsideHandlerProps) => {
  useEffect(() => {
    function handleClickOutside(event: Event) {
      if (ref.current && !ref.current.contains(event.target as HTMLElement)) {
        onClickOutside();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
};
