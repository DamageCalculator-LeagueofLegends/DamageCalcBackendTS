import { Item } from '../../../../items/Item/Item';
import { UtilInfo } from '../../types/UtilInfo';
import { TotalStats } from '../types/TotalStats';
import { multiplicativeCalc } from '../helperFunctions';

export function totalStatsFromItems(
  item: Item,
  currStats: TotalStats,
  utilInfo: UtilInfo
): TotalStats {
  const {
    criticalStrikeChance,
    lethality,
    magicPenetration,
    abilityPower,
    abilityHaste,
    healAndShieldPower,
    lifesteal,
    omnivamp,
    physicalVamp,
    armorPenetration,
    tenacity,
    slowResitance,
    healthRegen,
    manaRegen,
  } = item.itemStats;
  let tempHealthRegen: number = 0;
  let tempManaRegen: number = 0;
  if (healthRegen.flat > 0)
    tempHealthRegen = utilInfo.baseHealthRegen * healthRegen.flat;

  if (manaRegen.flat > 0)
    tempManaRegen = utilInfo.baseManaRegen * manaRegen.flat;
  return {
    ...currStats,
    criticalChance: criticalStrikeChance.percent + currStats.criticalChance,
    lethalityFlat: lethality.flat + currStats.lethalityFlat,
    magicPenFlat: magicPenetration.flat + currStats.magicPenFlat,
    abilityPower: abilityPower.flat + currStats.abilityPower,
    abilityHaste: abilityHaste.flat + currStats.abilityHaste,
    healAndShieldPower:
      healAndShieldPower.percent + currStats.healAndShieldPower,
    lifeSteal: lifesteal.percent + currStats.lifeSteal,
    omnivamp: omnivamp.percent + currStats.omnivamp,
    physicalVamp: physicalVamp?.percent ?? 0 + currStats.omnivamp,

    armorPenPercentage:
      multiplicativeCalc(
        currStats.armorPenPercentage,
        armorPenetration.percent
      ) + currStats.armorPenPercentage,
    magicPenPercentage:
      multiplicativeCalc(
        currStats.magicPenPercentage,
        magicPenetration.percent
      ) + +currStats.magicPenPercentage,
    tenacity:
      multiplicativeCalc(currStats.tenacity, tenacity.flat) +
      currStats.tenacity,
    slowResistance:
      multiplicativeCalc(
        currStats.slowResistance,
        slowResitance?.percent ?? 0
      ) + currStats.slowResistance,
    healthRegen: tempHealthRegen + currStats.healthRegen,
    manaRegen: tempManaRegen + currStats.manaRegen,
  };
}
