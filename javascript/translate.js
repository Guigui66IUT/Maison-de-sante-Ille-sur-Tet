// /js/translate.js

/**
 * Cette fonction sera appelée par la librairie Google Translate
 * (via le paramètre cb=googleTranslateElementInit)
 */
// /js/translate.js

function googleTranslateElementInit() {
  console.log("🔧 googleTranslateElementInit() exécutée");  // <— ce log doit apparaître
  const btn = document.querySelector('.translate-dropdown');
  console.log("Bouton trouvé :", btn);
  if (!btn) return;

  btn.id = 'google_translate_element';
  new google.translate.TranslateElement({
    pageLanguage: 'fr',
    includedLanguages: 'en,es,de,it,pt',
    layout: google.translate.TranslateElement.InlineLayout.SIMPLE
  }, 'google_translate_element');

  setTimeout(() => {
    const combo = document.querySelector('.goog-te-combo');
    console.log("Combo trouvé :", combo);
    if (!combo) return;
    btn.removeAttribute('href');
    btn.addEventListener('click', e => {
      e.preventDefault();
      combo.focus();
      combo.click();
    });
    const gtFrame = document.querySelector('.skiptranslate');
    if (gtFrame) gtFrame.style.display = 'none';
  }, 500);
}

document.addEventListener('DOMContentLoaded', () => {
  console.log('translate.js chargé');
});
