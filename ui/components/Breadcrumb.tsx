import React from 'react';
import { useAtomValue } from 'jotai/utils';
import { breadcrumbAtom } from '../atoms/breadcrumb';

const BreadCrumb = () => {
  const crumbs = useAtomValue(breadcrumbAtom);

  return (
    <div>
      <h1>
        {crumbs.map((c, i) => (
          <span>{i === 0 ? c : ' / '.concat(c)}</span>
        ))}
      </h1>
    </div>
  );
};

export { BreadCrumb };
