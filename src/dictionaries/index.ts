import 'server-only'

const dictionaries = {
  en: () => import('./en.json').then((module) => module.default),
  pl: () => import('./pl.json').then((module) => module.default),
}

export const getDictionary = async (locale: 'en' | 'pl') => dictionaries[locale]();
export type Locale = 'en' | 'pl';
