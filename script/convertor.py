import os
import time
import subprocess
import re
from os import listdir, getenv
from os.path import isfile, isdir, join
from datetime import datetime
from dotenv import load_dotenv

load_dotenv()


def getFileName(file):
    fileName = file[:-4]
    extension = file[-4:].lower()
    return fileName, extension


def getFileNameCleaned(fileName):
    return re.sub(r'[^a-zA-Z0-9_]', '_', fileName)


def getDateStr():
    return datetime.now().strftime('%d/%m/%Y - %H:%M:%S')


def addToLogFile(command, stdout, stderr):
    dateString = f"Date: {getDateStr()}"
    commandString = f"----------\n{command}\n----------"
    stdoutString = f"++++++++++\n{stdout}\n++++++++++"
    stderrString = f"xxxxxxxxxx\n{stderr}\nxxxxxxxxxx"
    fullString = f"\n\n==========\n{dateString}\n{commandString}\n{stdoutString}\n{stderrString}\n==========\n\n"
    with open("convertorLog.txt", 'a') as fichier:
        fichier.write(fullString)


def executeCommand(commandString):
    print(f"Execute command: {commandString}\n")
    return subprocess.run([commandString], stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True, shell=True)


def getCodecVideo(file):
    result = executeCommand(
        f"ffprobe -v error -select_streams v:0 -show_entries stream=codec_name -of default=nw=1:nk=1 '{file}'")
    return result.stdout.lower()[:-1]


def getCodecAudio(file):
    result = executeCommand(
        f"ffprobe -v error -select_streams a:0 -show_entries stream=codec_name -of default=nw=1:nk=1 '{file}'")
    return result.stdout.lower()[:-1]


def createLogFile():
    if not isfile(join("./", "convertorLog.txt")):
        result = executeCommand('touch ./convertorLog.txt')


def main(sourceDirectory, destinationDirectory, doneDirectory, extensions):
    createLogFile()
    if not (isdir(sourceDirectory) and isdir(destinationDirectory) and isdir(doneDirectory)):
        print("Problème avec un ou plusieurs des dossiers suivants:")
        print(f"sourceDirectory\t\t{isdir(sourceDirectory)}\t{sourceDirectory}")
        print(f"destinationDirectory\t{isdir(destinationDirectory)}\t{destinationDirectory}")
        print(f"doneDirectory\t\t{isdir(doneDirectory)}\t{doneDirectory}")
        return []

    files = [f for f in listdir(sourceDirectory) if isfile(join(sourceDirectory, f)) and f[-4:].lower() in extensions]
    fileAndTime = []

    for file in files:
        fileName, extension = getFileName(file)
        fileNameCleaned = getFileNameCleaned(fileName)
        tempsDebut = time.time()
        print(f"{getDateStr()} - Convertion de {file} en cours...")

        codecVideo = "libx264"
        if getCodecVideo(f"{sourceDirectory}{file}") == "h264":
            codecVideo = "copy"

        codecAudio = "aac"
        if getCodecAudio(f"{sourceDirectory}{file}") == "aac":
            codecAudio = "copy"

        commandConvertion = f"ffmpeg -i '{sourceDirectory}{file}' -c:v {codecVideo} -c:a {codecAudio} '{destinationDirectory}{fileNameCleaned}.mp4'"
        resultConvertion = executeCommand(commandConvertion)
        addToLogFile(commandConvertion, resultConvertion.stdout, resultConvertion.stderr)

        commandMove = f"mv '{sourceDirectory}{file}' '{doneDirectory}{fileNameCleaned}{extension}'"
        resultMove = executeCommand(commandMove)
        addToLogFile(commandMove, resultMove.stdout, resultMove.stderr)

        tempsTotal = round(time.time() - tempsDebut, 2)
        print(f"{getDateStr()} - Convertion de {file} terminée en {tempsTotal} secondes.\n\n")
        fileAndTime.append({"file": file, "time": tempsTotal})

    return fileAndTime


extensions = [".avi", ".mkv", ".mp4"]

movieSourceDirectory = os.getenv("movieSourceDirectory")
movieDestinationDirectory = os.getenv("movieDestinationDirectory")
movieDoneDirectory = os.getenv("movieDoneDirectory")
fileAndTime = main(movieSourceDirectory, movieDestinationDirectory, movieDoneDirectory, extensions)
for fAt in fileAndTime:
    print(f"{fAt['time']} secondes\t{fAt['file']}")

serieSourceDirectory = os.getenv("serieSourceDirectory")
serieDestinationDirectory = os.getenv("serieDestinationDirectory")
serieDoneDirectory = os.getenv("serieDoneDirectory")
fileAndTime = main(serieSourceDirectory, serieDestinationDirectory, serieDoneDirectory, extensions)
for fAt in fileAndTime:
    print(f"{fAt['time']} secondes\t{fAt['file']}")
