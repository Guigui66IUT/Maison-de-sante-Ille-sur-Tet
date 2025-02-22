# Utiliser l'image officielle Python 3.9
FROM python:3.9

# Définir le répertoire de travail à l'intérieur du conteneur
WORKDIR /app

# Copier tous les fichiers locaux dans le conteneur
COPY . .

# Installer les dépendances nécessaires
RUN pip install --no-cache-dir inotify

# Exécuter le script au démarrage du conteneur
CMD ["python", "watch_changes.py"]
