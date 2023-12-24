import os


def move_file(source, destination):
    try:
        # Assurez-vous que le fichier source existe
        if os.path.exists(source):
            # Construit chemin de destination en ajoutant le nom du fichier
            destination_path = os.path.join(destination, os.path.basename(source))

            # Déplace le fichier
            os.rename(source, destination_path)
            print(f"Le fichier {os.path.basename(source)} a été déplacé avec succès vers {destination}.")
        else:
            print(f"Le fichier {source} n'existe pas.")
    except Exception as e:
        print(f"Une erreur s'est produite lors du déplacement du fichier : {e}")
