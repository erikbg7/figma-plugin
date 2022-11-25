import React from 'react';
import clsx from 'clsx';
import { useAtom } from 'jotai';
import { languageAtom } from '../atoms/config';

type ILanguage = 'en' | 'ar';

const LanguageSelector = () => {
  const [language, setLanguage] = useAtom(languageAtom);

  const selectedClass = 'bg-sky-500 text-white';
  const buttonClass = 'w-[50%] p-1 text-center border border-sky-500 transition-colors';

  return (
    <div className="m-3">
      <button
        onClick={() => setLanguage('en')}
        className={clsx('rounded-l-lg ', buttonClass, language === 'en' && selectedClass)}
      >
        English
      </button>
      <button
        onClick={() => setLanguage('ar')}
        className={clsx('rounded-r-lg', buttonClass, language === 'ar' && selectedClass)}
      >
        Arabic
      </button>
    </div>
  );
};

export default LanguageSelector;
export type { ILanguage };
