"use client"

import HLSPlayer from "@/app/_components/players/HlsPlayer";

interface HlsPlayerEpisode {
    serieId: number;
    seasonNumber: number;
    episodeNumber: number;
}

export default function HlsPlayerEpisode({serieId, seasonNumber, episodeNumber}: HlsPlayerEpisode) {
    const path: string = `http://127.0.0.1:8080/series/${serieId}/${seasonNumber}/${episodeNumber}/output.m3u8`;
    return (
        <HLSPlayer path={path}/>
    );
}