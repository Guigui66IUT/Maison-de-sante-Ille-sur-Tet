// /js/translate-ui.js
(function() {
  console.log('translate-ui.js chargé, on attend le bouton...');

  // Fonction d'initialisation qui se réappelle tant que le bouton n'existe pas
  function initTranslateUI() {
    const btn = document.querySelector('.translate-dropdown');
    if (!btn) {
      // On réessaye dans 200ms
      return setTimeout(initTranslateUI, 200);
    }
    console.log('✅ Bouton Langue trouvé:', btn);

    // Si la liste existe déjà, on ne fait rien
    let ul = document.querySelector('.lang-list');
    if (!ul) {
      // 1) Création dynamique de la liste
      const langs = [
        { code: 'en', label: 'English' },
        { code: 'es', label: 'Español' },
        { code: 'de', label: 'Deutsch' },
        { code: 'it', label: 'Italiano' },
        { code: 'pt', label: 'Português' }
      ];
      ul = document.createElement('ul');
      ul.className = 'lang-list';
      langs.forEach(({code, label}) => {
        const li = document.createElement('li');
        li.textContent = label;
        li.dataset.lang = code;
        ul.appendChild(li);
      });
      // 2) On insère juste après le bouton
      btn.parentNode.insertBefore(ul, btn.nextSibling);
      console.log('🛠️ Liste des langues injectée dans le DOM');
    } else {
      console.log('ℹ️ Lang-list déjà présente');
    }

    // 3) Toggle affichage de la liste
    btn.addEventListener('click', e => {
      e.preventDefault();
      ul.classList.toggle('show');
      console.log('🔽 Toggle liste Langue :', ul.classList.contains('show'));
    });

    // 4) Sélection d’une langue
    ul.addEventListener('click', e => {
      if (e.target.tagName === 'LI') {
        const code = e.target.dataset.lang;
        console.log('🌐 Langue choisie :', code);
        // Ici, appelez Google Translate ou redirigez, etc.
        ul.classList.remove('show');
      }
    });

    // 5) Clic à l’extérieur ferme la liste
    document.addEventListener('click', e => {
      if (!btn.contains(e.target) && !ul.contains(e.target)) {
        if (ul.classList.contains('show')) {
          ul.classList.remove('show');
          console.log('❌ Fermeture liste Langue (clic hors)');
        }
      }
    });
  }

  // Kick-off
  initTranslateUI();
})();
