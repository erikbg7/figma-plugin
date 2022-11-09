import { atom } from 'jotai';

interface ITree {
  home: string;
  root?: string;
  branch?: string;
  leaf?: string;
}

const treeAtom = atom<ITree>({ home: 'Home', root: 'channels', branch: 'image' });

export { treeAtom };
export type { ITree };
