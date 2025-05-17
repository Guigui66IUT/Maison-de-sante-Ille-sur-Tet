// /js/translate.js
(function() {
  console.log('translate.js chargé');

  // 1) Callback appelée par Google Translate (cb=googleTranslateElementInit)
  window.googleTranslateElementInit = function() {
    console.log('🛠️ googleTranslateElementInit appelé');

    // Crée un container caché pour le widget
    const containerId = 'google_translate_element';
    let container = document.getElementById(containerId);
    if (!container) {
      container = document.createElement('div');
      container.id = containerId;
      container.style.display = 'none';
      document.body.appendChild(container);
    }

    // Initialise le widget avec toutes les langues
    new google.translate.TranslateElement({
      pageLanguage: 'fr',
      includedLanguages: 'fr,en,es,de,it,pt',
      layout: google.translate.TranslateElement.InlineLayout.SIMPLE
    }, containerId);

    console.log('🚀 Widget Google Translate initialisé (caché)');
  };

  // 2) Construit le menu “Langue” et bind les clics
  function initLanguageMenu() {
    const btn = document.querySelector('.translate-dropdown');
    if (!btn) {
      return setTimeout(initLanguageMenu, 200);
    }
    console.log('✅ Bouton Langue trouvé:', btn);

    // Ne recrée pas la liste si elle existe déjà
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
      console.log('🛠️ Menu de langues injecté');
    }

    // 3) Au clic sur une langue : pose le cookie et recharge
    btn.querySelectorAll('.lang-list li').forEach(li => {
      li.addEventListener('click', () => {
        const lang = li.dataset.lang;
        console.log('🌐 Passage en langue :', lang);
        setGoogleTranslateCookie(lang);
        window.location.reload();
      });
    });
  }

  // Pose le cookie googtrans pour que Google Translate lise le mode et la langue
  function setGoogleTranslateCookie(lang) {
    const pathCookie = '/fr/' + lang;
    const domain = location.hostname.replace(/^www\./, '');
    // cookie pour le domaine principal et racine
    document.cookie = `googtrans=${pathCookie};path=/;domain=.${domain}`;
    document.cookie = `googtrans=${pathCookie};path=/`;
    console.log('🍪 Cookie googtrans posé:', pathCookie);
  }

  // 4) Démarrage : on charge d’abord le menu
  document.addEventListener('DOMContentLoaded', () => {
    initLanguageMenu();
  });
})();
