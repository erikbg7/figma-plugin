import React from 'react';
import { IChannel } from '../content/channels';
import { TreeBranch } from './TreeBranch';
import { TreeLeaf } from './TreeLeaf';

interface Props {
  list: IChannel[];

  onContentClick: (text: string) => void;
}

const TreeRenderer: React.FC<Props> = ({ list, onContentClick }) => {
  const [filterByKey, setFilterByKey] = React.useState<keyof IChannel | null>();

  const firstContent = list[0];
  const keys = Object.keys(firstContent) as (keyof IChannel)[];

  if (filterByKey) {
    const iterable = list.map((item) => item[filterByKey]);
    return (
      <div className="flex flex-col">
        {iterable.map((i) => (
          <TreeLeaf onClick={() => onContentClick(i)} label={i} />
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      {keys.map((k) => (
        <TreeBranch onClick={() => setFilterByKey(k)} label={k} />
      ))}
    </div>
  );
};

export { TreeRenderer };
