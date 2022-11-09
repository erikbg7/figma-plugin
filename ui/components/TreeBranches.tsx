import React from 'react';
import { useUpdateAtom } from 'jotai/utils';
import { treeAtom } from '../atoms/tree';
import { capitalize } from '../utils';

interface Props {
  branches: string[];
}

const TreeBranches: React.FC<Props> = ({ branches }) => {
  const setBreadcrumbs = useUpdateAtom(treeAtom);
  const addBreadcrumb = (branch: string) => setBreadcrumbs((tree) => ({ ...tree, branch }));

  return (
    <div className="flex flex-col px-6">
      {branches.map((branch, i) => (
        <div
          className={`flex justify-start items-center py-2 border-half ${
            i === branches.length - 1 ? 'border-half' : 'border-full'
          }`}
        >
          <div>--- </div>
          <button
            className="mx-3 mt-1 px-1 rounded-lg bg-sky-300"
            onClick={() => addBreadcrumb(branch)}
          >
            {capitalize(branch)}
          </button>
        </div>
      ))}
    </div>
  );
};

export { TreeBranches };
