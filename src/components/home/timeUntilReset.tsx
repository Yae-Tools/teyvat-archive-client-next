"use client";

import { useState, useEffect } from "react";
import { useAtom } from "jotai";
import {
  addHours,
  differenceInSeconds,
  intervalToDuration,
  set,
} from "date-fns";
import { toZonedTime } from "date-fns-tz";
import TimerItem from "./timer/timerItem";
import ButtonGroup from "../common/basic/buttonGroup";
import { defaultServerAtom } from "~/atoms/feature.atoms";

export default function TimeUntilReset() {
  const [defaultServer] = useAtom(defaultServerAtom);
  const [time, setTime] = useState(new Date());
  const [selectedServer, setSelectedServer] = useState(defaultServer);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const getTimeUntilReset = (offsetHours: number) => {
    const now = time;

    // Base reset time is 1:30 AM GMT+5:30
    const baseReset = set(new Date(), {
      hours: 1,
      minutes: 30,
      seconds: 0,
      milliseconds: 0,
    });

    // Convert to GMT+5:30
    const resetTimeInZone = toZonedTime(baseReset, "Asia/Kolkata"); // GMT+5:30

    // Apply additional offset
    let nextReset = addHours(resetTimeInZone, offsetHours);

    // If reset time has passed, move to next day
    if (now > nextReset) {
      nextReset = addHours(nextReset, 24);
    }

    // Calculate duration
    const secondsUntil = differenceInSeconds(nextReset, now);
    const duration = intervalToDuration({
      start: 0,
      end: secondsUntil * 1000,
    });

    //return hours, minutes, seconds separately with two digits
    return {
      hours: duration.hours?.toString().padStart(2, "0"),
      minutes: duration.minutes?.toString().padStart(2, "0"),
      seconds: duration.seconds?.toString().padStart(2, "0"),
    };
  };

  const SERVER_MAP = new Map<string, number>([
    ["ASIA", 0],
    ["EU", 7],
    ["NA", 13],
  ]);

  const SERVERS = Array.from(SERVER_MAP, ([name, offset]) => ({
    name,
    offset,
  }));

  const getServerOffset = (server: string) => {
    return SERVER_MAP.get(server) as number;
  };

  useEffect(() => {
    setSelectedServer(defaultServer);
  }, [defaultServer]);

  return (
    <div className="w-full flex flex-col items- xl:items-start justify-center xl:mb-4 mt-3 space-y-4">
      <h2 className="text-2xl text-white text-center xl:text-left">
        Time Until Daily Reset
      </h2>
      <div className="flex justify-center gap-3 sm:gap-8">
        <ButtonGroup
          items={SERVERS.map((server, index) => ({
            id: index,
            label: server.name,
            value: server.name,
            onClick: (server: string | number) =>
              setSelectedServer(server as string),
          }))}
          selectedItem={selectedServer}
        />
      </div>
      <div className="flex justify-center xl:justify-start w-full items-center space-x-2">
        <TimerItem
          time={
            getTimeUntilReset(getServerOffset(selectedServer)).hours ?? "00"
          }
          label="Hour"
        />
        <TimerItem
          time={
            getTimeUntilReset(getServerOffset(selectedServer)).minutes ?? "00"
          }
          label="Minute"
        />
        <TimerItem
          time={
            getTimeUntilReset(getServerOffset(selectedServer)).seconds ?? "00"
          }
          label="Second"
        />
      </div>
    </div>
  );
}
