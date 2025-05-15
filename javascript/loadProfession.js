document.addEventListener("DOMContentLoaded", function() {
    const urlParams = new URLSearchParams(window.location.search);
    const profession = urlParams.get('profession');

    fetch('/json/professions.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Erreur lors du chargement des professions.');
            }
            return response.json();
        })
        .then(data => {
            if (profession) {
                const professionData = data.find(prof => prof.profession.toLowerCase() === profession.toLowerCase());
                if (professionData) {
                    displayProfessionData(professionData);
                } else {
                    console.error("Profession non trouvée.");
                }
            }
        })
        .catch(error => {
            console.error('Erreur de chargement des professions:', error);
        });
});

function displayProfessionData(professionData) {
    const professionTitle = document.getElementById('profession-title');
    const professionLogo = document.getElementById('profession-logo');
    const personnelContainer = document.getElementById('profession-container');

    if (!professionTitle || !personnelContainer || !professionLogo) {
        console.error("Les éléments DOM pour l'affichage des professionnels ne sont pas trouvés.");
        return;
    }

    professionTitle.textContent = professionData.profession;

    if (professionData.logo) {
        professionLogo.src = encodeURIComponent(professionData.logo).replace(/%2F/g, '/');
        professionLogo.alt = `Logo ${professionData.profession}`;
        professionLogo.style.display = 'block';
    } else {
        professionLogo.style.display = 'none';
    }

    personnelContainer.innerHTML = '';

    if (professionData.personnel.length === 0) {
        personnelContainer.innerHTML = "<p>Aucun professionnel disponible pour cette profession.</p>";
        return;
    }

    professionData.personnel.forEach(personnel => {
        const pdf = personnel.pdf ? `<a href="../../${personnel.pdf.path}" download="${personnel.pdf.name}" class="download-link">Autre</a>` : '';
        const textsHTML = personnel.texts.map(text => `
            <h4>${text.filename}</h4>
            <ul>${text.content.map(line => {
                if (line.startsWith('http')) {
                    return `<li><a href="${line}" target="_blank">${line}</a></li>`;
                } else {
                    return `<li>${line}</li>`;
                }
            }).join('')}</ul>
        `).join('');

        let doctolibOrPhone;
        if (personnel.doctolib && personnel.doctolib.includes('pagesjaunes')) {
            doctolibOrPhone = `<a href="${personnel.doctolib}" target="_blank"><button class="rendezvous">Prendre rendez-vous</button></a>`;
        } else if (personnel.doctolib) {
            const isPhoneNumber = personnel.doctolib.match(/^\d{2} \d{2} \d{2} \d{2} \d{2}$/);
            doctolibOrPhone = `<button class="book-appointment" onclick="revealPhoneNumber(this, '${personnel.doctolib}')">Prendre rendez-vous</button>`;
            
            if (!isPhoneNumber) {
                doctolibOrPhone = `<a href="${personnel.doctolib}" target="_blank"><button class="book-appointment">Prendre rendez-vous</button></a>`;
            }
        }

        const isSinglePersonnel = professionData.personnel.length === 1;
        const collapsibleContentClass = isSinglePersonnel ? 'collapsible-content show' : 'collapsible-content';

        const personnelHTML = `
            <div class="button-section">
                <div class="button-row">
                    <div class="left-text">${personnel.name}</div>
                    <div class="learn-more" onclick="toggleText(this)">En savoir +</div>
                    ${doctolibOrPhone}
                </div>
                <div class="${collapsibleContentClass}">
                    <div class="content-wrapper">
                        <img src="/ajoutprofession/${personnel.image}" alt="Profile Image" />
                        <div class="text-content">
                            ${textsHTML}
                            ${pdf}
                        </div>
                    </div>
                </div>
            </div>
        `;
        personnelContainer.innerHTML += personnelHTML;
    });
}

function toggleText(element) {
    const content = element.parentElement.nextElementSibling;
    content.classList.toggle('show');
}

function revealPhoneNumber(button, phoneNumber) {
  const originalText = button.dataset.originalText || 'Prendre rendez-vous';
  // Si on affiche déjà le numéro, on revient au texte original
  if (button.innerText === phoneNumber) {
    button.innerText = originalText;
  } else {
    // Sinon, on stocke le texte original et on affiche le numéro
    button.dataset.originalText = originalText;
    button.innerText = phoneNumber;
  }
}
