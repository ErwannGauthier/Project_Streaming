import VideoPlayerMovie from "@/app/_components/players/VideoPlayerMovie";

interface PlayerProps {
    movieId: number;
}

export default function Player({ movieId }: PlayerProps) {
    return (
        <div className="w-full pt-0 pb-8 flex justify-center items-center grayBackground">
            <VideoPlayerMovie movieId={movieId} />
        </div>
    )
}