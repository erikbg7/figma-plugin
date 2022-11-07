import { atom } from 'jotai';

const breadcrumbAtom = atom<string[]>(['home']);

export { breadcrumbAtom };
