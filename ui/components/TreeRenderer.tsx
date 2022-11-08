import React from 'react';
import { IChannel } from '../content/channels';
import { TreeBranch } from './TreeBranch';
import { TreeLeaf } from './TreeLeaf';
import { useAtomValue, useUpdateAtom } from 'jotai/utils';
import { breadcrumbAtom } from '../atoms/breadcrumb';

interface Props {
  list: Record<string, Array<IChannel>>;
  onContentClick: (text: string) => void;
}

// const filters

const TreeRenderer: React.FC<Props> = ({ list, onContentClick }) => {
  const breadcrumbs = useAtomValue(breadcrumbAtom);
  const addBreadcrumb = useUpdateAtom(breadcrumbAtom);

  const onShowContent = () => {
    addBreadcrumb((crumbs) => ({ ...crumbs, root: 'channels' }));
  };

  if (breadcrumbs.root) {
    console.log('root');
    if (breadcrumbs.branch) {
      /* @ts-ignore */
      const leafs = list[breadcrumbs.root].map((c) => c[breadcrumbs.branch]);

      return (
        <div className="flex flex-col">
          {leafs.map((i) => (
            <TreeLeaf onClick={() => onContentClick(i)} label={i} />
          ))}
        </div>
      );
    } else {
      return (
        <div className="flex flex-col">
          {Object.keys(list[breadcrumbs.root][0]).map((i) => (
            <TreeBranch label={i} />
          ))}
        </div>
      );
    }
  } else {
    return (
      <div className="flex flex-col">
        {Object.keys(list).map((item) => (
          <button onClick={onShowContent}>{item}</button>
        ))}
      </div>
    );
  }
  return <></>;
};

export { TreeRenderer };
