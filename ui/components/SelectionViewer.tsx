import React from 'react';

const SelectionViewer = () => {
  const [selectedAmount, setSelectedAmount] = React.useState(0);

  React.useEffect(() => {
    window.onmessage = (event) => {
      const selected = event.data.pluginMessage?.length || 0;
      setSelectedAmount(selected);
    };
  }, []);

  return (
    <>
      <div className="flex justify-center items-center bg-sky-500 text-white rounded-full h-8 w-8 mx-auto">
        {selectedAmount}
      </div>
      <p className="text-sky-500 font-semibold">nodes selected</p>
    </>
  );
};

export default SelectionViewer;
