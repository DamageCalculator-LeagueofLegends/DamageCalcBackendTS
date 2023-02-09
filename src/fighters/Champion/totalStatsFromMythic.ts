import { Item } from '../../../../items/Item/Item';
import { TotalStats } from '../../types/TotalStats';
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
    lethalityFlat:
      lethality.flat * numberOfLegendaryItems + currStats.lethalityFlat,
    magicPenFlat:
      magicPenetration.flat * numberOfLegendaryItems + currStats.magicPenFlat,
    abilityPower:
      abilityPower.flat * numberOfLegendaryItems + currStats.abilityPower,
    abilityHaste:
      abilityHaste.flat * numberOfLegendaryItems + currStats.abilityHaste,
    omnivamp: omnivamp.flat * numberOfLegendaryItems + currStats.omnivamp,

    armorPenPercentage:
      multiplicativeCalc(
        currStats.armorPenPercentage,
        mythicArmorPenPercentage
      ) + currStats.armorPenPercentage,
    magicPenPercentage:
      multiplicativeCalc(
        currStats.magicPenPercentage,
        mythicMagicPenPercentage
      ) + currStats.magicPenPercentage,
    tenacity:
      multiplicativeCalc(currStats.tenacity, mythicTenacity) +
      currStats.tenacity,
    slowResistance:
      multiplicativeCalc(currStats.slowResistance, mythicSlowResistance) +
      currStats.slowResistance,
  };
}
