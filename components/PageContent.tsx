"use client";
import { Song } from "@/types";
interface PageContentProps {
  songs: Song[];
}

import React from "react";
import SongItem from "./SongItem";
const PageContent: React.FC<PageContentProps> = ({ songs }) => {
  if (songs.length > 0) {
    return (
      <div
        className="
      grid
      grid-cols-2
      sm:grid-cols-3
      md:grid-cols-3
      lg:grid-cols-4
      xl:grid-cols-5
      2xl:grid-cols-8
      gap-4
      mt-4
      "
      >
        {songs.map((song) => (
          <SongItem song={song} onClick={() => {}} key={song.id} />
        ))}
      </div>
    );
  }

  return <h1>No songs</h1>;
};

export default PageContent;
