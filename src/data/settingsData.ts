import { GlobeIcon, MonitorCog, WrenchIcon } from "lucide-react";
import DisplaySettings from "~/components/modals/settings/displaySettings";
import GeneralSettings from "~/components/modals/settings/generalSettings";
import LocaleSettings from "~/components/modals/settings/localeSettings";

const SETTINGS_CATEGORIES = [
  {
    id: "general",
    title: "General",
    icon: WrenchIcon,
    content: GeneralSettings,
  },
  {
    id: "display",
    title: "Display",
    icon: MonitorCog,
    content: DisplaySettings,
  },
  {
    id: "language",
    title: "Language & Region",
    icon: GlobeIcon,
    content: LocaleSettings,
  },
];

export { SETTINGS_CATEGORIES };
