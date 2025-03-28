import { useEffect, useState } from "react";
import { formatWeaponStatValue } from "~/utils/formatters/weaponStatValue.formatter";
import squashWeaponLevels from "~/utils/squashWeaponLevels";

type Props = {
  stars: number;
  stats: {
    [key: string]: IEnkaStat[];
  };

};

export default function StatsSection({
  stars,
  stats,
}: Readonly<Props>) {
  const [squashedView, setSquashedView] = useState(false);
  const [mutatedStats, setMutatedStats] = useState(stats);

  useEffect(() => {
    if (squashedView) {
      const squashedLevels = squashWeaponLevels(
        stats,
        stats[1][1].fightProp as keyof IEnkaStat
      );

      //only display values from keys of squashedLevels
      const squashedStats = Object.fromEntries(
        Object.entries(stats).filter(([key]) => squashedLevels.includes(key))
      );

      setMutatedStats(squashedStats);
    } else {
      setMutatedStats(stats);
    }
  }, [squashedView]);

  return (
    <div className="py-6 space-y-2 text-white w-full">
      {stars > 2 && (
        <div className="flex justify-between items-center">
          <div className="w-full flex items-center justify-start space-x-4 mb-2">
            <label className="inline-flex items-center" htmlFor="tealCheckBox">
              <input
                id="tealCheckBox"
                type="checkbox"
                className="size-5 accent-teal-600"
                checked={squashedView}
                onChange={() => setSquashedView(!squashedView)}
                disabled={stars < 3}
              />
              <span className="ml-2 font-enka">Squash Stats</span>
            </label>
          </div>
        </div>
      )}

      <table className="w-full border-collapse rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-gray-600">
            <th className="p-3 text-center text-sm font-semibold border-b border-r border-gray-700">
              Lv.
            </th>
            <th className="p-3 text-center text-sm font-semibold border-b border-r border-gray-700">
              {mutatedStats[1][0].fightPropName}
            </th>
            {stars > 2 && (
              <th className="p-3 text-center text-sm font-semibold border-b border-r border-gray-700">
                {mutatedStats[1][1].fightPropName}
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {Object.keys(mutatedStats).map((key) => {
            const level = Number(key);
            const stat = mutatedStats[level];
            return (
              <tr
                key={key}
                className="even:bg-gray-950 odd:bg-gray-900 hover:bg-gray-800 transition-colors"
              >
                <td className="p-3 text-right border-r border-gray-700">
                  {level}
                </td>
                <td className="p-3 text-right border-r border-gray-700">
                  {formatWeaponStatValue(
                    stat[0].multiplier,
                    stat[0].isPercent,
                    0
                  )}
                </td>

                {stars > 2 && (
                  <td className="p-3 text-right border-gray-700">
                    {formatWeaponStatValue(
                      stat[1].multiplier,
                      stat[1].isPercent,
                      1
                    )}
                  </td>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
