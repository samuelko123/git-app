import { ChangeEvent } from "react";
import { TextFieldProps } from "./TextField.d";

export const TextField = ({
  label,
  value,
  onChange,
}: TextFieldProps) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e.target.value);
    }
  };

  return (
    <label className="block text-sm font-medium text-gray-900 dark:text-white">
      {label}
      <input
        type="text"
        value={value}
        onChange={handleChange}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      />
    </label>
  );
};
