"use client"

import HLSPlayer from "@/app/_components/players/HlsPlayer";

interface HlsPlayerMovie {
    movieId: number,
}

export default function HlsPlayerMovie({movieId}: HlsPlayerMovie) {
    const path: string = `http://127.0.0.1:8080/movies/${movieId}/output.m3u8`;
    return (
        <HLSPlayer path={path}/>
    );
}