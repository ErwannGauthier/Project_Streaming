interface VideoPlayerEpisodeProps {
    serieId: number;
    seasonNumber: number;
    episodeNumber: number;
}

export default function VideoPlayerEpisode({ serieId, seasonNumber, episodeNumber }: VideoPlayerEpisodeProps) {
    return (
        <video id="video-player" src={`/api/video?&type=Episode&serieId=${serieId}&seasonNumber=${seasonNumber}&episodeNumber=${episodeNumber}`} controls className="PlayerVideo75vw border-[1px] border-solid border-neutral-700" />
    );
}