"use client";
import {
  useSessionContext,
  useSupabaseClient
} from "@supabase/auth-helpers-react";
import Modal from "./Modal";
import { useRouter } from "next/navigation";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";

import { useEffect } from "react";
import useAuthModal from "@/hooks/useAuthModal";

const AuthModal = () => {
  const supabaseClient = useSupabaseClient();
  const router = useRouter();
  const { session } = useSessionContext();
  const { onClose, isOpen } = useAuthModal();

  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };


  useEffect(() => {
    if(session) {
        router.refresh()
        onClose()
    }
  },[session,router,onClose])

  return (
    <Modal
      title="Welcome back!"
      description="Login"
      isOpen={isOpen}
      onChange={onChange}
    >
      <Auth
        magicLink
        providers={["github"]}
        theme="dark"
        supabaseClient={supabaseClient}
        appearance={{
          theme: ThemeSupa,
          variables: {
            default: {
              colors: {
                brand: "#22C55E",
                brandAccent: "#404040"
              }
            }
          }
        }}
      />
    </Modal>
  );
};

export default AuthModal;
