document.addEventListener('DOMContentLoaded', () => {
  const btn  = document.querySelector('.translate-dropdown');
  if (!btn) return;

  // 1) Création dynamique de la liste
  const langs = [
    { code: 'en', label: 'English' },
    { code: 'es', label: 'Español' },
    { code: 'de', label: 'Deutsch' },
    { code: 'it', label: 'Italiano' },
    { code: 'pt', label: 'Português' }
  ];
  const ul = document.createElement('ul');
  ul.className = 'lang-list';
  langs.forEach(({code, label}) => {
    const li = document.createElement('li');
    li.textContent = label;
    li.dataset.lang = code;
    ul.appendChild(li);
  });

  // 2) Insertion juste après le bouton
  btn.parentNode.insertBefore(ul, btn.nextSibling);

  // 3) Toggle de l’affichage au clic
  btn.addEventListener('click', e => {
    e.preventDefault();
    ul.classList.toggle('show');
  });

  // 4) Sélection d’une langue
  ul.addEventListener('click', e => {
    if (e.target.tagName === 'LI') {
      const code = e.target.dataset.lang;
      console.log('🔤 Vous avez choisi la langue :', code);
      // TODO : ici vous pouvez déclencher votre traduction, ex:
      // window.location.href = `/${code}${window.location.pathname}`;
      ul.classList.remove('show');
    }
  });

  // 5) Clic en dehors pour fermer
  document.addEventListener('click', e => {
    if (!btn.contains(e.target) && !ul.contains(e.target)) {
      ul.classList.remove('show');
    }
  });
});
