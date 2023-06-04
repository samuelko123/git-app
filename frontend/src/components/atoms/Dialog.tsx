import {
  Close,
  Content,
  Description,
  Overlay,
  Portal,
  Root,
  Title,
  Trigger,
} from "@radix-ui/react-dialog";
import { MdClose } from "react-icons/md";
import { DialogProps } from "./Dialog.d";

export const Dialog = ({ header, children, triggerButton }: DialogProps) => (
  <Root>
    <Trigger asChild>{triggerButton}</Trigger>
    <Portal>
      <Overlay className="bg-black opacity-50 ease-in fixed inset-0" />
      <Content className="bg-white ease-in fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg shadow-lg min-w-[24rem] min-h-[24rem]">
        <div className="flex justify-between items-stretch border-b-2 border-gray-300">
          <Title className="p-6 text-lg font-bold">{header}</Title>
          <Close asChild>
            <button
              className="p-6 text-gray-500 hover:text-black"
              aria-label="Close"
            >
              <MdClose size={24} />
            </button>
          </Close>
        </div>
        <Description className="p-6">{children}</Description>
      </Content>
    </Portal>
  </Root>
);
