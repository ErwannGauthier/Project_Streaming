interface SelectButtonProps {
    files: Array<string>;
}

export default function SelectButton({ files }: SelectButtonProps) {
    return (
        <select id="file" name="file" defaultValue="defaultValue" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <option value="defaultValue">Choisir un fichier...</option>
            {files.map((file: string, index) => (
                <option key={index} value={file}>{file}</option>
            ))}
        </select>
    )
}