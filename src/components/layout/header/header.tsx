"use client";

import { CogIcon, MenuIcon, NotebookPen } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Modal from "react-modal";
import { ToastContainer, toast } from "react-toastify";

import LogoHolder from "~/components/common/logoHolder";
import SettingsModal from "~/components/modals/settings/settingsModal";
import DesktopNavRoutes from "./desktopNavRoutes";
import HeaderSidebar from "./headerSideBar";

export default function Header() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const path = usePathname();

  Modal.setAppElement("#app");

  const notify = (message: string) => {
    toast.info(message, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      theme: "dark",
    });
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [path]);

  return (
    <header
      className="bg-white dark:bg-gray-900 w-full shadow-slate-300 dark:shadow-slate-950 shadow-md overflow-x-hidden"
      style={{ backgroundColor: "rgba(16, 24, 40, 0.3)" }}
    >
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 ">
        <div className="flex items-center justify-between mx-2 w-full">
          <Link
            href="/"
            className="flex items-center justify-start py-2 w-full"
          >
            <span className="sr-only">Teyvat Archive</span>
            <LogoHolder />
            <h1 className="text-white text-lg font-bold ml-2">
              Teyvat Archive
            </h1>
          </Link>

          <div className="hidden lg:block w-full items-center justify-center">
            <DesktopNavRoutes />
          </div>

          <div className="flex items-center gap-4 w-full justify-end">
            <div className="hidden lg:flex lg:gap-4">
              <button
                onClick={() => notify("Updates section coming soon!")}
                className="rounded-sm bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75 dark:bg-gray-800 dark:text-white dark:hover:text-white/75 cu"
              >
                <NotebookPen className="size-5" />
              </button>
              <button
                onClick={() => setIsSettingsOpen(true)}
                className="rounded-sm bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75 dark:bg-gray-800 dark:text-white dark:hover:text-white/75 cu"
              >
                <CogIcon className="size-5" />
              </button>
            </div>

            <div className="block lg:hidden">
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="rounded-sm bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75 dark:bg-gray-800 dark:text-white dark:hover:text-white/75"
              >
                <MenuIcon className="size-5" />
              </button>
            </div>
          </div>

          <HeaderSidebar
            {...{
              isSidebarOpen,
              setIsSidebarOpen,
              isSettingsOpen,
              setIsSettingsOpen,
            }}
          />
          <SettingsModal
            isOpen={isSettingsOpen}
            setIsOpen={setIsSettingsOpen}
            onRequestClose={() => setIsSettingsOpen(false)}
          />
        </div>
      </div>
      <ToastContainer/>
    </header>
  );
}
