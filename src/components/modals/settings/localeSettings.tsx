import { useAtom } from "jotai";
import { defaultServerAtom } from "~/atoms/feature.atoms";
import DropdownItem from "~/components/common/basic/dropDownItem";

export default function LocaleSettings() {
  const [defaultRegion, setDefaultRegion] = useAtom(defaultServerAtom);

  return (
    <div className="flex flex-col space-y-3">
      <DropdownItem
        value={defaultRegion}
        setValue={setDefaultRegion}
        id="defaultServer"
        label="Default Game Server"
        options={[
          { value: "ASIA", label: "Asia" },
          { value: "EU", label: "Europe" },
          { value: "NA", label: "North America" },
        ]}
        description="Set the default server to calculate the time until daily reset."
      />
    </div>
  );
}
