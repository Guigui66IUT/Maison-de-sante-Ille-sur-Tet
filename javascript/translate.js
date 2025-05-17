// /js/translate.js
(function() {
  // 1) Callback que Google appellera
  window.googleTranslateElementInit = function() {
    console.log('🛠️ googleTranslateElementInit called');

    // Crée un container pour Google
    const containerId = 'google_translate_element';
    let container = document.getElementById(containerId);
    if (!container) {
      container = document.createElement('div');
      container.id = containerId;
      container.style.display = 'none';
      document.body.appendChild(container);
    }

    // Initialise le widget
    new google.translate.TranslateElement({
      pageLanguage: 'fr',
      includedLanguages: 'fr,en,es,de,it,pt',
      layout: google.translate.TranslateElement.InlineLayout.SIMPLE
    }, containerId);

    console.log('🚀 Google Translate widget initialized');
  };

  // 2) Construction du menu “Langue”
  function initMenu() {
    const btn = document.querySelector('.translate-dropdown');
    if (!btn) return setTimeout(initMenu, 200);

    // 2.a) Crée la liste si besoin
    if (!btn.querySelector('.lang-list')) {
      const langs = [
        { code: 'fr', label: 'Français' },
        { code: 'en', label: 'English' },
        { code: 'es', label: 'Español' },
        { code: 'de', label: 'Deutsch' },
        { code: 'it', label: 'Italiano' },
        { code: 'pt', label: 'Português' }
      ];
      const ul = document.createElement('ul');
      ul.className = 'lang-list';
      langs.forEach(({code, label}) => {
        const li = document.createElement('li');
        li.textContent = label;
        li.dataset.lang = code;
        ul.appendChild(li);
      });
      btn.style.position = 'relative';
      btn.appendChild(ul);
      console.log('🛠️ Langue menu injected');
    }

    // 3) Au clic sur un item, on déclenche la traduction
    btn.querySelectorAll('.lang-list li').forEach(li => {
      li.addEventListener('click', e => {
        const code = li.dataset.lang;
        console.log('🌐 Changement de langue vers:', code);
        // trouve le <select> généré par Google
        const combo = document.querySelector('select.goog-te-combo');
        if (combo) {
          combo.value = code;                      // sélectionne la langue
          combo.dispatchEvent(new Event('change'));// déclenche la trad
        }
      });
    });
  }

  // 4) Chargement des scripts
  document.addEventListener('DOMContentLoaded', () => {
    console.log('translate.js loaded');
    initMenu();
  });
})();
