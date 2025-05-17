// /js/translate.js

document.addEventListener('DOMContentLoaded', () => {
  console.log('translate.js loaded');

  // 1) On déclare la callback pour Google Translate
  window.googleTranslateElementInit = function() {
    console.log('🔥 googleTranslateElementInit callback');
    const btn = document.querySelector('.translate-dropdown');
    if (!btn) return;

    // Crée le container Google (caché) si nécessaire
    if (!document.getElementById('google_translate_element')) {
      const cont = document.createElement('div');
      cont.id = 'google_translate_element';
      cont.style.display = 'none';
      btn.after(cont);
      new google.translate.TranslateElement({
        pageLanguage: 'fr',
        includedLanguages: 'en,es,de,it,pt',
        layout: google.translate.TranslateElement.InlineLayout.SIMPLE
      }, 'google_translate_element');
      console.log('🚀 Google Translate widget initialized (hidden)');
    }
  };

  // 2) Fonction pour initialiser le toggle & le binding
  function initStaticList() {
    const btn = document.querySelector('.translate-dropdown');
    const ul  = document.querySelector('.lang-list');
    const gtSelect = document.querySelector('select.goog-te-combo');

    if (!btn || !ul || !gtSelect) {
      // Repoll si l’un des éléments manque
      return setTimeout(initStaticList, 200);
    }

    console.log('✅ Initializing static language list');

    // Cacher le <select> natif
    gtSelect.style.display = 'none';

    // 3) Toggle de la liste au clic sur “Langue”
    btn.addEventListener('click', e => {
      e.preventDefault();
      ul.style.display = ul.style.display === 'block' ? 'none' : 'block';
    });

    // 4) Changer la langue au clic sur un <li>
    ul.querySelectorAll('li').forEach(li => {
      li.addEventListener('click', () => {
        const lang = li.dataset.lang;
        console.log('🌐 Switching to', lang);
        gtSelect.value = lang;
        gtSelect.dispatchEvent(new Event('change'));
        ul.style.display = 'none';
      });
    });

    // 5) Cacher la liste quand on clique en dehors
    document.addEventListener('click', e => {
      if (!btn.contains(e.target) && !ul.contains(e.target)) {
        ul.style.display = 'none';
      }
    });
  }

  // 6) On attend que Google ait injecté son <select>, puis on initialise
  (function waitForGoogleSelect(attempts = 0) {
    if (document.querySelector('select.goog-te-combo')) {
      initStaticList();
    } else if (attempts < 20) {
      setTimeout(() => waitForGoogleSelect(attempts + 1), 200);
    } else {
      console.error('❌ Google Translate <select> not found');
    }
  })();
});
