import { atom } from 'jotai';

interface IBreadCrumb {
  home: string;
  root?: string;
  branch?: string;
  leaf?: string;
}

const breadcrumbAtom = atom<IBreadCrumb>({ home: 'Home' });

export { breadcrumbAtom };
export type { IBreadCrumb };
