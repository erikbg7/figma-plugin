import React from 'react';
import { useAtomValue } from 'jotai/utils';
import { breadcrumbAtom } from '../atoms/breadcrumb';

const BreadCrumb = () => {
  const breadcrumb = useAtomValue(breadcrumbAtom);

  return (
    <div>
      <h2>
        {breadcrumb.root && <span>{breadcrumb.home} </span>}
        {breadcrumb.root && <span>/ {breadcrumb.root} </span>}
        {breadcrumb.branch && <span>/ {breadcrumb.branch} </span>}
        {breadcrumb.leaf && <span>/ {breadcrumb.leaf} </span>}
      </h2>
    </div>
  );
};

export { BreadCrumb };
