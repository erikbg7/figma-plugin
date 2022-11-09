import React from 'react';
import { useUpdateAtom } from 'jotai/utils';
import { treeAtom } from '../atoms/tree';
import { capitalize } from '../utils';

interface Props {
  roots: string[];
}

const TreeRoots: React.FC<Props> = ({ roots }) => {
  const setTree = useUpdateAtom(treeAtom);
  const addTree = () => setTree((tree) => ({ ...tree, root: 'channels' }));

  return (
    <div className="flex flex-col px-6">
      {roots.map((root, i) => (
        <div
          className={`flex justify-start items-center py-2 border-half ${
            i === roots.length - 1 ? 'border-half' : 'border-full'
          }`}
        >
          <div>--- </div>
          <button className="mx-3 mt-1 px-1 rounded-lg bg-sky-300" onClick={addTree}>
            {capitalize(root)}
          </button>
        </div>
      ))}
    </div>
  );
};

export { TreeRoots };
