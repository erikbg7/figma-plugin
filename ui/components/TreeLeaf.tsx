import React from 'react';

interface Props {
  label: string;
  onClick: () => void;
}

const TreeLeaf: React.FC<Props> = ({ label, onClick }) => {
  return (
    <button
      className="flex justify-start bg-gray-100 p-3 m-1 rounded-lg shadow shadow-gray-400/30"
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export { TreeLeaf };
