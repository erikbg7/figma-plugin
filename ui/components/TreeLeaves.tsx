import React from 'react';

interface Props {
  leaves: string[];
}

  onClick: (text: string) => void;
}

const TreeLeaves: React.FC<Props> = ({ leaves }) => {
const TreeLeaves: React.FC<Props> = ({ leaves, onClick }) => {

  const handleClick = (text: string) => {
    parent.postMessage({ pluginMessage: { type: 'update-nodes', text } }, '*');
  };

  return (
    <div className="flex flex-col p-2">
      <div className="bg-red-600 h-10 2-10" onClick={handleImageClick} />
      {leaves.map((leaf) => (
        <button
          className="flex justify-start text-justify bg-gray-100 p-4 m-1 rounded-lg shadow shadow-gray-400/30"
          onClick={() => handleClick(leaf)}
        >
          {leaf}
        </button>
      ))}
    </div>
  );
};

export { TreeLeaves };
