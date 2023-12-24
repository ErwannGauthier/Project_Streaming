import os
import re


def rename_files(source_directory):
    # Liste des extensions à prendre en compte
    valid_extensions = ['.mp4', '.mkv', '.avi']

    for file_name in os.listdir(source_directory):
        file_path = os.path.join(source_directory, file_name)

        # Vérifier si le fichier a l'une des extensions valides
        if os.path.isfile(file_path) and any(file_name.lower().endswith(ext) for ext in valid_extensions):
            # Séparer le nom de fichier et l'extension
            base_name, file_extension = os.path.splitext(file_name)

            # Remplacer les caractères non alphanumériques par _
            new_base_name = re.sub(r'[^a-zA-Z0-9]', '_', base_name)

            # Construire le nouveau chemin avec le même répertoire, la nouvelle base de nom de fichier et l'ancienne extension
            new_file_name = f"{new_base_name}{file_extension}"
            new_file_path = os.path.join(source_directory, new_file_name)

            # Renommer le fichier en conservant l'extension
            os.rename(file_path, new_file_path)
            print(f"Renommage : {file_name} -> {new_file_name}")
