// /js/translate.js
(function(){
  console.log('translate.js chargé — j’attends .translate-dropdown');

  // 1) On attend que le DOM soit prêt
  document.addEventListener('DOMContentLoaded', () => {
    // 2) On poll pour trouver le bouton
    (function waitForBtn(){
      const btn = document.querySelector('.translate-dropdown');
      if (!btn) {
        console.warn('⚠️ .translate-dropdown introuvable, nouvelle tentative dans 200ms');
        return setTimeout(waitForBtn, 200);
      }
      console.log('✅ Bouton trouvé', btn);
      initTranslate(btn);
    })();
  });

  // 3) Fonction d’initialisation une fois le bouton là
  function initTranslate(btn) {
    // --- Création du container caché pour Google ---
    let container = document.getElementById('google_translate_element');
    if (!container) {
      container = document.createElement('div');
      container.id = 'google_translate_element';
      container.style.display = 'none';
      btn.after(container);
    }

    // --- Définition de la callback Google ---
    window.googleTranslateElementInit = function(){
      new google.translate.TranslateElement({
        pageLanguage: 'fr',
        includedLanguages: 'fr,en,es,de,it,pt',
        layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
        autoDisplay: false
      }, 'google_translate_element');
      console.log('🚀 Widget Google Translate initialisé');
    };

    // --- Injection du script Google ---
    const s = document.createElement('script');
    s.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    document.body.appendChild(s);

    // --- Création de votre liste statique ---
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

    // --- Gestion du clic sur un <li> pour traduire ---
    btn.querySelector('.lang-list').addEventListener('click', e => {
      if (e.target.tagName === 'LI') {
        const lang = e.target.dataset.lang;
        console.log('🌐 Changement de langue vers', lang);
        const select = document.querySelector('select.goog-te-combo');
        if (select) {
          select.value = lang;
          select.dispatchEvent(new Event('change'));
        }
      }
    });
  }
})();
