import React from 'react';
import { useUpdateAtom } from 'jotai/utils';
import { breadcrumbAtom } from '../atoms/breadcrumb';

interface Props {
  label: string;
  onClick: () => void;
}

const TreeBranch: React.FC<Props> = ({ label, onClick }) => {
  const addBreadcrumb = useUpdateAtom(breadcrumbAtom);

  const handleOnClick = () => {
    onClick();
    addBreadcrumb((crumbs) => [...crumbs, label]);
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
