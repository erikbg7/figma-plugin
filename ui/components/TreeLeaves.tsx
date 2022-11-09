import React from 'react';

interface Props {
  leaves: string[];
}

function startDownload() {
  const url =
    'https://images.pexels.com/photos/3361739/pexels-photo-3361739.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500';

  // Simulate a call to Dropbox or other service that can
  // return an image as an ArrayBuffer.
  let xhr = new XMLHttpRequest();
  // Use JSFiddle logo as a sample image to avoid complicating
  // this example with cross-domain issues.
  xhr.open('GET', url, true);
  // Ask for the result as an ArrayBuffer.
  xhr.responseType = 'arraybuffer';
  // When the image has loaded, convert it to a blob.
  xhr.onload = function (e) {
    const arrayBufferView = new Uint8Array(this.response);
    parent.postMessage(
      { pluginMessage: { type: 'update-image-node', bytes: arrayBufferView } },
      '*'
    );

    // This can be useful to append the image to the DOM.
    // let blob = new Blob([arrayBufferView], { type: "image/jpeg" });
    // let urlCreator = window.URL || window.webkitURL;
    // let imageUrl = urlCreator.createObjectURL(blob);
  };

  xhr.send();
}

const TreeLeaves: React.FC<Props> = ({ leaves }) => {
  const handleImageClick = () => {
    startDownload();
  };

  const handleClick = (text: string) => {
    parent.postMessage({ pluginMessage: { type: 'update-text-node', text } }, '*');
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
