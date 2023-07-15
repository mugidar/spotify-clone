import { Song } from "@/types";
import React, { useEffect, useState } from "react";
import MediaItem from "./MediaItem";
import LikeButton from "./LikeButton";
import { BiPauseCircle, BiPlay } from "react-icons/bi";
import { AiFillStepBackward, AiFillStepForward } from "react-icons/ai";
import { HiVolumeUp } from "react-icons/hi";
import { RxSpeakerOff } from "react-icons/rx";
import Slider from "./Slider";
import usePlayer from "@/hooks/usePlayer";
import useSound from "use-sound";

interface PlayerContentProps {
  songUrl: string;
  song: Song;
}

const PlayerContent: React.FC<PlayerContentProps> = ({ songUrl, song }) => {
  const player = usePlayer();
  const storageVol: number  = localStorage.getItem("volume")
  const [volume, setVolume] = useState(storageVol || 1);
  const [isPlaying, setIsPlaying] = useState(false);

  const [play, { pause, sound }] = useSound(songUrl, {
    volume: volume,
    onplay: () => setIsPlaying(true),
    onend: () => {
      setIsPlaying(false);
      onPlayNext();
    },
    onpause: () => setIsPlaying(false),
    format: ["mp3"]
  });

  const Icon = isPlaying === true ? BiPauseCircle : BiPlay;
  const VolumeIcon = volume === 0 ? RxSpeakerOff : HiVolumeUp;

  const onPlayNext = () => {
    if (player.ids.length === 0) {
      return;
    }

    const currentIndex = player.ids.findIndex((id) => id === player.activeId);
    const nextSong = player.ids[currentIndex - 1];

    if (!nextSong) {
      return player.setId(player.ids[0]);
    }
    player.setId(nextSong);
  };

  const onPlayPrev = () => {
    if (player.ids.length === 0) {
      return;
    }

    const currentIndex = player.ids.findIndex((id) => id === player.activeId);
    const prevSong = player.ids[currentIndex + 1];

    if (!prevSong) {
      return player.setId(player.ids[player.ids.length - 1]);
    }
    player.setId(prevSong);
  };

  useEffect(() => {
    sound?.play();

    return () => {
      sound?.unload();
    };
  }, [sound]);

  const handlePlay = () => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  };

  const toggleMute = () => {
    if (volume === 0) {
      setVolume(storageVol);
    } else {
      setVolume(0);
    }
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 h-full">
      <div className="flex w-full justify-start">
        <div className="flex col-1 items-center gap-x-4">
          <MediaItem song={song} onClick={() => {}} />
        </div>
      </div>
      <div className="flex md:hidden col-1 w-full justify-end items-center">
        <div
          onClick={() => {}}
          className="h-10 w-10 flex items-center justify-center rounded-full bg-white p-1 cursor-pointer"
        >
          <Icon onClick={handlePlay} size={30} className="text-black" />
        </div>
      </div>

      <div className="flex items-center">
        <div className="hidden h-full md:flex justify-center items-center w-full max-w-[722px] gap-x-6">
          <AiFillStepBackward
            onClick={onPlayNext}
            size={24}
            className="text-neutral-400 cursor-pointer hover:text-white transition"
          />
        </div>
        <div className="h-15 w-15 flex items-center justify-center rounded-full bg-white p-2 cursor-pointer">
          <Icon
            onClick={handlePlay}
            size={30}
            className="text-black font-semibold"
          />
        </div>
        <div className="hidden h-full md:flex justify-center items-center w-full max-w-[722px] gap-x-6">
          <AiFillStepForward
            onClick={onPlayPrev}
            size={24}
            className="text-neutral-400 cursor-pointer hover:text-white transition"
          />
        </div>
      </div>

      <div className="hidden md:flex w-full justify-end pr-2">
        <div className="flex items-center gap-x-2 w-[120px]">
          <VolumeIcon onClick={() =>toggleMute()} />
          <Slider value={volume} onChange={(value) => setVolume(value)} />
        </div>
      </div>
    </div>
  );
};

export default PlayerContent;
