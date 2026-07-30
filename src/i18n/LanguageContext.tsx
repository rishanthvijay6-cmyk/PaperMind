import React, { createContext, useContext, useState, useEffect } from 'react';
import { LanguageCode, CurrencyCode, CountryCode } from '../types';
import { 
  TRANSLATIONS, 
  TranslationKeys, 
  LANGUAGES, 
  CURRENCIES, 
  COUNTRIES,
  LanguageMeta,
  CurrencyMeta,
  CountryMeta 
} from './translations';

interface LanguageContextType {
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  currency: CurrencyCode;
  setCurrency: (curr: CurrencyCode) => void;
  country: CountryCode;
  setCountry: (country: CountryCode) => void;
  timezone: string;
  setTimezone: (tz: string) => void;
  isRTL: boolean;
  t: (key: TranslationKeys) => string;
  formatCurrency: (amount: number, overrideSymbol?: string) => string;
  currentLanguageMeta: LanguageMeta;
  currentCurrencyMeta: CurrencyMeta;
  currentCountryMeta: CountryMeta;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Auto-detect browser locale or default to 'en'
  const detectLanguage = (): LanguageCode => {
    const navLang = navigator.language.split('-')[0].toLowerCase();
    if (navLang === 'zh') {
      return navigator.language.toLowerCase().includes('tw') || navigator.language.toLowerCase().includes('hk') 
        ? 'zh-TW' 
        : 'zh-CN';
    }
    const match = LANGUAGES.find((l) => l.code === navLang);
    return match ? match.code : 'en';
  };

  const [language, setLanguageState] = useState<LanguageCode>(detectLanguage);
  
  const currentLangMeta = LANGUAGES.find((l) => l.code === language) || LANGUAGES[0];
  
  const [currency, setCurrency] = useState<CurrencyCode>(currentLangMeta.defaultCurrency);
  const [country, setCountry] = useState<CountryCode>(currentLangMeta.defaultCountry);
  const [timezone, setTimezone] = useState<string>(
    Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC'
  );

  const isRTL = !!currentLangMeta.isRTL;

  // Sync RTL attribute on HTML root tag whenever language changes
  useEffect(() => {
    const root = document.documentElement;
    if (isRTL) {
      root.setAttribute('dir', 'rtl');
      root.classList.add('rtl');
    } else {
      root.setAttribute('dir', 'ltr');
      root.classList.remove('rtl');
    }
  }, [isRTL, language]);

  const setLanguage = (lang: LanguageCode) => {
    setLanguageState(lang);
    const meta = LANGUAGES.find((l) => l.code === lang);
    if (meta) {
      setCurrency(meta.defaultCurrency);
      setCountry(meta.defaultCountry);
    }
  };

  const t = (key: TranslationKeys): string => {
    const langDict = TRANSLATIONS[language] || TRANSLATIONS['en'];
    return langDict[key] || TRANSLATIONS['en'][key] || key;
  };

  const currentCurrMeta = CURRENCIES[currency] || CURRENCIES['USD'];
  const currentCtryMeta = COUNTRIES[country] || COUNTRIES['US'];

  const formatCurrency = (amount: number, overrideSymbol?: string): string => {
    const symbol = overrideSymbol || currentCurrMeta.symbol;
    // Format based on currency rules
    const formattedNum = new Intl.NumberFormat(language, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);

    return isRTL ? `${formattedNum} ${symbol}` : `${symbol}${formattedNum}`;
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        currency,
        setCurrency,
        country,
        setCountry,
        timezone,
        setTimezone,
        isRTL,
        t,
        formatCurrency,
        currentLanguageMeta: currentLangMeta,
        currentCurrencyMeta: currentCurrMeta,
        currentCountryMeta: currentCtryMeta,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useTranslation = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useTranslation must be used within a LanguageProvider');
  }
  return context;
};
