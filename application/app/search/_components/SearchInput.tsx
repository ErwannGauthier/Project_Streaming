'use client'

import {useRouter} from "next/navigation";
import {useState} from "react"

export default function SearchInput() {
    const [searchQuery, setSearchQuery] = useState("");
    const router = useRouter();

    function onSearch(event: React.FormEvent) {
        event.preventDefault();

        const encodedSearchQuery = encodeURI(searchQuery.toLocaleLowerCase());
        if (encodedSearchQuery !== "") {
            router.push(`/search?q=${encodedSearchQuery}`);
        }
    }

    return (
        <form onSubmit={onSearch} id="searchForm" className="flex justify-center w-2/3">
            <input value={searchQuery}
                   id="searchInput"
                   name="searchInput"
                   onChange={event => setSearchQuery(event.target.value)}
                   className="px-5 py-1 w-2/3 sm:px-5 sm:py-3 flex-1 text-neutral-700 bg-gray-50 ring-[1px] ring-gray-200 focus:bg-gray-100 rounded-full focus:outline-none focus:ring-[2px] focus:ring-sky-400 placeholder:text-neutral-400"
                   placeholder="Rechercher un film ou une série..."
                   autoComplete="off"
            />
        </form>
    )
}