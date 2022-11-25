import clsx from 'clsx';
import React from 'react';

const CATEGORIES = {
  Channels: 'Channels',
  Microapps: 'Microapps',
  Cards: 'Cards',
  Games: 'Games',
  Music: 'Music',
} as const;

type ICategory = typeof CATEGORIES[keyof typeof CATEGORIES];

const CategorySelector = () => {
  const [selected, setSelected] = React.useState('Channels');

  return (
    <div className="flex flex-wrap justify-center my-2">
      {Object.values(CATEGORIES).map((cat) => (
        <button
          key={cat}
          onClick={() => setSelected(cat)}
          className={clsx(
            'bg-sky-200 m-1 p-2 rounded-md transition-all border-2 border-transparent',
            {
              'border-sky-500': cat === selected,
            }
          )}
        >
          {cat}
        </button>
      ))}
    </div>
  );
};

export default CategorySelector;
export type { ICategory };
