import i18n from 'i18n-js';
import { Platform, NativeModules } from 'react-native';

import en from './locales/en-US';
import pt from './locales/pt-BR';

const normalizeTranslate = {
  en_US: 'en_US',
  pt_BR: 'pt_BR',
  en: 'en_US',
  pt_US: 'pt_BR',
};

const getLanguageByDevice = () =>
  Platform.OS === 'ios'
    ? NativeModules.SettingsManager.settings.AppleLocale
    : NativeModules.I18nManager.localeIdentifier;

i18n.translations = {
  en_US: en,
  pt_BR: pt,
};

const setLanguageToI18n = () => {
  const language = getLanguageByDevice();
  const translateNormalize = normalizeTranslate[language];
  const iHaveThisLanguage = i18n.translations.hasOwnProperty(
    translateNormalize
  );

  if (iHaveThisLanguage) {
    i18n.locale = translateNormalize;
  } else {
    i18n.defaultLocale = 'en_US';
  }
};

setLanguageToI18n();

const translate = key => i18n.t(key);

export default translate;
