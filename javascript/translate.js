// /js/translate.js

document.addEventListener('DOMContentLoaded', () => {
  console.log('translate.js loaded');

  // 1) callback Google Translate
  window.googleTranslateElementInit = function() {
    console.log('🔥 googleTranslateElementInit called');

    const btn = document.querySelector('.translate-dropdown');
    if (!btn) {
      console.warn('⚠️ .translate-dropdown not found, retrying...');
      return setTimeout(googleTranslateElementInit, 200);
    }
    console.log('👍 Found button:', btn);

    // 2) créer le container (visible) pour que Google injecte son select
    let container = document.getElementById('google_translate_element');
    if (!container) {
      container = document.createElement('div');
      container.id = 'google_translate_element';
      btn.after(container);
    }

    // 3) initialiser le widget
    new google.translate.TranslateElement({
      pageLanguage: 'fr',
      includedLanguages: 'en,es,de,it,pt',
      layout: google.translate.TranslateElement.InlineLayout.SIMPLE
    }, 'google_translate_element');
    console.log('🚀 Google Translate widget initialized');

    // 4) attendre l'injection du <select>
    let attempts = 0;
    (function waitForSelect() {
      const gtSelect = container.querySelector('select.goog-te-combo');
      if (gtSelect) {
        console.log('🎉 Found <select>:', gtSelect);
        setupStaticList(btn, gtSelect);
      } else if (attempts < 40) {
        attempts++;
        setTimeout(waitForSelect, 250);
      } else {
        console.error('❌ <select> not found after several attempts');
      }
    })();
  };

  // 5) binding de votre liste statique
  function setupStaticList(btn, gtSelect) {
    // masquer le select natif (via CSS de toute façon)
    gtSelect.style.display = 'none';

    const ul = document.querySelector('.lang-list');
    if (!ul) {
      console.error('❌ .lang-list not found');
      return;
    }

    console.log('✅ Initializing static language list');

    // toggle affichage
    btn.addEventListener('click', e => {
      e.preventDefault();
      ul.style.display = (ul.style.display === 'block') ? 'none' : 'block';
    });

    // choix d’une langue
    ul.querySelectorAll('li').forEach(li => {
      li.addEventListener('click', () => {
        const lang = li.dataset.lang;
        console.log('🌐 Switching to', lang);
        gtSelect.value = lang;
        gtSelect.dispatchEvent(new Event('change'));
        ul.style.display = 'none';
      });
    });

    // clic en dehors
    document.addEventListener('click', e => {
      if (!btn.contains(e.target) && !ul.contains(e.target)) {
        ul.style.display = 'none';
      }
    });
  }

});
