import os
import json
from datetime import datetime

def generate_JSONlist_actu(directory=None, output=None):
    # Mappage mois anglais -> français (optionnel si tu veux renommer tes dossiers)
    months_translation = {
        'january': 'janvier',
        'february': 'fevrier',
        'march': 'mars',
        'april': 'avril',
        'may': 'mai',
        'june': 'juin',
        'july': 'juillet',
        'august': 'aout',
        'september': 'septembre',
        'october': 'octobre',
        'november': 'novembre',
        'december': 'decembre'
    }

    script_directory = os.path.dirname(os.path.abspath(__file__))

    directory = directory or os.path.join(script_directory, '../pdf')
    output = output or os.path.join(script_directory, '../json/file_list.json')

    pdf_files = {}
    always_files = []
    always_dir = os.path.join(directory, 'toujours')

    # Récupère les PDF du dossier "toujours"
    if os.path.exists(always_dir):
        always_files = [f.replace('.pdf', '') for f in os.listdir(always_dir) if f.endswith('.pdf')]
        pdf_files['toujours'] = always_files
    else:
        print(f"Le dossier 'toujours' n'existe pas dans {directory}")

    # Parcours tous les sous-dossiers de /pdf
    for subdir in os.listdir(directory):
        subdir_path = os.path.join(directory, subdir)

        # Ignore "toujours" car on l'a déjà géré
        if subdir.lower() == 'toujours':
            continue

        # Si c'est un dossier, on récupère tous les PDF
        if os.path.isdir(subdir_path):
            month_files = [f.replace('.pdf', '') 
                           for f in os.listdir(subdir_path) 
                           if f.endswith('.pdf')]
            # On stocke tout sans filtrer sur la date
            pdf_files[subdir] = month_files

    # Écrit le JSON
    with open(output, 'w', encoding='utf-8') as json_file:
        json.dump(pdf_files, json_file, indent=4, ensure_ascii=False)

    print(f'Fichier {output} généré avec succès.')

if __name__ == "__main__":
    generate_JSONlist_actu()
