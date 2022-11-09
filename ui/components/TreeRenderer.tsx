import React from 'react';
import { IChannel } from '../content/channels';
import { useAtomValue } from 'jotai/utils';
import { treeAtom } from '../atoms/tree';
import { TreeRoots } from './TreeRoots';
import { TreeBranches } from './TreeBranches';
import { TreeLeaves } from './TreeLeaves';

interface Props {
  list: Record<string, Array<IChannel>>;
}

const TreeRenderer: React.FC<Props> = ({ list }) => {
  const tree = useAtomValue(treeAtom);

  if (tree.root) {
    console.log('root');
    if (tree.branch) {
      /* @ts-ignore */
      const leaves = list[tree.root].map((c) => c[tree.branch]);
      const isImageBranch = tree.branch === 'image';
      return <TreeLeaves isImageBranch={isImageBranch} leaves={leaves} />;
    } else {
      const branches = Object.keys(list[tree.root][0]);
      return <TreeBranches branches={branches} />;
    }
  } else {
    const roots = Object.keys(list);
    return <TreeRoots roots={roots} />;
  }
  return <></>;
};

export { TreeRenderer };
