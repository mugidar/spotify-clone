"use client";
import useLoadImage from "@/hooks/useLoadImage";
import { Song } from "@/types";
import Image from "next/image";
import React from "react";
import LikeButton from "./LikeButton";

interface MediaItemProp {
  song: Song;
  onClick: (id: string) => void;
}

const MediaItem: React.FC<MediaItemProp> = ({ song, onClick }) => {
  const imageUrl = useLoadImage(song);

  const handleClick = () => {
    if (onClick) {
      return onClick(song.id);
    }

    //
  };
  return (
    <div className="flex justify-between hover:bg-neutral-800/50 w-full p-2 rounded-md">
      <div
        onClick={handleClick}
        className="flex  items-center gap-x-3 cursor-pointer   "
      >
        <div className="relative rounded-md min-h-[48px] min-w-[48px]">
          <Image
            className="object-cover rounded-full"
            src={imageUrl || "/liked.png"}
            fill
            alt=""
          />
        </div>
        <div className="flex flex-col gap-y-1 overflow-hidden">
          <p className="text-white truncate">{song.title}</p>
          <p className="text-neutral-400 text-sm truncate italic">
            {song.author}
          </p>
        </div>
      </div>
      <LikeButton songId={song.id} />
    </div>
  );
};

export default MediaItem;
