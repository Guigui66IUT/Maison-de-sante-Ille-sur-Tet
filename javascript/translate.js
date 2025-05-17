document.addEventListener('DOMContentLoaded', () => {
  console.log('translate-ui.js loaded');

  const btn  = document.querySelector('.translate-dropdown');
  const ul   = document.querySelector('.lang-list');
  if (!btn || !ul) {
    console.error('⚠️ bouton ou liste non trouvée');
    return;
  }

  // 1) Toggle affichage de la liste
  btn.addEventListener('click', e => {
    e.preventDefault();
    ul.classList.toggle('show');
    console.log('🔽 Langue menu toggled:', ul.classList.contains('show'));
  });

  // 2) Sélection d’une langue
  ul.querySelectorAll('li').forEach(li => {
    li.addEventListener('click', () => {
      ul.classList.remove('show');
      console.log('🌐 Langue choisie :', li.dataset.lang);
      // Ici, tu peux appeler Google Translate via ton select caché
    });
  });

  // 3) Clic en dehors ferme la liste
  document.addEventListener('click', e => {
    if (!btn.contains(e.target) && !ul.contains(e.target)) {
      ul.classList.remove('show');
    }
  });
});
