import React from 'react';

interface ModalProps {
  isOpen: boolean;
  title: string;
  content: string;
  onContinue: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, title, content, onContinue }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded shadow-lg text-center">
        <h2 className="text-2xl font-bold mb-4">{title}</h2>
        <p className="mb-4">{content}</p>
        <button onClick={onContinue} className="bg-blue-500 text-white px-4 py-2 rounded">
          Continue
        </button>
      </div>
    </div>
  );
};

export default Modal;
