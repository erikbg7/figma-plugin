import React from 'react';

interface Props {
  label: string;
  onClick: () => void;
}

const TreeBranch: React.FC<Props> = ({ label, onClick }) => {
  return (
    <button
      className=" my-1 p-3 rounded-lg bg-gray-100 shadow-sm shadow-gray-400"
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export { TreeBranch };
