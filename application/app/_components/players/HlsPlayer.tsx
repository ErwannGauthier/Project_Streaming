"use client"

import {useEffect, useState} from 'react';
import ReactPlayer from 'react-player';
import LoadingScreen from "@/app/_components/screens/LoadingScreen";

interface HlsPlayerProps {
    path: string,
}

export default function HLSPlayer({path}: HlsPlayerProps) {
    const [hasMounted, setHasMounted] = useState<boolean>(false);

    useEffect(() => {
        setHasMounted(true);
    }, []);

    if (!hasMounted) {
        return (
            <LoadingScreen/>
        );
    }

    return (
        <>
            {hasMounted && <ReactPlayer className="border-[1px] border-solid border-neutral-700"
                                        url={path} controls={true} playing={false}
                                        width={"75vw"}
                                        height={"auto"}
            />}
        </>
    );
};