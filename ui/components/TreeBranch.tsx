import React from 'react';
import { useUpdateAtom } from 'jotai/utils';
import { breadcrumbAtom } from '../atoms/breadcrumb';

interface Props {
  label: string;
}

const TreeBranch: React.FC<Props> = ({ label }) => {
  const addBreadcrumb = useUpdateAtom(breadcrumbAtom);

  const handleOnClick = () => {
    addBreadcrumb((crumbs) => ({ ...crumbs, branch: label }));
  };

  return (
    <button
      className=" my-1 p-3 rounded-lg bg-gray-100 shadow-sm shadow-gray-400"
      onClick={handleOnClick}
    >
      {label}
    </button>
  );
};

export { TreeBranch };
