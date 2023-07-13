"use client"
import { Song } from "@/types";
import React from "react";
import MediaItem from "./MediaItem";
import LikeButton from "./LikeButton";

export const revalidate = 0;

interface SearchContentProps {
  songs: Song[];
}
const SearchContent: React.FC<SearchContentProps> = ({ songs }) => {
  if (songs.length === 0) return <div>No songs found</div>;

  return (
    <div className="flex flex-col gap-y-2 w-full px-6 textneutral-400">
      {songs?.map((song) => <div key={song.id} className="flex items-center gap-x-4 w-full">
        <div className="flex-1">
            <MediaItem song={song} onClick={() => {}}/>
        </div>
        <LikeButton songId={song.id}/>
      </div>)}
    </div>
  );
};

export default SearchContent;
