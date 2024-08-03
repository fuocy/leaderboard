import { useEffect } from "react";
import { IoMdClose } from "react-icons/io";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  return (
    <div
      // onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center "
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative bg-white rounded-lg shadow-lg w-11/12 md:w-1/2 p-5 max-h-[90vh] overflow-y-auto"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 border border-gray-500 rounded-md p-1 hover:brightness-75 transition duration-300"
        >
          <IoMdClose className="text-2xl" />
        </button>

        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
