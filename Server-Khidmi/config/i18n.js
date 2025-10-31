const i18next = require('i18next');
const Backend = require('i18next-fs-backend');
const path = require('path');

i18next
  .use(Backend)
  .init({
    lng: 'fr', // Langue par défaut
    fallbackLng: 'en', // Langue de secours
    ns: ['translation'],
    defaultNS: 'translation',
    backend: {
      loadPath: path.join(__dirname, '../locales/{{lng}}/{{ns}}.json')
    },
    interpolation: {
      escapeValue: false
    },
    detection: {
      order: ['header', 'query'],
      caches: ['cookie']
    }
  });

module.exports = i18next;

