import { Loader } from "lucide-react";

const LoadingModal = ({ isOpen }: {isOpen: Boolean}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 flex flex-col items-center gap-4">
        <Loader className="animate-spin w-12 h-12 text-blue-900" />
        <p className="text-gray-700 font-medium">Processing...</p>
      </div>
    </div>
  );
};

export default LoadingModal;