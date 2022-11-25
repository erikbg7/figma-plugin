import { atom } from 'jotai';
import { ICategory } from '../components/CategorySelector';
import { ILanguage } from '../components/LanguageSelector';

interface IConfig {
  language: ILanguage;
  category: ICategory;
}

const configAtom = atom<IConfig>({ language: 'en', category: 'Channels' });

export { configAtom };
export type { IConfig };
