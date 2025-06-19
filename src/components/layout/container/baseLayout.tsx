"use server";

import { Suspense } from "react";

import CustomCursor from "~/assets/cursor/cursor.png";
import { getGameVersion } from "~/services/system/system.service";
import { IGameVersion } from "~/types/system.types";

import AnnouncementBanner from "../banner/announcementBanner";
import Footer from "../footer/footer";
import Header from "../header/header";
import { ToastContainer } from "react-toastify";

type Props = {
  children: React.ReactNode;
};

const BANNER_VISIBLE = process.env.NEXT_PUBLIC_BANNER_VISIBLE === "true";

export default async function BaseLayout({ children }: Readonly<Props>) {
  const gameVersion: IGameVersion = await getGameVersion();

  return (
    <Suspense
      fallback={
        <div
          className="max-h-[100vh] min-h-svh overflow-hidden"
          style={{
            cursor: "url(" + CustomCursor.src + "), auto",
            backgroundColor: "rgba(16, 24, 40, 0.9)"
          }}
        ></div>
      }
    >
      <div
        className="max-h-[100vh] min-h-svh overflow-x-hidden overflow-y-auto"
        style={{
          cursor: "url(" + CustomCursor.src + "), auto",
          backgroundImage: `url(${gameVersion.background})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundBlendMode: "darken",
          backgroundColor: "rgba(16, 24, 40, 0.9)"
        }}
      >
        <div className="mx-auto flex h-full w-full flex-col items-center justify-between">
          <Header />
          {BANNER_VISIBLE && (
            <AnnouncementBanner
              message={`${gameVersion.version} Update is still in progress. Some features may not work as expected.`}
            />
          )}
          <main className="primary-text flex w-full flex-1 flex-col items-center justify-start">
            {children}
          </main>
          <Footer />
        </div>
      </div>

      <ToastContainer />
    </Suspense>
  );
}
