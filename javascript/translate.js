// /js/translate-ui.js
(function() {
  console.log('translate-ui.js chargé, on attend le bouton...');

  function initTranslateUI() {
    const btn = document.querySelector('.translate-dropdown');
    if (!btn) {
      // si le bouton n'existe pas encore, réessayer dans 200ms
      return setTimeout(initTranslateUI, 200);
    }
    console.log('✅ Bouton Langue trouvé:', btn);

    // ne reconstruire la liste qu'une seule fois
    if (btn.querySelector('.lang-list')) {
      return console.log('ℹ️ Lang-list déjà injectée');
    }

    // Définir les langues
    const langs = [
      { code: 'fr', label: 'Français' },
      { code: 'en', label: 'English' },
      { code: 'es', label: 'Español' },
      { code: 'de', label: 'Deutsch' },
      { code: 'it', label: 'Italiano' },
      { code: 'pt', label: 'Português' }
    ];

    // Construire le <ul>
    const ul = document.createElement('ul');
    ul.className = 'lang-list';
    langs.forEach(({ code, label }) => {
      const li = document.createElement('li');
      li.textContent = label;
      li.dataset.lang = code;
      ul.appendChild(li);
    });

    // Injecter la liste DANS le <a>
    btn.style.position = 'relative';
    btn.appendChild(ul);
    console.log('🛠️ Liste des langues injectée dans le DOM');

    // Gérer le clic sur un <li>
    ul.addEventListener('click', e => {
      if (e.target.tagName === 'LI') {
        const chosen = e.target.dataset.lang;
        console.log('🌐 Langue choisie :', chosen);
        // → Ici, lancez votre traduction (Google, redirection, etc.)
      }
    });
  }

  // Démarrage
  initTranslateUI();
})();
