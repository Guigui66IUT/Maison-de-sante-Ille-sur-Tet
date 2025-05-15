import subprocess
import importlib.util
import os
from git import Repo, exc

def ensure_gitpython_and_push(repo_path, commit_message):
    # Installer GitPython si nécessaire
    package_name = 'git'
    if importlib.util.find_spec(package_name) is None:
        subprocess.run(['py', '-m', 'pip', 'install', 'GitPython'], check=True)

    # Ouvrir le dépôt
    repo = Repo(repo_path)
    origin = repo.remote(name='origin')

    # Récupérer la branche active
    try:
        branch = repo.active_branch.name
    except TypeError:
        # En cas de HEAD détaché, on prend 'master' par défaut
        branch = 'master'

    # 1) fetch + pull pour éviter le non-fast-forward
    try:
        origin.fetch()
        origin.pull(branch)
        print(f"✅ Branche '{branch}' synchronisée avec origin/{branch}")
    except exc.GitCommandError as e:
        print(f"⚠️ Pull a échoué : {e}. Vous pouvez tenter un rebase ou vérifier les conflits.")

    # 2) Ajouter et committer
    repo.git.add('--all')
    try:
        repo.index.commit(commit_message)
        print(f"✅ Commit effectué : « {commit_message} »")
    except exc.GitCommandError as e:
        print(f"⚠️ Commit a échoué : {e}")

    # 3) Pousser et afficher le résultat
    try:
        push_results = origin.push(branch)
        for info in push_results:
            # info.flags & info.ERROR non nul = erreur
            if info.flags & info.ERROR:
                print(f"❌ Push échoué : {info.summary}")
            else:
                print(f"✅ Push réussi : {info.summary}")
    except exc.GitCommandError as e:
        print(f"❌ Erreur lors du push : {e}")

if __name__ == "__main__":
    repo_path = os.path.abspath(os.path.dirname(__file__))
    ensure_gitpython_and_push(repo_path, 'Votre message de commit')
