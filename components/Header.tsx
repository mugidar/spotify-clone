"use client";
import { twMerge } from "tailwind-merge";
import { useRouter } from "next/navigation";
import { RxCaretLeft, RxCaretRight } from "react-icons/rx";
import { HiHome } from "react-icons/hi";
import { BiSearch } from "react-icons/bi";
import { FaUserAlt } from "react-icons/fa";
import React from "react";
import Button from "./Button";
import useAuthModal from "@/hooks/useAuthModal";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useUser } from "@/hooks/useUser";
import { toast } from "react-hot-toast";

interface HeaderProps {
  children: React.ReactNode;
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ children, className }) => {
  const router = useRouter();
  const authModal = useAuthModal();

  const supabaseClient = useSupabaseClient();
  const { user } = useUser();

  const handleLogOut = async () => {
    const { error } = await supabaseClient.auth.signOut();
    supabaseClient.auth.signOut();
    //TODO: reset playing song
    router.refresh();

    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Logged out");
    }
  };

  return (
    <div
      className={twMerge(
        `
  h-fit bg-gradient-to-b from-emerald-800 p-6`,
        className
      )}
    >
      <div className="w-full mb-4 flex items-center justify-between">
        <div className="hidden md:flex gap-x-2 items-center">
          <button
            onClick={() => router.back()}
            className="bg-black rounded-full flex items-center justify-center hover:opacity-50 transition "
          >
            <RxCaretLeft className="text-white" size={38} />
          </button>
          <button
            onClick={() => router.forward()}
            className="bg-black rounded-full flex items-center justify-center hover:opacity-50 transition "
          >
            <RxCaretRight className="text-white" size={38} />
          </button>
        </div>

        <div className="flex md:hidden gap-x-2 items-center">
          <button className="rounded-full p-2 bg-white flex items-center justify-center hover:opacity-75 transition">
            <HiHome className="text-black" size={20} />
          </button>
          <button className="rounded-full p-2 bg-white flex items-center justify-center hover:opacity-75 transition">
            <BiSearch className="text-black" size={20} />
          </button>
        </div>
        <div className="flex justify-between items-center gap-x-4">
          {user ? (
            <>
              <Button onClick={handleLogOut}>Logout</Button>
              <Button onClick={() => router.push("/account")}>
                <FaUserAlt />
              </Button>
            </>
          ) : (
            <>
              <Button
                onClick={authModal.onOpen}
                className="bg-transparent text-neutral-300 font-medium"
              >
                Log in
              </Button>
              <Button onClick={authModal.onClose} className="  font-medium">
                Register
              </Button>
            </>
          )}
        </div>
      </div>
      {children}
    </div>
  );
};

export default Header;
