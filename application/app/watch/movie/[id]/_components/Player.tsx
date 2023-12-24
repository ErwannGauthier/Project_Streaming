import HlsPlayerMovie from "@/app/_components/players/HlsPlayerMovie";

interface PlayerProps {
    movieId: number;
}

export default function Player({movieId}: PlayerProps) {
    return (
        <div className="w-full pt-0 pb-8 flex justify-center items-center grayBackground">
            <HlsPlayerMovie movieId={movieId}/>
        </div>
    )
}