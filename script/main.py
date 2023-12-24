from os import getenv, listdir
from os.path import isdir, isfile, join

from dotenv import load_dotenv

from convertToHls import convert_to_hls
from moveFile import move_file
from renameFiles import rename_files

load_dotenv()


def main(source_directory, destination_directory, done_directory):
    if not (isdir(source_directory) and isdir(destination_directory) and isdir(done_directory)):
        print("Un des dossiers passés en paramètres n'en n'est pas un.")
        return

    rename_files(source_directory)

    valid_extensions = ['.mp4', '.mkv', '.avi']
    files = [f for f in listdir(source_directory) if
             isfile(join(source_directory, f)) and f[-4:].lower() in valid_extensions]

    for file in files:
        convert_to_hls(source_directory, file, destination_directory)
        move_file(join(source_directory, file), done_directory)


movie_source_directory = getenv("movieSourceDirectory")
movie_destination_directory = getenv("movieDestinationDirectory")
movie_done_directory = getenv("movieDoneDirectory")

serie_source_directory = getenv("serieSourceDirectory")
serie_destination_directory = getenv("serieDestinationDirectory")
serie_done_directory = getenv("serieDoneDirectory")

main(movie_source_directory, movie_destination_directory, movie_done_directory)
main(serie_source_directory, serie_destination_directory, serie_done_directory)
