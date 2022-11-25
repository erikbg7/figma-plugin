import React from 'react';
import { useAtomValue } from 'jotai';
import { configAtom } from '../atoms/config';
import { CHANNELS } from '../fixtures/channels';

const SyncButton = () => {
  const { language, category } = useAtomValue(configAtom);

  const handleSync = () => {
    const data = { content: CHANNELS };
    window.parent.postMessage({ pluginMessage: { data } }, '*');
  };

  return (
    <button className="flex justify-center w-full py-3 text-sky-500" onClick={handleSync}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
        />
      </svg>
      Sync
    </button>
  );
};

export default SyncButton;
