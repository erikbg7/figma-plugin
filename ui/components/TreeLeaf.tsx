import React from 'react';

interface Props {
  label: string;
  onClick: () => void;
}

const TreeLeaf: React.FC<Props> = ({ label, onClick }) => {
  return (
    <button
      className="flex justify-start p-2 border-t border-b border-gray-200 m-0"
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export { TreeLeaf };
