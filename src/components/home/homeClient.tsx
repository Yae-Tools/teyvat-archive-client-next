"use client";

import Link from "next/link";
import { memo } from "react";
import { useMediaQuery } from "react-responsive";

import DailyDomains from "./dailyDomains/dailyDomains";
import RedeemCodes from "./redeemCodes";
import TimeUntilReset from "./timer/timeUntilReset";

const VersionAnnouncement = memo(({ version }: { version: string }) => (
  <p className="font-enka text-center text-lg xl:text-left">
    Version {version.split(".").slice(0, 2).join(".")} is now live! Head on to{" "}
    <Link href="/events" className="text-teal-500">
      <span className="font-semibold text-teal-500">Events</span>
    </Link>{" "}
    tab to see what's new!
  </p>
));

VersionAnnouncement.displayName = "VersionAnnouncement";

type Props = {
  gameData: {
    version: string;
  };
};

export default function HomeClient({ gameData }: Readonly<Props>) {
  const isXl = useMediaQuery({ minWidth: 1280 });

  // Common classes shared between layouts
  const containerClasses =
    "flex h-full w-full max-w-[1650px] flex-col items-start justify-center space-y-4 rounded-xl px-3 xl:flex-row xl:space-y-0 xl:space-x-5 xl:px-6 xl:py-6";

  const rightColumnClasses =
    "flex h-full w-full flex-col items-center justify-center space-y-4 px-4 xl:order-2 xl:w-2/5";

  return (
    <div className={containerClasses}>
      <div className={rightColumnClasses}>
        <VersionAnnouncement version={gameData.version} />
        <TimeUntilReset />
        {!isXl && <DailyDomains />}
        <RedeemCodes />
      </div>
      {isXl && <DailyDomains />}
    </div>
  );
}
