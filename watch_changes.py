import os
import sys
import time
import platform
import subprocess

WATCH_DIR = "/app"  # Répertoire surveillé à l'intérieur du conteneur
LOG_FILE = os.path.join(WATCH_DIR, "watch_changes.log")
DELAY = 5  # Temps d'attente avant d'exécuter les scripts après une modification

def log(message):
    """Écrit un message dans le fichier de log et l'affiche."""
    timestamp = time.strftime("%Y-%m-%d %H:%M:%S")
    full_message = f"{timestamp} - {message}"
    print(full_message)
    with open(LOG_FILE, "a") as f:
        f.write(full_message + "\n")

def execute_scripts():
    """Exécute `execute_all.py` et `git_operations.py`."""
    for script in ["execute_all.py", "git_operations.py"]:
        script_path = os.path.join(WATCH_DIR, script)
        if os.path.exists(script_path):
            try:
                log(f"🚀 Exécution de {script}...")
                subprocess.run(["python", script_path], check=True)
                log(f"✅ {script} exécuté avec succès.")
            except subprocess.CalledProcessError:
                log(f"❌ Erreur dans {script}")

def watch():
    """Surveille les changements dans le dossier et exécute les scripts lorsqu'un changement est détecté."""
    log(f"🔍 Surveillance du dossier : {WATCH_DIR}")

    if platform.system() == "Windows":
        log("🟡 Mode Windows détecté. Surveillance avec 'dir'.")
        last_modified = os.stat(WATCH_DIR).st_mtime

        while True:
            time.sleep(DELAY)
            new_modified = os.stat(WATCH_DIR).st_mtime
            if new_modified != last_modified:
                log("🕒 Changement détecté. Exécution des scripts...")
                execute_scripts()
                last_modified = new_modified
    else:
        log("🟢 Mode Linux/macOS détecté. Utilisation de 'inotifywait'.")

        try:
            subprocess.run(["which", "inotifywait"], check=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
        except subprocess.CalledProcessError:
            log("❌ inotifywait n'est pas installé. Installez-le avec : sudo apt install inotify-tools")
            sys.exit(1)

        process = subprocess.Popen(["inotifywait", "-m", "-r", "-e", "modify,create,delete", WATCH_DIR],
                                   stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)

        for _ in process.stdout:
            log("🕒 Changement détecté. Exécution des scripts...")
            execute_scripts()
            time.sleep(DELAY)

if __name__ == "__main__":
    watch()
