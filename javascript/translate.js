// /js/translate.js

/**
 * Cette fonction est appelée par Google dès que la librairie est chargée.
 */
function googleTranslateElementInit() {
  // 1) On attend que le lien “Langue” existe dans le DOM
  function initWhenReady() {
    const btn = document.querySelector('.translate-dropdown');
    if (!btn) {
      return setTimeout(initWhenReady, 200);
    }

    // 2) On crée un conteneur juste après le lien
    const container = document.createElement('div');
    container.id = 'google_translate_element';
    btn.parentNode.insertBefore(container, btn.nextSibling);

    // 3) On instancie le widget dans ce nouveau conteneur
    new google.translate.TranslateElement({
      pageLanguage: 'fr',
      includedLanguages: 'en,es,de,it,pt',
      layout: google.translate.TranslateElement.InlineLayout.SIMPLE
    }, 'google_translate_element');

    // 4) Après injection du <select>, on nettoie et on bind le clic
    setTimeout(() => {
      const combo = container.querySelector('select.goog-te-combo');
      if (!combo) return;

      // On stylise le <select> via classe
      combo.classList.add('translate-combo');

      // On fait en sorte que cliquer sur “Langue” ouvre le <select>
      btn.addEventListener('click', e => {
        e.preventDefault();
        combo.focus();
        combo.click();
      });

      // On masque les éléments superflus injectés
      const logo = container.querySelector('.goog-logo-link');
      if (logo) logo.style.display = 'none';
    }, 500);
  }

  initWhenReady();
}

document.addEventListener('DOMContentLoaded', () => {
  console.log('translate.js chargé');
});
