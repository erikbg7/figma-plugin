import React from 'react';
import clsx from 'clsx';

type ILanguage = 'en' | 'ar';

const LANGUAGES: Record<ILanguage, string> = {
  en: 'English',
  ar: 'Arabic',
};

const LanguageSelector = () => {
  const [selected, setSelected] = React.useState('en');

  return (
    <div className="m-3">
      <button
        onClick={() => setSelected('en')}
        className={clsx(
          'outlined-blue-button rounded-l-lg ',
          selected === 'en' && 'bg-sky-500 text-white'
        )}
      >
        English
      </button>
      <button
        onClick={() => setSelected('ar')}
        className={clsx(
          'outlined-blue-button rounded-r-lg',
          selected === 'ar' && 'bg-sky-500 text-white'
        )}
      >
        Arabic
      </button>
    </div>
  );
};

export default LanguageSelector;
export type { ILanguage };
