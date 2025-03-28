import { ChevronDown, ChevronUp, SlidersHorizontal } from "lucide-react";

type Props = {
  children: React.ReactNode;
  isFilterOpen: boolean;
  setIsFilterOpen: (isOpen: boolean) => void;
};

export default function FilterDropDown({
  children,
  isFilterOpen,
  setIsFilterOpen,
}: Readonly<Props>) {
  return (
    <div className="inline-flex items-center overflow-hidden rounded-md border bg-white dark:border-gray-800 dark:bg-gray-900 w-full">
      <div className="border-e w-full px-4 py-2 text-sm/none text-gray-600 hover:bg-gray-50 hover:text-gray-700 dark:border-e-gray-800 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-gray-200 flex items-center justify-start">
        <div className="flex items-center">
          <p>Filters</p>
          <SlidersHorizontal className="size-4 ml-2" />
        </div>

        <div className="flex items-center w-full space-x-1 justify-end">
          {children}
        </div>
      </div>

      <button
        className="h-full p-2 text-gray-600 hover:bg-gray-50 hover:text-gray-700 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-gray-200"
        onClick={() => setIsFilterOpen(!isFilterOpen)}
      >
        {isFilterOpen ? (
          <ChevronUp className="size-4" />
        ) : (
          <ChevronDown className="size-4" />
        )}
      </button>
    </div>
  );
}
