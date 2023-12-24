interface SelectButtonProps {
    directories: string[];
    directory: string | null,
    handleDirectoryChange: (event: React.ChangeEvent<HTMLSelectElement>) => void,
}

export default function SelectButton({directories, directory, handleDirectoryChange}: SelectButtonProps) {
    return (
        <select id="file" name="file"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={directory || "defaultValue"} onChange={handleDirectoryChange}>
            <option value="defaultValue">Choisir un fichier...</option>
            {directories.map((directory: string, index: number) => (
                <option key={index} value={directory}>{directory}</option>
            ))}
        </select>
    )
}