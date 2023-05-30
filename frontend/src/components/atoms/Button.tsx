import { ButtonProps } from "./Button.d";
import { Spinner } from "./Spinner";

export const Button = ({ children, isLoading, ...otherProps }: ButtonProps) => {
  return (
    <button
      {...otherProps}
      type="button"
      disabled={isLoading}
      className="py-2.5 px-6 bg-blue-600 hover:bg-blue-800 active:outline outline-blue-500 disabled:bg-blue-400 disabled:outline-none text-white font-bold rounded-full flex items-center justify-center"
    >
      {isLoading && <Spinner />}
      {children}
    </button>
  );
};
