document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded and parsed');

    fetch('../../json/file_list.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(files => {
            const vessel = document.getElementById('vessel');
            
            // Détecte le mois actuel via le navigateur (ex. février)
            let currentMonth = "fevrier"//new Date().toLocaleString('fr-FR', { month: 'long' }).toLowerCase();
            
            // Optionnel : si tes dossiers s'appellent "fevrier", "mars", ...
            // et pas "février" avec accent, c'est généralement cohérent.
            // Sinon, fais un mapping JS similaire à ton Python pour
            // aligner "février" <-> "fevrier" etc.

            // On parcourt tous les "mois" qu'on a dans le JSON
            Object.keys(files).forEach(month => {
                // On veut afficher la clé "toujours" et la clé du "mois courant"
                // Si tu souhaites afficher TOUS les mois, enlève ce if()
                if (month.toLowerCase() === currentMonth || month === 'toujours') {
                    
                    // Pour chaque PDF dans ce mois
                    files[month].forEach(filename => {
                        const card = document.createElement('div');
                        card.classList.add('card');
                        card.onclick = () => downloadPDF(month, filename);

                        const img = document.createElement('img');
                        if (month === 'toujours') {
                            img.src = `../../pdf/toujours/${filename}.jpg`;
                        } else {
                            img.src = `../../pdf/${month}/${filename}.jpg`;
                        }
                        img.alt = filename;
                        img.onerror = () => {
                            console.error(`Image not found: ${img.src}`);
                            img.src = '../../img/placeholder.jpg';
                        };

                        const p = document.createElement('p');
                        p.textContent = filename;

                        card.appendChild(img);
                        card.appendChild(p);
                        vessel.appendChild(card);
                    });
                }
            });
        })
        .catch(error => {
            console.error('Error fetching file_list.json:', error);
        });
});

function downloadPDF(month, filename) {
    const link = document.createElement('a');
    if (month === 'toujours') {
        link.href = `../../pdf/toujours/${filename}.pdf`;
    } else {
        link.href = `../../pdf/${month}/${filename}.pdf`;
    }
    link.download = `${filename}.pdf`;
    link.click();
}
