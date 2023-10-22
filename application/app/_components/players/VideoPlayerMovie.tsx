interface VideoPlayerMovieProps {
    movieId: number;
}

export default function VideoPlayerMovie({ movieId }: VideoPlayerMovieProps) {
    return (
        <video id="video-player" src={`/api/video?&type=Movie&movieId=${movieId}`} controls className="PlayerVideo75vw border-[1px] border-solid border-neutral-700" />
    );
}