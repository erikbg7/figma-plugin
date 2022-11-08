import React, { useRef } from 'react';
import { BreadCrumb } from './components/Breadcrumb';
import { TreeRenderer } from './components/TreeRenderer';
import { content } from './content/channels';

function App() {
  const onCopyText = (text: string) => {
    parent.postMessage({ pluginMessage: { type: 'update-nodes', text } }, '*');
  };

  return (
    <main>
      <section className="flex flex-col">
        <BreadCrumb />
        <div className="p-2">
          <TreeRenderer list={content} onContentClick={onCopyText} />
        </div>
      </section>
    </main>
  );
}

export default App;
