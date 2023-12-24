import os
import subprocess


def convert_to_hls(source_directory, input_file, destination_directory):
    # Vérifier si l'extension est valide
    valid_extensions = ['.mp4', '.mkv', '.avi']

    file_name, file_extension = os.path.splitext(input_file)
    source_file_path = os.path.join(source_directory, input_file)

    print(source_file_path)
    # Vérifier si le fichier a l'une des extensions valides
    if os.path.isfile(source_file_path) and any(input_file.lower().endswith(ext) for ext in valid_extensions):
        # Créer le dossier de destination
        destination_path = os.path.join(destination_directory, file_name)
        os.makedirs(destination_path)

        destination_file_path = os.path.join(destination_path, "output.m3u8")

        # Construire la commande ffmpeg
        command = [
            'ffmpeg',
            '-i', source_file_path,
            '-c:v', 'libx264',
            '-crf', '21',
            '-preset', 'veryfast',
            '-c:a', 'aac',
            '-b:a', '128k',
            '-ac', '2',
            '-g', '30',
            '-hls_time', '6',
            '-hls_list_size', '0',
            destination_file_path
        ]

        try:
            # Exécuter la commande ffmpeg
            print(f"Conversion de {input_file}...")
            subprocess.run(command, check=True)
            print(f"Conversion réussie. Le fichier {input_file} a été converti en {file_name}/output.m3u8.")
        except subprocess.CalledProcessError as e:
            print(f"Erreur lors de la conversion : {e}")
