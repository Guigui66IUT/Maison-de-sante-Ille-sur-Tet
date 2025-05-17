// /js/translate.js
(function() {
  console.log('translate.js chargé');

  // 1) Callback appelée par Google (cb=googleTranslateElementInit)
  window.googleTranslateElementInit = function() {
    console.log('🛠️ googleTranslateElementInit called');

    // Crée/obtient le container caché
    const CONTAINER_ID = 'google_translate_element';
    let container = document.getElementById(CONTAINER_ID);
    if (!container) {
      container = document.createElement('div');
      container.id = CONTAINER_ID;
      container.style.display = 'none';
      document.body.appendChild(container);
    }

    // Initialise le widget
    new google.translate.TranslateElement({
      pageLanguage: 'fr',
      includedLanguages: 'fr,en,es,de,it,pt',
      layout: google.translate.TranslateElement.InlineLayout.SIMPLE
    }, CONTAINER_ID);

    console.log('🚀 Widget Google Translate initialisé (caché)');
  };

  // 2) Construction du menu “Langue” + binding du clic
  function initLanguageMenu() {
    const btn = document.querySelector('.translate-dropdown');
    if (!btn) {
      return setTimeout(initLanguageMenu, 200);
    }
    console.log('✅ Bouton Langue trouvé:', btn);

    // Si la liste n’est pas encore injectée, on la crée
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
      langs.forEach(({ code, label }) => {
        const li = document.createElement('li');
        li.textContent = label;
        li.dataset.lang = code;
        ul.appendChild(li);
      });
      btn.style.position = 'relative';
      btn.appendChild(ul);
      console.log('🛠️ Liste des langues injectée');
    }

    // 3) Au clic sur un <li>, on pose le cookie et on recharge
    btn.querySelectorAll('.lang-list li').forEach(li => {
      li.addEventListener('click', () => {
        const lang = li.dataset.lang;
        console.log('🌐 Langue choisie :', lang);
        // On pose uniquement path=/, pas de domain
        document.cookie = `googtrans=/fr/${lang};path=/`;
        console.log('🍪 Cookie googtrans posé (path=/):', document.cookie);
        // On recharge la page
        window.location.reload();
      });
    });
  }

  // 4) Lancement
  document.addEventListener('DOMContentLoaded', () => {
    initLanguageMenu();
  });
})();
