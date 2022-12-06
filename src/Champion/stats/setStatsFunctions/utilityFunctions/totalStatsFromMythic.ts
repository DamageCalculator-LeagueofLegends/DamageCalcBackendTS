import { Item } from '../../../../Item/Item';
import { TotalStats } from '../../TotalStats';
import { multiplicativeCalc } from '../helperFunctions';

export function totalStatsFromMythic(
  mythicItem: Item,
  numberOfLegendaryItems: number,
  currStats: TotalStats
): TotalStats {
  const {
    lethality,
    magicPenetration,
    abilityPower,
    abilityHaste,
    omnivamp,
    armorPenetration,
    tenacity,
    slowResitance,
  } = mythicItem.mythicStats;

  const mythicArmorPenPercentage =
    armorPenetration.percent * numberOfLegendaryItems;
  const mythicMagicPenPercentage =
    magicPenetration.percent * numberOfLegendaryItems;
  const mythicTenacity = tenacity.flat * numberOfLegendaryItems;
  const mythicSlowResistance =
    slowResitance?.percent ?? 0 * numberOfLegendaryItems;

  return {
    ...currStats,
    lethalityFlat: lethality.flat * numberOfLegendaryItems,
    magicPenFlat: magicPenetration.flat * numberOfLegendaryItems,
    abilityPower: abilityPower.flat * numberOfLegendaryItems,
    abilityHaste: abilityHaste.flat * numberOfLegendaryItems,
    omnivamp: omnivamp.flat * numberOfLegendaryItems,

    armorPenPercentage: multiplicativeCalc(
      currStats.armorPenPercentage,
      mythicArmorPenPercentage
    ),
    magicPenPercentage: multiplicativeCalc(
      currStats.magicPenPercentage,
      mythicMagicPenPercentage
    ),
    tenacity: multiplicativeCalc(currStats.tenacity, mythicTenacity),
    slowResistance: multiplicativeCalc(
      currStats.slowResistance,
      mythicSlowResistance
    ),
  };
}
