import React from 'react';
import CategorySelector from './components/CategorySelector';
import LanguageSelector from './components/LanguageSelector';
import SelectionViewer from './components/SelectionViewer';
import SyncButton from './components/SyncButton';

function App() {
  return (
    <main className="flex flex-col w-full h-full">
      <header className="w-full text-center py-5 border-b border-gray-300">
        <SelectionViewer />
      </header>

      <section>
        <LanguageSelector />
      </section>

      <section className="flex flex-col flex-1 w-full">
        <CategorySelector />
      </section>

      <footer className="border-t border-gray-300">
        <SyncButton />
      </footer>
    </main>
  );
}

export default App;
