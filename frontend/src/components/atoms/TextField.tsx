import { ChangeEvent, forwardRef } from "react";
import { TextFieldProps } from "./TextField.d";
import { Control, Field, Label, Message } from "@radix-ui/react-form";
import { Button } from "./Button";
import { AiOutlineFolderOpen } from "react-icons/ai";
import { OpenDirectoryDialog } from "../../../wailsjs/go/backend/FS";

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  (
    {
      name,
      variant,
      onChange,
      onError,
      label,
      value,
      className,
      ...otherProps
    },
    ref
  ) => {
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      try {
        if (onChange) {
          onChange(e.target.value);
        }
      } catch (err) {
        onError(err);
      }
    };

    const handleFolderSelection = async () => {
      try {
        const dir = await OpenDirectoryDialog();
        if (!dir) {
          return;
        }
        onChange(dir);
      } catch (err) {
        onError(err);
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
        <div className="flex justify-between items-stretch gap-2">
          <Control asChild>
            <input
              ref={ref}
              type="text"
              value={value}
              onChange={handleChange}
              autoComplete="password"
              className={
                className +
                " text-black border-2 border-solid border-gray-400 focus:border-blue-600 outline-none rounded-lg data-[invalid=true]:border-red-600 block w-full p-2.5"
              }
              {...otherProps}
            />
          </Control>
          {variant === "folder-picker" && (
            <Button type="button" onClick={handleFolderSelection}>
              <AiOutlineFolderOpen size={24} />
            </Button>
          )}
        </div>
      </Field>
    );
  }
);
