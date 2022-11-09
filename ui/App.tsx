import React, { useRef } from 'react';
import { BreadCrumb } from './components/Breadcrumb';
import { TreeRenderer } from './components/TreeRenderer';
import { content } from './content';

function App() {
  return (
    <main>
      <section className="flex flex-col">
        <BreadCrumb />
        <TreeRenderer list={content} />
      </section>
    </main>
  );
}

export default App;
