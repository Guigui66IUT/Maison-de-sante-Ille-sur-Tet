// /js/translate.js

/**
 * Cette fonction sera appelée par la librairie Google Translate
 * (via le paramètre cb=googleTranslateElementInit)
 */
// /js/translate.js
function googleTranslateElementInit() {
  // fonction récursive pour attendre la présence du bouton
  function initWhenReady() {
    const btn = document.querySelector('.translate-dropdown');
    if (!btn) {
      return setTimeout(initWhenReady, 200);
    }
    console.log("👍 Bouton trouvé :", btn);
    btn.id = 'google_translate_element';

    new google.translate.TranslateElement({
      pageLanguage: 'fr',
      includedLanguages: 'en,es,de,it,pt',
      layout: google.translate.TranslateElement.InlineLayout.SIMPLE
    }, 'google_translate_element');

    setTimeout(() => {
      const combo = document.querySelector('.goog-te-combo');
      if (combo) {
        btn.removeAttribute('href');
        btn.addEventListener('click', e => {
          e.preventDefault();
          combo.focus();
          combo.click();
        });
        const gtFrame = document.querySelector('.skiptranslate');
        if (gtFrame) gtFrame.style.display = 'none';
      }
    }, 500);
  }
  initWhenReady();
}

document.addEventListener('DOMContentLoaded', () => {
  console.log('translate.js chargé');
});

