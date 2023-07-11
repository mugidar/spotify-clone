import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { IoMdClose } from "react-icons/io";
import useAuthModal from "@/hooks/useAuthModal";
interface ModalProps {
  isOpen: boolean;
  onChange: (open: boolean) => void;
  title: string;
  description: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  title,
  description,
  onChange,
  children
}) => {
  const { onClose } = useAuthModal();
  return (
    <Dialog.Root open={isOpen} defaultOpen={isOpen} onOpenChange={onChange}>
      <Dialog.Trigger asChild>
        <button className="Button violet">{title}</button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay  onClick={() => onChange(isOpen)}  className="DialogOverlay bg-neutral-500/20 backdrop-blur-sm fixed inset-0" />
        <Dialog.Content className="DialogContent fixed drop-shadow-md border border-neutral-700 top-[50%] left-[50%] max-h-full h-full md:h-auto md:max-h-[85vh] w-full md:w-[90w] md:max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-md bg-neutral-800 p-[25px] focus:outline-none">
          <Dialog.Title className="DialogTitle text-xl text-center font-bold mb-4">
            {title}
          </Dialog.Title>
          <Dialog.Description className="DialogDescription mb-5 text-sm leading-normal text-center">
            {description}
          </Dialog.Description>
          <div>{children}</div>
          <Dialog.Close asChild>
            <button onClick={() => onChange(isOpen)} className="IconButton text-neutral-400 hover:text-white absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:outline-none" aria-label="Close" >
              <IoMdClose />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default Modal;
