import React, { useRef } from 'react';
import { BreadCrumb } from './components/Breadcrumb';
import { TreeRenderer } from './components/TreeRenderer';
import { content } from './content';
import { CHANNELS } from './fixtures/channels';

function App() {
  const [selectedAmount, setSelectedAmount] = React.useState(0);

  React.useEffect(() => {
    window.onmessage = (event) => {
      console.log('window event', event);
      const { length } = event.data.pluginMessage;

      setSelectedAmount(length);
    };

    // const handleChange = (ev: any) => setSelectedAmount(ev.target.value);
    // document.addEventListener('onSelectionChanged', handleChange);
    // return () => document.removeEventListener('onSelectionChanged', handleChange);
  }, []);

  const handleChannelsSync = () => {
    const data = { content: CHANNELS };
    window.parent.postMessage({ pluginMessage: { data } }, '*');
  };

  return (
    <main>
      <section className="flex flex-col">
        <div>{selectedAmount}</div>
        <div>nodes selected</div>
        <button onClick={handleChannelsSync}>Sync as Channels</button>
      </section>
    </main>
  );
}

export default App;
