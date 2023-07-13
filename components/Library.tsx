"use client";

import React, { useEffect, useState } from "react";
import { TbPlaylist } from "react-icons/tb";
import { AiOutlinePlus } from "react-icons/ai";
import useAuthModal from "@/hooks/useAuthModal";
import { useUser } from "@/hooks/useUser";
import useUploadModal from "@/hooks/useUploadModal";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { Song } from "@/types";
import MediaItem from "./MediaItem";

interface LibraryProp {
  songs: Song[];
}

const Library: React.FC<LibraryProp> = ({ songs }) => {
  const authModal = useAuthModal();
  const uploadModal = useUploadModal();
  const { user } = useUser();
  const supabase = useSupabaseClient();
  const handleClick = () => {
    if (!user) return authModal.onOpen();

    //Check if subscribed

    return uploadModal.onOpen();
  };

  const [mySongs, setMySongs] = useState();

  useEffect(() => {
    const getSongs = async () => {
      let { data: songs, error } = await supabase.from("songs").select("*");
      setMySongs(songs);
    };
    getSongs();
  }, []);


  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between px-5 pt-4">
        <div className="inline-flex items-center gap-x-2">
          <TbPlaylist className="text-neutral-400" size={26} />
          <p className="text-neutral-400 font-medium text-md">Your Library</p>
        </div>
        <AiOutlinePlus
          className="cursor-pointer hover:text-neutral-400 transition"
          onClick={handleClick}
        />
      </div>
      <div className="flex flex-col gap-y-2 mt-4 px-3">
         {songs?.map((song) => (
          <MediaItem onClick={()=>{}} key={song.id} song={song}/>
        ))} 
      </div>
    </div>
  );
};

export default Library;
