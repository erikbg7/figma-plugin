import React, { useRef } from 'react';
import { BreadCrumb } from './components/Breadcrumb';
import { TreeRenderer } from './components/TreeRenderer';
import { channelsData, IChannel } from './content/channels';
import { useUpdateAtom } from 'jotai/utils';
import { breadcrumbAtom } from './atoms/breadcrumb';

function App() {
  const addBreadcrumb = useUpdateAtom(breadcrumbAtom);
  const [content, setContent] = React.useState<IChannel[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const onCopyText = (text: string) => {
    parent.postMessage({ pluginMessage: { type: 'update-nodes', text } }, '*');
  };

  const onShowContent = () => {
    addBreadcrumb((crumbs) => [...crumbs, 'channels']);
    setContent(channelsData);
  };

  return (
    <main>
      <section className="flex flex-col">
        <BreadCrumb />
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
