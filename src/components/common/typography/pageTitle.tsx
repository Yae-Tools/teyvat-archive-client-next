import Image from "next/image";
import { memo } from "react";

import bdLeft from "~/assets/icons/system/bd-left.png";
import bdRight from "~/assets/icons/system/bd-right.png";

type Props = {
  title: string;
  customClass?: string;
};

function PageTitle({
  title,
  customClass = "my-2 text-3xl xl:text-5xl px-4 text-center",
}: Readonly<Props>) {
  return (
    <span className="flex items-center w-full max-w-[calc(100svw-10%)] 2xl:max-w-[1650px]">
      <Image src={bdLeft} alt="bd-left" />
      <span className="h-px flex-1 bg-gradient-to-r from-transparent to-gray-300 dark:to-gray-600" />
      <h1 className={customClass}>{title}</h1>
      <span className="h-px flex-1 bg-gradient-to-l from-transparent to-gray-300 dark:to-gray-600" />
      <Image src={bdRight} alt="bd-right" />
    </span>
  );
}

export default memo(PageTitle);
