import React from 'react';
import { useAtom } from 'jotai';
import { useAtomValue } from 'jotai/utils';
import { breadcrumbAtom } from '../atoms/breadcrumb';
import { HomeIcon } from './HomeIcon';

const className = '';

interface Props {
  home?: boolean;
  text: string;
  onClick?(): void;
}

const Crumb: React.FC<Props> = ({ home, text, onClick }) => {
  const formattedText = text[0].toUpperCase() + text.slice(1);

  return (
    <button onClick={onClick}>
      {home ? (
        <span className="text-gray-600">
          <HomeIcon />
        </span>
      ) : (
        <>
          <span> &nbsp;{'>'}&nbsp;</span>
          <span className="font-semibold text-sky-600">{formattedText}</span>
        </>
      )}
    </button>
  );
};

const BreadCrumb = () => {
  const [filters, setFilters] = useAtom(breadcrumbAtom);
  const { home, root, branch, leaf } = filters;

  const handleHomeClick = () => setFilters({ home: 'Home' });
  const handleRootClick = () => setFilters((s) => ({ home: s.home, root: s.root }));

  return (
    <div className="p-4 text-sm">
      <h2 className="flex items-center">
        {home && <Crumb home text={home} onClick={handleHomeClick} />}
        {root && <Crumb text={root} onClick={handleRootClick} />}
        {branch && <Crumb text={branch} />}
        {leaf && <Crumb text={leaf} />}
      </h2>
    </div>
  );
};

export { BreadCrumb };
