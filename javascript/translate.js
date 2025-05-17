// /js/translate.js

/**
 * Callback appelée par la librairie Google Translate (via cb=googleTranslateElementInit)
 */
function googleTranslateElementInit() {
  // 1) On attend que le bouton “Langue” soit dans le DOM
  function initWhenReady() {
    const btn = document.querySelector('.translate-dropdown');
    if (!btn) {
      return setTimeout(initWhenReady, 200);
    }

    // 2) On crée un container pour Google Translate juste après le bouton
    const container = document.createElement('div');
    container.id = 'google_translate_element';
    btn.parentNode.insertBefore(container, btn.nextSibling);

    // 3) On instancie le widget Google Translate
    new google.translate.TranslateElement({
      pageLanguage: 'fr',
      includedLanguages: 'en,es,de,it,pt',
      layout: google.translate.TranslateElement.InlineLayout.SIMPLE
    }, 'google_translate_element');

    // 4) Après injection du <select>, on crée une liste custom
    setTimeout(() => {
      const gtSelect = container.querySelector('select.goog-te-combo');
      if (!gtSelect) return;

      // On cache le select natif
      gtSelect.style.display = 'none';

      // 5) Construction de la liste custom
      const ul = document.createElement('ul');
      ul.className = 'lang-list';
      Array.from(gtSelect.options).forEach(opt => {
        const li = document.createElement('li');
        li.textContent = opt.text;
        li.dataset.lang = opt.value;
        li.addEventListener('click', () => {
          gtSelect.value = opt.value;
          gtSelect.dispatchEvent(new Event('change'));
          ul.style.display = 'none';
        });
        ul.appendChild(li);
      });
      btn.parentNode.insertBefore(ul, container.nextSibling);

      // 6) Toggle affichage de la liste au clic sur “Langue”
      btn.addEventListener('click', e => {
        e.preventDefault();
        ul.style.display = ul.style.display === 'block' ? 'none' : 'block';
      });

      // 7) Masquer la liste si on clique ailleurs
      document.addEventListener('click', e => {
        if (!btn.contains(e.target) && !ul.contains(e.target)) {
          ul.style.display = 'none';
        }
      });
    }, 500);
  }

  initWhenReady();
}

// Log pour vérification de chargement
document.addEventListener('DOMContentLoaded', () => {
  console.log('translate.js chargé');
});
