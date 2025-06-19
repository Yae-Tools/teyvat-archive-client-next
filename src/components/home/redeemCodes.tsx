"use client";

import { useQuery } from "@tanstack/react-query";
import { ClipboardList } from "lucide-react";
import Image from "next/image";
import { toast } from "react-toastify";

import yaeWhisperIcon from "~/assets/icons/system/yae_wispher.png";
import { getRedeemCodes } from "~/services/system/system.service";
import { IRedeemCodeResponse } from "~/types/enka/enka.types";

import RedeemCodeLoader from "../common/loaderHandlers/redeemCodeLoader";

export default function RedeemCodes() {
  const {
    data: redeemCodes,
    isError,
    isLoading
  } = useQuery<IRedeemCodeResponse>({
    queryKey: ["redeemCodes"],
    queryFn: async () => {
      const data = await getRedeemCodes();
      return data;
    },
    refetchInterval: 1000 * 60 * 60 // 1 hour
  });

  const notify = (message: string) => {
    toast.success(message, {
      position: "bottom-center",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      theme: "dark",
      icon: (
        <Image
          src={yaeWhisperIcon}
          alt="Yae Miko"
          className="w-8"
          width={100}
          height={100}
        />
      )
    });
  };

  if (isLoading) {
    return (
      <RedeemCodeLayout>
        <RedeemCodeLoader />
      </RedeemCodeLayout>
    );
  }
  if (isError) {
    return (
      <RedeemCodeLayout>
        <div className="flex w-full items-center justify-center">
          <p className="text-white">Error fetching redeem codes.</p>
        </div>
        <div className="flex w-full items-center justify-center">
          <p className="text-white">Please try again later.</p>
        </div>
      </RedeemCodeLayout>
    );
  }
  if (!redeemCodes || redeemCodes["active"].length === 0) {
    return (
      <RedeemCodeLayout>
        <div className="flex w-full items-center justify-center">
          <p className="text-white">No active redeem codes available.</p>
        </div>
        <div className="flex w-full items-center justify-center">
          <p className="text-white">Check back later for new codes!</p>
        </div>
      </RedeemCodeLayout>
    );
  }

  return (
    <RedeemCodeLayout>
      <div className="grid w-full grid-cols-1 items-center justify-center sm:grid-cols-2 md:grid-cols-3 md:gap-2 xl:grid-cols-2">
        {redeemCodes["active"].map((code) => (
          <div
            key={code.code}
            className="flex w-full items-center justify-between space-x-2 rounded-lg bg-slate-800 px-4 py-2"
            style={{
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.6)",
              backgroundColor: "rgba(16, 24, 40, 0.5)"
            }}
          >
            <p className="font-enka 2xl:text-md w-full text-left font-semibold text-white xl:text-sm">
              {code.code}
            </p>
            <ClipboardList
              className="mx-auto h-6 w-6 cursor-pointer text-white"
              onClick={() => {
                navigator.clipboard.writeText(code.code);
                notify("Code copied to clipboard!");
              }}
            />
          </div>
        ))}
      </div>
    </RedeemCodeLayout>
  );
}

type RedeemCodeLayoutProps = {
  children: React.ReactNode;
};

const RedeemCodeLayout = ({ children }: Readonly<RedeemCodeLayoutProps>) => {
  return (
    <div className="flex w-full flex-col items-center justify-center space-y-4">
      <h2 className="w-full text-center text-2xl text-white xl:text-left">
        Redeem Codes
      </h2>
      {children}
    </div>
  );
};
