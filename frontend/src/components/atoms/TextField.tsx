import { ChangeEvent, forwardRef } from "react";
import { TextFieldProps } from "./TextField.d";
import { Control, Field, Label, Message } from "@radix-ui/react-form";

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  ({ label, value, onChange, name, ...otherProps }, ref) => {
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      if (onChange) {
        onChange(e.target.value);
      }
    };

    return (
      <Field
        name={name}
        className="data-[invalid=true]:text-red-600 data-[invalid=true]:border-red-600"
      >
        <div className="flex justify-between items-baseline">
          <Label>{label}</Label>
          <Message className="text-sm" match="valueMissing">
            Required
          </Message>
        </div>
        <Control asChild>
          <input
            ref={ref}
            type="text"
            value={value}
            onChange={handleChange}
            autoComplete="password"
            className="text-black border-2 border-solid border-gray-400 focus:border-blue-600 outline-none rounded-lg data-[invalid=true]:border-red-600 block w-full p-2.5"
            {...otherProps}
          />
        </Control>
      </Field>
    );
  }
);
