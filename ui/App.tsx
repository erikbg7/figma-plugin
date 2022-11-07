import React, { useRef } from 'react';
import { TreeRenderer } from './components/TreeRenderer';
import { channelsData, IChannel } from './content/channels';

function App() {
  const [content, setContent] = React.useState<IChannel[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const onCopyText = (text: string) => {
    parent.postMessage({ pluginMessage: { type: 'update-nodes', text } }, '*');
  };

  const onShowContent = () => setContent(channelsData);

  return (
    <main>
      <section className="flex flex-col">
        <button className="flex justify-start py-3 text-lg font-semibold" onClick={onShowContent}>
          Channels
        </button>
        {!!content.length && (
          <div className="p-2">
            <TreeRenderer list={content} onContentClick={onCopyText} />
          </div>
        )}
      </section>
    </main>
  );
}

export default App;
