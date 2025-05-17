// /js/translate.js

/**
 * Callback appelée par la librairie Google Translate (via cb=googleTranslateElementInit)
 */
function googleTranslateElementInit() {
  console.log('🛠️ googleTranslateElementInit called');

  // 1) Trouver le bouton “Langue”
  const btn = document.querySelector('.translate-dropdown');
  if (!btn) {
    console.warn('⚠️ .translate-dropdown not found, retrying...');
    return setTimeout(googleTranslateElementInit, 200);
  }
  console.log('👍 Found button:', btn);

  // 2) Créer un conteneur pour le widget et l’insérer après le bouton
  const container = document.createElement('div');
  container.id = 'google_translate_element';
  container.style.display = 'none'; // on cache le widget natif
  btn.after(container);

  // 3) Initialiser Google Translate dans ce conteneur
  new google.translate.TranslateElement({
    pageLanguage: 'fr',
    includedLanguages: 'en,es,de,it,pt',
    layout: google.translate.TranslateElement.InlineLayout.SIMPLE
  }, 'google_translate_element');
  console.log('🚀 Google Translate widget initialized');

  // 4) Attendre que le <select> soit injecté
  let attempts = 0;
  function waitForSelect() {
    const gtSelect = container.querySelector('select.goog-te-combo');
    if (gtSelect) {
      console.log('🎉 Found <select>:', gtSelect);
      setupCustomList(btn, gtSelect);
    } else if (attempts < 20) {
      attempts++;
      setTimeout(waitForSelect, 250);
    } else {
      console.error('❌ <select> not found after several attempts');
    }
  }
  waitForSelect();
}

/**
 * Remplace le <select> natif par une liste customisable
 */
function setupCustomList(btn, gtSelect) {
  // 1) Cacher le <select> natif
  gtSelect.style.display = 'none';

  // 2) Construire la liste <ul><li>
  const ul = document.createElement('ul');
  ul.className = 'lang-list';   // à styliser via CSS
  Array.from(gtSelect.options).forEach(opt => {
    const li = document.createElement('li');
    li.textContent = opt.text;
    li.dataset.lang = opt.value;
    li.addEventListener('click', () => {
      console.log('🌐 Switch to', opt.value);
      gtSelect.value = opt.value;
      gtSelect.dispatchEvent(new Event('change'));
      ul.style.display = 'none';
    });
    ul.appendChild(li);
  });

  // 3) Insérer juste après le bouton
  btn.after(ul);
  ul.style.display = 'none';

  // 4) Ouvrir/fermer la liste au clic sur “Langue”
  btn.addEventListener('click', e => {
    e.preventDefault();
    ul.style.display = (ul.style.display === 'block') ? 'none' : 'block';
    console.log('🔽 Toggled language list:', ul.style.display);
  });

  // 5) Cacher la liste si clic en dehors
  document.addEventListener('click', e => {
    if (!btn.contains(e.target) && !ul.contains(e.target)) {
      ul.style.display = 'none';
    }
  });

  console.log('✅ Custom language list set up');
}

// 6) Log de chargement du fichier
document.addEventListener('DOMContentLoaded', () => {
  console.log('translate.js loaded');
});
