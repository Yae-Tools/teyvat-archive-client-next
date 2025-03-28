import AttributeDesktopContainer from "~/components/layout/container/attributeDesktopContainer";
import StatsSection from "./statsSection";

type Props = {
  stats: {
    [key: string]: IEnkaStat[];
  };
  stars: number;
};

export default function WeaponStatsDesktop({ stats, stars }: Readonly<Props>) {
  return (
    <AttributeDesktopContainer title="Stats">
      <StatsSection {...{ stars, stats }} />
    </AttributeDesktopContainer>
  );
}
