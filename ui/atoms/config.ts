import { atom } from 'jotai';
import { focusAtom } from 'jotai/optics';

import { ICategory } from '../components/CategorySelector';
import { ILanguage } from '../components/LanguageSelector';

interface IConfig {
  language: ILanguage;
  category: ICategory;
}

const configAtom = atom<IConfig>({ language: 'en', category: 'Channels' });

const languageAtom = focusAtom(configAtom, (optic) => optic.prop('language'));

const categoryAtom = focusAtom(configAtom, (optic) => optic.prop('category'));

export { configAtom, languageAtom, categoryAtom };
export type { IConfig };
