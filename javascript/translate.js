// /js/translate-ui.js
(function() {
  console.log('translate-ui.js chargé');

  // 1) Callback pour Google Translate (cb=...)
  window.googleTranslateElementInit = function() {
    console.log('🛠️ googleTranslateElementInit appelé');

    // Crée le container (invisible) pour le widget
    const ID = 'google_translate_element';
    let c = document.getElementById(ID);
    if (!c) {
      c = document.createElement('div');
      c.id = ID;
      c.style.display = 'none';
      document.body.appendChild(c);
    }

    // Initialise Google Translate
    new google.translate.TranslateElement({
      pageLanguage: 'fr',
      includedLanguages: 'fr,en,es,de,it,pt',
      layout: google.translate.TranslateElement.InlineLayout.SIMPLE
    }, ID);
    console.log('🚀 Widget Google Translate initialisé');
  };

  // 2) Injection du menu statique + binding clics
  function initMenu() {
    const btn = document.querySelector('.translate-dropdown');
    if (!btn) {
      return setTimeout(initMenu, 200);
    }
    console.log('✅ Bouton Langue trouvé');

    // Supprime son href pour ne pas naviguer
    btn.removeAttribute('href');

    // Si la liste n’existe pas, on la crée
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
      langs.forEach(({code,label}) => {
        const li = document.createElement('li');
        li.textContent = label;
        li.dataset.lang = code;
        ul.appendChild(li);
      });
      btn.style.position = 'relative';
      btn.appendChild(ul);
      console.log('🛠️ Liste des langues injectée');
    }

    // 3) Clic sur <li> → pose cookie et reload
    btn.querySelectorAll('.lang-list li').forEach(li => {
      li.addEventListener('click', e => {
        const lang = li.dataset.lang;
        console.log('🌐 Langue choisie :', lang);
        // Pose cookie googtrans sans domain, seulement path
        document.cookie = `googtrans=/fr/${lang};path=/`;
        console.log('🍪 Cookie googtrans posé:', document.cookie);
        // Recharge pour que GT prenne en compte
        window.location.reload();
      });
    });
  }

  // 4) Lancement
  document.addEventListener('DOMContentLoaded', initMenu);
})();
