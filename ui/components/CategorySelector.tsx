import React from 'react';

const CATEGORIES = ['Channels', 'Microapps', 'Cards', 'Games', 'Music'];

const CategorySelector = () => {
  return (
    <div className="flex flex-wrap justify-center my-2">
      {CATEGORIES.map((c) => (
        <button className="bg-sky-200 m-1 p-2 rounded-md">{c}</button>
      ))}
    </div>
  );
};

export default CategorySelector;
