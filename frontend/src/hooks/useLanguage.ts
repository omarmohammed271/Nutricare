import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export const useLanguage = () => {
  const { i18n } = useTranslation();

  useEffect(() => {
    // Update document direction and language when i18n language changes
    const updateDocumentDirection = () => {
      if (i18n.language === 'ar') {
        document.documentElement.dir = 'rtl';
        document.documentElement.lang = 'ar';
        document.body.style.direction = 'rtl';
      } else {
        document.documentElement.dir = 'ltr';
        document.documentElement.lang = 'en';
        document.body.style.direction = 'ltr';
      }
    };

    updateDocumentDirection();

    // Listen for language changes
    const handleLanguageChanged = () => {
      updateDocumentDirection();
    };

    i18n.on('languageChanged', handleLanguageChanged);

    return () => {
      i18n.off('languageChanged', handleLanguageChanged);
    };
  }, [i18n]);

  return { i18n };
};
