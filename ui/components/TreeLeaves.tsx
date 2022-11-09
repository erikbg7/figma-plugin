import React from 'react';

interface Props {
  leaves: string[];
  isImageBranch: boolean;
}

function startDownload(url: string, onFinished: (bytes: Uint8Array) => void) {
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
    onFinished(arrayBufferView);
    // This can be useful to append the image to the DOM.
    // let blob = new Blob([arrayBufferView], { type: "image/jpeg" });
    // let urlCreator = window.URL || window.webkitURL;
    // let imageUrl = urlCreator.createObjectURL(blob);
  };

  xhr.send();
}

const TreeLeaves: React.FC<Props> = ({ leaves, isImageBranch }) => {
  const postMessage = (bytes: Uint8Array) => {
    parent.postMessage({ pluginMessage: { type: 'update-image-node', bytes } }, '*');
  };

  const handleImageClick = (url: string) => {
    startDownload(url, postMessage);
  };

  const handleTextClick = (text: string) => {
    parent.postMessage({ pluginMessage: { type: 'update-text-node', text } }, '*');
  };

  if (isImageBranch) {
    return (
      <div className="masonry-container mx-auto px-2">
        {/* <div className="flex flex-col flex-wrap h-[100vh] items-center content-center"> */}
        {leaves.map((leafUrl) => {
          return (
            <figure className="masonry-item">
              <img
                src={leafUrl}
                className="masonry-image rounded-md hover:cursor-pointer"
                // className="w-[40%] m-1 rounded-md hover:cursor-pointer"
                onClick={() => handleImageClick(leafUrl)}
              />
            </figure>
          );
        })}
      </div>
    );
  }

  return (
    <div className="flex flex-col p-2">
      {leaves.map((leaf) => (
        <button
          className="flex justify-start text-justify bg-gray-100 p-4 m-1 rounded-lg shadow shadow-gray-400/30"
          onClick={() => handleTextClick(leaf)}
        >
          {leaf}
        </button>
      ))}
    </div>
  );
};

export { TreeLeaves };
