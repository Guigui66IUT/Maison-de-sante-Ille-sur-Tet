// /js/translate-ui.js
document.addEventListener('DOMContentLoaded', () => {
  console.log('translate-ui.js chargé');

  // 0) On repère le bouton
  const btn = document.querySelector('.translate-dropdown');
  if (!btn) {
    console.error('⚠️ .translate-dropdown introuvable');
    return;
  }

  // 1) Crée le container Google Translate (caché)
  const container = document.createElement('div');
  container.id = 'google_translate_element';
  container.style.display = 'none';
  btn.after(container);

  // 2) Initialise Google Translate dès que sa lib est chargée
  window.googleTranslateElementInit = function() {
    console.log('🔥 googleTranslateElementInit appelé');
    new google.translate.TranslateElement({
      pageLanguage: 'fr',
      includedLanguages: 'fr,en,es,de,it,pt',
      layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
      autoDisplay: false
    }, 'google_translate_element');
  };

  // 3) Injecte dynamiquement le script Google
  const gtScript = document.createElement('script');
  gtScript.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
  document.body.appendChild(gtScript);

  // 4) Génère votre liste de langues (statique) DANS le bouton
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
  console.log('✅ Liste des langues injectée');

  // 5) Au clic sur un <li>, on déclenche Google Translate
  ul.addEventListener('click', e => {
    if (e.target.tagName === 'LI') {
      const lang = e.target.dataset.lang;
      const select = document.querySelector('select.goog-te-combo');
      if (select) {
        console.log('🌐 Changement de langue vers', lang);
        select.value = lang;
        select.dispatchEvent(new Event('change'));
      } else {
        console.error('❌ Sélecteur Google introuvable');
      }
    }
  });
});
