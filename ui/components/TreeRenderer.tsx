import React from 'react';
import { IChannel } from '../content/channels';
import { useAtomValue } from 'jotai/utils';
import { breadcrumbAtom } from '../atoms/breadcrumb';
import { TreeRoots } from './TreeRoots';
import { TreeBranches } from './TreeBranches';
import { TreeLeaves } from './TreeLeaves';

interface Props {
  list: Record<string, Array<IChannel>>;
}

const TreeRenderer: React.FC<Props> = ({ list }) => {
  const breadcrumbs = useAtomValue(breadcrumbAtom);

  if (breadcrumbs.root) {
    console.log('root');
    if (breadcrumbs.branch) {
      /* @ts-ignore */
      const leaves = list[breadcrumbs.root].map((c) => c[breadcrumbs.branch]);
      return <TreeLeaves leaves={leaves} />;
    } else {
      const branches = Object.keys(list[breadcrumbs.root][0]);
      return <TreeBranches branches={branches} />;
    }
  } else {
    const roots = Object.keys(list);
    return <TreeRoots roots={roots} />;
  }
  return <></>;
};

export { TreeRenderer };
