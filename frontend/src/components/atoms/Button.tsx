import { forwardRef } from "react";
import { ButtonProps } from "./Button.d";
import { Spinner } from "./Spinner";

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, isLoading, type, className, ...otherProps }, ref) => {
    return (
      <button
        ref={ref}
        disabled={isLoading}
        className={className + " py-2.5 px-6 bg-blue-600 hover:bg-blue-800 active:outline outline-blue-500 disabled:bg-blue-400 disabled:outline-none text-white font-bold rounded-full flex items-center justify-center"}
        {...otherProps}
      >
        {isLoading && <Spinner />}
        {children}
      </button>
    );
  }
);
