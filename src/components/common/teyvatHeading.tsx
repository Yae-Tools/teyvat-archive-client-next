import Image from "next/image";

import bdLeft from "~/assets/icons/system/bd-left.png";
import bdRight from "~/assets/icons/system/bd-right.png";

type Props = {
  title: string;
  headerLevel?: number;
};

export default function TeyvatHeading({
  title,
  headerLevel = 3,
}: Readonly<Props>) {
  return (
    <span className="flex items-center w-full">
      <Image src={bdLeft} alt="bd-left" />
      <span className="h-px flex-1 bg-gradient-to-r from-transparent to-gray-300 dark:to-gray-600" />
      {headerLevel === 1 && (
        <h1 className="shrink-0 px-4 text-gray-900 dark:text-white">{title}</h1>
      )}
      {headerLevel === 2 && (
        <h2 className="shrink-0 px-4 text-gray-900 dark:text-white">{title}</h2>
      )}
      {headerLevel === 3 && (
        <h3 className="shrink-0 px-4 text-gray-900 dark:text-white">{title}</h3>
      )}
      {headerLevel === 4 && (
        <h4 className="shrink-0 px-4 text-gray-900 dark:text-white">{title}</h4>
      )}
      {headerLevel === 5 && (
        <h5 className="shrink-0 px-4 text-gray-900 dark:text-white">{title}</h5>
      )}
      {headerLevel === 6 && (
        <h6 className="shrink-0 px-4 text-gray-900 dark:text-white">{title}</h6>
      )}
      <span className="h-px flex-1 bg-gradient-to-l from-transparent to-gray-300 dark:to-gray-600" />
      <Image src={bdRight} alt="bd-right" />
    </span>
  );
}
