import Sidebar from "@/components/Sidebar";
import "./globals.css";
import { Figtree } from "next/font/google";
import SupabaseProvider from "@/providers/SupabaseProvider";
import UserProvider from "@/providers/UserProvider";
import ModalProvider from "@/providers/ModelProvider";
import ToasterProvider from "@/providers/ToasterProvider";

const figTree = Figtree({ subsets: ["latin"] });

export const metadata = {
  title: "Spotify",
  description: "App for listening to music"
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={figTree.className}>
        <ToasterProvider/>
          <SupabaseProvider>
            <UserProvider>
              <ModalProvider />
              <Sidebar>{children}</Sidebar>
            </UserProvider>
          </SupabaseProvider>
  
      </body>
    </html>
  );
}
