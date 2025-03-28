"use client";

import { useAtom } from "jotai";
import { useState } from "react";
import { StarIcon } from "lucide-react";
import {
  artifactRarityAtom,
  artifactSearchAtom,
} from "~/atoms/teyvat/artifact.atom";
import { RARITIES } from "~/data/teyvatData";
import ArtifactFilterStack from "./artifactFilterStack";
import FilterDropDown from "~/components/common/filters/filterDropdown";

export default function ArtifactFilterSection() {
  const [artifactSearch, setArtifactSearch] = useAtom(artifactSearchAtom);
  const [selectedArtifactRarity, setSelectedArtifactRarity] =
    useAtom(artifactRarityAtom);

  const [isFilterOpen, setIsFilterOpen] = useState(false);

  return (
    <div className="w-full pt-3 mx-2 px-2 flex flex-col items-center">
      <div className="relative lg:hidden w-full max-w-[320px]">
        <FilterDropDown
          {...{
            isFilterOpen,
            setIsFilterOpen,
          }}
        >
          {selectedArtifactRarity !== "all" && (
            <div className="flex items-center">
              {(() => {
                if (selectedArtifactRarity === RARITIES[2]) {
                  return "3";
                } else if (selectedArtifactRarity === RARITIES[3]) {
                  return "4";
                } else {
                  return "5";
                }
              })()}
              <StarIcon className="size-4 text-[gold]" />
            </div>
          )}
        </FilterDropDown>

        {isFilterOpen && (
          <div className="absolute flex flex-col items-center justify-evenly pt-4 end-0 z-10 w-full rounded-md border border-gray-100 bg-white shadow-lg dark:border-slate-700 dark:bg-slate-900">
            <ArtifactFilterStack
              {...{
                setIsFilterOpen,
                artifactSearch,
                setArtifactSearch,
                selectedArtifactRarity,
                setSelectedArtifactRarity,
              }}
            />
          </div>
        )}
      </div>
      <div className="hidden lg:flex flex-col items-center lg:flex-row lg:justify-center lg:space-x-4">
        <ArtifactFilterStack
          {...{
            setIsFilterOpen,
            artifactSearch,
            setArtifactSearch,
            selectedArtifactRarity,
            setSelectedArtifactRarity,
          }}
        />
      </div>
    </div>
  );
}
