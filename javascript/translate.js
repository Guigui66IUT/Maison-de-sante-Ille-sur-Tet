document.addEventListener('DOMContentLoaded', () => {
  const btn  = document.querySelector('.translate-dropdown');
  const list = document.querySelector('.lang-list');
  if (!btn || !list) return;

  // 1) Toggle affichage de la liste au clic
  btn.addEventListener('click', e => {
    e.preventDefault();
    list.classList.toggle('show');
  });

  // 2) Fermer la liste si on clique ailleurs
  document.addEventListener('click', e => {
    if (!btn.contains(e.target) && !list.contains(e.target)) {
      list.classList.remove('show');
    }
  });

  // 3) Cliquer sur un item ferme la liste (et pourra déclencher la trad)
  list.querySelectorAll('li').forEach(li => {
    li.addEventListener('click', () => {
      list.classList.remove('show');
      const lang = li.dataset.lang;
      console.log('Vous avez choisi la langue :', lang);
      // Ici : appeler votre fonction de traduction avec `lang`
    });
  });
});
