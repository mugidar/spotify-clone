"use client";

import React, { useMemo } from "react";
import { usePathname } from "next/navigation";
import { HiHome } from "react-icons/hi";
import { BiHeart, BiSearch } from "react-icons/bi";
import Box from "./Box";
import SidebarItem from "./SidebarItem";
import Library from "./Library";
import { Song } from "@/types";
import usePlayer from "@/hooks/usePlayer";
import { twMerge } from "tailwind-merge";

interface SidebarProps {
  children: React.ReactNode,
  songs: Song[]
}

const Sidebar: React.FC<SidebarProps> = ({ children, songs }) => {
  const pathname = usePathname();
  const routes = useMemo(
    () => [
      {
        icon: HiHome,
        label: "Home",
        active: pathname === "/",
        href: "/"
      },
      {
        icon: BiSearch,
        label: "Search",
        active: pathname === "/search",
        href: "/search"
      },
      {
        icon: BiHeart,
        label: "Liked",
        active: pathname === "/liked",
        href: "/liked"
      }
    ],
    [pathname]
  );

    const player = usePlayer()


  return (
    <div className={twMerge("flex h-full", player.activeId && "h-[calc(100%-40px)]")}>
      <div className="hidden md:flex flex-col gap-y-2 bg-black h-full w-[300px] p-2">
        <Box>
          <div className="flex flex-col gap-y-4 px-5 py-4">
            {routes.map((route) => (
              <SidebarItem key={route.label} {...route} />
            ))}
          </div>
        </Box>
        <Box className="overfloww-y-auto h-full"><Library songs={songs} /></Box>
      </div>
      <main className="w-full h-full overfolw-y-auto py-2">{children}</main>
    </div>
  );
};

export default Sidebar;
