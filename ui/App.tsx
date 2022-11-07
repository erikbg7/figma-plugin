import React, { useRef } from 'react';
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
        <button onClick={onShowContent}>Channels</button>
        {content && (
          <div>
            {content.map((c) => (
              <button onClick={() => onCopyText(c.title)}>{c.title}</button>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

export default App;
