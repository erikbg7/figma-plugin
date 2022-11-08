import React from 'react';

interface Props {
  leaves: string[];
  onClick: (text: string) => void;
}

const TreeLeaves: React.FC<Props> = ({ leaves, onClick }) => {
  return (
    <div className="flex flex-col p-2">
      {leaves.map((leaf) => (
        <button
          className="flex justify-start text-justify bg-gray-100 p-4 m-1 rounded-lg shadow shadow-gray-400/30"
          onClick={() => onClick(leaf)}
        >
          {leaf}
        </button>
      ))}
    </div>
  );
};

export { TreeLeaves };
