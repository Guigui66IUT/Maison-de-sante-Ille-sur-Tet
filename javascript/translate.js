// /js/translate.js

/**
 * Cette fonction sera appelée par la librairie Google Translate
 * (via le paramètre cb=googleTranslateElementInit)
 */
function googleTranslateElementInit() {
  const btn = document.querySelector('.translate-dropdown');
  if (!btn) return;

  // On ajoute l’ID attendu par Google
  btn.id = 'google_translate_element';

  // On instancie le widget
  new google.translate.TranslateElement({
    pageLanguage: 'fr',
    includedLanguages: 'en,es,de,it,pt',
    layout: google.translate.TranslateElement.InlineLayout.SIMPLE
  }, 'google_translate_element');

  // Après injection du <select>, on bind le clic
  setTimeout(() => {
    const combo = document.querySelector('.goog-te-combo');
    if (!combo) return;
    btn.removeAttribute('href');
    btn.addEventListener('click', e => {
      e.preventDefault();
      combo.focus();
      combo.click();
    });
    // Masquer la barre Google Translate
    const gtFrame = document.querySelector('.skiptranslate');
    if (gtFrame) gtFrame.style.display = 'none';
  }, 500);
}

// (Optionnel) Si vous aviez besoin d’exécuter autre chose au DOMContentLoaded,
// vous pouvez ajouter un listener ici.
document.addEventListener('DOMContentLoaded', () => {
  console.log('translate.js chargé');
});
