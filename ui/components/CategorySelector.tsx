import React from 'react';
import clsx from 'clsx';
import { useAtom } from 'jotai';
import { categoryAtom } from '../atoms/config';

const CATEGORIES = {
  Channels: 'Channels',
  Microapps: 'Microapps',
  Cards: 'Cards',
  Games: 'Games',
  Music: 'Music',
} as const;

type ICategory = typeof CATEGORIES[keyof typeof CATEGORIES];

const CategorySelector = () => {
  const [category, setCategory] = useAtom(categoryAtom);

  const buttonClass = "bg-sky-200 m-1 p-2 rounded-md transition-all border-2 border-transparent'";

  return (
    <div className="flex flex-wrap justify-center my-2">
      {Object.values(CATEGORIES).map((cat) => (
        <button
          key={cat}
          onClick={() => setCategory(cat)}
          className={clsx(buttonClass, cat === category && 'border-sky-500')}
        >
          {cat}
        </button>
      ))}
    </div>
  );
};

export default CategorySelector;
export type { ICategory };
